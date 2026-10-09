import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
         <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-green-700">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-3 text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
    );
};

export default NotFoundPage;