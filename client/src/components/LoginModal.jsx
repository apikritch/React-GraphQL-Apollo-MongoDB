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
import { LOGIN_USER } from "../mutation/LoginUser";
import { authAction } from "../store/features/authSlice";
import { snackbarAction } from "../store/features/snackbarSlice";

const schema = yup.object({
  email: yup.string().required("Required field").email("Invalid email address"),
  password: yup.string().required("Required field"),
});

const LoginModal = (props) => {
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

  const [loginUser] = useMutation(LOGIN_USER);

  const onSubmit = handleSubmit((data) => {
    loginUser({
      variables: {
        loginInput: data,
      },
      onError: (error) => {
        setErrs(error.graphQLErrors);
      },
      onCompleted: (data) => {
        dispatch(authAction.login(data.loginUser));
        dispatch(
          snackbarAction.open({
            message: "Login successful!",
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
        Login
      </Typography>
      <React.Fragment>
        <TextField
          error={errors.email !== undefined}
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
          autoComplete="current-password"
          helperText={errors.password?.message && errors.password.message}
          {...register("password")}
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
        text="Login"
        type="submit"
        hideText={false}
        customPadding="0.4rem 1.25rem"
      ></ColorButton>
    </ModalBox>
  );
};

export default LoginModal;
