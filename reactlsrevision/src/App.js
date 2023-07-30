import "./App.css";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Products from "./Components/Products";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import { Route, Routes } from "react-router-dom";
import SingleProduct from "./Components/SingleProduct";
import AddProduct from "./Components/AddProduct";
import Ref from "./Components/Ref";
import RefTwo from "./Components/RefTwo";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/singleproduct/:id" element={<SingleProduct />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/ref" element={<Ref />} />
        <Route exact path="/ref2" element={<RefTwo />} />
      </Routes>
    </>
  );
}

export default App;
