import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <span className="loading loading-infinity loading-xl"></span>
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
