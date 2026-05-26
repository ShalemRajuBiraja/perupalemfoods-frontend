import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Order = ({ selectedProduct }) => {

  // ✅ Fix 2 — quantity state declared
  const [quantity, setQuantity] = useState(1);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const userId = loggedInUser?.userId;

  // ✅ Fix 1 — handleConfirmOrder is separate, return is outside
  const handleConfirmOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        productId: selectedProduct.productId,
        productName: selectedProduct.productName,
        price: selectedProduct.price,
        quantity: quantity  // ✅ Fix 4 — use quantity state
       
  };
  const handleDeleteCartItem = (productId) => {

    const updatedCart = cartItems.filter(
        (item) => item.productId !== productId
    );

    setCartItems(updatedCart);

    toast.success("Item removed from cart!");
  };    

      const orderResponse = await axios.post( "http://localhost:8080/placeOrder", orderData);

      console.log(orderResponse);
      alert("Order placed successfully!");
      toast.success("Order placed successfully!");
      window.location.reload();

    } catch (error) {
      console.error("Error placing order:", error);
      //alert("Failed to place order. Please try again.");
      toast.error("Failed to place order. Please try again.");
    }
  };  // ✅ handleConfirmOrder closes here

  // ✅ return is outside and after handleConfirmOrder
  return (
    <div
      className="modal fade"
      id="orderModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content order-modal">

          {/* Header */}
          <div className="modal-header border-0">
            <h3 className="modal-title fw-bold text-warning">
              🍔 Confirm Your Order
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body text-center">

            <img
              src={selectedProduct?.imageUrl}
              alt="Food"
              className="img-fluid rounded order-image"
            />

            <h4 className="mt-3 fw-bold">
              {selectedProduct?.productName}
            </h4>

            <p className="text-muted">
              Price per item: ₹{selectedProduct?.price}
            </p>

            <div className="mb-3">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                className="form-control w-50 mx-auto text-center"
                placeholder="Enter quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="total-box mt-3">
              <h5 className="fw-bold">
                Total Amount: ₹{selectedProduct?.price * quantity || 0}
              </h5>
            </div>

          </div>

          {/* Footer */}
         <div className="modal-footer border-0 justify-content-center gap-2">
            <button
              className="btn btn-outline-secondary px-4"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              className="btn btn-warning px-4 fw-bold"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>

        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
    />
    </div>
  );

};

export default Order;