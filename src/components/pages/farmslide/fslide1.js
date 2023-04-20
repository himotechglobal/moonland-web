import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from "jquery";

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import lefticon from '../../images/left-icon.png';
import righticon from '../../images/right-icon.png';
import farmslide1 from '../../images/farmslide1.png';
import stoke from '../../images/stoke.png';
import marketbtn from '../../images/marketbtn.png';


class fslide1 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  };
  
	}
	
	componentDidMount = () =>{

				
	  }

	render(){
		return(
			<div>
             <Header />
                <div className="slide-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="slide-heads">
                                    <h3>Buy Farm and Pig</h3>
                                </div>
                                <div className="wrp-slide">
                                    <div className="slide-prev">
                                        <a href="#"><img src={lefticon} /></a>
                                    </div>
                                    <div className="slide-imgs">
                                        <img src={farmslide1} />
                                    </div>
                                    <div className="slide-next">
                                        <a href="/fslide2"><img src={righticon} /></a>
                                    </div>
                                </div>
                                <div className="bullet-list-wrp">
                                   <div className="market-btn">
                                       <a href="/marketplace"><img src={marketbtn} /></a>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stokes">
						<img src={stoke} />
					</div>
                </div>
                <Footer/>
            </div>
		);
	}

}
export default fslide1;