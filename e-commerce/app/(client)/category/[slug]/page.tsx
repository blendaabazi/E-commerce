import Container from "@/components/Container";
import CategoryProducts from "@/components/CategoryProducts";
import Title from "@/components/Title";
import React from "react";
import { getAllCategories } from "@/sanity/helpers/queries";

export const dynamic = "force-static";

// Kjo funksion do thirret në build-time për të krijuar faqet për çdo kategori
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category: any) => ({
    slug: category.slug.current,
  }));
}

type Props = {
  params: {
    slug: string;
  };
};

const CategoryPage = async ({ params }: Props) => {
  const { slug } = params;
  const categories = await getAllCategories();

  return (
    <div>
      <Container className="py-10">
        <Title className="text-xl">
          Products by Category:{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {slug}
          </span>
        </Title>

        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;

