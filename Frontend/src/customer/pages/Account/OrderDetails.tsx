import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentsIcon from '@mui/icons-material/Payments';

const OrderDetails = () => {
  const navigate = useNavigate();
  return (
    <Box className="space-y-5">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[100px]"
          src="https://m.media-amazon.com/images/I/810NUvErb8L._SX679_.jpg"
          alt=""
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">{"Virani Watches"}</h1>
          <p>Fossil Nate Chronograph Analog Black Dial Grey Band Men's Watch</p>
          <p>
            <strong>size : </strong>Free
          </p>
        </div>

        <div>
          <Button onClick={() => navigate(`/reviews/${5}/create`)}>
            Write Review
          </Button>
        </div>
      </section>

      <section className="border p-5">
        <OrderStepper orderStatus={"SHIPPED"} />
      </section>

      <div className="border p-5">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
            <div className="flex gap-5 font-medium">
                <p>{"Yashu"}</p>
                <Divider flexItem orientation="vertical" />
                <p>9812341091</p>
            </div>
            <p>
                Ambavadi Choke, banglore, Karnataka - 530068 
            </p>
        </div>
      </div>

      <div className="border space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5">
            <div className="space-y-1">
                <p className="font-bold">Total Item Price</p>
                <p>You saved <span className="text-green-500 font-medium text-xs">₹{800}.00</span> on this item</p>
            </div>
            <p className="font-medium">
                ₹{799}.00
            </p>
        </div>
        <div className="px-5">
            <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
                <PaymentsIcon />
                <p>Pay on delivery</p>
            </div>
        </div>

        <Divider />
        <div className="px-5 pb-5">
            <p className="text-xs"><strong>Sold by :</strong> {"Virani Watches"} </p>
        </div>

        <div className="p-10">
            <Button disabled={false} color="error" sx={{py:"0.7rem"}} className="" variant="outlined" fullWidth>
                {false ? "order canceled":"Cancel Order"}
            </Button>
        </div>
      </div>
    </Box>
  );
};

export default OrderDetails;
