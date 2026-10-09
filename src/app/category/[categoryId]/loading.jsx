import React from "react";

const CateogryLoading = () => {
  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl animate-pulse px-4 py-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-52 rounded-lg bg-gray-200" />
        <div className="h-4 w-72 max-w-full rounded bg-gray-200" />
      </div>

      <div className="mb-6 flex justify-end">
        <div className="h-10 w-48 rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-white p-4"
          >
            <div className="mb-4 h-24 rounded-lg bg-gray-200" />
            <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
            <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-7 w-2/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default CateogryLoading;
