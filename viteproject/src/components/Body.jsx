import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import Order from './Order';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";


const Body = () =>{

//variables
 let[productslist, setProductsList] = useState([]);
 const[selectedProduct, setSelectedProduct] = useState(null);
 const[cartItems, setCartItems] = useState([]);
 const loggedInUser = JSON.parse(localStorage.getItem("userData"));

 const handleOrderForm = (product) =>{
    setSelectedProduct(product);
 }

/*
1. Receive product object as parameter
2. Add product to cartItems state
3. Make API call to backend to save cart item in database (optional but recommended)
4. Show success toast on successful addition, error toast on failure
*/
 const handleAddToCart = async (product) =>{
    try{
        const apiData = {
            userId: loggedInUser.userId,
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            imageUrl: product.imageUrl
        }
            const apiResponse = await axios.post("http://localhost:8080/addToCart", apiData);
           if(apiResponse.data.success === true){
                setCartItems([...cartItems, product]);
               // alert("Product added to cart successfully!");
                toast.success("Product added to cart successfully!");
               console.log("Cart items:", cartItems);
           } 

    } catch (error){
        //alert("Error adding product to cart!");
        toast.error("Failed to add product to cart.");
        console.log("fullerrors:", error);
        console.log("Error:", error.message);
        //console.log("Error response:", error.response.data);
    }

    }


useEffect(() => {
    console.log("useEffect running!"); // ← Add this first!
    
    const getProductsList = async () => {
      console.log("function called!"); // ← Add this!
      try {
        var apiResponse = await axios.get("http://localhost:8080/getProducts");
        console.log("Data:", apiResponse.data);
        setProductsList(apiResponse.data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    getProductsList();
}, [])


    return(
        <div>

            <div><h1 className="text-center text-danger mt-5">Welcome to <span> 𝒫𝑒𝓇𝓊𝓅𝒶𝓁𝑒𝓂 𝐹💙❤️𝒹𝓈 🔥 </span></h1></div>

            <div className="row mt-5 mb-5">
                {
                    productslist.map((product) => {
                        return(
                            <div key={product.productId} className="card m-3" style={{width: "18rem"}}>
                                <img src={product.imageUrl} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body d-flex flex-column align-items-center">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">Price: ${product.price}</p>
                                    <button
                                            type="button"
                                            className="btn btn-warning"
                                            data-bs-toggle="modal"
                                            data-bs-target="#orderModal"
                                            onClick={ () => handleOrderForm(product)}
                                            >
                                            Order Now
                                            </button>
                                    <button type="button" className="btn btn-success mt-2" onClick={ () => handleAddToCart(product) } >Add to Cart </button>
                                    <button type="button" className="btn btn-success mt-2" onClick={() => alert("Review funcation aviliable soon!")}>Review</button>
                                  
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Order selectedProduct={selectedProduct}/>


        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          theme="dark"
          />

        </div>
    )

}
export default Body;


