import "./App.css";
import { ThemeProvider } from "@mui/material";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./Theme/customTheme";
import Home from "./customer/pages/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Page Details/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BecomeSeller from "./customer/pages/Become Seller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/Pages/Dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "./State/Store";
import { useEffect, useMemo } from "react";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";
import PaymentSuccess from "./customer/pages/Payment/PaymentSuccess";
import Wishlist from "./customer/pages/Wishlist/Wishlist";
import { fetchHomePageData } from "./State/customer/CustomerSlice";
import ChatWidget from "./component/ChatWidget";

const parseJwtPayload = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

const getTokenRole = (token: string | null) => {
  if (!token) return null;
  const claims = parseJwtPayload(token);
  if (!claims) return null;

  const authorities = claims.authorities || claims.role || claims.roles;
  if (!authorities) return null;

  const values = Array.isArray(authorities)
    ? authorities
    : String(authorities).split(",");

  if (values.includes("ROLE_ADMIN")) return "ROLE_ADMIN";
  if (values.includes("ROLE_SELLER")) return "ROLE_SELLER";
  if (values.includes("ROLE_CUSTOMER")) return "ROLE_CUSTOMER";
  return null;
};

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const location = useLocation();
  const jwt = auth.jwt || localStorage.getItem("jwt");
  const tokenRole = useMemo(() => getTokenRole(jwt), [jwt]);

  useEffect(() => {
    if (jwt && tokenRole === "ROLE_SELLER") {
      dispatch(fetchSellerProfile(jwt));
    }
    dispatch(fetchHomePageData());
  }, [dispatch, jwt, tokenRole]);

  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchUserProfile({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    if (!jwt || !tokenRole) return;

    if (tokenRole === "ROLE_ADMIN" && !location.pathname.startsWith("/admin")) {
      navigate("/admin", { replace: true });
      return;
    }

    if (tokenRole === "ROLE_SELLER" && !location.pathname.startsWith("/seller")) {
      navigate("/seller", { replace: true });
      return;
    }

    if (
      tokenRole === "ROLE_CUSTOMER" &&
      (location.pathname.startsWith("/admin") ||
        location.pathname.startsWith("/seller") ||
        location.pathname === "/login")
    ) {
      navigate("/", { replace: true });
    }
  }, [tokenRole, location.pathname, navigate, jwt]);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller/*" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;
