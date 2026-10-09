import React from "react";
import ProductCard from "./ProductCard";

const PriceUpdate = async () => {
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products`);
  const productData = await res.json();
  const firstSixPriceIncrement = productData
    .filter((product) => product.change.dir === "up")
    .slice(0, 6);

  const firstSixPriceDecrement = productData
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div>
        <h2 className="text-lg font-bold">
          {" "}
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {firstSixPriceIncrement.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-bold">
          {" "}
          <span className="text-green-500">▼</span> আজ দাম কমেছে
        </h2>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {firstSixPriceDecrement.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="mt-10" id="সব-পণ্য">
        <h2 className="text-lg font-bold">
          সব পণ্য
        </h2>
        <p className="text-[12px] text-gray-500">মোট {productData.length}টি পণ্য দেখানো হচ্ছে</p>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {productData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceUpdate;
