import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import { ToastContainer } from 'react-toastify';
import '../css/style.css'
import '../css/responsive.css'
// import '../css/navbar.css'
import $ from "jquery";
import {Link, Router} from 'react-router-dom';
import logo from '../images/logo.png';
import burger from '../images/burger.png';


class Dashboardheader extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount = () =>{
   
    

    changePickupStoreMenu();

function changePickupStoreMenu(){
 
    var body = $('body'),
        mask = $('<div class="mask"></div>'),
        toggleSlideRight = document.querySelector( ".toggle-slide-right" ),
        slideMenuRight = document.querySelector( ".slide-menu-right" ),
        activeNav = '';
    ;
    $('body').append(mask);
 
    /* slide menu right */
    toggleSlideRight.addEventListener( "click", function(){
        $('body').addClass("smr-open");
        $('.mask').fadeIn();
        activeNav = "smr-open";
    } );
 
    /* hide active menu if close menu button is clicked */
    $(document).on('click', ".close-menu", function(el,i){
        $('body').removeClass(activeNav);
        activeNav = "";
        $('.mask').fadeOut();
    });
 
}
       
            
  }

	render(){
		return(
      <div className="border-b dashboard-header">
        <div className="container">
          <div className="header-box">
            <div className="header-c1">
              <div className="logo-box">
                <a href="/">
                  <img src={logo} />
                </a>
              </div>
            </div>
            <div className="header-c2">
              <div className="menulist-d-wrp">
                
              </div>
            <div className="burger-area">
               <a href="#" className="burgers toggle-slide-right"> <img src={burger} /></a>
              </div>
            </div>
            
          </div>
              
              <div className="menu slide-menu-right menu-list-wrp">
                  <button class="close-menu">Close &rarr;</button>
                <ul className="menu-list2">
                  <li><a href="/">HOME</a></li>
                  <li><a href="/dashboard">Dashboard </a></li>
                </ul>
              </div>
          
        </div>
      </div>
		);
	}
}


export default Dashboardheader;

