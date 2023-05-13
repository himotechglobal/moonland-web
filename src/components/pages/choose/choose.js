import React, { Component } from 'react';
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import choose1 from '../../images/choose1.svg';
import choose2 from '../../images/choose2.svg';
import choose3 from '../../images/choose3.png';
import pbtn from '../../images/pbtn.png';
import pbtn2 from '../../images/pbtn2.png';
import pbtn3 from '../../images/pbtn3.png';
import arrow from '../../images/round_arrow.svg';
import { Link } from 'react-router-dom';

class choose extends Component {
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
                        <div className="row">
                            {/* <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose-img">
                                        <img src={choose3} alt=''/>
                                    </div>
                                    <a href="https://farming.myfarmpet.io/"><img src={pbtn3} alt=''/></a>
                                </div>
                            </div> */}
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose___Box">
                                        <div className='chooseBox____cont'><h1>Solar <br />Harvesting</h1>
                                            <p>Assemble Solar Harvester on your land to start earning Energy Packets</p></div>
                                        <img className='c___img' src={choose1} alt='' />
                                    </div>
                                    <div><Link to="/solar-harvesting" className='bg___BTN'>Start Harvesting</Link></div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose___Box">
                                        <div className='chooseBox____cont'><h1>Moonscape <br />
                                            {/* To Trade */}
                                           
                                            </h1>
                                            <p>Build Moonpods on your land, rent them, earn Eule</p></div>
                                            <div style={{height:"70px"}}/>
                                        <img className='c___img2' src={choose2} alt='' />
                                    </div>
                                    <div><Link to="/build-to-trade" className='bg___BTN'>Start Building</Link></div>
                                </div>


                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                    </div>
                    <div className='btm___arrow'>
                        <Link onClick={()=>window.history.back()}><img src={arrow} alt='arrow image here' /></Link>
                    </div>
                </section>
                 
                {/* <div className="stokes">
						<img src={stoke} alt=''/>
				</div> */}
                {/* <Footer/> */}
            </div>
        );
    }

}
export default choose;