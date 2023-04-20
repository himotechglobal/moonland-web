import React, { Component } from 'react';
import Dashboardheader from '../../pages/Dashboardheader.js';
import Coin from '../../images/Coin.png';
import whiteicon from '../../images/whiteicon.png';
import arrow from '../../images/arrow.png';
import d1 from '../../images/d1.png';
import d2 from '../../images/d2.png';
import d3 from '../../images/d3.png';
import d4 from '../../images/d4.png';
import bid from '../../images/bid.png';

import dashboard from '../../images/dashboard.png';

export default function Dashboard() {

		return(
			
			<div className="dbh">
                <Dashboardheader />
                <section id="dashboard-sec">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="left-side-bar">
                                    <div className="logo-dashboard">
                                        <a href="/"><img src={bid} /></a>
                                    </div>

                                    <div className="sidebar-list-wrp">
                                        <ul className="sidebar-list">
                                            <li><a href="/dashboard"><span><img src={dashboard} /></span>Dashboard</a></li>
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="col-lg-10">
                                <div className="dashboard-content">
                                    <h3>BTD Earnings Manager</h3>
                                   
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="btd-box">
                                                <img src={d1} />
                                                <p>Your BTD Holdings</p>
                                                <h3><span>0</span> BTD</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="btd-box">
                                                <img src={d2} />
                                                <p>Your BTD Holdings</p>
                                                <h3><span>0</span> BTD</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="btd-box">
                                                <img src={d3} />
                                                <p>Your BTD Holdings</p>
                                                <h3><span>0</span> BTD</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="btd-box">
                                                <img src={d4} />
                                                <p>Your BTD Holdings</p>
                                                <h3><span>0</span> BTD</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="claim-btn">
                                        <button>Buy BTD</button>
                                        <button className="claimmrt">Claim BNB</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
			</div>
		);

}
