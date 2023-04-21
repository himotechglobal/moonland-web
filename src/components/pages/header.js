import React, { Component, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import { ToastContainer } from 'react-toastify';
import '../css/style.css'
import '../css/responsive.css'
// import '../css/navbar.css'
import $ from "jquery";
import {Link, Router} from 'react-router-dom';
import logo from '../images/logo.svg';
import burger from '../images/burger.png';
import btn from '../images/btn.png';
import { TOKEN } from '../../Config';
import TOKEN_ABI from '../../Config/TOKEN_ABI.json'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ConnectWalletBtn } from './ConnectWalletBtn';
 
const Header = ()  => {
 

  useEffect(() => {
   
    

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

    $(document).on('click', ".menu-list2 > li > a", function(el,i){
      $('body').removeClass(activeNav);
      activeNav = "";
      $('.mask').fadeOut();
  });

    
 
}
       
            
  })
  
  const accountStatus = useAccount()
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
 
		return(
      <div className="border-b">
        <div className="container">
          <div className="header-box">
            <div className="header-c1">
              <div className="logo-box">
                <a href="/">
                  <img src={logo} alt=''/>
                </a>
              </div>
            </div>
            <div className="header-c2">
              <div className="menulist-d-wrp">
                <ul className="menu-list-d">
                  <li><a href="/#banner-sec">Home</a></li>
                  <li><a href="/#about">Invest </a></li>
                  {/* <li><a href="/#team-sec">The Team </a></li> */}
                  {/* <li><a href="/#tokensec">Tokenomics</a></li>
                   */}
                 
                  {/* <li><a href="/#roadmap-sec">Roadmap</a></li> */}
                  <li><a href="/staking">Stake</a></li>
                  <li><a href="/choosemarketplace">Marketplace</a></li>
                  <li><a href="/game-center">Play</a></li>
                  {/* <li>
                  <a className="conbutton" href="/choose">Launch App</a>
                    </li> */}
                </ul>
              </div>
            <div className="burger-area">
               <a href="#" className="burgers toggle-slide-right"> <img src={burger} alt=''/></a>
              </div>
            </div>
            <div className="header-c3">
              <div className='btnBox'><ConnectWalletBtn/></div>
            </div>
            
          </div>
              
              <div className="menu slide-menu-right menu-list-wrp">
                  <button class="close-menu">Close &rarr;</button>
                <ul className="menu-list2">
                <li><a href="/#banner-sec">Home</a></li>
                  <li><a href="/#about">Invest </a></li>
                  {/* <li><a href="/#team-sec">The Team </a></li> */}
                  {/* <li><a href="/#tokensec">Tokenomics</a></li> */}
                  
                  {/* <li><a href="/#roadmap-sec">Roadmap</a></li> */}
                  <li><a href="/staking">Stake</a></li>
                  <li><a href="/choosemarketplace">Marketplace</a></li>
                  <li><a href="/game-center">Play</a></li>
                  {/* <li>
                  <a className="conbutton" href="/choose">Launch App</a>
                    </li> */}
                  <li><ConnectWalletBtn /></li>
                </ul>
              </div>
          
        </div>
      </div>
		);
 
}


export default Header;

