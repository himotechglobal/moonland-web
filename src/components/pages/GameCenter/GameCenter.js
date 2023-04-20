import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import Bannerimg from '../../images/Banner-img.png';
import game1 from '../../images/chicken-King.png';
import game2 from '../../images/shooting.png';
import game3 from '../../images/pig-fantasy-football.png';
// import slide2 from '../../images/slide2.png';
// import slide3 from '../../images/slide3.png';

class New extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  };
  
	}
    componentDidMount = () =>{
       
    }
	render(){
		return(
			
			<div className="bg-new10">
                <Header />

                {/* <section id="slide-sec12">
                    <div className="container">
                      <p>Play Games to Earn</p> 
                       {/* <div className="action-banner">
                           <img src={Bannerimg} />
                       </div> 
                    </div>
                </section> */}
                <section id="sale-wrp" >
                    <div className="container">
                        <h3 className='text-center mb-3'>Play Games to Earn</h3>
                    <div className="table-responsive2">
                      <ul className="sale-list">
                           <li>
                               <a href="/king-game">
                               <div className="sale-list-wrp">
                                   <div className="sale-list-child1">
                                       <img src={game1} alt=""/>
                                   </div>
                                   <div className="sale-list-child2">
                                       <ul className="left-salelist">
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist1">
                                                        <p>The Chicken King</p>
                                                    </div>
                                                    {/* <div className="left-salelist2">
                                                        <p>₹ 1,999</p>
                                                        <span>₹ 1,699</span>
                                                    </div> */}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist3">
                                                        <p>Compete against other farmers to battle the pest and strike the killing blow to be Crowned the Chicken king.</p>
                                                    </div>
                                                    {/* <div className="left-salelist4">
                                                        <p>-10</p>
                                                    </div> */}
                                                </div>
                                            </li>
                                       </ul>
                                   </div>
                               </div>
                               </a>
                           </li>
                           <li>
                           <a href="https://shooting.myfarmpet.io/">
                               <div className="sale-list-wrp">
                                   <div className="sale-list-child1">
                                       <img src={game2} alt=""/>
                                   </div>
                                   <div className="sale-list-child2">
                                       <ul className="left-salelist">
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist1">
                                                        <p>Shooting Game (BETA)</p>
                                                    </div>
                                                    {/* <div className="left-salelist2">
                                                        <p>₹ 1,999</p>
                                                        <span>₹ 1,699</span>
                                                    </div> */}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist3">
                                                        <p>The Beta version 1.0 is live for community feedback before Final Integration</p>
                                                    </div>
                                                    {/* <div className="left-salelist4">
                                                        <p>-10</p>
                                                    </div> */}
                                                </div>
                                            </li>
                                       </ul>
                                   </div>
                               </div>
                               </a>
                           </li>
                           <li>
                               <div className="sale-list-wrp">
                                   <div className="sale-list-child1">
                                       <img src={game3} alt=""/>
                                   </div>
                                   <div className="sale-list-child2">
                                       <ul className="left-salelist">
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist1">
                                                        <p>Football Fantasies</p>
                                                    </div>
                                                    {/* <div className="left-salelist2">
                                                        <p>₹ 1,999</p>
                                                        <span>₹ 1,699</span>
                                                    </div> */}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist3">
                                                    <p>Coming Soon</p>
                                                    </div>
                                                    {/* <div className="left-salelist4">
                                                        <p>-10</p>
                                                    </div> */}
                                                </div>
                                            </li>
                                       </ul>
                                   </div>
                               </div>
                           </li>
                       </ul>
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
    export default New;