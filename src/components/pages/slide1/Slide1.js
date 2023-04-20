import React, { Component } from 'react';
// import VideoPlayer from 'react-video-js-player';

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import lefticon from '../../images/left-icon.png';
import righticon from '../../images/right-icon.png';
import slide1 from '../../images/slide1.png';
import stoke from '../../images/stoke.png';
import marketbtn from '../../images/marketbtn.png';
import farmingbtn from '../../images/farmingbtn.png';
import eggbtn from '../../images/eggbtn.png';


class Slide1 extends Component{
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
                                    <h3>LET CHICKEN LAY EGGS</h3>
                                </div>
                                <div className="wrp-slide">
                                    {/* <div className="slide-prev">
                                        <a href="#"><img src={lefticon} /></a>
                                    </div> */}
                                    <div className="slide-imgs">
                                        <img src={slide1} />
                                    </div>
                                    <div className="slide-next">
                                        <a href="/slide2"><img src={righticon} /></a>
                                    </div>
                                </div>
                                <div className="bullet-list-wrp pd-b">
                                   <div className="market-btn">
                                       <a href="/marketplace"><img src={marketbtn} /></a>
                                       <a href="/slide3"><img src={farmingbtn} /></a>
                                       <a href="/slide2"><img src={eggbtn} /></a>
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
export default Slide1;