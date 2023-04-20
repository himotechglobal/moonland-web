import React, { Component } from 'react';
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import choose1 from '../../images/choose1.png';
import choose2 from '../../images/choose2.png';
import choose3 from '../../images/choose3.png';
import pbtn from '../../images/pbtn.png';
import pbtn2 from '../../images/pbtn2.png';
import pbtn3 from '../../images/pbtn3.png';


class choose extends Component{
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
                        <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose-img">
                                        <img src={choose3} alt=''/>
                                    </div>
                                    <a href="https://farming.myfarmpet.io/"><img src={pbtn3} alt=''/></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose-img">
                                        <img src={choose1} alt=''/>
                                    </div>
                                    <a href="/pig-farming"><img src={pbtn} alt=''/></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="choose-content">
                                    <div className="choose-img">
                                        <img src={choose2} alt=''/>
                                    </div>
                                    <a href="/chicken-farming"><img src={pbtn2} alt=''/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="stokes">
						<img src={stoke} alt=''/>
				</div>
			    <Footer/>
			</div>
		);
	}

}
export default choose;