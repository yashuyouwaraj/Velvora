import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createCoupon } from "../../../State/admin/AdminCouponSlice";
import { useEffect } from "react";

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponForm = () => {
  const dispatch = useAppDispatch();
  const { adminCoupons } = useAppSelector((store) => store);
  const jwt = localStorage.getItem("jwt") || "";

  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      if (!jwt) {
        return;
      }

      const formattedValues = {
        code: values.code,
        discountPercentage: values.discountPercentage,
        validityStartDate: values.validityStartDate?.format("YYYY-MM-DD"),
        validityEndDate: values.validityEndDate?.format("YYYY-MM-DD"),
        minimumOrderValue: values.minimumOrderValue,
        active: true,
      };
      dispatch(createCoupon({ coupon: formattedValues, jwt }));
    },
  });

  useEffect(() => {
    if (adminCoupons.successMessage) {
      formik.resetForm();
    }
  }, [adminCoupons.successMessage]);

  return (
    <div>
      <Typography className="text-2xl font-bold text-primary-color pb-5 text-center">
        Create New Coupon
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <TextField
              fullWidth
              name="code"
              label="Coupon code"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}
            />
            <TextField
              fullWidth
              name="discountPercentage"
              label="Discount Percentage"
              type="number"
              value={formik.values.discountPercentage}
              onChange={formik.handleChange}
              error={
                formik.touched.discountPercentage &&
                Boolean(formik.errors.discountPercentage)
              }
              helperText={
                formik.touched.discountPercentage &&
                formik.errors.discountPercentage
              }
              sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}
            />

            <TextField
              fullWidth
              label="Validity Start Date"
              type="date"
              value={formik.values.validityStartDate ?? ''}
              onChange={(event) => formik.setFieldValue('validityStartDate', event.target.value ? event.target.value : null)}
              sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}
            />

            <TextField
              fullWidth
              label="Validity End Date"
              type="date"
              value={formik.values.validityEndDate ?? ''}
              onChange={(event) => formik.setFieldValue('validityEndDate', event.target.value ? event.target.value : null)}
              sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}
            />

            <TextField
              fullWidth
              name="minimumOrderValue"
              label="Minimum Order Value"
              type="number"
              value={formik.values.minimumOrderValue}
              onChange={formik.handleChange}
              error={
                formik.touched.minimumOrderValue &&
                Boolean(formik.errors.minimumOrderValue)
              }
              helperText={
                formik.touched.minimumOrderValue &&
                formik.errors.minimumOrderValue
              }
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: '.8rem' }}
              disabled={adminCoupons.loading}
            >
              {adminCoupons.loading ? 'Saving...' : 'Create Coupon'}
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
      {adminCoupons.error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {adminCoupons.error}
        </Typography>
      )}
      {adminCoupons.successMessage && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          {adminCoupons.successMessage}
        </Typography>
      )}
    </div>
  );
};

export default AddNewCouponForm;
