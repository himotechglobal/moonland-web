import React, { useEffect, useState } from 'react';
import { Modal, ModalBody,Button } from 'reactstrap';

import Header from '../header.js';
import { KINGGAME, TX_LINK,TOKEN } from '../../../Config/index.js';
import KINGGAME_ABI from '../../../Config/KINGGAME_ABI.json';
import arrow from '../../images/round_arrow.svg';
import modal_earth from '../../images/modal_earth.png'
import Web3 from "web3"
import TOKEN_ABI from "../../../Config/TOKEN_ABI.json"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';


const KingGame = () => {
	// const wallet = useWallet()
	const { address, isConnected } = useAccount();

	const [connectModal, setconnectModal] = useState(null);

	const [showPlay, setShowPlay] = useState(false);


	const [modal, setModal] = useState(false);

	const [timer, setTimer] = useState(0);
	const [lastBidder, setlastBidder] = useState(null);
	const [winner, setWinner] = useState(false);
	const [waiting, setWaiting] = useState(false);
	const [nextTime, setnextTime] = useState(0);
	const [lastBidTime, setlastBidTime] = useState(0);
	const [endDelay, setendDelay] = useState(0);

	const [gameOn, setGameon] = useState(false);
	const [approved, setApproved] = useState(0);
	const [tokenBalance, setTokenbalance] = useState(0);
	const [bidAmount, setBidAmount] = useState(0);
	const [totalBid, settotalBid] = useState(0);
	const [potBalance, setpotBalance] = useState(0);

	const [remainingSeconds, setremainingSeconds] = useState(0);

	const [tokenSymbol, setTokenSymbol] = useState(null);
	const [tokenDecimals, settokenDecimals] = useState(18);

	const [events, setEvents] = useState([]);

	var timerInterval;
	var timerInterval2;

	const modalToggle = () => setModal(!modal);
	const closeModal = () => {
		setModal(false);
	  };
	const togglePlay = () => setShowPlay(!showPlay);

	let web3Provider = window.ethereum;

	const { data: _token } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "token",
		watch:true,
	})
	const { data: _decimals } = useContractRead({
		address: _token,
		abi: TOKEN_ABI,
		functionName: "decimals",
		watch:true,
	})
	const { data: _tokenbalance1 } = useContractRead({
		address: _token,
		abi: TOKEN_ABI,
		functionName: "balanceOf",
		args: [address],
		watch:true,
	})
	const { data: _token2 } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "token",
		watch:true,

	})
	const { data: _bidAmount1 } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "bidAmount",
		watch:true,

	})
	const { data: _totalBid } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "totalBid",
		watch:true,
	})
	const { data: _tokenSymbol } = useContractRead({
		address: _token2,
		abi: TOKEN_ABI,
		functionName: "symbol",
		watch:true,
	})
	const { data: _potBalance1 } = useContractRead({
		address: TOKEN,
		abi: TOKEN_ABI,
		functionName: "balanceOf",
		args: [KINGGAME],
		watch:true,
	})

	const { data: _lastBidder } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "lastBidder",
		watch:true,
	})
	const { data: _approve } = useContractRead({
		address: _token,
		abi: TOKEN_ABI,
		functionName: "allowance",
		args: [address, KINGGAME],
		watch:true,
	})
	const { data: __nextTime } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "nextStartTime",
		watch:true,
	})
	const { data: __lastBidTime } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "lastBidTime",
		watch:true,
	})

	const { data: __endDelay } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "endDelay",
		watch:true,
	})
	const { data: hasWinner } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "hasWinner",
		watch:true,
	})



	const getOtherInforPer = async () => {
		let _web3 = new Web3(web3Provider);
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);
		if (address) {
			let _currentBlockck = await _web3.eth.getBlockNumber();

			_gameContract.getPastEvents(
				"OnBid",
				{
					filter: {
						author: address,
					},
					fromBlock: _currentBlockck - 5000,
					toBlock: _currentBlockck
				},
				(error, events) => {
					if (!error) {
						var obj = JSON.parse(JSON.stringify(events));
						setEvents(obj.reverse())
					} else {
					
					}
				}
			);


			let _tokenbalance = parseFloat(_tokenbalance1 / 1e1 ** _decimals).toFixed(2);
			setTokenbalance(_tokenbalance);

		}

	}


	const getOtherInfor = async () => {

		
		let _potBalance = parseFloat(_potBalance1 / 1e1 ** _decimals).toFixed(4);
		let _bidAmount = parseFloat(_bidAmount1 / 1e1 ** _decimals).toFixed(4);
		let totalBid = parseFloat(_totalBid / 1e1 ** _decimals).toFixed(4);



		setlastBidder(_lastBidder)
		setpotBalance(_potBalance)
		settotalBid(totalBid);
		setBidAmount(_bidAmount);
		setTokenSymbol(_tokenSymbol);
		settokenDecimals(_decimals);


	}
	const getApproved = async () => {

		if (address) {
			setApproved(parseInt(_approve));
		
		}

	}


	
	const _amount = ethers.utils.parseEther('1000000000').toString()
	const { config: claimConfig_ } = usePrepareContractWrite({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: 'restartAndClaim',
		enabled: true

	})

	const { data: claimData, writeAsync: claimWriteAsync, isError: claimError } = useContractWrite(claimConfig_)

	const { isSuccess: claimSuccess } = useWaitForTransaction({
		hash: claimData?.hash,
	})



	const claim = async () => {
		setModal(true);
		await claimWriteAsync()
	}


	const { config: bidNowConfig_ } = usePrepareContractWrite({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: 'participate',
		enabled:approved > 0 && !winner && gameOn
	})

	const { data: bidNowData, writeAsync: bidNowWriteAsync, isError: bidNowError } = useContractWrite(bidNowConfig_)

	const { isSuccess: bidNowSuccess } = useWaitForTransaction({
		hash: bidNowData?.hash,
	})


	const bidNow = async () => {
		setModal(true);
		await bidNowWriteAsync()
	
	}



	const { config: approveNowConfig_ } = usePrepareContractWrite({
		address: _token,
		abi: TOKEN_ABI,
		functionName: 'approve',
		args: [KINGGAME, _amount],

	})

	const { data: approveNowData, writeAsync: approveNowWriteAsync, isError: approveNowError } = useContractWrite(approveNowConfig_)

	const { isSuccess: approveNowSuccess } = useWaitForTransaction({
		hash: approveNowData?.hash,
	})


	const approveNow = async () => {
		setModal(true);
		await approveNowWriteAsync()
	}


	const getLastBidder = async () => {


		setlastBidder(_lastBidder)
	}



	const getTimer = async () => {

		let _currentTime = new Date().getTime() / 1000;
	
		let _nextTime = parseInt(__nextTime);
		let _lastBidTime = parseInt(__lastBidTime) ;
		let _endDelay = parseInt(__endDelay)
		let endTime;
		let _remainingSeconds;


		setWaiting(false);

		if (_nextTime === 0 && _lastBidTime === 0) {
			setWaiting(true);
			setGameon(true);
		}
		else if (_lastBidTime > 0 && !hasWinner) {
			setGameon(true);
			_remainingSeconds = _currentTime - _lastBidTime;
			_remainingSeconds = _endDelay - _remainingSeconds;

		}
		else if (_lastBidTime > 0 && hasWinner) {
			setGameon(false);
		}

		else if (_nextTime > 0 && _nextTime > _currentTime) {
			_remainingSeconds = _nextTime - _currentTime;

		}
		else if (_nextTime > 0 && _nextTime < _currentTime) {
			setWaiting(true);
			setGameon(true);

		}


		if (_remainingSeconds < 0) {
			_remainingSeconds = 0;
		}
		if(_remainingSeconds > 0){
			let remainingDay = Math.floor(
				_remainingSeconds / (60 * 60 * 24)
			);
			
			let remainingHour = Math.floor(
				(_remainingSeconds % (60 * 60 * 24)) / (60 * 60)
			);
			let remainingMinutes = Math.floor(
				(_remainingSeconds % (60 * 60)) / 60
			);
			let remainingSec = Math.floor(_remainingSeconds % 60);
		
			if (remainingDay > 0) {
				endTime = remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
				setTimer(endTime);
	
			}
			else {
				endTime = remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
	
				setTimer(endTime);
	
			}
		}
		
		
		setWinner(hasWinner);
	}

	useEffect(() => {
		// if (window.ethereum) {
		// 	web3Provider = window.ethereum;
		// }
		// else {
		// 	web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

		// }
		// if (address) {
			// getdata()
		
			getLastBidder()
			// clearInterval(timerInterval);
			// timerInterval = setInterval(() => {
			// 	getTimer()

			// }, 1000);
			const interval = setInterval(() => {
				getTimer();
			  }, 1000);
			  setTimeout(() => {
				clearInterval(interval);
			  }, 1000);
			getOtherInforPer();
			getApproved()

		// }
		getOtherInfor();




	}, [address,__nextTime,hasWinner,__lastBidTime,__endDelay,_lastBidder,timer,_lastBidder,_approve,new Date().getTime() / 1000])
	useEffect(() => {
		if (claimSuccess||bidNowSuccess||approveNowSuccess) {
		  closeModal();
		}
	  }, [claimSuccess,bidNowSuccess,approveNowSuccess]);
	  
	  useEffect(() => {
		if (claimError||bidNowError||approveNowError) {
		  closeModal();
		}
	  }, [claimError,bidNowError,approveNowError]);
	return (
		<div>
			<Header />
			<div className='king__game'>
				<section id="finance-banner">
					<div className="banner-finace">
						<div className="container">
							<div className="finance-king_game">
								<h1>Moon Emperor</h1>
							
								<p>Moon Emperor is a fun and exciting game of chance and speed. Anyone can participate in this game by connecting their wallet and bidding $MOON tokens. The last one standing when the timer runs out, takes the treasure.</p>
							</div>
						</div>
					</div>
				</section>
				<section id="round-sec">
					<div className="container">
						<div className='marketplace-box-wrap7'>
							<div className="roundbg-img">
								<div className="round-content">
									<div className='next___round'>
										{
											!gameOn && !winner &&
											<h3>Next Round in</h3>
										}
										{
											gameOn && !winner && !waiting &&
											<h3>Game Started. Ends in</h3>
										}
										{
											gameOn && !winner && waiting &&
											<h3>Game Started. Waiting for Bids</h3>
										}

										{/* {
											!winner && !waiting && */}
											<h4>{timer != 0 ? timer : ''}</h4>
										{/* } */}
									</div>
									<div className='prepare___next'>
										{
											!gameOn && !winner &&
											<p>Prepare for battle!</p>
										}
										{
											gameOn && !winner &&
											<p>Participate Now!</p>
										}
										{
											winner &&
											<>
												<h3 style={{color:"#fff",textAlign:"start"}}>Round Over</h3>
												<p className="choose-w">Winner Choosen!</p>
											</>
										}


										<p>Moon Treasure:{potBalance > 0 ? potBalance : "0"} ${tokenSymbol}</p>


										{gameOn &&
											<>
												<p>Total Bids: {totalBid > 0 ? totalBid : "0"} ${tokenSymbol}</p>
											</>

										}
									</div>

								</div>
							</div>
						</div>
						<div className="row mrt-bid">
							<div className="col-lg-6">
								<div className='marketplace-box-wrap7'>
									<div className="bid-box">
										<div className="bit-c-img">
											{/* <h3>Bid Now!</h3> */}
											<div className="bid-smallbox">
												<p>{bidAmount > 0 ? bidAmount : '0'} ${tokenSymbol}</p>
												<p>Your Balance {tokenBalance > 0 ? tokenBalance : '0.00'} ${tokenSymbol}</p>





												{isConnected && approved == 0 &&

													<button onClick={approveNow} className="mt-1 conbutton" >Approve</button>
												}
												{isConnected && approved > 0 && !winner && gameOn &&
													<button className="mt-1 conbutton" onClick={() => bidNow()} >Bid Now</button>
												}
												{isConnected && winner && lastBidder === address &&
													<button className="mt-1 conbutton" onClick={() => claim()} >Claim & Restart</button>
												}
												{isConnected && winner && lastBidder !== address &&
													<button className="mt-1 conbutton" onClick={() => claim()} >Restart</button>
												}

											</div>
										</div>

									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="bid-box2">
									<div className="bit-c-img2">
										<h3>Current Emperor</h3>
										{
											lastBidder != null &&
											<p>Last bidder: <span><a style={{ color: '#fff' }} href={`https://bscscan.com/address/${lastBidder.substring(0, 6) + "...." + lastBidder.substring(lastBidder.length - 6)}`} target={'_blank'}>{lastBidder.substring(0, 6) + "...." + lastBidder.substring(lastBidder.length - 6)}</a></span></p>
										}
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<div className='marketplace-box-wrap7'>
									<div className="event-g">
										<div className="events-box">
											<h3 >Bid History</h3>

											<table className="mt-3 eventTable">
												{
													events.length === 0 &&
													<p className='no___event'>No Events</p>
												}


												{events.length > 0 && events.map((value, index) => {
													if (index < 5) {
														return (
															<tr>
																<td style={{textAlign:"start"}}><a href={TX_LINK + value.transactionHash} target="_blank">Tx: {value.transactionHash.substring(0,6)+"..."+value.transactionHash.substring(value.transactionHash.length-6)}</a></td>
																<td >
																	{value.event == "OnWin" &&
																		<span>Restart</span>
																	}
																	{value.event == "OnBid" &&
																		<span>Bid</span>
																	}
																	{value.event != "OnBid" && value.event != "OnWin" &&
																		<span>{value.event}</span>
																	}

																</td>
																<td className="text-right">
																	{value.returnValues.amount &&
																		value.returnValues.amount / 1e1 ** tokenDecimals
																	}
																	{!value.returnValues.amount &&
																		<span>NA</span>
																	}</td>
															</tr>
														)
													}
												}
												)}
											</table>

										</div>
									</div>
								</div>
							</div>
						</div>
						 
						<div className="row" >
								<div className="col-lg-12">
									<div className='marketplace-box-wrap7'>
									<div className="dex-box-g">
										<div className="den-box">
											<h3>Moon Emperor</h3>
											<p>Compete with other bidders to win the Moon Treasure filled with $MOON rewards.</p>
											<h4>How to Play?</h4>
											<p>The Moon Emperor game has a 50 seconds countdown timer which resets on each bid.</p>
											<p> Use your $MOON tokens to bid, they go directly into the Moon Treasure, </p>
											<p>allowing you to become the Current Emperor (most recent bidder).</p>
											<p> When the timer reaches zero, the Current Emperor wins the game.</p>
											{/* <h4>Winning’s distribution?</h4>
											<p>The contract resets after claim and sets the countdown before a new round begins.</p> */}
											<h4>Moon Treasury distribution?</h4>
											<p>At the end of each round, Moon Treasure balance is distributed as follows:</p>
											<p>60% to the winner</p>
											<p>30% carried over to the next round</p>
											<p>10% to $MOON LP</p>
										<p>Anyone can click on the claim button at the end of the round </p>
										<p> but the winning share will go to the winner only and all the bids are final,</p>
										<p> your $MOON can not be returned after bidding.</p>
										</div>
									</div>
									</div>
								</div>
							</div> 
					</div>
				</section>
				<div className='btm___arrow'>
					<Link to='/game-center'> <img src={arrow} alt='arrow image here' /></Link>
				</div>
			</div>


			<Modal isOpen={modal} toggle={modalToggle} className="connect-box earth_img_box" style={{backdropFilter:"blur(60px)"}} centered={true}>

				<ModalBody>
				<div  className="modal_img_div1"><img src={modal_earth} alt="moonland" width={"150px"} style={{opacity:"65%"}}/></div>
					<div className="mt-3 mb-3 text-center">
						<p className="txfont">Processing your Request....</p>

					</div>
				</ModalBody>
					<Button className="bg___BTN2 mr-auto ml-auto mb-5" onClick={modalToggle}>Close</Button>

			</Modal>

		</div>
	);
}

export default KingGame;