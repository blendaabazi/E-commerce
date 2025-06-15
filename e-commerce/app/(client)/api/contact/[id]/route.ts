// import { NextResponse } from "next/server";
// import { createClient } from "next-sanity";

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: "2023-06-15",
//   token: process.env.SANITY_API_TOKEN!,
//   useCdn: false,
// });

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await client.delete(params.id);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Delete contact error:", error);
//     return NextResponse.json({ error: "Failed to delete contact." }, { status: 500 });
//   }
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const body = await req.json();

//     if (!body || Object.keys(body).length === 0) {
//       return NextResponse.json({ error: "Data is required for update." }, { status: 400 });
//     }

//     const updated = await client
//       .patch(params.id)
//       .set(body)
//       .commit();

//     return NextResponse.json({ success: true, data: updated });
//   } catch (error) {
//     console.error("Update contact error:", error);
//     return NextResponse.json({ error: "Failed to update contact." }, { status: 500 });
//   }
// }
