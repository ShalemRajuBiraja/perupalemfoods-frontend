import React from 'react';
import '../index.css';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Body from '../components/Body.jsx';


const Home = () => {

  return (
    <div className="containter">
      
        <div className="row">
          <div className="col-12">
            <Navbar />
          </div>
        </div>

        <div className="row"> 
          <div className="col-12">
            <Body />
          </div>
        </div>

        <div className="row"> 
            <div className="col-12">
                <Footer/>
            </div>
        </div>


    </div>
  )
};

export default Home;
