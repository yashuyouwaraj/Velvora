import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";

const parseJwtPayload = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

const getTokenRole = (token: string | null) => {
  if (!token) return null;
  const claims = parseJwtPayload(token);
  if (!claims) return null;
  const authorities = claims.authorities || claims.role || claims.roles;
  if (!authorities) return null;
  const values = Array.isArray(authorities)
    ? authorities
    : String(authorities).split(",");
  if (values.includes("ROLE_ADMIN")) return "/admin";
  if (values.includes("ROLE_SELLER")) return "/seller";
  if (values.includes("ROLE_CUSTOMER")) return "/";
  return null;
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("Form data", values);
      dispatch(signin(values));
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  useEffect(() => {
    const token = auth.jwt || localStorage.getItem("jwt");
    const redirectPath = getTokenRole(token);
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [auth.jwt, navigate]);

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
      </h1>
      <div className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {auth.otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-60">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              label="Otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}

        {auth.otpSent ? (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={handleSendOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            {auth.loading ? <CircularProgress /> : "send otp"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
