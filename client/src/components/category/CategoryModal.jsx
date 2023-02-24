import React from "react";
import { useDispatch } from "react-redux";

import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, TextField } from "@mui/material";

import { ADD_CATEGORY } from "../../mutation/CreateCategory";
import { EDIT_CATEGORY } from "../../mutation/EditCategory";
import { DELETE_CATEGORY } from "../../mutation/DeleteCategory";
import { snackbarAction } from "../../store/features/snackbarSlice";
import ColorButton from "../ColorButton";
import ModalBox from "../ModalBox";

const schema = yup.object({
  name: yup.string().required("*This field is required"),
  image: yup.string().required("*This field is required"),
});

const CategoryModal = (props) => {
  const { handleClose, modal, refetch } = props;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let mutation;
  let variables;

  const [addCategory, createItem] = useMutation(ADD_CATEGORY);
  const [updateCategory, updateItem] = useMutation(EDIT_CATEGORY);
  const [deleteCategory, deleteItem] = useMutation(DELETE_CATEGORY);

  const onSubmit = handleSubmit((data) => {
    if (modal.type === "create") {
      mutation = addCategory;
      variables = {
        input: {
          name: data.name,
          image: data.image,
        },
      };
    } else if (modal.type === "edit") {
      mutation = updateCategory;
      variables = {
        updateCategoryId: modal.item.id,
        input: {
          name: data.name,
          image: data.image,
        },
      };
    }

    mutation({
      variables: variables,
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
            message: `Category has successfully ${
              modal.type === "create"
                ? "created"
                : modal.type === "edit" && "updated"
            }`,
            severity: "success",
          })
        );
        reset();
        refetch();
      },
    });
  });

  const handleDelete = () => {
    deleteCategory({
      variables: {
        deleteCategoryId: modal.item.id,
      },
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
            message: `Category has successfully deleted`,
            severity: "success",
          })
        );
        reset();
        refetch();
      },
    });
  };

  return (
    <ModalBox onSubmit={modal.type !== "delete" ? onSubmit : undefined}>
      <Typography
        variant="h6"
        component="h2"
        className={`${modal.type === "delete" ? "!mb-1" : "!mb-3"}`}
      >
        {modal.type === "create"
          ? "Create"
          : modal.type === "edit"
          ? "Edit"
          : modal.type === "delete" && "Delete"}{" "}
        Category
      </Typography>
      {modal.type === "delete" ? (
        <Typography variant="p" component="p" className="!mb-4">
          Are you sure you want to delete {modal.item.name}?
        </Typography>
      ) : (
        <React.Fragment>
          <TextField
            error={errors.name !== undefined}
            label="Name"
            variant="outlined"
            className="!flex !mb-3"
            defaultValue={modal.type === "create" ? "" : modal.item.name}
            helperText={errors.name?.message && errors.name.message}
            {...register("name")}
          />
          <TextField
            error={errors.image !== undefined}
            label="Image Link"
            variant="outlined"
            className="!flex !mb-3"
            defaultValue={modal.type === "create" ? "" : modal.item.image}
            helperText={errors.image?.message && errors.image.message}
            {...register("image")}
          />
        </React.Fragment>
      )}
      <ColorButton
        background="#0ea5e9"
        hoverBackground="#0284c7"
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

export default CategoryModal;
