import React from "react";
import ProductCard from "./ProductCard";
import SortedProducts from './SortedProducts';

const PriceUpdate = async () => {
  const res = await fetch(`${process.env.DATA_API_URL}/products`);
  const productData = await res.json();
  const firstSixPriceIncrement = productData
    .filter((product) => product.change.dir === "up")
    .slice(0, 6);

  const firstSixPriceDecrement = productData
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);

  return (
    <div className="px-5 md:px-0 lg:px-0">
      <div className="container mx-auto mt-5 md:mt-10 lg:mt-10">
      <div>
        <h2 className="text-lg font-bold">
          {" "}
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {firstSixPriceIncrement.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="mt-5 md:mt-10 lg:mt-10">
        <h2 className="text-lg font-bold">
          {" "}
          <span className="text-green-500">▼</span> আজ দাম কমেছে
        </h2>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {firstSixPriceDecrement.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="mt-5 md:mt-10 lg:mt-10" id="সব-পণ্য">
        <h2 className="text-lg font-bold">সব পণ্য</h2>
        <SortedProducts products={productData} />
      </div>
    </div>
    </div>
  );
};

export default PriceUpdate;
