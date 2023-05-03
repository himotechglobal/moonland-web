import React, { Component, useEffect } from 'react';
// import VideoPlayer from 'react-video-js-player';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import white from '../../images/white.png';
import p1 from '../../images/p1.png';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.png';
import hen from '../../images/hen.png';
import r1 from '../../images/1.png';
import r2 from '../../images/2.png';
import r3 from '../../images/3.png';
import r4 from '../../images/4.png';
import r5 from '../../images/5.png';
import faq from '../../images/faq.png';
import road from '../../images/road.png';
import launch from '../../images/launch.png';
import land from '../../images/land-01.png';
import Video from '../../video/game-preview.mp4';
import yasir from '../../images/yasir.png';
import nasim from '../../images/nasim.png';
import jasim from '../../images/jasim.png';
import buyfarm from '../../images/buyfarm.png';
import button from "../../images/button.png"
import kk from '../../images/kk.png';
import kk2 from '../../images/kk2.png';
import stakebtn from '../../images/stakeToearn.png';
import stakebtn2 from '../../images/battleToearn.png';
import chigozie from '../../images/chigozie.png';


import close from '../../images/close.png';


import { useState } from 'react';

const Home = () => {

	const [chickenCost, setChickenCost] = useState(0);
	const [eggDaily, setEggDaily] = useState(0);
	const [eggDailyValue, setEggDailyValue] = useState(0);
	const [dayRecover, setDayRecover] = useState(0);
	const [eggYearlyValue, setEggYearlyValue] = useState(0);
	const [eggYearly, setEggYearly] = useState(0);


	const [farmtype, setFarmType] = useState(1);
	const [pigCost, setPigCost] = useState(0);
	const [pigletMonthly, setPigletMonthly] = useState(0);
	const [pigletMonthlyValue, setPigletMonthlyValue] = useState(0);
	const [pigDayRecover, setPigDayRecover] = useState(0);
	const [pigletYearly, setPigletYearly] = useState(0);
	const [pigletYearlyValue, setPigletYearlyValue] = useState(0);



	useEffect(() => {

		AOS.init();
		$(document).ready(function () {
			$(".faqs-container .faq-singular:first-child").addClass("active").children(".faq-answer").slideDown();//Remove this line if you dont want the first item to be opened automatically.
			$(".faq-question").on("click", function () {
				if ($(this).parent().hasClass("active")) {
					$(this).next().slideUp();
					$(this).parent().removeClass("active");
				}
				else {
					$(".faq-answer").slideUp();
					$(".faq-singular").removeClass("active");
					$(this).parent().addClass("active");
					$(this).next().slideDown();
				}
			});
		});

		//   $(document).ready(function() {

		// 	// $('.cancel-c').click(function() {

		// 	// 	$('#myvideo')[0].pause();
		// 	// });
		//   });


		// $(".cancel-c").click(function(){
		//     $("#myModal").hide();
		//   });
		// Get the modal
		//   var modal = document.getElementById("myModal");

		// Get the button that opens the modal
		//   var btn = document.getElementById("myBtn");

		//   // Get the <span> element that closes the modal
		//   var span = document.getElementsByClassName("close")[0];

		//   // When the user clicks the button, open the modal 
		//   btn.onclick = function() {
		//     modal.style.display = "block";
		//   }

		// When the user clicks on <span> (x), close the modal
		//   span.onclick = function() {
		//     modal.style.display = "none";
		//   }

		// When the user clicks anywhere outside of the modal, close it
		//   window.onclick = function(event) {
		//     if (event.target == modal) {
		//       modal.style.display = "none";
		//     }
		//   }

	});

	const handleChange = (e) => {
		let _amt = e.target.value;
		setFarmType(_amt);
	}

	const handleinput = (e) => {
		let _amt = e.target.value;
		if (_amt === 0) {

			setChickenCost(0);
			setEggDaily(0);
			setEggDailyValue(0);
			setDayRecover(0);
		}
		else {
			let _rate = 10;
			let _rateEff = 0.12;
			let farmCost = _amt;
			let foodCost = 1;
			let cost = parseFloat(parseFloat(_amt * _rate) + parseFloat(farmCost) + parseFloat(_amt * foodCost * 12)).toFixed(2);
			let _eggDaily = parseFloat(_amt * 1).toFixed();
			let _eggYearly = parseFloat(_amt * 365).toFixed();
			let _eggDailyValue = parseFloat(_eggDaily * _rateEff).toFixed(2);
			let _eggYearlyValue = parseFloat(_eggDaily * 365 * _rateEff).toFixed(2);
			let _days = parseFloat(cost / _eggDailyValue).toFixed();
			// if(cost > 1e6){
			// 	cost = parseFloat(cost/1e6).toFixed(2)+"m" ;
			// }
			// else if(cost > 1e3){
			// 	cost = parseFloat(cost/1e3).toFixed(2)+"k" ;
			// }

			// if(_eggDaily > 1e6){
			// 	_eggDaily = parseFloat(_eggDaily/1e6).toFixed(2)+"m" ;
			// }
			// else if(_eggDaily > 1e3){
			// 	_eggDaily = parseFloat(_eggDaily/1e3).toFixed(2)+"k" ;
			// }

			// if(_eggYearly > 1e6){
			// 	_eggYearly = parseFloat(_eggYearly/1e6).toFixed(2)+"m" ;
			// }
			// else if(_eggYearly > 1e3){
			// 	_eggYearly = parseFloat(_eggYearly/1e3).toFixed(2)+"k" ;
			// }


			// if(_eggDailyValue > 1e6){
			// 	_eggDailyValue = parseFloat(_eggDailyValue/1e6).toFixed(2)+"m" ;
			// }
			// else if(_eggDailyValue > 1e3){
			// 	_eggDailyValue = parseFloat(_eggDailyValue/1e3).toFixed(2)+"k" ;
			// }

			// if(_eggYearlyValue > 1e6){
			// 	_eggYearlyValue = parseFloat(_eggYearlyValue/1e6).toFixed(2)+"m" ;
			// }
			// else if(_eggYearlyValue > 1e3){
			// 	_eggYearlyValue = parseFloat(_eggYearlyValue/1e3).toFixed(2)+"k" ;
			// }
			setChickenCost(cost);
			setEggDaily(_eggDaily);
			setEggYearly(_eggYearly);
			setEggDailyValue(_eggDailyValue);
			setEggYearlyValue(_eggYearlyValue);
			setDayRecover(_days);

		}
	}

	const handleinputPig = (e) => {
		let _amt = e.target.value;
		if (_amt === 0) {

			setPigCost(0);
			setPigletMonthly(0);
			setPigletMonthlyValue(0);
			setPigDayRecover(0);
			setPigletYearly(0);
			setPigletYearlyValue(0);

		}
		else {
			let _rate = 100;
			let _ratePiglet = 10;
			let farmCost = parseFloat(18.18 * _amt);
			let foodCost = 5;
			let cost = parseFloat((_amt * _rate) + farmCost + (_amt * foodCost * 12)).toFixed(2);
			_amt = _amt * 0.9099;
			let _pigletMonthly = parseFloat(_amt * 4).toFixed();
			let _pigletYearly = parseFloat(_amt * 365).toFixed();
			let _pigletDailyValue = parseFloat(_pigletMonthly * _ratePiglet).toFixed(2);
			let _pigletYearlyValue = parseFloat(_pigletYearly * _ratePiglet).toFixed(2);
			let _days = parseFloat(cost * 30 / _pigletDailyValue).toFixed();
			// if(cost > 1e6){
			// 	cost = parseFloat(cost/1e6).toFixed(2)+"m" ;
			// }
			// else if(cost > 1e3){
			// 	cost = parseFloat(cost/1e3).toFixed(2)+"k" ;
			// }

			// if(_pigletMonthly > 1e6){
			// 	_pigletMonthly = parseFloat(_pigletMonthly/1e6).toFixed(2)+"m" ;
			// }
			// else if(_pigletMonthly > 1e3){
			// 	_pigletMonthly = parseFloat(_pigletMonthly/1e3).toFixed(2)+"k" ;
			// }

			// if(_pigletYearly > 1e6){
			// 	_pigletYearly = parseFloat(_pigletYearly/1e6).toFixed(2)+"m" ;
			// }
			// else if(_pigletYearly > 1e3){
			// 	_pigletYearly = parseFloat(_pigletYearly/1e3).toFixed(2)+"k" ;
			// }


			// if(_pigletDailyValue > 1e6){
			// 	_pigletDailyValue = parseFloat(_pigletDailyValue/1e6).toFixed(2)+"m" ;
			// }
			// else if(_pigletDailyValue > 1e3){
			// 	_pigletDailyValue = parseFloat(_pigletDailyValue/1e3).toFixed(2)+"k" ;
			// }

			// if(_pigletYearlyValue > 1e6){
			// 	_pigletYearlyValue = parseFloat(_pigletYearlyValue/1e6).toFixed(2)+"m" ;
			// }
			// else if(_pigletYearlyValue > 1e3){
			// 	_pigletYearlyValue = parseFloat(_pigletYearlyValue/1e3).toFixed(2)+"k" ;
			// }


			setPigCost(cost);
			setPigletMonthly(_pigletMonthly);
			setPigletMonthlyValue(_pigletDailyValue);
			setPigletYearly(_pigletYearly);
			setPigletYearlyValue(_pigletYearlyValue);
			setPigDayRecover(_days);

		}



	}

	return (
		<div className="main-bg">
			<section id="banner-sec">
				<Header />
				{/* <video autoPlay loop muted >
						<source src={Video} type="video/mp4"  />
					</video> */}
				<div className="banner-content" data-aos="fade-up" data-aos-anchor-placement="top-center">
					<h3>My farm pet</h3>
					<p>A complete metaverse of virtual farms and builder games on <br></br>Binance smart Chain.</p>
					<div className="whitepaper-btn">
						<a href="/choose"><img src={launch} className="btn-img" alt="" /></a>
					</div>
				</div>
			</section>
			<div className="stokes">
				<img src={stoke} alt="" />
			</div>
			<section id="about">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="about-content" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
								<h3>About My Farm Pet</h3>
								<p>My farm pet is a blockchain farming game, where anyone can buy and own virtual farms,<br></br> Farm pets, and meet new friends.</p>
								<div className="whitepaper-btn">
									<a href="/MyFarmPetWhitepaper.pdf" download target="blank"><img src={white} className="btn-img" alt="" /></a>
									<a href="/MyFarmPetPitchDeck.pdf" download target="blank"><img src={button} className="btn-img pet-btn" alt="" /></a>

								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/*<div className="stokes">
						<img src={stoke} />
					</div>
					 <section id="choose-secs" data-aos="fade-up" data-aos-anchor-placement="top-center">
						<div className="container">
							<div className="row">
								<div className="col-lg-6">
									<div className="home-choosebox">
										<div className="kbox-img">
											<img src={kk} />
										</div>
										<div className="stakebtn">
											<a href="/staking"><img src={stakebtn} /></a>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="home-choosebox">
										<div className="kbox-img">
											<img src={kk2} />
										</div>
										<div className="stakebtn">
											<a href="/game-center"><img src={stakebtn2} /></a>
										</div>
										
									</div>
								</div>
							</div>
						</div>
					</section> */}
			<div className="stokes">
				<img src={stoke} alt="" />
			</div>
			<section id="calculator-sec" data-aos="fade-up" data-aos-anchor-placement="top-center">
				<div className="container">
					<div className="head-calculator">
						<h3>Farming investment and rewards calculator</h3>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="wrp-list-invest">
								<div className="text-center">
									<label>Choose Farming Type: </label>
									<select onChange={handleChange} >
										<option value="1">Chicken Farming</option>
										<option value="2">Pig Farming</option>
									</select>
								</div>
								{farmtype === 1 &&
									<>
										<ul className="cal-list-head">
											<li><h4>Enter Chicken to <br></br>Buy</h4></li>
											<li><h4>$Total Yearly Investment<br></br> Cost (includes Food & Land)</h4></li>
											<li><h4>Daily Egg<br></br> Value</h4></li>
											<li><h4>Yearly Egg<br></br> Value</h4></li>
											<li><h4>Days to Recover Initial<br></br> Investment By Eggs</h4></li>
										</ul>
										<ul className="cal-list">
											<li><input placeholder="Enter Chicken Amount" onChange={handleinput} /></li>
											<li><p>${chickenCost}</p></li>
											<li><p>{eggDaily} ~ ${eggDailyValue}</p></li>
											<li><p>{eggYearly} ~ ${eggYearlyValue}</p></li>
											<li><p>{dayRecover}</p></li>
										</ul>
									</>
								}
								{farmtype === 2 &&
									<>
										<ul className="cal-list-head">
											<li><h4>Enter Pig to <br></br>Buy</h4></li>
											<li><h4>$Total Yearly Investment<br></br> Cost  (includes Food & Land)</h4></li>
											<li><h4>Monthly Piglets<br></br> Value</h4></li>
											<li><h4>Yearly Piglets<br></br> Value</h4></li>
											<li><h4>Days to Recover Initial<br></br> Investment By Piglets</h4></li>
										</ul>
										<ul className="cal-list">
											<li><input placeholder="Enter Pig Amount" onChange={handleinputPig} /></li>
											<li><p>${pigCost}</p></li>
											<li><p>{pigletMonthly} ~ ${pigletMonthlyValue}</p></li>
											<li><p>{pigletYearly} ~ ${pigletYearlyValue}</p></li>
											<li><p>{pigDayRecover}</p></li>
										</ul>
									</>
								}
								<div className="calculator-farm">
									<a className="conbutton liqbtn" href="https://pancakeswap.finance/swap?outputCurrency=0x903fcaf1a49b29678c15b43bc9f852232bfa7df1" target="_blank" >BUY $MYFARMPET</a>
									<a className="conbutton liqbtn" href="https://app.unicrypt.network/amm/pancake-v2/pair/0x2e4bdf904217e8d2ee9ce9c1317592f7706e7b22" target="_blank" >LIQUIDITY LOCK PROOF</a>
									<a className="conbutton liqbtn" href="/MyFarmPetAudit.pdf" target="_blank" >AUDIT REPORT</a>
									<a className="conbutton liqbtn" href="https://bscscan.com/token/0x903fcaf1a49b29678c15b43bc9f852232bfa7df1" target="_blank" >TOKEN CONTRACT</a>

								</div>
							</div>

						</div>
					</div>

				</div>
			</section>
			<div className="stokes">
				<img src={stoke} alt="" />
			</div>
			<section id="features-sec" data-aos="fade-up" data-aos-anchor-placement="top-center">
				<div className="container">
					<div className="features-head">
						<h3>Features</h3>
					</div>
					<div className="row">
						<div className="col-lg-4">
							<div className="box-features">
								<div className="img-feat">
									<img src={p1} alt="" />
								</div>
							</div>
							<div className="content-f-box">
								<h3>Staking</h3>
								<p>Earn 7% monthly staking farmpet token.
								</p>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="box-features">
								<div className="img-feat">
									<img src={p3} alt="" />
								</div>
							</div>
							<div className="content-f-box">
								<h3>Marketplace</h3>
								<p>In-game marketplace allowing users to buy and sell their assets.
								</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="box-features">
								<div className="img-feat">
									<img src={land} alt="" />
								</div>
							</div>
							<div className="content-f-box">
								<h3>Social features</h3>
								<p>In-game chart modules allowing farmers to communicate with people
									on the platform, and to transfer tokens and assets to friends in the chat.
								</p>
							</div>
						</div>
					</div>

				</div>
			</section>
			<div className="stokes">
				<img src={stoke} alt="" />
			</div>
			<section id="tokensec" data-aos="fade-up" data-aos-anchor-placement="top-center">
				<div className="container">
					<div className="token-head" data-aos="flip-left" data-aos-delay="100">
						<h3>Tokenomics</h3>
						<p>Highly in-demand token with lots of utilities and substantial <br></br>rewards for holders.</p>
					</div>

					<div className="row">
						<div className="col-lg-3">
							<div className="hen-box">
								<img src={hen} alt="" />
							</div>
							<div className="total-suply-box">
								<h3>1,000,000</h3>
								<p>1 Million Initial Supply</p>
							</div>
						</div>
						<div className="col-lg-8">

							<div className="tokenomic-wrp">
								<div className="tokenomic-content">
									<div className="wrptoken-ch">
										<span>No</span>
										<p>Transaction fees</p>

									</div>
								</div>
								<div className="tokenomic-content">
									<div className="wrptoken-ch">
										<span>No</span>
										<p>buy and sell tax</p>

									</div>
								</div>
								<div className="tokenomic-content">
									<div className="wrptoken-ch">
										<span>No</span>
										<p>Presale</p>

									</div>
								</div>
							</div>
							<div className="tokenomic-wrp2">
								<div className="tokenomic-content2">
									<div className="wrptoken-ch">
										<span>No </span>
										<p>whitelist</p>

									</div>
								</div>
								<div className="tokenomic-content2">
									<div className="wrptoken-ch">
										<span>No </span>
										<p>private sale</p>

									</div>
								</div>

							</div>
						</div>


					</div>

				</div>
			</section>
			<div className="stokes">
				<img src={stoke} alt="" />
			</div>
			<section id="roadmap-sec" data-aos="fade-up" data-aos-anchor-placement="top-center">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="roadmap-wrp">
								<h3>Roadmap</h3>
								<div className="roadmap-ims">
									<img src={road} alt="" />
								</div>
								<div className="roadmap-text-wrp">
									<div className="roadmap-text">
										<div className="roadmap-m">
											<img src={r1} alt="" />
										</div>
										<div className="ex-box">
											<h3>Q3 2021</h3>
										</div>
										<div className="road-c-box">
											<p>- Website creation</p>
											<p>- Chicken farm Game development</p>
											<p>- Creation of social communities</p>
											<p>- Token launch and listing on pancake</p>
											<p>- Staking launch</p>
											<p>- Chicken farm launch</p>
											<p>- Pig farm launch</p>
											<p>- In-game Marketplace auction</p>
											<p>- Commencement of pre farming activities</p>
										</div>
									</div>
									<div className="roadmap-text">
										<div className="roadmap-m">
											<img src={r2} alt="" />
										</div>
										<div className="ex-box bg1">
											<h3>Q4 2021</h3>
										</div>
										<div className="road-c-box bg1">
											<p>- Marketing campaign launch</p>
											<p>- Ambassadorial campaign launch</p>
											<p>- Listing on centralized exchanges</p>
											<p>- DAO integration</p>
											<p>- In-chat feature integration</p>
											<p>- Farming activities on live farms commencement</p>
										</div>
									</div>
									<div className="roadmap-text">
										<div className="roadmap-m">
											<img src={r3} alt="" />
										</div>
										<div className="ex-box bg2">
											<h3>Q1 2022</h3>
										</div>
										<div className="road-c-box bg2">
											<p>- Gaming launch</p>
											<p>- Cattle farming launch</p>
											<p>- Integration of more chains</p>
										</div>
									</div>
									{/* <div className="roadmap-text">
												<div className="roadmap-m">
													<img src={r4} />
												</div>
												<div className="ex-box bg3">
													<h3>Exploration</h3>
												</div>
												<div className="road-c-box bg3">
													<p>Goldmine is a
													revolutionary token with
													proprietary tokenomics
													that allow users to earn
													BNB by simply holding
													Goldmine.</p>
												</div>
											</div>
											<div className="roadmap-text">
												<div className="roadmap-m">
													<img src={r5} />
												</div>
												<div className="ex-box bg4">
													<h3>Exploration</h3>
												</div>
												<div className="road-c-box bg4">
													<p>Goldmine is a
													revolutionary token with
													proprietary tokenomics
													that allow users to earn
													BNB by simply holding
													Goldmine.</p>
												</div>
											</div> */}
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
			<div className="stokes">
				<img src={stoke} alt="" />
			</div>

			<section id="team-sec" data-aos="fade-up" data-aos-anchor-placement="top-center">
				<div className="container">
					<div className="team-head">
						<h3>Our Team</h3>
					</div>
					<div className="row">
						<div className="col-lg-3">
							<div className="team-box">
								<div className="team-img">
									<img src={yasir} alt="" />
								</div>
							</div>
							<div className="team-c">
								<h3>Yasir Khan</h3>
								<p>Lead Developer </p>
							</div>
						</div>
						<div className="col-lg-3">
							<div className="team-box">
								<div className="team-img">
									<img src={chigozie} alt="" />
								</div>
							</div>
							<div className="team-c">
								<h3>Chigozie Okolo</h3>
								<p>Co-Founder </p>
							</div>
						</div>
						<div className="col-lg-3">
							<div className="team-box">
								<div className="team-img">
									<img src={nasim} alt="" />
								</div>
							</div>
							<div className="team-c">
								<h3>Nasim</h3>
								<p>UI/UX Developer</p>
							</div>
						</div>
						<div className="col-lg-3">
							<div className="team-box">
								<div className="team-img">
									<img src={jasim} alt="" />
								</div>
							</div>
							<div className="team-c">
								<h3>Jasim</h3>
								<p>UI/UX Designer</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="stokes">
				<img src={stoke} alt="" />
			</div>

			<div id="myModal" className="modal">
				<div className="modal-content">
					<span className="close"></span>
					<div className="pop-content-wrp">
						<div className="video-f">
							<video controls id="myvideo">
								<source src={Video} type="video/mp4" />
							</video>
						</div>
						<a href="javacript:void" className="cancel-c"><img src={close} className="closebtn" alt="" /></a>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);


}
export default Home;