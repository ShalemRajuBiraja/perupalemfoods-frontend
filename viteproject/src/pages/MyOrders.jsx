import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../index.css';

const MyOrders = () =>{


return(

        <div className='app-container'>
        <Navbar />
               
            <div className='row'>
                <div className='col-12'>
                    <h1 className='text-center mt-5'>My Orders</h1>
                        <p className='text-center'>No orders yet</p>
                </div>

            </div>
            
        <Footer />
        </div>
    )



}
export default MyOrders;