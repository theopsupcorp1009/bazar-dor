"use client";

import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductCard from "./ProductCard";

const SortedProducts = ({ products }) => {
  const [sort, setSort] = useState("default");
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[12px] text-gray-500">
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
            হচ্ছে
          </p>
        </div>

        <div className="text-[12px] flex gap-3 items-center justify-end">
          <p className="text-gray-500 ">সাজান</p>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer select select-ghost w-auto border border-gray-300 rounded-xl hadow-sm bg-white font-inter text-gray-700 text-sm outline-none focus:border-black focus:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশী</option>
            <option value="high">দাম: বেশী থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SortedProducts;
