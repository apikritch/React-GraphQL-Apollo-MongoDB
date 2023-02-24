import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

const ReviewCard = (props) => {
  const { review, handleModalOpen } = props;

  const user = useSelector((state) => state.auth.user);

  const [hover, setHover] = useState();

  const handleMouseOver = (categoryId) => {
    setHover(categoryId);
  };

  let stars = [];

  if (review.rating) {
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          className="text-green-500 mr-3"
          icon={i < review.rating ? solid("star") : regular("star")}
        />
      );
    }
  }

  return (
    <div
      className="bg-slate-100 rounded-lg py-6 sm:py-4 px-8 mb-4 relative"
      onMouseOver={() => handleMouseOver(review.id)}
      onMouseLeave={() => handleMouseOver(null)}
    >
      {user && (
        <React.Fragment>
          <div className="hidden xl:block">
            {hover === review.id && (
              <div className="absolute right-5">
                <div className="w-full">
                  <FontAwesomeIcon
                    className="cursor-pointer text-neutral-400 hover:text-neutral-500 mr-3"
                    icon={solid("pen-to-square")}
                    onClick={() => handleModalOpen("edit", review)}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer text-red-400 hover:text-red-500"
                    icon={solid("trash")}
                    onClick={() => handleModalOpen("delete", review)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="block xl:hidden">
            <div className="absolute right-5">
              <div className="w-full">
                <FontAwesomeIcon
                  className="cursor-pointer text-neutral-400 hover:text-neutral-500 mr-3"
                  icon={solid("pen-to-square")}
                  onClick={() => handleModalOpen("edit", review)}
                />
                <FontAwesomeIcon
                  className="cursor-pointer text-red-400 hover:text-red-500"
                  icon={solid("trash")}
                  onClick={() => handleModalOpen("delete", review)}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0 min-h-[7rem]">
        <div className="col-span-1 flex sm:justify-center items-center mb-2 sm:mb-0">
          {stars.length > 0 &&
            stars.map((star, index) => (
              <React.Fragment key={index}>{star}</React.Fragment>
            ))}
        </div>
        <div className="col-span-1 flex flex-col items-start justify-center">
          <h3 className="mb-1 sm:mb-3">{review.title}</h3>
          <p>{review.comment}</p>
        </div>
        <div className="col-span-1 flex sm:justify-center items-center">
          <FontAwesomeIcon
            className="text-neutral-400 mr-3"
            icon={solid("calendar-days")}
          />
          <p>
            <small>{review.date}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
