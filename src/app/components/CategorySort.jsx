"use client";

import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductCard from "./ProductCard";

const CategorySort = ({ products }) => {
  const [sort, setSort] = useState("default");
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
  });

  return (
    <div>
      <div className="text-[12px] flex gap-3 items-center justify-end mt-5 p-5 border border-gray-100 rounded-xl shadow-sm bg-white">
        <p className="text-gray-500 ">সাজান</p>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-gray-700 w-25 appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-7 text-sm outline-none cursor-pointer focus:border-black focus:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশী</option>
            <option value="high">দাম: বেশী থেকে কম</option>
          </select>

          <RiArrowDropDownLine className="text-2xl pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <p className="mt-5 text-[12px] text-gray-500">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>
      <div>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySort;
