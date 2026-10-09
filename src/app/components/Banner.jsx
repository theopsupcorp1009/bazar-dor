import Image from "next/image";
import React from "react";
import CurrentDate from './CurrentDate';

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 bg-white border border-gray-200/60 rounded-[28px] p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
      <div className="space-y-5">
        <div className="space-y-3">
          <span className="inline-block bg-[#e8f2e6] text-[#2d6a4f] text-sm font-medium px-4 py-1.5 rounded-full">
            <CurrentDate/>
          </span>

          <h2 className="font-extrabold text-[#1c2a1e] text-2xl sm:text-3xl md:text-[38px] leading-tight tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h2>
        </div>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div className="pt-2">
          <a href="#সব-পণ্য">
            <button className="cursor-pointer bg-[#008744] hover:bg-[#00753b] active:scale-[0.98] text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-sm">
            সব পণ্য দেখুন
          </button>
          </a>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Image
          src="/assets/bazar-hero.png"
          alt="Bazar Hero"
          width={320}
          height={320}
          priority
          className="w-[240px] sm:w-[280px] md:w-[320px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
