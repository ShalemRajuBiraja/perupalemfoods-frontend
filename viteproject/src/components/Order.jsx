import React from "react";
import { useState, useEffect } from "react";

const Order = ({selectedProduct}) => {

  return (

    <div
      className="modal fade"
      id="orderModal"
      tabIndex="-1"
      aria-hidden="true"
    >

      <div className="modal-dialog modal-dialog-centered modal-lg">

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
          <div className="modal-body">

            <div className="row">

              {/* Left Side Product Image */}
              <div className="col-md-5 text-center">

                <img
                  src={selectedProduct?.imageUrl}
                  alt="Food"
                  className="img-fluid rounded order-image"
                />

                <h4 className="mt-3 fw-bold">
               {selectedProduct?.productName}
                </h4>

                <p className="text-muted">
                  Price: ₹{selectedProduct?.price}
                </p>

              </div>

              {/* Right Side Form */}
              <div className="col-md-7">

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Customer Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Delivery Address
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter your address"
                  ></textarea>

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Quantity
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter quantity"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer border-0">

            <button
              className="btn btn-outline-secondary px-4"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button className="btn btn-warning px-4 fw-bold">
              Confirm Order
            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Order;