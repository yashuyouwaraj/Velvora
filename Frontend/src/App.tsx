
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
import { Route, Routes } from "react-router-dom";
import BecomeSeller from "./customer/pages/Become Seller/BecomeSeller";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        {/* <Home /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <Review /> */}
        {/* <Cart /> */}
        {/* <Checkout /> */}
        {/* <Account /> */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products/:category" element={<Product />}/>
          <Route path="/reviews/:productId" element={<Review />}/>
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/account/*" element={<Account />}/>
          <Route path="/become-seller/*" element={<BecomeSeller />}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
