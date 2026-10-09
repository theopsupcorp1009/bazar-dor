import React from "react";

const loading = () => {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-8 p-4">
      <div className="h-8 w-48 rounded bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl p-4">
            <div className="h-32 rounded-lg bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-8 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
