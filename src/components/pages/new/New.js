import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import { Data } from '../../pages/Data.js';
import stoke from '../../images/stoke.png';



export default function New() {

    return (

        <div>
            <Header />

            <section id="slide-sec">
                <div className="container">
                    <div className="head-slide">
                        <h3>Let Chicken Lay Eggs</h3>
                    </div>
                    <Slider
                        autoplay={true}
                        dots={true}
                        customPaging={(i) => {
                            return (
                                <div>
                                    <img src={Data[i]} className="indicate-img" alt="" />

                                </div>
                            )
                        }}
                        dotsClass="slick-dots custom-indicator"
                    >
                        {
                            Data.map(item => (
                                <div className="slides">
                                    <img src={item} alt="" />
                                </div>
                            ))
                        }


                    </Slider>
                </div>
            </section>
            <div className="stokes">
                <img src={stoke} alt="" />
            </div>
            <Footer />
        </div>
    );

}
