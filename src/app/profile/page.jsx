"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserEdit, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

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

  if (isPending) {
    return (
      <div className="min-h-screen animate-pulse bg-[#f3f8f3] p-8">
        <div className="mx-auto max-w-4xl space-y-5">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-40 rounded-2xl bg-gray-200" />
          <div className="h-56 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-xl font-bold">আপনাকে সাইন ইন করতে হবে</h2>

        <Link
          href="/sign-in"
          className="rounded-xl bg-[#15803D] px-6 py-3 font-medium text-white"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto bg-[#f3f8f3] px-4 py-10 text-[#1c1d1d] px-5 md:py-14">
      <div className="max-w-4xl mx-auto space-y-7">
        <div className="text-center sm:text-left md:text-left lg:text-left">
          <p className="mb-2 text-sm font-medium text-[#15803D]">BAZAR DOR</p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিচালনা করুন।
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#e0e9e0] bg-white shadow-sm">
          <div className="h-2 bg-[#15803D]" />

          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex min-w-0 items-center gap-4">
              <Image
                src={user.image || "/assets/avatar.jpg"}
                alt={user.name || "User"}
                width={96}
                height={96}
                className="h-20 w-20 shrink-0 rounded-2xl border border-gray-100 object-cover sm:h-24 sm:w-24"
              />

              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold text-gray-900 sm:text-2xl">
                  {user.name || "User"}
                </h2>

                <p className="mt-2 flex items-start gap-2 break-all text-sm text-gray-500">
                  <FaEnvelope className="mt-1 shrink-0 text-[#15803D]" />
                  {user.email}
                </p>

              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-center"
            >
              <FaSignOutAlt />
              সাইন আউট
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e0e9e0] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-lg text-[#15803D]">
              <FaUserEdit />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                অ্যাকাউন্টের তথ্য
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                আপনার ব্যক্তিগত তথ্য দেখুন ও আপডেট করুন।
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-gray-100">
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500">নাম</span>
              <span className="font-medium text-gray-800">
                {user.name || "নাম যোগ করা হয়নি"}
              </span>
            </div>

            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500">ইমেইল</span>
              <span className="break-all font-medium text-gray-800">
                {user.email}
              </span>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#11632f] sm:w-auto"
          >
            <FaUserEdit />
            তথ্য আপডেট করুন
          </Link>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
