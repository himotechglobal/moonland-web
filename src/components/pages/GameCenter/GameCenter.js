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
import arrow from '../../images/round_arrow.svg';
import gameimgone from '../../images/gameimgone.svg'
import { Link } from 'react-router-dom';
// import slide2 from '../../images/slide2.png';
// import slide3 from '../../images/slide3.png';

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount = () => {

    }
    render() {
        return (

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
                        {/* <h3 className='text-center mb-3'>Play Games to Earn</h3> */}
                        <div className="table-responsive2">
                            <ul className="sale-list">
                                <li>

                                    <div className='marketplace-box-wrap6'>
                                        <div className='bg__playgame'>
                                            <div>
                                                <div className='game__img'>
                                                    <img src={gameimgone} alt="" />
                                                    <div className='game__cont'>
                                                    <h3>Moon <br />Emperor</h3>
                                                    <p>Compete and win</p>
                                                </div>
                                                </div>

                                               
                                            </div>
                                            <div className='game_btn__bg'>
                                                <a className='bg___BTN3' href="/king-game">Play Game</a>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                                {/* <li>
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
                                                    
                                                </div>
                                            </li>
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist3">
                                                        <p>The Beta version 1.0 is live for community feedback before Final Integration</p>
                                                    </div>
                                                     
                                                </div>
                                            </li>
                                       </ul>
                                   </div>
                               </div>
                               </a>
                           </li> */}
                                {/* <li>
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
                                              
                                                </div>
                                            </li>
                                            <li>
                                                <div className="wrp-l-salelist">
                                                    <div className="left-salelist3">
                                                    <p>Coming Soon</p>
                                                    </div>
                                                     
                                                </div>
                                            </li>
                                       </ul>
                                   </div>
                               </div>
                           </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className='btm___arrow'>
                        <Link to='/'><img src={arrow} alt='arrow image here' /></Link>
                    </div>
                </section>
                {/* <div className="stokes">
						<img src={stoke} alt=""/>
					</div> */}
                {/* <Footer/> */}

            </div>
        );
    }

}
export default New;