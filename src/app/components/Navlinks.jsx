import React from "react";
import Link from "next/link";

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();

  return (
    <div className="border-y border-gray-100 mt-4">
      <nav className="max-w-7xl mx-auto flex justify-start items-center py-4">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.id}`}
            className="
                flex
                items-center justify-center
                gap-1
                rounded-xl
                px-3 py-2
                text-[12px]
                transition-all duration-200
                hover:bg-green-50
                hover:text-green-500
            "
          >
            <span className="text-[12px] leading-none">{item.icon}</span>

            <span className="whitespace-nowrap font-semibold text-gray-700 group-hover:text-green-700">
              {item.nameBn}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navlinks;
