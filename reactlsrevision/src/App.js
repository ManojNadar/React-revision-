import "./App.css";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
