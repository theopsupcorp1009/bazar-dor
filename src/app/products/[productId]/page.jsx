import { notFound } from "next/navigation";
import React from "react";

const ProductPage = async ({ params }) => {
  const { productId } = await params;
  let product;
  let productNotFound = false;

  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    );

    if (res.status === 404) {
      productNotFound = true;
    } else if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    } else {
      product = await res.json();
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to load product data");
  }

  if (productNotFound) {
    notFound();
  }

  const toBanglaNumber = (value) => {
    if (value === null || value === undefined) {
      return "";
    }
    return value.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);
  };

  const unitNames = {
    kg: "কেজি",
    g: "গ্রাম",
    gram: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    ml: "মিলিলিটার",
    piece: "পিস",
    pieces: "পিস",
    dozen: "ডজন",
  };

  const unitBn = unitNames[product.unit?.toLowerCase()] || product.unit;

  const priceFlactuation = Math.abs(
    Number(product.today) - Number(product.yesterday),
  );

  const isUp = product.change?.dir === "up";

  const markets = product.markets || [];
  const lowestPrice = Math.min(...markets.map((market) => market.min));
  const highestPrice = Math.max(...markets.map((market) => market.max));
  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : 0;

  return (
    <div className="mt-5 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-[12px] shadow-sm flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <span className="text-5xl bg-[#F0F5F0] px-3 py-5 rounded-xl">
            {product.image}
          </span>
          <div className="space-y-2">
            <h2 className="font-semibold text-[24px]">{product.nameBn}</h2>
            <p className="text-[12px] text-gray-500">
              প্রতি {unitBn} · {product.categoryNameBn}
            </p>
            <p>
              গতকালের তুলনায় আজ দাম{" "}
              <span className={`font-semibold`}>
                {isUp ? "বেড়েছে" : "কমেছে"}
              </span>{" "}
              ·{" "}
              <span className="font-normal">
                {toBanglaNumber(priceFlactuation)} টাকা
              </span>
            </p>
          </div>
        </div>
        <div className="text-center space-y-1 bg-[#F0F5F0] py-4 px-6 rounded-xl">
          <p className="text-[12px] font-medium text-gray-500">আজকের দাম</p>
          <p className="text-4xl font-bold text-gray-900">
            {toBanglaNumber(product.today)}
          </p>
          <p className="text-[12px] text-gray-500">টাকা / {unitBn}</p>
          <p
            className={`ml-1 flex items-center gap-0.5 font-bold bg-[#F0F5F0] px-2 rounded-[8px] ${
              product.change.dir === "up" ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {isUp ? "▲" : "▼"}
            {toBanglaNumber(product.change.pct)}%
          </p>
        </div>
      </div>

      <div className="bg-white mt-10 rounded-xl">
        <div className="p-5">
          <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-3 gap-5">
            <div className="border border-gray-100 shadow-sm rounded-xl p-5">
              <p className="text-[12px]">সর্বনিম্ন দাম</p>
              <h2 className="font-bold text-[24px] text-green-500">
                {toBanglaNumber(lowestPrice)}{" "}
                <span className="text-[14px] font-mono">টাকা</span>
              </h2>
              <p>সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="border border-gray-100 shadow-sm rounded-xl p-5">
              <p className="text-[12px]">সর্বাধিক দাম</p>
              <h2 className="font-bold text-[24px] text-red-500">
                {toBanglaNumber(highestPrice)}{" "}
                <span className="text-[14px] font-mono">টাকা</span>
              </h2>
              <p>সবচেয়ে বেশী দামের বাজার</p>
            </div>
            <div className="border border-gray-100 shadow-sm rounded-xl p-5">
              <p className="text-[12px]">গড় দাম</p>
              <h2 className="font-bold text-[24px] text-green-500">
                {toBanglaNumber(Math.trunc(averagePrice))}{" "}
                <span className="text-[14px] font-mono">টাকা</span>
              </h2>
              <p>প্রতি {unitBn} এর হিসাবে</p>
            </div>
          </div>
        </div>
        <div className="rounded-[12px] shadow-sm overflow-hidden">
          <div className="p-5">
            <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          </div>

          <div className="border border-gray-100 shadow-sm rounded-[20px] p-6 m-5 space-y-4">
            <h3 className="text-lg font-bold text-[#1c2a1e]">
              বাজারভিত্তিক আজকের দাম
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-gray-500 font-medium text-xs border-b border-gray-100">
                    <th className="px-4 pb-3 text-left font-semibold">বাজার</th>
                    <th className="px-4 pb-3 text-left font-semibold">বিভাগ</th>
                    <th className="px-4 pb-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 pb-3 text-right font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="px-4 pb-3 text-right font-semibold">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => {
                    const average = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${market.division}`}
                        className="text-[#1c2a1e] even:bg-[#edefe9]/70 hover:bg-[#e4ebd8]/50 transition-colors border-t border-black"
                      >
                        <td className="px-4 py-3.5 text-left font-medium">
                          {market.market}
                        </td>

                        <td className="px-4 py-3.5 text-left text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-4 py-3.5 text-right font-medium text-gray-800">
                          {toBanglaNumber(market.min)} টাকা
                        </td>

                        <td className="px-4 py-3.5 text-right font-medium text-gray-800">
                          {toBanglaNumber(market.max)} টাকা
                        </td>

                        <td className="px-4 py-3.5 text-right font-bold text-black">
                          {toBanglaNumber(average)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
