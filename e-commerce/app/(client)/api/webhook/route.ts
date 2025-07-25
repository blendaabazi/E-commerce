import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  // Merr trupin e kërkesës si tekst
  const body = await req.text();

  // Merr headers duke pritur promise-in
  const headersList = await headers();

  // Merr header-in "stripe-signature"
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Konstruksion i eventit nga Stripe duke verifikuar nënshkrimin
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Merr invoice nëse ekziston
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      // Krijon porosinë në Sanity
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.error("Error creating order in sanity:", error);
      return NextResponse.json(
        { error: `Error creating order: ${error}` },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;

  // Metadata duhet të jetë sipas tipit që ke përcaktuar
  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as unknown as Metadata;

  // Merr listën e produkteve të porosisë me detaje të produkteve
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  // Krijon referenca për produktet në Sanity
  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item?.quantity || 0,
  }));

  // Krijon porosinë në Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
  });

  return order;
}
