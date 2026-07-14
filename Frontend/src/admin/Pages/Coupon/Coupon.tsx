import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  deleteCoupon,
  fetchCoupons,
  clearCouponMessage,
  updateCoupon,
} from "../../../State/admin/AdminCouponSlice";
import { Coupon as CouponType } from "../../../types/couponTypes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Coupon = () => {
  const dispatch = useAppDispatch();
  const { adminCoupons } = useAppSelector((store) => store);
  const jwt = localStorage.getItem("jwt") || "";
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
  const [editedCode, setEditedCode] = useState("");
  const [editedDiscount, setEditedDiscount] = useState(0);
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [editedMinimumOrderValue, setEditedMinimumOrderValue] = useState(0);
  const [editedActive, setEditedActive] = useState(true);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCouponMessage());
    };
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteCoupon({ id, jwt }));
  };

  const handleOpenEdit = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
    setEditedCode(coupon.code);
    setEditedDiscount(coupon.discountPercentage);
    setEditedStartDate(coupon.validityStartDate);
    setEditedEndDate(coupon.validityEndDate);
    setEditedMinimumOrderValue(coupon.minimumOrderValue);
    setEditedActive(coupon.active);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedCoupon(null);
  };

  const handleUpdate = () => {
    if (!selectedCoupon) return;
    dispatch(
      updateCoupon({
        id: selectedCoupon.id,
        coupon: {
          code: editedCode,
          discountPercentage: editedDiscount,
          validityStartDate: editedStartDate,
          validityEndDate: editedEndDate,
          minimumOrderValue: editedMinimumOrderValue,
          active: editedActive,
        },
        jwt,
      }),
    );
    handleCloseEdit();
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3">
        <Typography variant="h4">Coupons</Typography>
        {adminCoupons.successMessage && (
          <Typography color="success.main">{adminCoupons.successMessage}</Typography>
        )}
        {adminCoupons.error && (
          <Typography color="error.main">{adminCoupons.error}</Typography>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="admin coupon table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Coupon Code</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell align="right">Minimum Order Value</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCoupons.loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <CircularProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : adminCoupons.coupons.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  No coupons found.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              adminCoupons.coupons.map((coupon) => (
                <StyledTableRow key={coupon.id}>
                  <StyledTableCell component="th" scope="row">
                    {coupon.code}
                  </StyledTableCell>
                  <StyledTableCell>
                    {new Date(coupon.validityStartDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell>
                    {new Date(coupon.validityEndDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {coupon.minimumOrderValue}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {coupon.discountPercentage}%
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {coupon.active ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleOpenEdit(coupon)}>
                      <Edit />
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDelete(coupon.id)}
                      disabled={adminCoupons.loading}
                    >
                      <Delete />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editOpen} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Coupon</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            label="Coupon Code"
            value={editedCode}
            onChange={(event) => setEditedCode(event.target.value)}
          />
          <TextField
            fullWidth
            type="number"
            label="Discount Percentage"
            value={editedDiscount}
            onChange={(event) => setEditedDiscount(Number(event.target.value))}
          />
          <TextField
            fullWidth
            label="Validity Start Date"
            type="date"
            value={editedStartDate}
            onChange={(event) => setEditedStartDate(event.target.value)}
          />
          <TextField
            fullWidth
            label="Validity End Date"
            type="date"
            value={editedEndDate}
            onChange={(event) => setEditedEndDate(event.target.value)}
          />
          <TextField
            fullWidth
            type="number"
            label="Minimum Order Value"
            value={editedMinimumOrderValue}
            onChange={(event) => setEditedMinimumOrderValue(Number(event.target.value))}
          />
          <FormControl fullWidth>
            <InputLabel id="coupon-status-label">Status</InputLabel>
            <Select
              labelId="coupon-status-label"
              id="coupon-status"
              value={editedActive ? "ACTIVE" : "INACTIVE"}
              label="Status"
              onChange={(event) => setEditedActive(event.target.value === "ACTIVE")}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Coupon;
