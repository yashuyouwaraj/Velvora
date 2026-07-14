import React, { useEffect } from "react";
import ElectricCategory from "./Home/ElectricCategory/ElectricCategory";
import CategoryGrid from "./Home/CategoryGrid/CategoryGrid";
import Deal from "./Home/Deal/Deal";
import ShopByCategory from "./Home/ShopByCategory/ShopByCategory";
import { Storefront } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { fetchAllProducts } from "../../State/customer/ProductSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.product);
  const { customer } = useAppSelector((state) => state);
  const gridCategories = customer.homePageData?.grid ?? [];

  useEffect(() => {
    dispatch(fetchAllProducts({ pageNumber: 0 }));
  }, [dispatch]);

  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative pb-20">
        <ElectricCategory products={products} />
        <CategoryGrid categories={gridCategories} />

        <section className="pt-20">
          <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center">
            TODAY'S DEAL
          </h1>
          <Deal products={products} />
        </section>

        <section className="pt-20">
          <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">
            SHOP BY CATEGORY
          </h1>
          <ShopByCategory products={products} />
        </section>

        <section className="mt-20 lg:px-20 relative h-[200px] lg:h-[450px] object-cover ">
          <img
            className="w-full h-full object-cover lg:object-top"
            src="https://img.magnific.com/free-photo/group-businesspeople-with-thumbs-up-gesture-modern-office-multi-ethnic-people-working-together-teamwork-concept_1139-965.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
          />
          <div className="absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3 ">
            <h1 >Sell your Product</h1>
            <p className=" text-lg md:text-2xl">
              With <span className="logo">Velvora</span>
            </p>

            <div>
              <Button onClick={() => navigate("/become-seller")} startIcon={<Storefront/> } variant='contained' size='large'>
                Become Seller
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
