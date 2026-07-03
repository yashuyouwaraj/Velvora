import { Grid, TextField } from "@mui/material";
import React from "react";

interface BecomeSellerFormStep4Props {
  formik: any;
}

const BecomeSellerFormStep4: React.FC<BecomeSellerFormStep4Props> = ({
  formik,
}) => {
  return (
    <div>
      <Grid container spacing={3}>
        <TextField
          fullWidth
          name="businessDetails.businessName"
          label="Business Name"
          value={formik.values.businessDetails.businessName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.businessDetails?.businessName &&
            Boolean(formik.errors.businessDetails?.businessName)
          }
          helperText={
            formik.touched.businessDetails?.businessName &&
            formik.errors.businessDetails?.businessName
          }
        />

        <TextField
          fullWidth
          name="sellerName"
          label="Seller Name"
          value={formik.values.sellerName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
          helperText={formik.touched.sellerName && formik.errors.sellerName}
        />

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

        <TextField
          fullWidth
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.password && Boolean(formik.errors?.password)}
          helperText={formik.touched?.password && formik.errors?.password}
        />
      </Grid>
    </div>
  );
};

export default BecomeSellerFormStep4;
