"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const UserInfo = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  console.log(user);

  
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
    <div className="flex gap-3 items-center">
      {user ? (
        <div
          onClick={() => setOpen(!open)}
          className="relative flex items-center gap-2 cursor-pointer"
        >
          <img
            src={user.image || "/assets/avatar.jpg"}
            alt={user.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-medium text-[14px]">{user.name}</span>
            <span className="text-[10px]">▼</span>
          </div>
          {open && (
            <div className="absolute top-10 right-22 z-50 bg-white border border-gray-100 shadow-md rounded-xl p-5 w-65">
              <div>
                <h2 className="font-semibold text-[14px]">{user.name}</h2>
                <p className="text-[12px] text-gray-500">{user.email}</p>
              </div>
              <Link
                href="/profile"
                className="mt-2 flex items-center gap-3 rounded-lg px-2 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUserCircle className="text-lg" />
                আমার প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="cursor-pointer flex w-full items-center gap-3 rounded-lg px-2 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt className="text-lg" />
                সাইন আউট
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link href="/sign-in">
            <button className="btn cursor-pointer">সাইন ইন</button>
          </Link>
          <Link href="/sign-up">
            <button className="btn bg-[#15803D] text-white cursor-pointer">
              সাইন আপ
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserInfo;
