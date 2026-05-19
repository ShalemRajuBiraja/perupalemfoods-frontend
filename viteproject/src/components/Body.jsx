import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import Order from './Order';


const Body = () =>{

//variables
 let[productslist, setProductsList] = useState([]);
 const[selectedProduct, setSelectedProduct] = useState(null);



 const handleOrderForm = (product) =>{
    setSelectedProduct(product);
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
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Order selectedProduct={selectedProduct}/>
        </div>
    )
}
export default Body;


