"use client"

import { useSession, signOut, updateUser } from "../../../lib/auth-client";
import React from 'react';
import { toast } from "react-toastify";
import {
  FaSignOutAlt,
} from "react-icons/fa";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleUpdateUser = async(e) => {
    e.preventDefault();
     const formData = new FormData(e.currentTarget);

    const newUser = Object.fromEntries(formData.entries());

    try {
      const { error } = await updateUser({
        ...newUser,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
    } catch {
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
    }
  }

  
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f6f3] p-8 md:p-12 text-[#1c1d1d]">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-bold text-2xl text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user?.image || "/assets/avatar.jpg"}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <h2 className="font-bold text-xl text-gray-900">
                {user?.name || "User"}
              </h2>
              <p className="text-sm text-gray-500">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="cursor-pointer flex items-center gap-1 text-red-500 border border-red-300 hover:bg-red-50 font-medium px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <FaSignOutAlt/> সাইন আউট
          </button>
        </div>

      
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
          <h2 className="font-bold text-lg text-gray-900">তথ্য</h2>

          <form className="space-y-6" onSubmit={handleUpdateUser}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.name || ""}
                className="w-full px-4 py-3 bg-[#fafafa] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-[#058240] hover:bg-[#046c35] text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-sm"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;