
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

// export const getProductBySlug = async (slug: string) => {
//   const PRODUCT_BY_SLUG_QUERY = defineQuery(
//     `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
//   );

//   try {
//     const product = await sanityFetch({
//       query: PRODUCT_BY_SLUG_QUERY,
//       params: {
//         slug,
//       },
//     });
//     return product?.data || null;
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     return null;
//   }
// };

export const getProductBySlug = async (
  slug: string,
  fetchOptions?: RequestInit
) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
       // shto opsionet për ISR
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export const getAllProductSlugs = async (): Promise<string[]> => {
  const SLUGS_QUERY = `*[_type == "product" && defined(slug.current)][].slug.current`;

  try {
    const slugs = await sanityFetch({ query: SLUGS_QUERY });
    return slugs?.data || [];
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
};

export const getAllCategories = async (quantity?: number) => {
  const CATEGORIES_QUERY = `*[_type=="category"] | order(name asc)${quantity ? `[0...${quantity}]` : ""}`;

  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories?.data || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const MY_ORDERS_QUERY =
    defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
    ...,products[]{
      ...,product->
    }
  }`);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
export const getAllProducts = async () => {
  const PRODUCTS_QUERY = defineQuery(`
    *[_type == "product"]{
      _id,
      name,
      price,
      slug {
        current
      }
    } | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_QUERY,
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};