import React, { Component } from 'react';
import 'aos/dist/aos.css';


import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import choose3 from '../../images/choose3.png';
import nftmarketplace from '../../images/nftmarketplace.png'
import farmmarketplace from '../../images/farmmarketplace.png'
import nft from '../../images/nft.png'
import choosemplaceleft from '../../images/choosemplaceleft.svg'
import choosemplaceright from '../../images/choosemplaceright.svg'
import arrow from '../../images/round_arrow.svg';

class choosemarketplace extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount = () => {


    }

    render() {
        return (
            <div>
                <Header />
                <section id="choose-sec">
                    <div className="container">
                       <div className='choosemplace___main__wrap'>
                       <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4">

                                <div className='choosemplace___left'>
                                    <div className='choosemplace___left__cont'>
                                    <h1>MOON
                                        <br />
                                        MARKETPLACE</h1>
                                    <p>Turn as you need</p>
                                    </div>
                                    <div>
                                    <a href="/marketplace" className="bg___BTN5"    >Participate</a>
                                    </div>
                                </div>

                               


                            </div>
                            <div className="col-lg-4">
                                {/* <div className="choose-content">
                                    <div className="choose-img">
                                        <img src={nft} alt="" />
                                    </div>
                                    <a href="/nft/marketplace"><img src={nftmarketplace} alt="" /></a>
                                </div> */}

                                <div className='choosemplace___right'>
                                    <div className='choosemplace___left__cont'>
                                    <h1>NFT
                                        <br />
                                        MARKETPLACE</h1>
                                    <p className='cmplace'>Protect from sun</p>
                                    </div>
                                    <div>
                                    <a href="/nft/marketplace" className="bg___BTN5"    >Participate</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                       </div>
                        <div className='btm___arrow3'>
                    <img src={arrow} alt='arrow image here' />
                </div>
                    </div>
                </section>
                {/* <div className="stokes">
						<img src={stoke} alt=""/>
				</div>
			    <Footer/> */}
            </div>
        );
    }

}
export default choosemarketplace;