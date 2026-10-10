"use client";

import { signIn } from "../../lib/auth-client";
import React, { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SignInPage = () => {
  const searchParams = useSearchParams();

  const toastShown = useRef(false);

  useEffect(() => {
    if (
      searchParams.get("reason") === "unauthenticated" &&
      !toastShown.current
    ) {
      toast.info("এই পেজটি দেখতে প্রথমে সাইন ইন করুন।");
      toastShown.current = true;
    }
  }, [searchParams]);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await signIn.email({
        ...user,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
    } catch (error) {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f8f3] flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-[525px]">
        <div className="text-center mb-8">
          <h2 className="font-bold text-[28px] text-[#18251c]">সাইন ইন</h2>

          <p className="mt-2 text-[16px] text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="bg-white/60 border border-[#dce5dd] rounded-[20px] p-[30px] shadow-sm">
          <form className="w-full" onSubmit={handleSignIn}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-[16px] font-bold text-[#26332a]"
              >
                ইমেইল
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full h-[51px] px-4 rounded-[11px] border border-[#dce5dd] bg-[#fbfdfb] text-[16px] text-gray-800 placeholder:text-gray-500 outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-[16px] font-bold text-[#26332a]"
              >
                পাসওয়ার্ড
              </label>

              <input
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full h-[51px] px-4 rounded-[11px] border border-[#dce5dd] bg-[#fbfdfb] text-[16px] text-gray-800 placeholder:text-gray-500 outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full h-[52px] rounded-[10px] bg-[#07943f] hover:bg-[#07853a] active:scale-[0.99] text-white text-[17px] font-semibold shadow-[0_3px_4px_rgba(0,120,50,0.35)] transition-all duration-200 cursor-pointer"
            >
              সাইন ইন
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[2px] bg-[#e5e8e5]" />
            <span className="text-[14px] text-gray-500">অথবা</span>
            <div className="flex-1 h-[2px] bg-[#e5e8e5]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="h-[49px] flex items-center justify-center gap-2 rounded-[10px] border border-[#dce5dd] bg-white hover:bg-gray-50 text-[15px] font-semibold text-[#26332a] transition-colors cursor-pointer"
            >
              <FcGoogle className="text-[18px] text-[#4285F4]" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="h-[49px] flex items-center justify-center gap-2 rounded-[10px] border border-[#dce5dd] bg-white hover:bg-gray-50 text-[15px] font-semibold text-[#26332a] transition-colors cursor-pointer"
            >
              <FaGithub className="text-[19px] text-[#222]" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-6 text-center text-[15px] text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="text-[#008744] font-medium hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-[15px] text-gray-500 hover:text-[#008744] transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
