import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { ADD_PRODUCT } from "../../mutation/CreateProduct";
import { EDIT_PRODUCT } from "../../mutation/EditProduct";
import { DELETE_PRODUCT } from "../../mutation/DeleteProduct";
import { GetCategories } from "../../hooks/GetCategories";
import { GetProduct } from "../../hooks/GetProduct";
import { snackbarAction } from "../../store/features/snackbarSlice";
import ColorButton from "../ColorButton";
import ModalBox from "../ModalBox";

const priceRegEx = /^([0-9]{1,})?(\.)?([0-9]{1,})?$/;
const quantityRegEx = /^(\s*|\d+)$/;

const schema = yup.object({
  name: yup.string().required("*This field is required"),
  categoryId: yup.string().required("*This field is required"),
  description: yup.string().required("*This field is required"),
  image: yup.string().required("*This field is required"),
  onSale: yup.boolean().required(),
  price: yup
    .string()
    .required("*This field is required")
    .matches(priceRegEx, "The price must be a float number"),
  quantity: yup
    .string()
    .required("*This field is required")
    .matches(quantityRegEx, "The quantity must be a number"),
});

const ProductModal = (props) => {
  const { handleClose, modal, categoryId, refetch } = props;

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const categories = GetCategories();
  const product = modal.type === "edit" && GetProduct(modal.item.id);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if (product.data) {
      setChecked(product.data.product.onSale);
      setValue("onSale", product.data.product.onSale);
    }
  }, [product.data, setValue]);

  let mutation;
  let variables;

  const [addProduct, createItem] = useMutation(ADD_PRODUCT);
  const [updateProduct, updateItem] = useMutation(EDIT_PRODUCT);
  const [deleteProduct, deleteItem] = useMutation(DELETE_PRODUCT);

  const onSubmit = handleSubmit((data) => {
    if (modal.type === "create") {
      mutation = addProduct;
      variables = {
        input: {
          name: data.name,
          categoryId: data.categoryId,
          description: data.description,
          image: data.image,
          onSale: data.onSale,
          price: parseFloat(data.price),
          quantity: parseInt(data.quantity),
        },
      };
    } else if (modal.type === "edit") {
      mutation = updateProduct;
      variables = {
        updateProductId: modal.item.id,
        input: {
          categoryId: data.categoryId,
          description: data.description,
          image: data.image,
          name: data.name,
          onSale: data.onSale,
          price: parseFloat(data.price),
          quantity: parseInt(data.quantity),
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
            message: `Product has successfully ${
              modal.type === "create"
                ? "created"
                : modal.type === "edit" && "updated"
            }`,
            severity: "success",
          })
        );
        reset();
        refetch();
        if (modal.type === "edit") {
          product.refetch();
        }
      },
    });
  });

  const handleDelete = () => {
    deleteProduct({
      variables: {
        deleteProductId: modal.item.id,
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
            message: `Product has successfully deleted`,
            severity: "success",
          })
        );
        reset();
        refetch();
      },
    });
  };

  if (categories.loading) return <div>Spinner</div>;
  if (categories.error) return <div>Error</div>;
  if (categories.data) {
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
          Product
        </Typography>
        {modal.type === "create" ? (
          <React.Fragment>
            <TextField
              error={errors.name !== undefined}
              label="Name"
              variant="outlined"
              className="!flex !mb-3"
              helperText={errors.name?.message && errors.name.message}
              {...register("name")}
            />
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <TextField
                error={errors.price !== undefined}
                label="Price"
                variant="outlined"
                helperText={errors.price?.message && errors.price.message}
                {...register("price")}
              />
              <TextField
                error={errors.quantity !== undefined}
                label="Quantity"
                variant="outlined"
                helperText={errors.quantity?.message && errors.quantity.message}
                {...register("quantity")}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <FormControl error={errors.categoryId !== undefined}>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  label="Category"
                  defaultValue={categoryId ? categoryId : ""}
                  {...register("categoryId")}
                  inputProps={{ readOnly: categoryId && true }}
                >
                  {categories?.data?.categories?.length > 0 &&
                    categories.data.categories.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
                {errors.categoryId?.message && (
                  <FormHelperText className="">
                    {errors.categoryId.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                className={errors.categoryId ? "sm:pb-6" : ""}
                control={<Switch />}
                label="On Sale"
                {...register("onSale")}
                checked={checked}
                onChange={handleChange}
              />
            </div>
            <TextField
              error={errors.image !== undefined}
              label="Image Link"
              variant="outlined"
              className="!flex !mb-3"
              helperText={errors.image?.message && errors.image.message}
              {...register("image")}
            />

            <TextField
              error={errors.description !== undefined}
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              className="!flex !mb-3"
              helperText={
                errors.description?.message && errors.description.message
              }
              {...register("description")}
            />
          </React.Fragment>
        ) : modal.type === "edit" ? (
          <React.Fragment>
            {product.loading ? (
              <div>Spinner</div>
            ) : product.error ? (
              <div>Error</div>
            ) : (
              product.data && (
                <React.Fragment>
                  <TextField
                    error={errors.name !== undefined}
                    label="Name"
                    variant="outlined"
                    className="!flex !mb-3"
                    defaultValue={product.data.product.name}
                    helperText={errors.name?.message && errors.name.message}
                    {...register("name")}
                  />
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <TextField
                      error={errors.price !== undefined}
                      label="Price"
                      variant="outlined"
                      defaultValue={product.data.product.price}
                      helperText={errors.price?.message && errors.price.message}
                      {...register("price")}
                    />
                    <TextField
                      error={errors.quantity !== undefined}
                      label="Quantity"
                      variant="outlined"
                      defaultValue={product.data.product.quantity}
                      helperText={
                        errors.quantity?.message && errors.quantity.message
                      }
                      {...register("quantity")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <FormControl error={errors.categoryId !== undefined}>
                      <InputLabel id="category">Category</InputLabel>
                      <Select
                        labelId="category"
                        label="Category"
                        defaultValue={product.data.product.category.id}
                        {...register("categoryId")}
                        inputProps={{ readOnly: categoryId && true }}
                      >
                        {categories?.data?.categories?.length > 0 &&
                          categories.data.categories.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                      {errors.categoryId?.message && (
                        <FormHelperText>
                          {errors.categoryId.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControlLabel
                      control={<Switch />}
                      label="On Sale"
                      {...register("onSale")}
                      checked={checked}
                      onChange={handleChange}
                    />
                  </div>
                  <TextField
                    error={errors.image !== undefined}
                    label="Image Link"
                    variant="outlined"
                    className="!flex !mb-3"
                    defaultValue={product.data.product.image}
                    helperText={errors.image?.message && errors.image.message}
                    {...register("image")}
                  />

                  <TextField
                    error={errors.description !== undefined}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    className="!flex !mb-3"
                    defaultValue={product.data.product.description}
                    helperText={
                      errors.description?.message && errors.description.message
                    }
                    {...register("description")}
                  />
                </React.Fragment>
              )
            )}
          </React.Fragment>
        ) : (
          modal.type === "delete" && (
            <Typography variant="p" component="p" className="!mb-4">
              Are you sure you want to delete {modal.item.name}?
            </Typography>
          )
        )}
        <ColorButton
          background="#f97316"
          hoverBackground="#ea580c"
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
  }
};

export default ProductModal;
