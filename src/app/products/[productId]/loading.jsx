import React from "react";

const ProductLoading = () => {
  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl animate-pulse px-4 py-8">
      <div className="rounded-xl bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="h-24 w-24 rounded-xl bg-gray-200" />

          <div className="flex-1 space-y-4">
            <div className="h-7 w-56 max-w-full rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
          </div>

          <div className="h-28 w-full rounded-xl bg-gray-200 sm:w-44" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 h-4 w-24 rounded bg-gray-200" />
            <div className="h-8 w-32 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 h-6 w-56 rounded bg-gray-200" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-10 rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductLoading;
