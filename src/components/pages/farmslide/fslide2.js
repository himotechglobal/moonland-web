import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from "jquery";

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import lefticon from '../../images/left-icon.png';
import righticon from '../../images/right-icon.png';
import farmslide2 from '../../images/farmslide2.png';
import egg from '../../images/egg.png';
import stoke from '../../images/stoke.png';


class fslide2 extends Component{
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
                                        <a href="/fslide1"><img src={lefticon} /></a>
                                    </div>
                                    <div className="slide-imgs">
                                        <img src={farmslide2} />
                                    </div>
                                    <div className="slide-next">
                                        <a href="/fslide3"><img src={righticon} /></a>
                                    </div>
                                </div>
                                <div className="newpool-box">
                                   <div className="alienpool-wrp">
                                       <div className="alienpool">
                                           <div className="alienpool-img">
                                               <img src={egg} />
                                           </div>
                                           <div className="alienpool-content">
                                                <h3>EGG Pool</h3>
                                                <p>Uses EGG</p>
                                               
                                           </div>
                                       </div>
                                       <div className="alienbal">
                                            <div class="balance"><h3>0.0000</h3><p>Balance</p></div>
                                            <div class="balance"><h3>0.0000</h3><p>Deposited</p></div>
                                       </div>
                                       <div className="alientime">
                                           <div className="time-child1">
                                                <h3>594.1%</h3>
                                                <p>apy</p>
                                           </div>
                                           <div className="time-child1">
                                                <h3>594.1%</h3>
                                                <p>apy</p>
                                           </div>
                                           <div className="time-child1">
                                                <h3>594.1%</h3>
                                                <p>apy</p>
                                           </div>
                                       </div>
                                       <div className="alienbtns">
                                           <div className="pool-btns">
                                             <button>Buy Token</button>
                                             <button>add liquidity</button>
                                           </div>
                                       </div>
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
export default fslide2;