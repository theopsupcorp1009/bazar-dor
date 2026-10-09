import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductCard from "../components/ProductCard";
import { notFound } from "next/navigation";
import CategorySort from "../components/CategorySort";

const CategorySection = async ({ category }) => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${category.slug}`,
  );
  const productData = await res.json();

  if (productData.length === 0) {
    notFound();
  }

  const toBanglaNumber = (value) => {
    if (value === null || value === undefined) {
      return "";
    }
    return value.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);
  };

  return (
    <div>
      <div className="border border-gray-100 rounded-xl p-5 mt-5 shadow-sm flex items-center gap-1 bg-white">
        <span className="text-2xl">{category.icon}</span>
        <div className="space-y-1">
          <h2 className="font-bold text-[16px]">{category.nameBn}</h2>
          <p className="text-[12px] text-gray-500">
            {toBanglaNumber(productData.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategorySort products={productData} />
    </div>
  );
};

export default CategorySection;
