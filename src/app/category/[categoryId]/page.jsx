import React, { Suspense } from "react";
import CategorySection from "../CategorySection";
const CategoryPage = async ({ params }) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/categories/${categoryId}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const category = await res.json();
  console.log(category);

  return (
    <div className="max-w-7xl mx-auto">
      <Suspense fallback="Loading...">
        <CategorySection category={category}/>
      </Suspense>
    </div>
  );
};

export default CategoryPage;
