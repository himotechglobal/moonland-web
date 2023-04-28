import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, } from 'reactstrap';

import Header from '../header.js';
import Footer from '../footer.js';
import flower from '../../images/flower.png';
import { KINGGAME, TX_LINK } from '../../../Config/index.js';
import KINGGAME_ABI from '../../../Config/KINGGAME_ABI.json';
import arrow from '../../images/round_arrow.svg';

import Web3 from "web3"
// import {useWallet} from '@binance-chain/bsc-use-wallet'

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
	const togglePlay = () => setShowPlay(!showPlay);

	let web3Provider = window.ethereum;

	const { data: _token } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "token",
	})
	const { data: _decimals } = useContractRead({
		address: _token,
		abi: TOKEN_ABI,
		functionName: "decimals",
	})
	const { data: _tokenbalance1 } = useContractRead({
		address: _token,
		abi: TOKEN_ABI,
		functionName: "balanceOf",
		args: [address],
	})
	const { data: _token2 } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "token",

	})
	const { data: _bidAmount1 } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "bidAmount",

	})
	const { data: _totalBid } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "totalBid",
	})
	const { data: _tokenSymbol } = useContractRead({
		address: _token2,
		abi: TOKEN_ABI,
		functionName: "symbol",
	})
	const { data: _potBalance1 } = useContractRead({
		address: _token2,
		abi: TOKEN_ABI,
		functionName: "balanceOf",
		args: [KINGGAME],
	})
	const { data: _lastBidder } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "lastBidder",
	})
	const { data: _approve } = useContractRead({
		address: _token,
		abi: TOKEN_ABI,
		functionName: "allowance",
		args: [address, KINGGAME]
	})
	const { data: _nextTime } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "nextStartTime",
	})
	const { data: _lastBidTime } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "lastBidTime",
	})
	const { data: _endDelay } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "endDelay",
	})
	const { data: hasWinner } = useContractRead({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: "hasWinner",
	})

	// console.log(hasWinner)


	const getOtherInforPer = async () => {
		let _web3 = new Web3(web3Provider);
		// console.log("GA", KINGGAME)
		// console.log("WA", address)
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);

		// let _token = await _gameContract.methods.token().call();
		// console.log(_token);
		// const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token);
		// let _decimals = await _tokenContract.methods.decimals().call();
		// console.log("Getting Events",_decimals)
		if (address) {
			// console.log("Getting Events Inside")
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
						// var array = Object.keys(obj)
						setEvents(obj.reverse())
						// console.log("Events", obj);
					} else {
						// console.log("Events Error", error);
					}
				}
			);


			// let _tokenbalance = await _tokenContract.methods.balanceOf(address).call();
			// console.log(_tokenbalance);

			let _tokenbalance = parseFloat(_tokenbalance1 / 1e1 ** _decimals).toFixed(2);
			setTokenbalance(_tokenbalance);

		}

	}


	const getOtherInfor = async () => {

		// let _web3 = new Web3(web3Provider);

		// const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);
		// let _token2 = await _gameContract.methods.token().call();
		// console.log(_token)
		// const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token2);
		// let _bidAmount = await _gameContract.methods.bidAmount().call();
		// console.log(_bidAmount);
		// let totalBid = await _gameContract.methods.totalBid().call();
		// console.log(totalBid);
		// let _tokenSymbol = await _tokenContract.methods.symbol().call();
		// console.log(_tokenSymbol);
		// let _decimals = await _tokenContract.methods.decimals().call();

		// let _potBalance = await _tokenContract.methods.balanceOf(KINGGAME).call();
		// console.log(_potBalance)
		let _potBalance = parseFloat(_potBalance1 / 1e1 ** _decimals).toFixed(4);
		let _bidAmount = parseFloat(_bidAmount1 / 1e1 ** _decimals).toFixed(4);
		let totalBid = parseFloat(_totalBid / 1e1 ** _decimals).toFixed(4);
		// let _lastBidder = await _gameContract.methods.lastBidder().call();
		// console.log(_lastBidder)


		setlastBidder(_lastBidder)
		setpotBalance(_potBalance)
		settotalBid(totalBid);
		setBidAmount(_bidAmount);
		setTokenSymbol(_tokenSymbol);
		settokenDecimals(_decimals);


	}
	const getApproved = async () => {

		// let _web3 = new Web3(web3Provider);
		// console.log("GA", KINGGAME)
		// console.log("WA", address)
		if (address) {
			// const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);
			// let _token = await _gameContract.methods.token().call();

			// const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token);
			// let _approve = await _tokenContract.methods.allowance(address, KINGGAME).call();
			setApproved(_approve);
			// console.log(_approve);
		}

	}


	// const _amount = _web3.utils.toWei('1');
	const _amount = ethers.utils.parseEther('1').toString()
	// console.log(_amount);
	const { config: claimConfig_ } = usePrepareContractWrite({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: 'restartAndClaim',
		enabled: false

	})

	const { data: claimData, writeAsync: claimWriteAsync, isError: claimError } = useContractWrite(claimConfig_)

	const { isSuccess: claimSuccess } = useWaitForTransaction({
		hash: claimData?.hash,
	})

	if (claimError && modal) {
		setModal(false);
	}
	if (claimSuccess && modal) {
		setModal(false);
	}


	const claim = async () => {
		setModal(!modal);
		await claimWriteAsync()


		// let _web3 = new Web3(web3Provider);

		// const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);
		// const _amount = _web3.utils.toWei('1');


		// _gameContract.methods.restartAndClaim().send({ from: address }).on('receipt', function (receip) {
		// 	getApproved();
		// 	getLastBidder();
		// 	// getTimer();
		// 	getOtherInforPer();
		// 	setModal(modal);
		// })
		// 	.on('error', function (error, receipt) {
		// 		setModal(modal);

		// 	});
	}


	const { config: bidNowConfig_ } = usePrepareContractWrite({
		address: KINGGAME,
		abi: KINGGAME_ABI,
		functionName: 'participate',
		// args: [KINGGAME, _amount]
		enabled: false

	})

	const { data: bidNowData, writeAsync: bidNowWriteAsync, isError: bidNowError } = useContractWrite(bidNowConfig_)

	const { isSuccess: bidNowSuccess } = useWaitForTransaction({
		hash: bidNowData?.hash,
	})

	if (bidNowError && modal) {
		// getLastBidder() ;
		getOtherInforPer();

		setModal(modal);
	}
	if (bidNowSuccess && modal) {
		setModal(false);
	}

	const bidNow = async () => {
		setModal(!modal);
		await bidNowWriteAsync()
		// console.log("here");

		// let _web3 = new Web3(web3Provider);
		// const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);

		// _gameContract.methods.participate().send({ from: address }).on('receipt', function (receip) {
		// 	getApproved();
		// 	getLastBidder();
		// 	getOtherInforPer();
		// 	// getTimer();

		// 	setModal(modal);
		// })
		// 	.on('error', function (error, receipt) {
		// 		setModal(modal);

		// 	});
	}



	const { config: approveNowConfig_ } = usePrepareContractWrite({
		address: _token,
		abi: TOKEN_ABI,
		functionName: 'approve',
		args: [KINGGAME, _amount],
		enabled: false

	})

	const { data: approveNowData, writeAsync: approveNowWriteAsync, isError: approveNowError } = useContractWrite(approveNowConfig_)

	const { isSuccess: approveNowSuccess } = useWaitForTransaction({
		hash: approveNowData?.hash,
	})

	if (approveNowError && modal) {
		setModal(false);
	}
	if (approveNowSuccess && modal) {
		setModal(false);
	}

	const approveNow = async () => {
		setModal(!modal);
		await approveNowWriteAsync()
		// let _web3 = new Web3(web3Provider);
		// const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);
		// let _token = await _gameContract.methods.token().call();
		// const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token);
		// const _amount = _web3.utils.toWei('100000000');
		// _tokenContract.methods.approve(KINGGAME, _amount).send({ from: address }).on('receipt', function (receipt) {
		// 		getApproved();
		// 		setModal(modal);
		// 	})
		// 		.on('error', function (error, receipt) {
		// 			setModal(modal);

		// 		});
	}


	const getLastBidder = async () => {

		// let _web3 = new Web3(web3Provider);
		// console.log(Config);
		// const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);
		// let _lastBidder = await _gameContract.methods.lastBidder().call();

		setlastBidder(_lastBidder)
	}


	useEffect(() => {
		if (window.ethereum) {
			web3Provider = window.ethereum;
		}
		else {
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

		}
		if (address) {
			// getdata()
			getTimer()
			clearInterval(timerInterval);
			timerInterval = setInterval(() => {
				getTimer()

			}, 1000);


			getOtherInforPer();



			getApproved()

		}
		getOtherInfor();
		clearInterval(timerInterval2);

		timerInterval2 = setInterval(() => {
			getOtherInfor();


		}, 5000);

		// getLastBidder() ;

	}, [address])

	const getTimer = async () => {

		// let _web3 = new Web3(web3Provider);
		//  console.log(Config);
		// const _gameContract = new _web3.eth.Contract(KINGGAME_ABI, KINGGAME);

		// let _nextTime = await _gameContract.methods.nextStartTime().call() ;

		// let _nextTime = await _gameContract.methods.nextStartTime().call();

		// let _lastBidTime = await _gameContract.methods.lastBidTime().call();
		// console.log(_lastBidTime);
		// let _endDelay = await _gameContract.methods.endDelay().call();
		// console.log(_endDelay);
		// let hasWinner = await _gameContract.methods.hasWinner().call();
		setWinner(hasWinner);

		// console.log('nextStart2', hasWinner)

		let _currentTime = new Date().getTime() / 1000;

		let endTime;
		let _remainingSeconds;
		// console.log(_currentTime);

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
			// _remainingSeconds =   _currentTime  - _lastBidTime;
			// _remainingSeconds = _endDelay - _remainingSeconds ;
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



	return (
		<div>
			<Header />
			<div className='king__game'>
				<section id="finance-banner">
					<div className="banner-finace">
						<div className="container">
							<div className="finance-king_game">
								<h1>Moon Emperor</h1>
								<h4>Lorem ipsum is placeholder text commonly used Lorem </h4>
								<p>Lorem ipsum is placeholder text commonly used Lorem ipsum is placeholder text <br />
									commonly used Lorem ipsum is placeholder text commonly used Lorem ipsum is <br />
									placeholder text commonly used</p>
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

										{
											!winner && !waiting &&
											<h4>{timer > 0 ? timer : '00:00:00'}</h4>
										}
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
												<h3>Round Over.</h3>
												<p className="choose-w">Winner Choosen!</p>
											</>
										}


										<p>Bug Treasure:{potBalance > 0 ? potBalance : "0"} {tokenSymbol}</p>


										{gameOn &&
											<>
												<p>Total Bids: {totalBid > 0 ? totalBid : "0"} {tokenSymbol}</p>
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
											<h3>Bid Now!</h3>
											<div className="bid-smallbox">
												<p>{bidAmount > 0 ? bidAmount : '0'} {tokenSymbol}</p>
												<p>Your Balance {tokenBalance > 0 ? tokenBalance : '0.00'} {tokenSymbol}</p>





												{isConnected && approved == 0 &&

													<button onClick={() => {
														approveNow()
													}} className="mt-1 conbutton" >Approve</button>
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
										<h3>Current King</h3>
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
																<td width="65%"><a href={TX_LINK + value.transactionHash} target="_blank">Tx: {value.transactionHash}</a></td>
																<td width="20%">
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
																<td className="text-right" width="15%">
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
											<h3>The Chicken King</h3>
											<p>Compete against other farmers to battle the pest and strike the killing blow to be Crowned the Chicken king.</p>
											<h4>How to Play?</h4>
											<p>The chicken king has a 90 seconds countdown timer which resets on each bid.</p>
											<p>Use your chickens to place a bid that goes into the Pest Treasure balance, allowing you to become eligible to be crowned the chicken king for 24hours.</p>
											<p>When the timer reaches zero, the last bid wins the game along with the chicken loot that comes with it.</p>
											<p>Anyone can restart or the winner can claim and restart.</p>
											<h4>Winning’s distribution?</h4>
											<p>The contract resets after claim and sets the countdown before a new round begins.</p>
											<h4>Chicken Loot distribution?</h4>
											<p>The pest treasure balance will be distributed as follows:</p>
											<p>-70% credited instantly to the winners address</p>
											<p>-20% carried over to the next round</p>
											<p>-10% distributed to charity.</p>
											<p>Note:</p>
											<p>-Winners are crowned Chicken King for 24hours before a new battle.</p>
											<p>-Anyone can bid but the last bidder wins the game.</p>
											<p>-All bids are final. Your chickens cannot be returned after bids.</p>
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


			<Modal isOpen={modal} toggle={modalToggle} className="connect-box" centered={true}>

				<ModalBody>
					<div className="mt-3 mb-3 text-center">
						<p className="txfont">Transaction is Processing...</p>

					</div>
				</ModalBody>

			</Modal>

		</div>
	);
}

export default KingGame;