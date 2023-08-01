import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [updateProdContainer, setUpdateProdContainer] = useState(false);

  const { state } = useContext(MyContext);
  const route = useNavigate();

  console.log(singleProduct);

  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("products"));

    if (getProduct) {
      let prodId = getProduct.find((item) => item.id === id);
      setSingleProduct(prodId);
    }
  }, []);

  const addToCart = () => {
    const regUser = JSON.parse(localStorage.getItem("registerUser"));

    if (state?.currentuser) {
      for (let i = 0; i < regUser.length; i++) {
        if (regUser[i].regEmail === state.currentuser.regEmail) {
          regUser[i].cart.push(singleProduct);
          localStorage.setItem("registerUser", JSON.stringify(regUser));
          toast.success("product added");
          route("/products");
        }
      }
    }
  };

  const updateProductDetails = () => {
    setUpdateProdContainer(true);
  };

  const closeUpdateProdContainer = () => {
    setUpdateProdContainer(false);
  };

  function changeProdDetails(e) {
    const name = e.target.name;
    const value = e.target.value;

    setSingleProduct({ ...singleProduct, [name]: value });
  }

  const changeProdDetailsCategory = (e) => {
    const value = e.target.value;
    setSingleProduct({ ...singleProduct, ["category"]: value });
  };

  function handleSubmitProductUpdate(e) {
    e.preventDefault();

    const getProduct = JSON.parse(localStorage.getItem("products"));

    for (let i = 0; i < getProduct.length; i++) {
      if (getProduct[i].id === id) {
        getProduct[i].image = singleProduct.image;
        getProduct[i].title = singleProduct.title;
        getProduct[i].price = singleProduct.price;
        getProduct[i].category = singleProduct.category;
        singleProduct.image = singleProduct.image;
        singleProduct.title = singleProduct.title;
        singleProduct.price = singleProduct.price;
        singleProduct.category = singleProduct.category;

        localStorage.setItem("products", JSON.stringify(getProduct));
        toast.success("updated success");
        setUpdateProdContainer(false);
      }
    }
  }

  return (
    <>
      <Navbar />

      {updateProdContainer ? (
        <div className="updateProductContainerInputs">
          <div
            className="closeUpdateProdContainer"
            onClick={closeUpdateProdContainer}
          >
            X
          </div>
          <form onSubmit={handleSubmitProductUpdate}>
            <div className="updateProdInputs">
              <input
                type="text"
                onChange={changeProdDetails}
                name="img"
                placeholder="update image url"
                value={singleProduct.image}
              />
              <input
                type="text"
                onChange={changeProdDetails}
                name="title"
                placeholder="update Title"
                value={singleProduct.title}
              />
              <input
                type="text"
                onChange={changeProdDetails}
                name="price"
                placeholder="update price"
                value={singleProduct.price}
              />
              <select
                value={singleProduct.category}
                onChange={changeProdDetailsCategory}
              >
                <option value="Other">Other</option>
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
                <option value="Kids">Kids</option>
                <option value="Fashion">Fashion</option>
                <option value="Accessories">Accessories</option>
              </select>
              <button>Update product</button>
            </div>
          </form>
        </div>
      ) : null}
      <div style={{ display: "flex", marginTop: "2%" }}>
        <div style={{ width: "60%" }}>
          <div style={{ width: "60%", margin: "auto" }}>
            <img width="100%" src={singleProduct.image} alt="" />
          </div>
        </div>

        <div style={{ width: "30%" }}>
          <h2>{singleProduct.title}</h2>
          <br />
          <p>{singleProduct.description}</p>
          <br />
          <h1>Rs.{singleProduct.price}</h1>
          <br />
          <h3>{singleProduct.category}</h3>
          <br />

          {state?.currentuser?.role === "buyer" ? (
            <button
              style={{
                width: "70%",
                height: "50px",
                backgroundColor: "orange",
                fontSize: "22px",
                fontWeight: "bolder",
              }}
              onClick={() => addToCart(singleProduct.id)}
            >
              add to cart
            </button>
          ) : null}

          {state?.currentuser && state?.currentuser?.role === "seller" && (
            <div>
              <button
                style={{
                  width: "70%",
                  height: "50px",
                  backgroundColor: "orangered",
                  fontSize: "22px",
                  fontWeight: "bolder",
                  color: "white",
                }}
                onClick={updateProductDetails}
              >
                Update Product
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
