import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const { category } = useParams();
  const { product } = useAppSelector((store) => store);

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
  };

  const handlePageChange = (value: any) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || [];
    const color = searchParam.get("color");
    const minDiscount = searchParam.get("discount")
      ? Number(searchParam.get("discount"))
      : undefined;
    const pageNumber = (page-1)

    const newFilter={
        category,
        color:color || "",
        minPrice:minPrice?Number(minPrice):undefined,
        maxPrice:maxPrice?Number(maxPrice):undefined,
        minDiscount,
        pageNumber,
        sort: sort || undefined,
    }

    dispatch(fetchAllProducts(newFilter));
  }, [category, searchParam, page, sort, dispatch]);

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {category ? category.replaceAll("-", " ") : "All products"}
        </h1>
      </div>
      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {product.products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </section>
          <div className="flex justify-center py-10">
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={product.totalPages}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
