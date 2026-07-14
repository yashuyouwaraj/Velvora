import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Grid";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { updateSellerProfile } from "../../../State/seller/sellerSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { seller } = useAppSelector((store) => store);
  const [formValues, setFormValues] = useState({
    sellerName: "",
    email: "",
    mobile: "",
    gstin: "",
    businessName: "",
    businessEmail: "",
    businessMobile: "",
    businessAddress: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    pickupName: "",
    pickupMobile: "",
    pickupAddress: "",
    pickupLocality: "",
    pickupCity: "",
    pickupState: "",
    pickupPinCode: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (seller.profile) {
      setFormValues({
        sellerName: seller.profile.sellerName || "",
        email: seller.profile.email || "",
        mobile: seller.profile.mobile || "",
        gstin: seller.profile.GSTIN || "",
        businessName: seller.profile.businessDetails?.businessName || "",
        businessEmail: seller.profile.businessDetails?.businessEmail || "",
        businessMobile: seller.profile.businessDetails?.businessMobile || "",
        businessAddress: seller.profile.businessDetails?.businessAddress || "",
        accountNumber: seller.profile.bankDetails?.accountNumber || "",
        ifscCode: seller.profile.bankDetails?.ifscCode || "",
        accountHolderName: seller.profile.bankDetails?.accountHolderName || "",
        pickupName: seller.profile.pickupAddress?.name || "",
        pickupMobile: seller.profile.pickupAddress?.mobile || "",
        pickupAddress: seller.profile.pickupAddress?.address || "",
        pickupLocality: seller.profile.pickupAddress?.locality || "",
        pickupCity: seller.profile.pickupAddress?.city || "",
        pickupState: seller.profile.pickupAddress?.state || "",
        pickupPinCode: seller.profile.pickupAddress?.pinCode || "",
      });
    }
  }, [seller.profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSuccessMessage(null);
    const jwt = localStorage.getItem("jwt") || "";
    const request = {
      sellerName: formValues.sellerName,
      email: formValues.email,
      mobile: formValues.mobile,
      GSTIN: formValues.gstin,
      businessDetails: {
        businessName: formValues.businessName,
        businessEmail: formValues.businessEmail,
        businessMobile: formValues.businessMobile,
        businessAddress: formValues.businessAddress,
      },
      bankDetails: {
        accountNumber: formValues.accountNumber,
        ifscCode: formValues.ifscCode,
        accountHolderName: formValues.accountHolderName,
      },
      pickupAddress: {
        name: formValues.pickupName,
        mobile: formValues.pickupMobile,
        address: formValues.pickupAddress,
        locality: formValues.pickupLocality,
        city: formValues.pickupCity,
        state: formValues.pickupState,
        pinCode: formValues.pickupPinCode,
      },
    };

    await dispatch(updateSellerProfile({ jwt, request }));
    setSuccessMessage("Profile updated successfully.");
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h4" className="font-bold">
          Seller Profile
        </Typography>
        <Typography color="text.secondary">
          Update your store information and payout settings.
        </Typography>
      </div>

      {seller.loading ? (
        <Box className="flex justify-center py-10">
          <CircularProgress />
        </Box>
      ) : (
        <Paper className="p-6">
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Seller Name"
                name="sellerName"
                value={formValues.sellerName}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formValues.mobile}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="GSTIN"
                name="gstin"
                value={formValues.gstin}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formValues.businessName}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Email"
                name="businessEmail"
                value={formValues.businessEmail}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Mobile"
                name="businessMobile"
                value={formValues.businessMobile}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Address"
                name="businessAddress"
                value={formValues.businessAddress}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formValues.accountNumber}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formValues.ifscCode}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formValues.accountHolderName}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Pickup Name"
                name="pickupName"
                value={formValues.pickupName}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Pickup Mobile"
                name="pickupMobile"
                value={formValues.pickupMobile}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Pickup Address"
                name="pickupAddress"
                value={formValues.pickupAddress}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Pickup Locality"
                name="pickupLocality"
                value={formValues.pickupLocality}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="City"
                name="pickupCity"
                value={formValues.pickupCity}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="State"
                name="pickupState"
                value={formValues.pickupState}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Pin Code"
                name="pickupPinCode"
                value={formValues.pickupPinCode}
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>

          {successMessage && (
            <Typography className="mt-4 text-success">{successMessage}</Typography>
          )}

          <Box className="mt-6 flex justify-end">
            <Button variant="contained" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default Profile;