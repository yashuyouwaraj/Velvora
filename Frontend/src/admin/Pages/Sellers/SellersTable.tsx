import {
  Button,
  CircularProgress,
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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchAdminSellers,
  updateSellerAccountStatus,
} from "../../../State/admin/adminSellerSlice";
import { Seller } from "../../../types/SellerTypes";

const accountStatu = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account verification Pending",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good state",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "Account is deactivated and cannot be used",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account is permanently banned due to violations of rules",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account is permanently closed, cannot be used",
  },
];

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const statusOptions = [
  {
    status: "ALL",
    title: "All Sellers",
  },
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
  },
  {
    status: "ACTIVE",
    title: "Active",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
  },
  {
    status: "BANNED",
    title: "Banned",
  },
  {
    status: "CLOSED",
    title: "Closed",
  },
];

const SellersTable = () => {
  const dispatch = useAppDispatch();
  const { adminSellers } = useAppSelector((store) => store);
  const [accountStatus, setAccountStatus] = useState("ALL");

  useEffect(() => {
    dispatch(fetchAdminSellers({ status: accountStatus }));
  }, [dispatch, accountStatus]);

  const handleStatusChange = (event: any) => {
    setAccountStatus(event.target.value);
  };

  const handleUpdateStatus = (seller: Seller, newStatus: string) => {
    dispatch(updateSellerAccountStatus({ id: seller.id!, status: newStatus }));
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-5">
        <div className="w-full md:w-80">
          <FormControl fullWidth>
            <InputLabel id="seller-status-select-label">Account Status</InputLabel>
            <Select
              labelId="seller-status-select-label"
              id="seller-status-select"
              value={accountStatus}
              label="Account Status"
              onChange={handleStatusChange}
            >
              {statusOptions.map((item) => (
                <MenuItem key={item.status} value={item.status}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {adminSellers.loading && (
          <div className="flex items-center gap-2">
            <CircularProgress size={20} />
            <Typography>Loading sellers</Typography>
          </div>
        )}
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminSellers.sellers.map((seller) => (
              <StyledTableRow key={seller.id}>
                <StyledTableCell component="th" scope="row">
                  {seller.sellerName}
                </StyledTableCell>
                <StyledTableCell>{seller.email}</StyledTableCell>
                <StyledTableCell align="right">{seller.mobile}</StyledTableCell>
                <StyledTableCell align="right">{seller.GSTIN}</StyledTableCell>
                <StyledTableCell align="right">{seller.businessDetails?.businessName}</StyledTableCell>
                <StyledTableCell align="right">{seller.accountStatus}</StyledTableCell>
                <StyledTableCell align="right">
                  <FormControl fullWidth>
                    <Select
                      value={seller.accountStatus}
                      onChange={(event) =>
                        handleUpdateStatus(seller, event.target.value as string)
                      }
                      size="small"
                    >
                      {statusOptions
                        .filter((option) => option.status !== "ALL")
                        .map((option) => (
                          <MenuItem key={option.status} value={option.status}>
                            {option.title}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {adminSellers.sellers.length === 0 && !adminSellers.loading && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <Typography>No sellers found for this status.</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SellersTable;
