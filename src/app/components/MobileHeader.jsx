"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import { TiThMenu } from "react-icons/ti";

const MobileHeader = ({ navItems }) => {
  const router = useRouter();
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
      <div className="flex items-center gap-2">
        {user && (
          <Link href="/profile">
            <Image
              src={user?.image || "/assets/avatar.jpg"}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-black"
            />
          </Link>
        )}
        <TiThMenu
          onClick={() => setExpand(!expand)}
          className="relative cursor-pointer text-2xl text-gray-500"
        />
      </div>
      {expand && (
        <div className="absolute top-full right-0 z-50 mt-3 w-64 max-w-[90vw] overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
       
          {user && (
            <div className="mb-2 flex items-center gap-3 rounded-lg bg-green-50 p-3">
              <Image
                src={user.image || "/assets/avatar.jpg"}
                alt={user.name || "User"}
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-full border border-green-200 object-cover"
              />

              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/category/${item.id}`}
                  onClick={() => setExpand(false)}
                  className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-green-50"
                >
                  <span className="flex w-5 shrink-0 items-center justify-center text-base text-green-700">
                    {item.icon}
                  </span>

                  <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-green-800">
                    {item.nameBn}
                  </span>

                  <span className="text-xs text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-green-700">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t border-gray-200 pt-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setExpand(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <FaUserCircle className="w-5 shrink-0 text-base text-gray-600" />
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <FaSignOutAlt className="w-5 shrink-0 text-base" />
                  <span>সাইন আউট</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setExpand(false)}
                  className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setExpand(false)}
                  className="flex w-full items-center rounded-lg bg-green-700 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-800"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
