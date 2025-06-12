import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-06-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Mungon ID' }, { status: 400 });
  }

  try {
    const updatedData = await request.json();

    const updatedProduct = await client
      .patch(id)
      .set(updatedData)
      .commit();

    return NextResponse.json({ message: 'Produkt përditësuar me sukses', product: updatedProduct });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gabim gjatë përditësimit' }, { status: 500 });
  }
}
