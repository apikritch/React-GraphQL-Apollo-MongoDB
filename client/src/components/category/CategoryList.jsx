import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const CategoryList = (props) => {
  const { data, handleModalOpen } = props;

  const user = useSelector((state) => state.auth.user);

  const [hover, setHover] = useState();

  const handleMouseOver = (categoryId) => {
    setHover(categoryId);
  };

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-7 xl:gap-9 2xl:grid-cols-5 2xl:gap-10 relative">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            onMouseOver={() => handleMouseOver(item.id)}
            onMouseLeave={() => handleMouseOver(null)}
          >
            {user && (
              <div className="mb-2 mr-2 w-full block xl:hidden">
                <div className="flex justify-end">
                  <FontAwesomeIcon
                    className="cursor-pointer text-neutral-400 hover:text-neutral-500 mr-3"
                    icon={solid("pen-to-square")}
                    onClick={() => handleModalOpen("edit", item)}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer text-red-400 hover:text-red-500"
                    icon={solid("trash")}
                    onClick={() => handleModalOpen("delete", item)}
                  />
                </div>
              </div>
            )}
            <Paper
              elevation={3}
              className="!rounded-lg !bg-sky-500 cursor-pointer w-full h-[42.5vw] sm:h-[26vw] lg:h-[20vw] 2xl:h-[16.5vw] mb-2"
              onClick={() => handleModalOpen("navigate", item)}
            >
              <img
                src={item.image}
                alt=""
                className="rounded-lg h-full w-full !object-cover"
              />
            </Paper>
            <div className="flex justify-between items-start">
              <h2
                className={`cursor-pointer break-all text-[1.25rem] sm:text-[1.5rem] ${
                  hover === item.id && "xl:basis-4/5"
                }`}
                onClick={() => handleModalOpen("navigate", item)}
              >
                {item.name}
              </h2>
              {user && (
                <React.Fragment>
                  {hover === item.id && (
                    <div className="mt-2 text-end basis-1/5 hidden xl:block">
                      <FontAwesomeIcon
                        className="cursor-pointer text-neutral-400 hover:text-neutral-500 mr-3"
                        icon={solid("pen-to-square")}
                        onClick={() => handleModalOpen("edit", item)}
                      />
                      <FontAwesomeIcon
                        className="cursor-pointer text-red-400 hover:text-red-500"
                        icon={solid("trash")}
                        onClick={() => handleModalOpen("delete", item)}
                      />
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
