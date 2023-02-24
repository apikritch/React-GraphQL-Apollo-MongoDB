import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

import { ADD_REVIEW } from "../../mutation/CreateReview";
import { GET_PRODUCT } from "../../hooks/GetProduct";
import { EDIT_REVIEW } from "../../mutation/EditReview";
import { DELETE_REVIEW } from "../../mutation/DeleteReview";
import { snackbarAction } from "../../store/features/snackbarSlice";
import ColorButton from "../ColorButton";
import ModalBox from "../ModalBox";

const ratingRegEx = /^(\s*|\d+)$/;

const schema = yup.object({
  title: yup.string().required("*This field is required"),
  comment: yup.string().required("*This field is required"),
  rating: yup
    .string()
    .required("Please rate the product")
    .matches(ratingRegEx, "Invalid input"),
});

const ReviewModal = (props) => {
  const { handleClose, modal } = props;
  const { productId } = useParams();

  const dispatch = useDispatch();

  const {
    register,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [review, setReview] = useState({
    rating: 0,
    title: "",
    comment: "",
  });

  let mutation;
  let variables;

  const [addReview, createItem] = useMutation(ADD_REVIEW);
  const [updateReview, updateItem] = useMutation(EDIT_REVIEW);
  const [deleteReview, deleteItem] = useMutation(DELETE_REVIEW);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await trigger(["rating", "title", "comment"]);
    if (!result) {
      return;
    }
    if (modal.type === "create") {
      mutation = addReview;
      variables = {
        input: {
          productId: productId,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
        },
      };
    } else if (modal.type === "edit") {
      mutation = updateReview;
      variables = {
        updateReviewId: modal.item.id,
        input: {
          productId: productId,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
        },
      };
    }

    mutation({
      variables: variables,
      refetchQueries: [
        {
          query: GET_PRODUCT,
          variables: {
            productId,
          },
        },
      ],
      onError: (error) => {
        dispatch(
          snackbarAction.open({
            message: `Error: ${error.message}`,
            severity: "error",
          })
        );
      },
      onCompleted: () => {
        handleClose();
        dispatch(
          snackbarAction.open({
            message: `Review has successfully ${
              modal.type === "create"
                ? "created"
                : modal.type === "edit" && "updated"
            }`,
            severity: "success",
          })
        );
        reset();
        setReview({
          rating: 0,
          title: "",
          comment: "",
        });
      },
    });
  };

  const handleDelete = () => {
    deleteReview({
      variables: {
        deleteReviewId: modal.item.id,
      },
      refetchQueries: [
        {
          query: GET_PRODUCT,
          variables: {
            productId,
          },
        },
      ],
      onError: (error) => {
        dispatch(
          snackbarAction.open({
            message: `Error: ${error.message}`,
            severity: "error",
          })
        );
      },
      onCompleted: () => {
        handleClose();
        dispatch(
          snackbarAction.open({
            message: `Review has successfully deleted`,
            severity: "success",
          })
        );
        reset();
      },
    });
  };

  let stars = [];

  const handleClick = (i) => {
    setReview({ ...review, rating: i });
    setValue("rating", i);
    trigger("rating");
  };

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  useEffect(() => {
    if (modal.item && review.rating === 0) {
      setReview({
        rating: modal.item.rating,
        title: modal.item.title,
        comment: modal.item.comment,
      });
      setValue("rating", modal.item.rating);
      setValue("title", modal.item.title);
      setValue("comment", modal.item.comment);
    }
  }, [modal.item, review, setValue]);

  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon
        className="text-green-500 cursor-pointer mx-1"
        icon={i < review.rating ? solid("star") : regular("star")}
        size="2x"
        onClick={() => handleClick(i + 1)}
      />
    );
  }

  return (
    <ModalBox onSubmit={handleSubmit}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        className="!mb-3"
      >
        {modal.type === "create"
          ? "Write a"
          : modal.type === "edit"
          ? "Edit"
          : modal.type === "delete" && "Delete"}{" "}
        Review
      </Typography>
      {modal.type === "create" ? (
        <React.Fragment>
          <div
            className={`flex justify-center ${
              !errors.rating ? "mb-5" : "mb-2"
            }`}
          >
            {stars.length > 0 &&
              stars.map((star, index) => (
                <React.Fragment key={index}>{star}</React.Fragment>
              ))}
          </div>
          <TextField
            variant="outlined"
            className="!flex !hidden"
            {...register("rating")}
          />
          {errors.rating && (
            <p className="text-center text-[#d32f2f] mb-3 mt-[3px] mx-[14px] text-[0.75rem]">
              {errors.rating.message}
            </p>
          )}
          <TextField
            error={errors.title !== undefined}
            label="Title"
            variant="outlined"
            className="!flex !mb-3"
            helperText={errors.title?.message && errors.title.message}
            {...register("title")}
            onChange={handleChange}
          />
          <TextField
            error={errors.comment !== undefined}
            label="Comment"
            variant="outlined"
            multiline
            rows={3}
            className="!flex !mb-3"
            helperText={errors.comment?.message && errors.comment.message}
            {...register("comment")}
            onChange={handleChange}
          />
        </React.Fragment>
      ) : modal.type === "edit" ? (
        <React.Fragment>
          <div
            className={`flex justify-center ${
              !errors.rating ? "mb-5" : "mb-2"
            }`}
          >
            {stars.length > 0 &&
              stars.map((star, index) => (
                <React.Fragment key={index}>{star}</React.Fragment>
              ))}
          </div>
          <TextField
            variant="outlined"
            className="!flex !hidden"
            {...register("rating")}
          />
          {errors.rating && (
            <p className="text-center text-[#d32f2f] mb-3 mt-[3px] mx-[14px] text-[0.75rem]">
              {errors.rating.message}
            </p>
          )}
          <TextField
            error={errors.title !== undefined}
            label="Title"
            variant="outlined"
            className="!flex !mb-3"
            defaultValue={modal.item.title}
            helperText={errors.title?.message && errors.title.message}
            {...register("title")}
            onChange={handleChange}
          />
          <TextField
            error={errors.comment !== undefined}
            label="Comment"
            variant="outlined"
            multiline
            rows={3}
            className="!flex !mb-3"
            defaultValue={modal.item.comment}
            helperText={errors.comment?.message && errors.comment.message}
            {...register("comment")}
            onChange={handleChange}
          />
        </React.Fragment>
      ) : (
        modal.type === "delete" && (
          <Typography variant="p" component="p" className="!mb-4">
            Are you sure you want to delete this review?
          </Typography>
        )
      )}
      <ColorButton
        background="#22c55e"
        hoverBackground="#16a34a"
        text={
          createItem.loading || updateItem.loading || deleteItem.loading ? (
            "Loading"
          ) : (
            <React.Fragment>
              {modal.type === "create"
                ? "Create"
                : modal.type === "edit"
                ? "Edit"
                : modal.type === "delete" && "Delete"}
            </React.Fragment>
          )
        }
        type={modal.type === "delete" ? "button" : "submit"}
        handleClick={modal.type === "delete" ? handleDelete : undefined}
        hideText={false}
        customPadding="0.4rem 1.25rem"
      ></ColorButton>
    </ModalBox>
  );
};

export default ReviewModal;
