import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import {
  AddShoppingCart,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams } from "react-router";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { addItemToCart } from "../../../State/customer/CartSlice";
import { addProductToWishlist } from "../../../State/customer/wishlistSlice";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  const { product, auth } = useAppSelector((store) => store);

  useEffect(() => {
    // TS workaround: fetchProductById expects `productId: unknown` because createAsyncThunk argument type isn't inferred here.

    if (!productId) return;

    const id = Number(productId);
    if (Number.isNaN(id) || id <= 0) return;

    dispatch(fetchProductById(id as any));
  }, [productId, dispatch]);

  const handleActiveImage = (value: number) => {
    setActiveImage(value);
  };
  const requireLogin = () => {
    if (!auth.jwt && !localStorage.getItem("jwt")) {
      navigate("/login");
      return false;
    }
    return true;
  };
  const addToCart = () => {
    if (!product.product?.id || !requireLogin()) return;
    dispatch(addItemToCart({ jwt: auth.jwt || localStorage.getItem("jwt"), request: { productId: product.product.id, size: String(product.product.sizes || "Standard"), quantity } }));
  };
  const addToWishlist = () => {
    if (!product.product?.id || !requireLogin()) return;
    dispatch(addProductToWishlist({ productId: product.product.id }));
  };
  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item,index) => (
              <img
                className="lg:w-full w-[50px] rounded-md cursor-pointer"
                onClick={() => handleActiveImage(index)}
                src={item}
                alt=""
              />
            ))}
          </div>
          <div>
            <img
              className="w-full rounded-md"
              src={product.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-primary-color">{product.product?.seller?.businessDetails?.businessName || "Velvora Select"}</h1>
          <p className="text-gray-500 font-semibold">{product.product?.title}</p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider />
            <span>{product.product?.numRatings} Ratings</span>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">₹ {product.product?.sellingPrice}</span>
              <span className="line-through text-gray-400">₹ {product.product?.mrpPrice}</span>
              <span className="text-primary-color font-semibold">{product.product?.discountPercent}%</span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>
          </div>
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>

            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>

            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>

            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-center">
              <Button
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button
              onClick={addToCart}
              fullWidth
              startIcon={<AddShoppingCart />}
              variant="contained"
              sx={{ py: "1rem" }}
            >
              Add To Bag
            </Button>

            <Button
              onClick={addToWishlist}
              fullWidth
              startIcon={<FavoriteBorderIcon />}
              variant="outlined"
              sx={{ py: "1rem" }}
            >
              Wishlist
            </Button>
          </div>

          <div className="mt-5">
            <p>
              {product.product?.description}
            </p>
          </div>

          <div className="mt-12 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Product</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
