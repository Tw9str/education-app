import React, { Children } from "react";

const NoData = ({ description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16.01" />
      </svg>
      <p className="mt-4 text-gray-500">{description}</p>
    </div>
  );
};

export default NoData;
