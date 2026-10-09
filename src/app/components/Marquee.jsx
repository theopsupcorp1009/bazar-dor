import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  const data = await res.json();

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


  return (
    <div className="border-b border-gray-100 pb-4 bg-white">
      <MarqueeText direction="right" duration={10}>
        {data.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="hover:underline flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-800 whitespace-nowrap border-r border-gray-200/80 hover:bg-gray-50/80 transition-colors"
          >
            <span className="text-base leading-none">{product.image}</span>
            <span>{product.nameBn}</span>
            <span className="ml-0.5 text-gray-900">
              {toBanglaNumber(product.today)} টাকা/{unitNames[product.unit?.toLowerCase()] || product.unit}
            </span>
            <span
              className={`ml-1 flex items-center gap-0.5 font-bold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : "text-emerald-600"
              }`}
            >
              <span className="text-[10px]">
                {product.change.dir === "up" ? "▲" : "▼"}
              </span>
              <span>{toBanglaNumber(product.change.pct)}%</span>
            </span>
          </Link>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
