"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import MobileHeader from "./MobileHeader";

const UserInfo = ({ navItems }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

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
    <div>
      <div className="relative sm:hidden md:hidden lg:hidden">
        <MobileHeader navItems={navItems} />
      </div>
      <div className="flex gap-3 items-center hidden sm:block md:block lg:block">
        {user ? (
          <div
            onClick={() => setOpen(!open)}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={user?.image || "/assets/avatar.jpg"}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-medium text-[14px]">{user.name}</span>
              <span className="text-[10px]">▼</span>
            </div>
            {open && (
              <div className="absolute top-10 right-0 z-50 bg-white border border-gray-100 shadow-md rounded-xl p-5 w-65">
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
          <div className="">
            <Link href="/sign-in">
              <button className="btn bg-transparent border-0 cursor-pointer rounded">
                সাইন ইন
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="btn bg-[#15803D] hover:bg-[#0ca243] hover:shadow-xl transition-shadow duration-200 text-white cursor-pointer rounded">
                সাইন আপ
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
