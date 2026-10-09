"use client"

import { signUp, signIn } from "../../lib/auth-client";
import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Link from 'next/link';

const SignUpPage = () => {
    
  const handleSignUp = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

     try {
      const { data, error } = await signUp.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign up failed:", error.message || error);
        toast.error(error.message || "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        return;
      }

      if (data) {
        toast.success("সাইন আপ সফল হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("একটি অপ্রত্যাশিত সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    console.log(user, data);
  }

  
    const handleGoogleSignIn = async() => {
      const data = await signIn.social({
        provider: "google",
      })
    }
    const handleGithubSignIn = async() => {
      const data = await signIn.social({
        provider: "github",
      })
    }
  

return (
  <div className="min-h-screen bg-[#f3f8f3] flex flex-col items-center justify-center px-5 py-8">
    <div className="w-full max-w-[525px]">
      <div className="text-center mb-7">
        <h2 className="font-bold text-[28px] text-[#18251c]">
          অ্যাকাউন্ট তৈরি করুন
        </h2>

        <p className="mt-1 text-[15px] text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="bg-white/60 border border-[#dce5dd] rounded-[20px] p-[30px] shadow-sm">
        <form className="w-full" onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-[15px] font-medium text-[#26332a]"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full h-[42px] px-3 rounded-[9px] border border-[#dce5dd] bg-[#fbfdfb] text-[15px] text-gray-800 placeholder:text-gray-500 outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
            />
          </div>

          <div className="hidden">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-800 mb-1.5"
              >
                Image
              </label>
              <input
                id="image"
                name="image"
                type="text"
                className="w-full px-3.5 py-2.5 bg-[#fcfcfc] border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition-all duration-200"
              />
            </div>


          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-[15px] font-medium text-[#26332a]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full h-[42px] px-3 rounded-[9px] border border-[#dce5dd] bg-[#fbfdfb] text-[15px] text-gray-800 placeholder:text-gray-500 outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-[15px] font-medium text-[#26332a]"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full h-[42px] px-3 rounded-[9px] border border-[#dce5dd] bg-[#fbfdfb] text-[15px] text-gray-800 placeholder:text-gray-500 outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-[15px] font-medium text-[#26332a]"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="আবার লিখুন"
              className="w-full h-[42px] px-3 rounded-[9px] border border-[#dce5dd] bg-[#fbfdfb] text-[15px] text-gray-800 placeholder:text-gray-500 outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[43px] mt-1 rounded-[9px] bg-[#07943f] hover:bg-[#07853a] active:scale-[0.99] text-white text-[15px] font-semibold shadow-[0_3px_4px_rgba(0,120,50,0.35)] transition-all duration-200 cursor-pointer"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-[2px] bg-[#e5e8e5]" />
          <span className="text-[13px] text-gray-500">অথবা</span>
          <div className="flex-1 h-[2px] bg-[#e5e8e5]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="h-[41px] flex items-center justify-center gap-2 rounded-[9px] border border-[#dce5dd] bg-white hover:bg-gray-50 text-[14px] font-semibold text-[#26332a] transition-colors cursor-pointer"
          >
            <FcGoogle className="text-[17px] text-[#4285F4]" />
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="h-[41px] flex items-center justify-center gap-2 rounded-[9px] border border-[#dce5dd] bg-white hover:bg-gray-50 text-[14px] font-semibold text-[#26332a] transition-colors cursor-pointer"
          >
            <FaGithub className="text-[18px] text-[#222]" />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-[14px] text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#008744] font-medium hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <div className="mt-7 text-center">
        <a
          href="/"
          className="text-[14px] text-gray-500 hover:text-[#008744] transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </a>
      </div>
    </div>
  </div>
);
};

export default SignUpPage;