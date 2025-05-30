
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
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