import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "@mui/material";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import ColorButton from "../ColorButton";

const ReviewSection = (props) => {
  const { product } = props;

  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    type: "",
    item: undefined,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalOpen = (type, item) => {
    setModal({ type: type, item: item });

    handleOpen();
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-3">
        <h2>Reviews</h2>

        {user && (
          <ColorButton
            background="#22c55e"
            hoverBackground="#16a34a"
            icon={solid("plus")}
            text="Write a review"
            handleClick={() => handleModalOpen("create")}
            hideText={true}
          ></ColorButton>
        )}
      </div>
      {product.reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          handleModalOpen={handleModalOpen}
        />
      ))}
      <Modal open={open} onClose={handleClose}>
        <React.Fragment>
          <ReviewModal handleClose={handleClose} modal={modal} />
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default ReviewSection;
