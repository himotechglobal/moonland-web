import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import F  from '../images/f.png';
import Ld  from '../images/ld.png';
import tw  from '../images/tw.png';
import tl  from '../images/tg.png';
import '../css/style.css'
class Footer extends Component {
  render() {
	 return (
		<div className="footer-sec">
			<div className="container">
				<div className="row">
				<div className="col-lg-6">
					<div className="footer-content">
						<p>Copyright © My Farm Pet 2021. All rights reserved</p>
					</div>
				</div>
				<div className="col-lg-6">
					<ul className="footer-list">
						{/* <li><a href="#"><img src={F} /></a></li>*/}
						<li><a href="https://twitter.com/Myfarmpet1" target="_blank"><img src={tw} /></a></li>
						
						<li><a href="https://t.me/myfarmpet1" target="_blank"><img src={tl} /></a></li> 
						
					</ul>
				</div>
				</div>
			</div>
		</div>
    );
  }
}

export default Footer;