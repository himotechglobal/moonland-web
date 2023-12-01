import React, { Component, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import { ToastContainer } from 'react-toastify';
import '../css/style.css'
import '../css/responsive.css'
// import '../css/navbar.css'
import $ from "jquery";
import { Link, NavLink, Router } from 'react-router-dom';
import logo from '../images/logo.svg';
import burger from '../images/burger.png';
import btn from '../images/btn.png';
import { TOKEN } from '../../Config';
import teleg from '../images/teleg.svg'
import twit from '../images/twit.svg'
import disc from '../images/disc.svg'



import closedicon from '../images/closedicon.svg'
import TOKEN_ABI from '../../Config/TOKEN_ABI.json'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ConnectWalletBtn } from './ConnectWalletBtn';

const Header = () => {


  useEffect(() => {



    changePickupStoreMenu();

    function changePickupStoreMenu() {

      var body = $('body'),
        mask = $('<div class="mask"></div>'),
        toggleSlideRight = document.querySelector(".toggle-slide-right"),
        slideMenuRight = document.querySelector(".slide-menu-right"),
        activeNav = '';
      ;
      $('body').append(mask);

      /* slide menu right */
      toggleSlideRight.addEventListener("click", function () {
        $('body').addClass("smr-open");
        $('.mask').fadeIn();
        activeNav = "smr-open";
      });

      /* hide active menu if close menu button is clicked */
      $(document).on('click', ".close-menu", function (el, i) {
        $('body').removeClass(activeNav);
        activeNav = "";
        $('.mask').fadeOut();
      });

      $(document).on('click', ".menu-list2 > li > a", function (el, i) {
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



  const navLinkStyles = ({ isActive }) => {
    return {
      color: "#fff",
      backgroundColor: isActive ? '#790093' : "",
      fontFamily: 'Panton-Trial',
      transition: '0.5s',
      fontSize: '13px',
      fontWeight: 600,
      textTransform: 'uppercase',
      textAlign: 'center',
      padding: '10px 20px',
      borderRadius: '30px',
    }
  }

  return (
    <div className="border-b">
      <div className="container">
        <div className="header-box">
          <div className="header-c1">
            <div className="logo-box">
              <a href="/">
                <img src={logo} alt='' />
              </a>
            </div>
          </div>
          <div className="header-c2">
            <div className="menulist-d-wrp">
              <ul className="menu-list-d">
                <li><NavLink style={navLinkStyles} to="https://www.moonland.estate/">Home</NavLink></li>
                <li><NavLink style={navLinkStyles} to="/choose">Invest </NavLink></li>
                {/* <li><a href="/#team-sec">The Team </a></li> */}
                {/* <li><a href="/#tokensec">Tokenomics</a></li>
                   */}

                {/* <li><a href="/#roadmap-sec">Roadmap</a></li> */}
                <li><NavLink style={navLinkStyles} to="/staking">Stake</NavLink></li>
                <li><NavLink style={navLinkStyles} to="/choosemarketplace">Marketplace</NavLink></li>
                <li><NavLink style={navLinkStyles} to="/game-center">Play</NavLink></li>
                {/* <li>
                  <a className="conbutton" href="/choose">Launch App</a>
                    </li> */}
              </ul>
            </div>
            <div className="burger-area">
              <a href="#" className="burgers toggle-slide-right"> <img src={burger} alt='' /></a>
            </div>
          </div>
          <div className="header-c3">
            <div className='btnBox'><ConnectWalletBtn /></div>
          </div>

        </div>

        <div className="menu slide-menu-right menu-list-wrp">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Link to="/"> <img src={logo} alt=""/></Link>
          <button class="close-menu"><img src={closedicon} alt=''/></button>
        </div>
          <ul className="menu-list2">
            <li><NavLink style={navLinkStyles} to="https://www.moonland.estate/">Home</NavLink></li>
            <li><NavLink style={navLinkStyles} to="/choose">Invest </NavLink></li>
            {/* <li><a href="/#team-sec">The Team </a></li> */}
            {/* <li><a href="/#tokensec">Tokenomics</a></li> */}

            {/* <li><a href="/#roadmap-sec">Roadmap</a></li> */}
            <li><NavLink style={navLinkStyles} to="/staking">Stake</NavLink></li>
            <li><NavLink style={navLinkStyles} to="/choosemarketplace">Marketplace</NavLink></li>
            <li><NavLink style={navLinkStyles} to="/game-center">Play</NavLink></li>
            {/* <li>
                  <a className="conbutton" href="/choose">Launch App</a>
                    </li> */}
            {/* <li><ConnectWalletBtn /></li> */}
          </ul>

          <ul style={{display:'flex',justifyContent:'center', margin:'9rem 0rem 0rem 0rem',padding:0,listStyle:'none'}}>
            <li><a href='#'><img src={teleg} alt=''/></a></li>
            <li style={{padding:'0rem 2rem'}}><a href='#'><img src={twit} alt=''/></a></li>
            <li><a href='#'><img src={disc} alt=''/></a></li>
          </ul>
          <div style={{marginTop:'2rem'}}>
          <button className='bg___BTN2'>Get started</button>
          </div>
        </div>

      </div>
    </div>
  );

}


export default Header;

