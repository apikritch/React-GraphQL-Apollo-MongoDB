import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, TextField, Alert } from "@mui/material";

import ColorButton from "./ColorButton";
import ModalBox from "./ModalBox";
import { REGISTER_USER } from "../mutation/RegisterUser";
import { authAction } from "../store/features/authSlice";
import { snackbarAction } from "../store/features/snackbarSlice";

const schema = yup.object({
  email: yup.string().required("Required field").email("Invalid email address"),
  password: yup
    .string()
    .required("Required field")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])[a-zA-Z0-9`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Required field")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterModal = (props) => {
  const { handleClose } = props;

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [errs, setErrs] = useState([]);

  const [registerUser] = useMutation(REGISTER_USER);

  const onSubmit = handleSubmit((data) => {
    registerUser({
      variables: {
        registerInput: { email: data.email, password: data.password },
      },
      onError: (error) => {
        setErrs(error.graphQLErrors);
      },
      onCompleted: (data) => {
        dispatch(authAction.login(data.registerUser));
        dispatch(
          snackbarAction.open({
            message: "User registration successful!",
            severity: "success",
          })
        );
        handleClose();
        reset();
      },
    });
  });

  return (
    <ModalBox onSubmit={onSubmit}>
      <Typography variant="h6" component="h2" className="!mb-3">
        Register
      </Typography>
      <React.Fragment>
        <TextField
          error={errors.email !== undefined || errs.length > 0}
          label="Email"
          variant="outlined"
          className="!flex !mb-3"
          autoComplete="email"
          helperText={errors.email?.message && errors.email.message}
          {...register("email")}
        />
        <TextField
          error={errors.password !== undefined}
          label="Password"
          type="password"
          variant="outlined"
          className="!flex !mb-3"
          autoComplete="new-password"
          helperText={errors.password?.message && errors.password.message}
          {...register("password")}
        />
        <TextField
          error={errors.confirmPassword !== undefined}
          label="Confirm Password"
          type="password"
          variant="outlined"
          className="!flex !mb-3"
          autoComplete="new-password"
          helperText={
            errors.confirmPassword?.message && errors.confirmPassword.message
          }
          {...register("confirmPassword")}
        />
      </React.Fragment>
      {errs.map((error, index) => (
        <Alert key={index} severity="error" className="mb-3">
          {error.message}
        </Alert>
      ))}
      <ColorButton
        background={
          pathname.includes("/products")
            ? "#f97316"
            : pathname === "/categories"
            ? "#0ea5e9"
            : pathname.includes("/product/")
            ? "#22c55e"
            : ""
        }
        hoverBackground={
          pathname.includes("/products")
            ? "#ea580c"
            : pathname === "/categories"
            ? "#0284c7"
            : pathname.includes("/product/")
            ? "#16a34a"
            : ""
        }
        text="Register"
        type="submit"
        hideText={false}
        customPadding="0.4rem 1.25rem"
      ></ColorButton>
    </ModalBox>
  );
};

export default RegisterModal;
