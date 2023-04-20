import React, { Component } from 'react';
import 'aos/dist/aos.css';
 

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import choose3 from '../../images/choose3.png';
import nftmarketplace from '../../images/nftmarketplace.png'
import farmmarketplace from '../../images/farmmarketplace.png'
import nft from '../../images/nft.png'


class choosemarketplace extends Component{
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
                <section id="choose-sec">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose-img">
                                        <img src={choose3} alt=""/>
                                    </div>
                                    <a href="/marketplace"><img src={farmmarketplace} alt=""/></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose-img">
                                        <img src={nft} alt=""/>
                                    </div>
                                    <a href="/nft/marketplace"><img src={nftmarketplace} alt=""/></a>
                                </div>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                    </div>
                </section>
                <div className="stokes">
						<img src={stoke} alt=""/>
				</div>
			    <Footer/>
			</div>
		);
	}

}
export default choosemarketplace;