import React from "react";
import DealCart from "./DealCart";

const Deal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="py-5 lg:px-20">
      <div className="flex items-center justify-between ">
        {[1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
          <DealCart />
        ))}
      </div>
    </div>
  );
};

export default Deal;
