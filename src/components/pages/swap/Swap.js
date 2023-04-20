import React from 'react';
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import bnblogo from '../../images/bnblogo.png'
import downarrow from '../../images/downarrow.png'


const Swap = () =>{
    return(
        <div className="bg-swap">
            <Header />
            <div className="wrp-swap">
                <div className="container">
                    <div className="swap-box">
                        <div className="swap-content">
                            <h3>Exchange</h3>
                            <p>Trade tokens in an instant</p>
                        </div>
                        <div className="swap-inner-content">
                            <div className="max-bnb-box">
                               <p>Balance: 0.023456</p>
                               <div className="wrp-btn-content">
                                   <div className="bnb-input">
                                       <input placeholder='0.0' />
                                   </div>
                                   <div className="bnb-content">
                                       <p>Max <img src={bnblogo} alt=""/><span>BNB</span></p>
                                   </div>
                               </div>
                            </div>
                            <div className="down-arrow">
                             <img src={downarrow} alt=""/>
                            </div>
                            <div className="max-bnb-box">
                               <p>Balance: 0</p>
                               <div className="wrp-btn-content">
                                   <div className="bnb-input">
                                       <p>0.0</p>
                                   </div>
                                   <div className="bnb-content">
                                       <p>Max <img src={bnblogo} alt="" /><span>BNB</span></p>
                                   </div>
                               </div>
                            </div>
                            <div className="tolerance-wrp">
                                <div className="tolerance-c-r">
                                    <p>Slippage Tolerance</p>
                                </div>
                                <div className="tolerance-c-r">
                                    <p>6.5%</p>
                                </div>
                            </div>
                            <div className="enter-amout-box">
                                <input placeholder='Enter an amount' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Swap;