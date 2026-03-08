import React from "react";
import Lottie from "react-lottie";
import forbiddenAnimation from "../../assets/animations/error.json"; // Correct path
import { Link } from "react-router";


const Forbidden = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: forbiddenAnimation,
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Lottie options={defaultOptions} height={200} width={200} />

      <h1 className="text-3xl font-bold text-red-500 text-center">
        You Are Forbidden to Access This Page
      </h1>

      <Link to="/" className="btn btn-primary mt-4  text-black">
        Go Home
      </Link>
    </div>
  );
};

export default Forbidden;
 