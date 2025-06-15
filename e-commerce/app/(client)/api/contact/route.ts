// app/(client)/api/contact/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-06-15",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

export async function GET() {
  try {
    const query = `*[_type == "contact"] | order(_createdAt desc) {
      _id,
      name,
      email,
      message
    }`;

    const contacts = await client.fetch(query);

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const contactEntry = await client.create({
      _type: "contact",
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true, data: contactEntry }, { status: 200 });
  } catch (error) {
    console.error("Error submitting contact:", error);
    return NextResponse.json({ error: "Failed to submit contact." }, { status: 500 });
  }
}
