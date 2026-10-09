import React from "react";
import CategorySection from "../CategorySection";
import { notFound } from "next/navigation";

const CategoryPage = async ({ params }) => {
  const { categoryId } = await params;

  const res = await fetch(
    `${process.env.DATA_API_URL}/categories/${categoryId}`,
  );
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${res.status}`);
  }

  const category = await res.json();

  if (!category || !category.slug) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <CategorySection category={category} />
    </div>
  );
};

export default CategoryPage;
