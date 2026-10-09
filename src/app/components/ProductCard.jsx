import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
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

  return (
    <Link key={product.id} href={`/products/${product.id}`}>
      <div className="bg-white p-4 rounded-xl shadow-sm hover:border hover:border-[#00ff80]">
        <div className="flex gap-3 items-center">
          <span className="text-3xl bg-[#F0F5F0] p-2 rounded-xl">
            {product.image}
          </span>
          <div>
            <h2 className="font-semibold">{product.nameBn}</h2>
            <p className="text-[12px] text-gray-500">
              প্রতি {unitNames[product.unit?.toLowerCase()] || product.unit}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[12px] text-gray-700">আজকের দাম</p>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-[24px]">
              {product.today.toLocaleString("bn-BD")}
              <span className="text-[16px] font-mono"> টাকা</span>
            </h2>
            <span
              className={`ml-1 flex items-center gap-1.5 font-bold bg-[#F0F5F0] px-2 rounded-[8px] ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-emerald-600"
                    : "text-gray-500"
              }`}
            >
              <span className="text-[10px]">
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}
              </span>
              <span>
                {Number(Math.abs(product.change.pct)).toLocaleString(
                  "bn-BD",
                  {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  },
                )}
                %
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
