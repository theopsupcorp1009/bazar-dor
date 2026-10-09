import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductCard from "../components/ProductCard";
import { notFound } from "next/navigation";

const CategorySection = async ({ category }) => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${category.slug}`,
  );
  const productData = await res.json();


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

      <div className="text-[12px] flex gap-3 items-center justify-end mt-5 p-5 border border-gray-100 rounded-xl shadow-sm bg-white">
        <p className="text-gray-500 ">সাজান</p>

        <div className="relative">
          <select className="text-gray-700 w-full appearance-none rounded-lg border border-gray-300 bg-white px-7 py-2 text-sm outline-none cursor-pointer">
            <option value="">ডিফল্ট</option>
            <option value="low">কম দাম</option>
            <option value="high">বেশি দাম</option>
          </select>

          <RiArrowDropDownLine className="text-2xl pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <p className="mt-5 text-[12px] text-gray-500">
        মোট {productData.length}টি পণ্য দেখানো হচ্ছে
      </p>
      <div>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {productData.map((product) => <ProductCard key={product.id} product={product}/>)}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
