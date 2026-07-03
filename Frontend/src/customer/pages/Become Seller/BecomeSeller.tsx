import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">have account</h1>
          <Button onClick={handleShowPage} fullWidth sx={{ py: "11px" }} variant="outlined">
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>
      <section className="hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center">
        <div className="lg:w-[70%] px-5 space-y-10">
            <div className="space-y-2 font-bold text-center">
                <p className="text-2xl">Join the Marketplace Revolution </p>
                <p className="text-primary-color text-lg">Boost your sales today</p>
                <img src="https://images.unsplash.com/photo-1753354868616-544973e405c9?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
