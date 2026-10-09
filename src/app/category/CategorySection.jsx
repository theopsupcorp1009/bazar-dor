import React from "react";
import { notFound } from "next/navigation";
import SortedProducts from "../components/SortedProducts";



const CategorySection = async ({ category }) => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${category.slug}`,
  );
  const productData = await res.json();

  if (productData.length === 0) {
    notFound();
  }


  return (
    <div>
      <div className="border border-gray-100 rounded-xl p-5 mt-5 shadow-sm flex items-center gap-1 bg-white">
        <span className="text-2xl">{category.icon}</span>
        <div className="space-y-1">
          <h2 className="font-bold text-[16px]">{category.nameBn}</h2>
          <p className="text-[12px] text-gray-500">
            {(productData.length).toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-10">
        <SortedProducts products={productData}/>
      </div>
    </div>
  );
};

export default CategorySection;
