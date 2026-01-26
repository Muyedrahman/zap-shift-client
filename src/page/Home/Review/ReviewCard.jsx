import React from "react";
import { FaQuoteLeft, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ revie }) => {
  const { userName, review, user_photoURL, ratings, date } = revie;

  return (
    <div className="card bg-base-100 shadow-lg border">
      <div className="card-body">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-4xl text-primary opacity-40" />

        {/* Review Text */}
        <p className="mt-4 text-gray-600 leading-relaxed">{review}</p>

        {/* Divider */}
        <div className="divider my-4"></div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-2">
              <img src={user_photoURL} alt={userName} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold">{userName}</h3>
            <p className="text-sm text-gray-500">
              <FaRegStar /> {ratings} | {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
