import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../index.css';

const ViewCart = () => {

    const loggedInUserId = JSON.parse(localStorage.getItem("userData"))?.userId;
    const[cartItems, setCartItems] = useState([]);

useEffect(() => {

    const getCartItemsList = async () => {
        try{
            const cartApiResponse = await axios.get(`http://localhost:8080/getCartItems/${loggedInUserId}`);
                if(cartApiResponse.data.success === true){
                    setCartItems(cartApiResponse.data.data);
                    console.log("Cart items fetched successfully:", cartApiResponse.data.data);
                    console.log("Full API Response:", cartApiResponse.data);
                }
        }catch (error) {

            console.error("Failed to fetch cart items:", error);

            if (!error.response) {

                toast.error("Server is not responding");

            } else if (error.response.status === 404) {

                toast.error("Cart items not found");

            } else if (error.response.status === 500) {

                toast.error("Internal server error");

            } else {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch cart items"
                );
            }
        }
    };

    getCartItemsList();

}, []);

//function to handle delete cart item
const handleDeleteItem = async (cartId) => {

    try {

        await axios.delete(
            `http://localhost:8080/deleteCartItem/${cartId}`
        );

        // Remove item from frontend state
        const updatedCart = cartItems.filter(
            (item) => item.cartId !== cartId
        );

        setCartItems(updatedCart);

        toast.success("Item removed successfully!");

    } catch (error) {

        console.log(error);

        toast.error("Failed to remove item");
    }
};

  return (

    <div className="app-container">

        <Navbar />

        <div className="main-content">

            <div className="container">

                <div className="row">

                    <div className="col-12">

                        <h1 className="text-center mt-4">
                            🆈🅾🆄🆁 🅲🅰🆁🆃
                        </h1>

                        {/* Empty Cart Message */}
                        {cartItems.length === 0 ? (

                            <div className="text-center mt-5">
                                <h4 className="text-muted">Your cart is empty 🛒</h4>
                            </div>

                        ) : (

                            /* Cart Items List */
                            cartItems.map((item) => (
                                    
                                <div key={item.cartId} className="card mb-3 p-3 shadow-sm">

                                    <div className="d-flex align-items-center gap-3">
                                    {console.log(item)}
                                        {/* Product Image */}
                                        <img
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
                                        />

                                        {/* Product Details */}
                                       <div className="flex-grow-1">

                                            <h5 className="fw-bold mb-1">
                                                {item.productName}
                                            </h5>

                                            <p className="text-muted mb-1">
                                                Price: ₹{item.productPrice}
                                            </p>

                                            <p className="text-muted mb-1">
                                                Quantity: {item.quantity}
                                            </p>

                                    <div className="d-flex justify-content-between align-items-center mt-3">

                                        <p className="fw-bold text-warning mb-0">
                                            Subtotal: ₹{
                                                (Number(item.productPrice) || 0) *
                                                (Number(item.quantity) || 0)
                                            }
                                        </p>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteItem(item.cartId)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </div>

        <Footer />

    </div>

);
};

export default ViewCart;