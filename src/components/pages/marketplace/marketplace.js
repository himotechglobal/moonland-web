import React, { Component } from 'react';

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import chicken1 from '../../images/chicken1.png';
import c2 from '../../images/c2.png';
import c3 from '../../images/c3.png';
import c4 from '../../images/c4.png';
import c5 from '../../images/c5.png';
import c6 from '../../images/c6.png';
import c7 from '../../images/c7.png';
import backbtn from '../../images/backbtn.png';


class marketplace extends Component{
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
                <div className="bgmarketplace">
                   <section id="marketplace-sec">
                       <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="marketplace-content-wrp">
                                        <div className="marketplace-img">
                                            <div className="row desktop-marketplace">
                                                <div className="col-lg-6">
                                                    <ul className="market-list">
                                                        <li>
                                                            <a href="/buy/chicken">
                                                                <div className="wrp-chicken-l mr-mrt1">
                                                                    <div className="market-p">
                                                                        <p>Chickens <br></br>
                                                                            <span>$10</span></p>
                                                                    </div>
                                                                    <div className="market-l-img">
                                                                        <img src={chicken1} alt=""/>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/buy/pigfood">
                                                                <div className="wrp-chicken-l mr-mrt2">
                                                                    <div className="market-p">
                                                                        <p>Pig Food <br></br>
                                                                            <span>$5</span></p>
                                                                    </div>
                                                                    <div className="market-l-img">
                                                                        <img src={c2} alt=""/>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/buy/piglet">
                                                                <div className="wrp-chicken-l mr-mrt3">
                                                                    <div className="market-p">
                                                                        <p>Piglet <br></br>
                                                                            <span>$10</span></p>
                                                                    </div>
                                                                    <div className="market-l-img">
                                                                        <img src={c3} alt=""/>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="market-list2">
                                                    <li>
                                                            <a href="/buy/chickenegg">
                                                                <div className="wrp-chicken-l2 mr-mrt4">
                                                                    <div className="market-l-img">
                                                                        <img src={c4} alt=""/>
                                                                    </div>
                                                                    <div className="market-p2">
                                                                        <p>Eggs <br></br>
                                                                            <span>$0.12</span></p>
                                                                    </div> 
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/buy/chickenfood">
                                                                <div className="wrp-chicken-l2 mr-mrt5">
                                                                    <div className="market-l-img">
                                                                        <img src={c5} alt=""/>
                                                                    </div>
                                                                    <div className="market-p2">
                                                                        <p>Chicken Food <br></br>
                                                                            <span>$1</span></p>
                                                                    </div> 
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/buy/boar">
                                                                <div className="wrp-chicken-l2 mr-mrt6">
                                                                    <div className="market-l-img">
                                                                        <img src={c6} alt=""/>
                                                                    </div>
                                                                    <div className="market-p2">
                                                                        <p>Boar <br></br>
                                                                            <span>$100</span></p>
                                                                    </div> 
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                            <div className="row desktop-marketplace">
                                                <div className="col-lg-12">
                                                    <ul className="market-list3">
                                                        <li>
                                                            <a href="/buy/sow">
                                                                <div className="wrp-chicken-l2 wrp-chicken-l3">
                                                                    <div className="market-l-img">
                                                                        <img src={c7} alt=""/>
                                                                    </div>
                                                                    <div className="market-p2">
                                                                        <p>Sow <br></br>
                                                                            <span>$100</span></p>
                                                                    </div> 
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row mobile-marketplace">
                                                <div className="col-lg-12">
                                                    <div className="chicken-box-m">
                                                        <a href="/buy/chicken">
                                                        <img src={chicken1} alt=""/>
                                                        <p>Chickens <br></br><span>$10</span></p>
                                                        </a>
                                                    </div>
                                                    <div className="chicken-box-m">
                                                    <a href="/buy/chicken">
                                                        <img src={c2} alt=""/>
                                                        <p>Pig Food <br></br><span>$5</span></p>
                                                        </a>
                                                    </div>
                                                    <div className="chicken-box-m">
                                                    <a href="/buy/chicken">
                                                        <img src={c3} alt=""/>
                                                        <p>Piglet <br></br><span>$10</span></p>
                                                        </a>
                                                    </div>
                                                    <div className="chicken-box-m">
                                                    <a href="/buy/chicken">
                                                        <img src={c4} alt=""/>
                                                        <p>Eggs <br></br><span>$0.12</span></p>
                                                        </a>
                                                    </div>
                                                    <div className="chicken-box-m">
                                                    <a href="/buy/chicken">
                                                        <img src={c5} alt=""/>
                                                        <p>Chicken Food <br></br><span>$1</span></p>
                                                        </a>
                                                    </div>
                                                    <div className="chicken-box-m">
                                                    <a href="/buy/chicken">
                                                        <img src={c6} alt=""/>
                                                        <p>Boar <br></br><span>$100</span></p>
                                                        </a>
                                                    </div>
                                                    <div className="chicken-box-m">
                                                    <a href="/buy/chicken">
                                                        <img src={c7} alt=""/>
                                                        <p>Sow <br></br><span>$100</span></p>
                                                        </a>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="market-backbtn">
                                            <a href="/"><img src={backbtn} alt=""/></a>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                       </div>
                   </section>
                </div>
                    <div className="stokes">
                        <img src={stoke} alt=""/>
                    </div>
                <Footer/>
            </div>
		);
	}

}
export default marketplace;