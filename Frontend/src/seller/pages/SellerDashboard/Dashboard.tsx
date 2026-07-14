import React, { useEffect } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerReport } from "../../../State/seller/sellerSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { seller } = useAppSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    if (jwt) {
      dispatch(fetchSellerReport(jwt));
    }
  }, [dispatch]);

  const report = seller.report;

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h4" className="font-bold mb-2">
          Seller Dashboard
        </Typography>
        <Typography color="text.secondary">
          A quick overview of your sales and store health.
        </Typography>
      </div>
      {seller.loading ? (
        <Box className="flex justify-center mt-10">
          <CircularProgress />
        </Box>
      ) : !report ? (
        <Paper className="p-8">
          <Typography>No seller report available yet. Start listing products to see performance metrics.</Typography>
        </Paper>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Total Earnings", value: report.totalEarnings },
            { title: "Net Earnings", value: report.netEarnings },
            { title: "Total Sales", value: report.totalSales },
            { title: "Total Orders", value: report.totalOrders },
            { title: "Total Transactions", value: report.totalTransactions },
            { title: "Total Refunds", value: report.totalRefunds },
            { title: "Total Tax", value: report.totalTax },
            { title: "Cancelled Orders", value: report.cancelledOrders },
          ].map((card) => (
            <Paper key={card.title} className="p-5 shadow-sm border border-slate-200">
              <Typography variant="subtitle2" className="font-semibold text-slate-500">
                {card.title}
              </Typography>
              <Typography variant="h5" className="font-bold mt-2">
                {card.value}
              </Typography>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;