import React, { Component } from 'react';
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import lefticon from '../../images/left-icon.png';
import righticon from '../../images/right-icon.png';
import farmslide3 from '../../images/farmslide3.png';
import egg from '../../images/egg.png';
import stoke from '../../images/stoke.png';


class fslide3 extends Component{
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
                                        <a href="fslide2"><img src={lefticon} alt=''/></a>
                                    </div>
                                    <div className="slide-imgs">
                                        <img src={farmslide3} alt=''/>
                                    </div>
                                    <div className="slide-next">
                                        <a href="#"><img src={righticon} alt=''/></a>
                                    </div>
                                </div>
                                <div className="newpool-box">
                                   <div className="alienpool-wrp">
                                       <div className="alienpool">
                                           <div className="alienpool-img">
                                               <img src={egg} alt=''/>
                                           </div>
                                           <div className="alienpool-content">
                                                <h3>EGG Pool</h3>
                                                <p>Uses EGG</p>
                                               
                                           </div>
                                       </div>
                                       <div className="alienbal">
                                            <div class="balance"><h3>0.0000</h3><p>EGG earned</p></div>
                                       </div>
                                       <div className="alienbal">
                                       <div class="balance"><h3>0.0000</h3><p>Market Price</p></div>
                                       </div>
                                       <div className="alienbtns">
                                           <div className="pool-btns">
                                             <input type="text" />
                                             <button>Sell</button>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className="stokes">
						<img src={stoke} alt=''/>
					</div>
                </div>
                <Footer/>
            </div>
		);
	}

}
export default fslide3;