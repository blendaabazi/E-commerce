// // import { NextResponse } from 'next/server';
// // import { createClient } from 'next-sanity';

// // const client = createClient({
// //   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
// //   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
// //   apiVersion: '2023-06-01',
// //   token: process.env.SANITY_API_TOKEN,
// //   useCdn: false,
// // });

// // export async function POST(request: Request) {
// //   try {
// //     const formData = await request.formData();

// //     const name = formData.get('name') as string;
// //     const price = formData.get('price') as string;
// //     const discount = formData.get('discount') as string;
// //     const intro = formData.get('intro') as string;
// //     const description = formData.get('description') as string;
// //     const stock = formData.get('stock') as string;
// //     const status = formData.get('status') as string;
// //     const variant = formData.get('variant') as string;
// //     const slug = formData.get('slug') as string;
// //     const imageFile = formData.get('image') as File;

// //     if (!name || !price) {
// //       return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
// //     }

// //     let imageRef = null;

// //     // Ruaj imazhin në Sanity nëse ekziston
// //     if (imageFile && imageFile instanceof File) {
// //       const arrayBuffer = await imageFile.arrayBuffer();
// //       const buffer = Buffer.from(arrayBuffer);

// //       const uploadedImage = await client.assets.upload('image', buffer, {
// //         filename: imageFile.name,
// //         contentType: imageFile.type,
// //       });

// //       imageRef = {
// //         _type: 'image',
// //         asset: {
// //           _type: 'reference',
// //           _ref: uploadedImage._id,
// //         },
// //       };
// //     }

// //     // Ruaj produktin
// //     const createdProduct = await client.create({
// //       _type: 'product',
// //       name,
// //       price: Number(price),
// //       discount: Number(discount) || 0,
// //       intro,
// //       description,
// //       stock: Number(stock) || 0,
// //       status,
// //       variant,
// //       slug: {
// //         _type: 'slug',
// //         current: slug,
// //       },
// //       image: imageRef, // lidhe referencën e fotos këtu
// //     });

// //     return NextResponse.json(createdProduct, { status: 201 });
// //   } catch (error) {
// //     console.error('Gabim gjatë shtimit të produktit:', error);
// //     return NextResponse.json({ error: 'Gabim gjatë shtimit të produktit' }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { createClient } from 'next-sanity';

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: '2023-06-01',
//   token: process.env.SANITY_API_TOKEN,
//   useCdn: false,
// });

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();

//     const name = formData.get('name') as string;
//     const price = formData.get('price') as string;
//     const discount = formData.get('discount') as string;
//     const intro = formData.get('intro') as string;
//     const description = formData.get('description') as string;
//     const stock = formData.get('stock') as string;
//     const status = formData.get('status') as string;
//     const variant = formData.get('variant') as string;
//     const slug = formData.get('slug') as string;
//     const imageFile = formData.get('image') as File;

//     if (!name || !price) {
//       return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
//     }

//     let imageRef = null;

//     if (imageFile && imageFile instanceof File) {
//       const arrayBuffer = await imageFile.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const uploadedImage = await client.assets.upload('image', buffer, {
//         filename: imageFile.name,
//         contentType: imageFile.type,
//       });

//       imageRef = {
//         _type: 'image',
//         asset: {
//           _type: 'reference',
//           _ref: uploadedImage._id,
//         },
//       };
//     }

//     const createdProduct = await client.create({
//       _type: 'product',
//       name,
//       price: Number(price),
//       discount: Number(discount) || 0,
//       intro,
//       description,
//       stock: Number(stock) || 0,
//       status,
//       variant,
//       slug: {
//         _type: 'slug',
//         current: slug,
//       },
//       image: imageRef,
//     });

//     return NextResponse.json(createdProduct, { status: 201 });
//   } catch (error) {
//     console.error('Gabim gjatë shtimit të produktit:', error);
//     return NextResponse.json({ error: 'Gabim gjatë shtimit të produktit' }, { status: 500 });
//   }
// }

// export async function GET() {
//   const query = `*[_type == "product"]{
//     _id,
//     name,
//     price,
//     discount,
//     intro,
//     description,
//     stock,
//     status,
//     variant,
//     slug,
//     image
//   }`;

//   const products = await client.fetch(query);

//   return NextResponse.json(products);
// }

// export async function DELETE(request: Request) {
//   try {
//     const { productId } = await request.json();

//     if (!productId) {
//       return NextResponse.json({ error: 'Produkt i paidentifikuar' }, { status: 400 });
//     }

//     await client.delete(productId);

//     return NextResponse.json({ message: 'Produkti u fshi me sukses' });
//   } catch (error) {
//     console.error('Gabim gjatë fshirjes së produktit:', error);
//     return NextResponse.json({ error: 'Gabim gjatë fshirjes së produktit' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-06-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const discount = formData.get('discount') as string;
    const intro = formData.get('intro') as string;
    const description = formData.get('description') as string;
    const stock = formData.get('stock') as string;
    const status = formData.get('status') as string;
    const variant = formData.get('variant') as string;
    const slug = formData.get('slug') as string;
    const imageFile = formData.get('image') as File;

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    let imageRef = null;

    if (imageFile && imageFile instanceof File) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadedImage = await client.assets.upload('image', buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });

      imageRef = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id,
        },
      };
    }

    const createdProduct = await client.create({
      _type: 'product',
      name,
      price: Number(price),
      discount: Number(discount) || 0,
      intro,
      description,
      stock: Number(stock) || 0,
      status,
      variant,
      slug: {
        _type: 'slug',
        current: slug,
      },
      image: imageRef,
    });

    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error) {
    console.error('Gabim gjatë shtimit të produktit:', error);
    return NextResponse.json({ error: 'Gabim gjatë shtimit të produktit' }, { status: 500 });
  }
}

export async function GET() {
  const query = `*[_type == "product"]{
    _id,
    name,
    price,
    discount,
    intro,
    description,
    stock,
    status,
    variant,
    slug,
    image
  }`;

  const products = await client.fetch(query);

  return NextResponse.json({ data: products });
}

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Produkt i paidentifikuar' }, { status: 400 });
    }

    await client.delete(productId);

    return NextResponse.json({ message: 'Produkti u fshi me sukses' });
  } catch (error) {
    console.error('Gabim gjatë fshirjes së produktit:', error);
    return NextResponse.json({ error: 'Gabim gjatë fshirjes së produktit' }, { status: 500 });
  }
}
