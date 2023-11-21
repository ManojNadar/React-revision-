import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";
// import Practice from "./practice";

const Home = () => {
  const [userHome, setuserHome] = useState("rocky");
  const { state } = useContext(MyContext);

  useEffect(() => {
    if (state) {
      setuserHome(state?.currentuser);
    }
  }, []);

  const [jsonData, setJsonData] = useState("");
  const [keys, setKeys] = useState([]);

  // console.log(keys);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const parsedData = JSON.parse(jsonData);

      // console.log(parsedData);
      setKeys(Object.keys(parsedData));
    } catch (error) {
      console.error("Invalid JSON data", error);
    }
  };

  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  return (
    <>
      <Navbar />

      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            name="jsonData"
            value={jsonData}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        {keys.length > 0 && (
          <ul>
            {keys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        )}
      </div>

      {/* <div className="homeContainer">
        {state?.currentuser?.role === "seller" ? (
          <h1>Seller Logged in</h1>
        ) : state?.currentuser?.role === "buyer" ? (
          <h1>Buyer Logged in</h1>
        ) : (
          <h2>Home</h2>
        )}
      </div>

      <div style={{ width: "90%", margin: " 2% auto" }}>
        <img
          style={{ width: "100%", height: "400px" }}
          src="https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg"
          alt=""
        />
      </div> */}
      {/* <Practice userHome={userHome} /> */}
    </>
  );
};

export default Home;
