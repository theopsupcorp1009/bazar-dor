import { notFound } from "next/navigation";
import React from "react";

const ProductPage = async ({ params }) => {
  const { productId } = await params;
  let product;
  let productNotFound = false;

  try {
    const res = await fetch(
      `${process.env.DATA_API_URL}/products/${productId}`,
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

  const isUp = product?.change.pct === "up";

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
    <div className="container mx-auto mt-3 space-y-4 mt-5 md:mt-10 lg:mt-10 sm:space-y-6 px-5 md:px-0 lg:px-0">
      <div className="flex flex-col items-stretch justify-between gap-4 rounded-[12px] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-xl bg-[#F0F5F0] px-3 py-8 md:py-5 lg:py-5 text-5xl">
            {product.image}
          </span>

          <div className="min-w-0 space-y-2">
            <h2 className="text-[24px] font-semibold">{product.nameBn}</h2>

            <p className="text-[12px] text-gray-500">
              প্রতি {unitBn} · {product.categoryNameBn}
            </p>

            <p>
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-semibold">{isUp ? "বেড়েছে" : "কমেছে"}</span>{" "}
              ·{" "}
              <span className="font-normal">
                {priceFlactuation.toLocaleString("bn-BD")} টাকা
              </span>
            </p>
          </div>
        </div>

        <div className="w-full space-y-1 rounded-xl bg-[#F0F5F0] px-4 py-3 sm:w-auto sm:px-6 sm:py-4 sm:text-center">
          <p className="text-[12px] font-medium text-gray-500">আজকের দাম</p>

          <div className="flex items-center gap-2 sm:flex-col sm:gap-0 sm:space-y-2">
            <p className="text-4xl font-bold text-gray-900">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="text-[12px] text-gray-500">টাকা / {unitBn}</p>
          </div>

          <p
            className={`flex items-center gap-1.5 rounded-[8px] bg-[#F0F5F0] px-2 font-bold ${
              product.change.dir === "up"
                ? "text-red-600"
                : product.change.dir === "down"
                  ? "text-emerald-600"
                  : "text-gray-500"
            }`}
          >
            <span>
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}
            </span>

            <span>
              {Number(Math.abs(product.change.pct)).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 sm:p-5 mt-5 md:mt-10 lg:mt-10">
        <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          <div className="rounded-xl border border-gray-100 p-4 shadow-sm sm:p-5">
            <p className="text-[12px]">সর্বনিম্ন দাম</p>

            <h2 className="text-[24px] font-bold text-green-500">
              {lowestPrice.toLocaleString("bn-BD")}{" "}
              <span className="font-mono text-[14px]">টাকা</span>
            </h2>

            <p>সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4 shadow-sm sm:p-5">
            <p className="text-[12px]">সর্বাধিক দাম</p>

            <h2 className="text-[24px] font-bold text-red-500">
              {highestPrice.toLocaleString("bn-BD")}{" "}
              <span className="font-mono text-[14px]">টাকা</span>
            </h2>

            <p>সবচেয়ে বেশী দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4 shadow-sm sm:p-5">
            <p className="text-[12px]">গড় দাম</p>

            <h2 className="text-[24px] font-bold text-green-500">
              {Math.trunc(averagePrice).toLocaleString("bn-BD")}{" "}
              <span className="font-mono text-[14px]">টাকা</span>
            </h2>

            <p>প্রতি {unitBn} এর হিসাবে</p>
          </div>
        </div>
      </div>

      <div className="rounded-[12px] bg-white p-5 shadow-sm mt-5 md:mt-10 lg:mt-10">
        <h3 className="mb-5 md:mb-10 lg:mb-10 text-lg font-semibold text-[#1c2a1e]">
          বাজারভিত্তিক আজকের দাম
        </h3>

        <div className="space-y-2 sm:hidden mt-5">
          {markets.map((market) => {
            const average = (market.min + market.max) / 2;

            return (
              <div
                key={`${market.market}-${market.division}`}
                className="rounded-xl border border-gray-100 shadow-sm bg-white px-2.5 py-2"
              >
                <div className="mb-2">
                  <p className="font-medium text-[#1c2a1e]">{market.market}</p>
                  <p className="text-xs text-gray-500">{market.division}</p>
                </div>

                <div className="grid grid-cols-3 gap-1 border-t border-gray-100 pt-2">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">সর্বনিম্ন</p>
                    <p className="font-semibold text-green-600">
                      {market.min.toLocaleString("bn-BD")}
                    </p>
                    <p className="text-xs text-gray-500">টাকা</p>
                  </div>

                  <div className="min-w-0 border-l border-gray-100 pl-2">
                    <p className="text-xs text-gray-500">সর্বাধিক</p>
                    <p className="font-semibold text-red-500">
                      {market.max.toLocaleString("bn-BD")}
                    </p>
                    <p className="text-xs text-gray-500">টাকা</p>
                  </div>

                  <div className="min-w-0 border-l border-gray-100 pl-2">
                    <p className="text-xs text-gray-500">গড়</p>
                    <p className="font-bold text-gray-900">
                      {average.toLocaleString("bn-BD", {
                        maximumFractionDigits: 1,
                      })}
                    </p>
                    <p className="text-xs text-gray-500">টাকা</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden overflow-x-auto rounded-xl sm:block border border-gray-100 shadow-sm p-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500">
                <th className="px-4 pb-3 text-left font-semibold">বাজার</th>
                <th className="px-4 pb-3 text-left font-semibold">বিভাগ</th>
                <th className="px-4 pb-3 text-right font-semibold">
                  সর্বনিম্ন
                </th>
                <th className="px-4 pb-3 text-right font-semibold">সর্বাধিক</th>
                <th className="px-4 pb-3 text-right font-semibold">গড়</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market) => {
                const average = (market.min + market.max) / 2;

                return (
                  <tr
                    key={`${market.market}-${market.division}`}
                    className="border-t border-gray-200 text-[#1c2a1e] transition-colors even:bg-[#edefe9]/70 hover:bg-[#e4ebd8]/50"
                  >
                    <td className="px-4 py-3.5 font-medium">{market.market}</td>
                    <td className="px-4 py-3.5 text-gray-600">
                      {market.division}
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium">
                      {market.min.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium">
                      {market.max.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold">
                      {average.toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
