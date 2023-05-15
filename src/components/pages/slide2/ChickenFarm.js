/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";


// import VideoPlayer from 'react-video-js-player';
import Header from '../header.js';
import Footer from '../footer.js';
import egga from '../../images/egga.gif';
import land from '../../images/land.svg';
import childe from '../../images/childe.svg';
import stoke from '../../images/stoke.png';
import marketbtn from '../../images/marketbtn.png';
import bysine from '../../images/bysine.png'
import arrow from '../../images/round_arrow.svg';
import chicken1 from '../../images/chicken10.png';
import chicken100 from '../../images/chicken100.png';
import acc__arrow_revse from '../../images/acc__arrow_revse.svg'
import modal_earth from '../../images/modal_earth.png'
import chicken1000 from '../../images/chicken1000.png';
import chickSine from '../../images/chickSine.svg'
import eggs1 from '../../images/eggs1.png';
import solerimg1 from '../../images/solerimg1.svg'
import acc__arrow from '../../images/acc__arrow.svg'
import eggs100 from '../../images/eggs100.png';
import eggs1000 from '../../images/eggs1000.png';

import Web3 from "web3"
// import {useWallet} from '@binance-chain/bsc-use-wallet'
import { CHICKEN_FARMING, CHICKEN_INCUBATOR, MARKETPLACE,HARVEST_FARM,FLUID_TOKEN, SOLAR_TOKEN, TOKEN, CELL_TOKEN} from '../../../Config/index.js';
import CHICKEN_FARMING_ABI from '../../../Config/CHICKEN_FARMING_ABI.json';
import CHICKEN_INCUBATOR_ABI from '../../../Config/CHICKEN_INCUBATOR_ABI.json';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';



const ChickenFarm = () => {

    const [farmArea, setFarmArea] = useState(0);
    const [farmCapacity, setFarmCapacity] = useState(0);
    const [farmBalance, setFarmBalance] = useState(0);
    const [farmSymbol, setFarmSymbol] = useState(null);
    const [chickenSymbol, setChickenSymbol] = useState(null);
    const [chickenEggSymbol, setChickenEggSymbol] = useState(null);
    const [chickenFoodSymbol, setChickenFoodSymbol] = useState(null);
    const [areadamount, setareadamount] = useState("");
    const [buyareadamount, setbuyareadamount] = useState(0);
    const [eggDepositFee, setEggDepositFee] = useState(0);
    const [chickenClaimfee, setChickenClaimfee] = useState(0);


    const [chickenDepositFee, setChickenDepositFee] = useState(0);

    const [chickenRemoveFee, setChickenRemoveFee] = useState(0);

    const [depositedDay, setDepositedDay] = useState(0);


    const [farmLocked, setFarmLocked] = useState(false);
    const [farmApprove, setFarmApprove] = useState(false);
    const [farmTokenId, setFarmTokenId] = useState(null);
    const [landIsfree, setLandIsfree] = useState(false);

    const [farmPrice, setFarmPrice] = useState(0);




    const [chickenBalance, setChickenBalance] = useState(0);
    const [chickenEggBalance, setChickenEggBalance] = useState(0);
    const [chickenFoodBalance, setChickenFoodBalance] = useState(0);
    const [unlockTime, setUnlockTime] = useState(0);
    const [layunlockTime, setlayUnlockTime] = useState(0);
    const [layEndTime, setlayEndTime] = useState(0);


    const [eggunlockTime, setEggUnlockTime] = useState(0);
    const [eggHatchTime, setEggHatchTime] = useState(0);

    const [baseBalance, setBaseBalance] = useState(0);
    const [baseSymbol, setBaseSymbol] = useState("");
    const [baseApproved, setBaseApproved] = useState(0);
    const [baseApprovedIncub, setBaseApprovedIncub] = useState(0);
    const [baseApprovedFarm, setBaseApprovedFarm] = useState(0);

    const [baseToken, setbaseToken] = useState();

    const [endTime, setendTime] = useState(null);
    const [layTime, setlayTime] = useState(null);

    const [eggTime, seteggTime] = useState('45 days');
    const [eggTime2, seteggTime2] = useState('40 days');
    const [areadepositError, setareadepositError] = useState(null);
    const [buyareadepositError, setbuyareadepositError] = useState(null);


    let timeInterval;
    let timeInterval1;
    let timeInterval2;
    let timeInterval3;
    const [chickenDeposited, setChickenDeposited] = useState(0);
    const [chickenEggDeposited, setChickenEggDeposited] = useState(0);
    const [eggsearned, setEggsearned] = useState(0);
    const [hatched, setHatched] = useState(0);
    const [adult, setAdult] = useState(0);
    const [chickenEggApproved, setChickenEggApproved] = useState(0);
    const [chickenApproved, setChickenApproved] = useState(0);
    const [chickenFoodApproved, setChickenFoodApproved] = useState(0);

    const [chickenToken, setChickenToken] = useState(0);
    const [chickenEggToken, setChickenEggToken] = useState(0);
    const [chickenFoodToken, setChickenFoodToken] = useState(0);


    const [cbalance, setcBalance] = useState(0);
    const [cebalance, setceBalance] = useState(0);
    const [csymbol, setcSymbol] = useState(0);
    const [ebalance, seteBalance] = useState(0);
    const [esymbol, seteSymbol] = useState(0);
    const [farmToken, setFarmToken] = useState(null);
    const [aseetBalance, setAseetBalance] = useState(0);
    const [approved, setApproved] = useState(0);

    const [dayamount, setDayamount] = useState(0);
    const [decimals, setDecimals] = useState(0);
    const [damount, setdAmount] = useState('');

    const [solarAmount, setSolarAmount] = useState('');
    const [cdamount, setcdAmount] = useState('');
    const [cedamount, setcedAmount] = useState('');
    const [crdamount, setcrdAmount] = useState('');
    const [addDayamount, setaddDayamount] = useState('');

    const [depositAmount, setDepositAmount] = useState(0);
    const [cdepositAmount, setcDepositAmount] = useState(0);
    const [cedepositAmount, setceDepositAmount] = useState(0);
    const [incubCapacity, setIncubCapacity] = useState(0);

    const [depositError, setDepositError] = useState(false);
    const [cdepositError, setcDepositError] = useState(false);
    const [crdepositError, setcrDepositError] = useState(false);
    const [addDdepositError, setaddDdepositError] = useState(false);

    const [cedepositError, setceDepositError] = useState(false);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [chickenModal, setChickenModal] = useState(false);
    const chickentoggle = () => setChickenModal(!chickenModal);

    const [moreChickenModal, setMoreChickenModal] = useState(false);
    const moreChickentoggle = () => setMoreChickenModal(!moreChickenModal);

    const [areaModal, setareaModal] = useState(false);
    const areaToggle = () => setareaModal(!areaModal);


    const [buyAreaModal, setBuyAreaModal] = useState(false);
    const buyAreaToggle = () => setBuyAreaModal(!buyAreaModal);

    const [nosellAreaModal, setnoSellModal] = useState(false);
    const nosellAreaToggle = () => setnoSellModal(!nosellAreaModal);



    const [eggModal, setEggModal] = useState(false);
    const eggtoggle = () => setEggModal(!eggModal);

    const [removeChickenModal, setremoveChickenModal] = useState(false);
    const removeChickentoggle = () => setremoveChickenModal(!removeChickenModal);

    const [addDaysChickenModal, setaddDaysChickenModal] = useState(false);
    const addDaysChickentoggle = () => setaddDaysChickenModal(!addDaysChickenModal);


    const [buyModal, setBuyModal] = useState(false);
    const buyToggle = () => setBuyModal(!buyModal);

    // const wallet = useWallet();

    const { address, isConnected } = useAccount()
    let web3Provider = window.ethereum;

  



    const { data: _tokenPerfarm } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerFarmArea',
        watch: true,
    })
    const { data: _baseToken } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'baseToken',
        watch: true,
    })
    const { data: _farmToken } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'moonLand',
        watch: true,
    })
    const { data: _chickenToken } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'solarToken',
        watch: true,
    })
    const { data: _chickenFoodToken } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'fluidToken',
        watch: true,
    })


    // console.log(_chickenFoodToken);

    const { data: _depositFee } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'getDepositFee',
        args: [1],
        watch: true,
    })

    const { data: _removeFee } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'getRemoveFee',
        args: [1],
        watch: true,
    })
    const { data: _chickenFoodSymbol } = useContractRead({
        address: FLUID_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'symbol',
        watch: true,
    })
    const { data: _symbol } = useContractRead({
        address: HARVEST_FARM,
        abi: NFT_ABI,
        functionName: 'symbol',
        watch: true,
    })
    console.log(_symbol);
    const { data: _chickenSymbol } = useContractRead({
        address: SOLAR_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'symbol',
        watch: true,
    })

    const { data: _baseSymbol } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'symbol',
        watch: true,
    })
    console.log(_baseSymbol)
    const { data: _baseApproved } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, MARKETPLACE],
        watch: true,
    })
    const { data: _baseApprovedFarm } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, CHICKEN_FARMING],
        watch: true,
    })
    
    const { data: _baseApprovedIncub } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, CHICKEN_INCUBATOR],
        watch: true,
    })
    const { data: _baseBalance } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
    })
    const { data: _nftBalance } = useContractRead({
        address: HARVEST_FARM,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
        // enabled:farmToken
    })
    // console.log("balance",parseInt(_nftBalance));
    const { data: _userInfo } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'userInfo',
        args: [address],
        watch: true,
    })
    const { data: _userChickens } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'getUserSolars',
        args: [address],
        watch: true,
    })
 
    const { data: _userEggs } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'pendingCells',
        args: [address],
        watch: true,
    })
    const { data: _userChickenDie } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'getUnlockTime',
        args: [address],
        watch: true,
    })
    const { data: _chickenFoodBalance1 } = useContractRead({
        address: FLUID_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
    })
   
    const { data: _chickenBalance2 } = useContractRead({
        address: SOLAR_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
    })
    const { data: _chickenApproved } = useContractRead({
        address: SOLAR_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, CHICKEN_FARMING],
        watch: true,
    })
    console.log(parseInt(_chickenApproved));
    const { data: _chickenFoodApproved } = useContractRead({
        address: FLUID_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, CHICKEN_FARMING],
        watch: true,
    })
    const { data: _nftTokenId } = useContractRead({
        address: HARVEST_FARM,
        abi: NFT_ABI,
        functionName: 'ownerTokens',
        args: [address],
        watch: true,
    })
    // console.log(parseInt(_nftTokenId));
    const { data: _approved } = useContractRead({
        address: HARVEST_FARM,
        abi: NFT_ABI,
        functionName: 'getApproved',
        args: [_nftTokenId],
        watch: true,
    })
    const { data: _landIsfree } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'landIsfree',
        args: [_nftTokenId, address],
        watch: true,
    })
    const { data: _userInfo2 } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'getUserToken',
        args: [address],
        watch: true,
    })
 
    const { data: _chickenEggToken } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'cellToken',
        watch: true,
    })
    const { data: _capacity } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'capacity',
        watch: true,
    })
    const { data: _depositFee1 } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'getDepositFee',
        args: [1],
        watch: true,
    })
   
    const { data: _chickenEggSymbol } = useContractRead({
        address: CELL_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'symbol',
        watch: true,
    })
    const { data: _balance } = useContractRead({
        address: CELL_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
    })
    const { data: _userInfo3 } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'userInfo',
        args: [address],
        watch: true,
    })
    // console.log("balance",_userInfo3)
    const { data: _chickenEggApproved } = useContractRead({
        address: CELL_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, CHICKEN_INCUBATOR],
        watch: true,
    })
    
    const { data: _unlockItem } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'getUnlockTime',
        args: [address],
    })

    const { data: _userItens } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'pendingItems',
        args: [address],
        watch: true,
    })
    const { data: _unlockItem2 } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'getHatchTime',
        args: [address],
        watch: true,
    })
    let _amt = ethers.utils.parseEther('1').toString();
    const { data: _claimChickenFee1 } = useContractRead({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'getClaimFee',
        args: [_amt],
        watch: true,
    })
    const { data: _userClaimTimesOne } = useContractRead({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'getNextClaim',
        args: [address],
        watch: true,
    })
   
 
 
    const getData = async () => {
        // console.log(parseInt(_nftBalance));
    console.log("njh")
        
        setFarmBalance(parseInt(_nftBalance));

        setFarmPrice(parseFloat(_tokenPerfarm / 1e18).toFixed(2));
        setbaseToken(_baseToken);
        setFarmToken(_farmToken);
        setChickenDepositFee(parseInt(_depositFee));
        setChickenRemoveFee(parseInt(_removeFee));
        setChickenFoodToken(_chickenFoodToken)
        setChickenToken(_chickenToken)
         setChickenFoodApproved(parseInt(_chickenFoodApproved));
       
        
            setChickenApproved(parseInt(_chickenApproved));
            setBaseApprovedFarm(parseInt(_baseApprovedFarm));
            let _chickenBalance = parseFloat(_chickenBalance2 / 1e18).toFixed(2);
            setChickenBalance(_chickenBalance);
            setChickenSymbol(_chickenSymbol);
            setChickenDeposited(parseFloat(_userChickens / 1e18).toFixed(2));

         setFarmSymbol(_symbol);
         setBaseApproved(_baseApproved);
         setBaseApprovedIncub(_baseApprovedIncub);

         setBaseBalance(parseFloat(_baseBalance / 1e18).toFixed(2));

        setChickenFoodSymbol(_chickenFoodSymbol)
        let _chickenFoodBalance = parseFloat(_chickenFoodBalance1 / 1e18).toFixed();

        setChickenFoodBalance(_chickenFoodBalance);
        setEggsearned(parseFloat(_userEggs / 1e18).toFixed());

        setUnlockTime(_userChickenDie);
        console.log("hnjj")

        // let _userClaimTimes = Object.keys(_userClaimTimesOne).map((key) => _userClaimTimes[key]);
        // console.log("claimeTimes", _userClaimTimes[1]);
        // setlayUnlockTime(_userClaimTimes[1]);
        // setlayEndTime(_userClaimTimes[0]);

        setBaseSymbol(_baseSymbol);


        if (_nftBalance > 0 || _userInfo?.landlocked) {

            setFarmTokenId(parseInt(_nftTokenId));
            console.log("hhh")

                    if (_approved === CHICKEN_FARMING) {
                        setFarmApprove(true);
                    }
                    if (_userInfo2[4]) {
                        setFarmTokenId(_userInfo2[1]);
    
                        setFarmArea(parseFloat(_userInfo2[2] / 1e18).toFixed(2));
                        setFarmCapacity(parseFloat(_userInfo2[3] / 1e18).toFixed(2));
    
                    }
                    // let _landIsfree = await _farmingContract.methods.landIsfree(_nftTokenId, address).call();
                    setLandIsfree(_landIsfree);
            //         // let _userInfo2 = await _farmingContract.methods.getUserToken(address).call();
    
                    setFarmLocked(_userInfo2[4]);
    
    
            //         // console.log(_userInfo[4]);
                 
                }
               




        // let _web3 = new Web3(web3Provider);
        // let _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI, CHICKEN_FARMING);
        // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // // let _tokenPerfarm = await _marketContract.methods.getTokenPerFarmArea().call();
        //   console.log("token::" , parseFloat(_tokenPerfarm));
        // // let _baseToken = await _marketContract.methods.baseToken().call();
        // // console.log(_baseToken);

        // let _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI, _baseToken);
        // // let farmToken = await _farmingContract.methods.farmLand().call();
        // // console.log(farmToken)
        // // let _chickenToken = await _farmingContract.methods.chickenToken().call();

        // // let _chickenFoodToken = await _farmingContract.methods.foodToken().call();
        // //  console.log(_chickenFoodToken)

        // // let _depositFee = await _farmingContract.methods.getDepositFee(1).call();
        // // console.log(_depositFee);
        // // let _removeFee = await _farmingContract.methods.getRemoveFee(1).call();
        // // console.log(_removeFee);
        // // let _nftContract = new _web3.eth.Contract(NFT_ABI, farmToken);
        // // let _chickenContract = new _web3.eth.Contract(TOKEN_ABI, _chickenToken);
        // // let _chickenFoodContract = new _web3.eth.Contract(TOKEN_ABI, _chickenFoodToken);
        // // let _chickenFoodSymbol = await _chickenFoodContract.methods.symbol().call();
        // // console.log(_chickenFoodSymbol);
        // // let _symbol = await _nftContract.methods.symbol().call();
        // // console.log(_symbol);
        // // let _chickenSymbol = await _chickenContract.methods.symbol().call();
        // // console.log(_chickenSymbol);
        
        // // let _baseSymbol = await _baseTokenContract.methods.symbol().call();
        // // console.log(_baseSymbol);

        // if (address) {
        //     // address = '0xef519A99b4921aC70387A3e1Fb6cCDeB853C0aB2' ;
        //     // let _baseApproved = await _baseTokenContract.methods.allowance(address, MARKETPLACE).call();


        //     // let _baseApprovedFarm = await _baseTokenContract.methods.allowance(address, CHICKEN_FARMING).call();
        //     // console.log(_baseApproved);
        //     // let _baseApprovedIncub = await _baseTokenContract.methods.allowance(address, CHICKEN_INCUBATOR).call();
        //     // console.log('Incub Approved' , _baseApprovedIncub);    
        //     // let _baseBalance = await _baseTokenContract.methods.balanceOf(address).call();
        //     // console.log(_baseBalance); 
       


        //     // let _nftBalance = await _nftContract.methods.balanceOf(address).call();
        //     // let _userInfo = await _farmingContract.methods.userInfo(address).call();
        //     // let _userChickens = await _farmingContract.methods.getUserChickens(address).call();
        //     // if(_userInfo)
        //     // console.log(_userChickens);
           
        //     if (_userInfo.chickens > 0) {
        //         // let _userEggs = await _farmingContract.methods.pendingEggs(address).call();
        //         // console.log(_userEggs);
        //     }


        //     if (_userChickens > 0) {


        //         // let _userChickenDie = await _farmingContract.methods.getUnlockTime(address).call();



        //     }

        //     if (_userChickens > 0) {


        //         // let _userClaimTimes = await _farmingContract.methods.getNextClaim(address).call();
        //         // console.log(_userClaimTimes)



        //     }


        //     // let _chickenFoodBalance = await _chickenFoodContract.methods.balanceOf(address).call();
        //     // console.log(_chickenFoodBalance)
            
        //     // let _chickenBalance = await _chickenContract.methods.balanceOf(address).call();
        //     // let _chickenApproved = await _chickenContract.methods.allowance(address, CHICKEN_FARMING).call();
           
        //     // let _chickenFoodApproved = await _chickenFoodContract.methods.allowance(address, CHICKEN_FARMING).call();
           

          
        //     // console.log(_userInfo);
         
        // }


    }
// console.log(chickenApproved);
console.log(farmCapacity);
    useEffect(() => {
        // if (window.ethereum) {
        //     web3Provider = window.ethereum;
        // }
        // else {
        //     web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

        // }
        // getEggData();
        getData();
        getEggData()
        if (unlockTime > 0) {
            clearInterval(timeInterval);
            timeInterval = setInterval(() => {
                getTime();

            }, 1000);

        }

        if (layEndTime > 0) {
            clearInterval(timeInterval1);
            timeInterval1 = setInterval(() => {
                getlayTime();

            }, 1000);

        }

        if (eggunlockTime > 0) {
            clearInterval(timeInterval2);
            timeInterval2 = setInterval(() => {

                getEggTime();
            }, 1000);

        }

        if (eggHatchTime > 0) {
            clearInterval(timeInterval3);
            timeInterval3 = setInterval(() => {
                // getEggHatchTime() ;

            }, 1000);

        }

        // alert(farmBalance)

    }, [address, unlockTime, layunlockTime, layEndTime, eggunlockTime, eggHatchTime,_baseApproved,_baseApprovedFarm,_baseApprovedIncub,_nftBalance,_userInfo2,farmBalance,_userChickens,farmTokenId,_chickenApproved,_baseApprovedFarm,modal,_chickenFoodApproved,_userInfo3])
    // console.log(parseInt(_capacity));
    const getEggData = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _incubatorContract = new _web3.eth.Contract(CHICKEN_INCUBATOR_ABI, CHICKEN_INCUBATOR);
        // // let _chickenEggToken = await _incubatorContract.methods.eggToken().call();
        // // console.log(_chickenEggToken)
        setChickenEggToken(_chickenEggToken);
        setChickenEggApproved(_chickenEggApproved);
        setEggDepositFee(parseInt(_depositFee1));
        // // let _capacity = await _incubatorContract.methods.capacity().call();
        setIncubCapacity(parseInt((_capacity)/1e18).toFixed(2));

        // // let _depositFee = await _incubatorContract.methods.getDepositFee(1).call();
        



        // let _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI, _chickenEggToken);

        // // let _chickenEggSymbol = await _chickenEggContract.methods.symbol().call();
        setChickenEggSymbol(_chickenEggSymbol);

        // if (address) {
        //     // address = '0xef519A99b4921aC70387A3e1Fb6cCDeB853C0aB2' ;

        //     // let _balance = await _chickenEggContract.methods.balanceOf(address).call();
        //     // let _userInfo = await _incubatorContract.methods.userInfo(address).call();
            setChickenEggBalance(parseFloat(_balance / 1e18).toFixed())
            setChickenEggDeposited(parseFloat(_userInfo3[0] / 1e18).toFixed());

        //     // let _chickenEggApproved = await _chickenEggContract.methods.allowance(address, CHICKEN_INCUBATOR).call();
          


        //     if (_userInfo3[0] > 0) {
        //         // let _userItens = await _incubatorContract.methods.pendingItems(address).call();
        //         //   console.log(_userItens);
                setHatched(parseFloat(_userItens[0] / 1e18).toFixed());
                let _adults = parseFloat(_userItens[1] / 1e18).toFixed();
                setAdult(_adults);
                
        //         // let _unlockItem = await _incubatorContract.methods.getUnlockTime(address).call();
                setEggUnlockTime(_unlockItem);
        //         // let _unlockItem2 = await _incubatorContract.methods.getHatchTime(address).call();
                setEggHatchTime(_unlockItem2);
        //         // let _amt = _web3.utils.toWei('1');
        //         // let _claimChickenFee = await _incubatorContract.methods.getClaimFee(_amt).call();
        //         // console.log(_claimChickenFee);
                let _claimChickenFee = parseFloat(_adults * _claimChickenFee1 / 1e18).toFixed(2)
                setChickenClaimfee(_claimChickenFee);



        //     }

        // }


    }



    const { config: lockNFTConfig_ } = usePrepareContractWrite({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'checkAndTransferLand',
        args: [address, farmTokenId],
    })

    const { data: lockNFTData, writeAsync: lockNFTWriteAsync, isError: lockNFTError } = useContractWrite(lockNFTConfig_)

    const { isSuccess: lockNFTSuccess } = useWaitForTransaction({
        hash: lockNFTData?.hash,
    })


    if (lockNFTError && modal) {
        setModal(false);
    }
    if (lockNFTSuccess && modal) {
        setModal(false);
        getData();

    }



    const lockNFT = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await lockNFTWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI, CHICKEN_FARMING);

        // _farmingContract.methods.checkAndTransferLand(address, farmTokenId).send({ from: address }).on('receipt', function (receipt) {

        //     getData();
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    const getlayTime = async () => {
        let _current = new Date().getTime() / 1e3;
        console.log(unlockTime);

        console.log("Next Time", layunlockTime)
        if (parseInt(_current) > parseInt(layEndTime)) {
            setlayTime(null);

        }
        else {
            if (parseInt(_current) > parseInt(layunlockTime)) {
                getData();
            }
            else {
                let remainingSecondsLay = layunlockTime - _current;
                console.log("Remaining Sec", remainingSecondsLay);

                let remainingDayLay = Math.floor(
                    remainingSecondsLay / (60 * 60 * 24)
                );



                let remainingHourLay = Math.floor(
                    (remainingSecondsLay % (60 * 60 * 24)) / (60 * 60)
                );
                let remainingMinutesLay = Math.floor(
                    (remainingSecondsLay % (60 * 60)) / 60
                );
                let remainingSecLay = Math.floor(remainingSecondsLay % 60);
                let _endTimeLay;
                if (remainingDayLay > 0) {
                    _endTimeLay = remainingDayLay + "d : " + remainingHourLay + "h : " + remainingMinutesLay + "m";
                    setlayTime(_endTimeLay);

                }
                else {
                    _endTimeLay = remainingHourLay + "h : " + remainingMinutesLay + "m : " + remainingSecLay + "s";
                    setlayTime(_endTimeLay);

                }
            }

        }
    }
    const getTime = async () => {
        let _current = new Date().getTime() / 1e3;
        console.log(unlockTime);

        if (parseInt(_current) > parseInt(unlockTime)) {
            setendTime(null);
            // console.log('ended')
            // console.log('Current', _current)
        }
        else {

            let remainingSeconds = unlockTime - _current;
            // console.log("Remaining Sec", remainingSeconds);

            let remainingDay = Math.floor(
                remainingSeconds / (60 * 60 * 24)
            );

            let _depositDay = Math.round(
                remainingSeconds / (60 * 60 * 24)
            );

            setDepositedDay(_depositDay)

            let remainingHour = Math.floor(
                (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
            );
            let remainingMinutes = Math.floor(
                (remainingSeconds % (60 * 60)) / 60
            );
            let remainingSec = Math.floor(remainingSeconds % 60);
            let _endTime;
            if (remainingDay > 0) {
                _endTime = remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
                setendTime(_endTime);

            }
            else {
                _endTime = remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
                setendTime(_endTime);

            }
        }

    }



    const getEggHatchTime = async () => {
        let _current = new Date().getTime() / 1e3;
        console.log(eggHatchTime);
        if (parseInt(_current) > parseInt(eggHatchTime)) {
            seteggTime2(0);
            // console.log('ended')
            // console.log('Current', _current)
        }
        else {
            let remainingSeconds = eggHatchTime - _current;
            // console.log("Remaining Sec", remainingSeconds);

            let remainingDay = Math.floor(
                remainingSeconds / (60 * 60 * 24)
            );
            let remainingHour = Math.floor(
                (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
            );
            let remainingMinutes = Math.floor(
                (remainingSeconds % (60 * 60)) / 60
            );
            let remainingSec = Math.floor(remainingSeconds % 60);
            let _endTime;
            if (remainingDay > 0) {
                _endTime = remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
                seteggTime2(_endTime);

            }
            else {
                _endTime = remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
                seteggTime2(_endTime);

            }
        }

    }


    const getEggTime = async () => {
        let _current = new Date().getTime() / 1e3;
        console.log(eggunlockTime);
        if (parseInt(_current) > parseInt(eggunlockTime)) {
            seteggTime("Yielded");
            // console.log('ended')
            // console.log('Current', _current)
        }
        else {
            let remainingSeconds = eggunlockTime - _current;
            // console.log("Remaining Sec", remainingSeconds);

            let remainingDay = Math.floor(
                remainingSeconds / (60 * 60 * 24)
            );
            let remainingHour = Math.floor(
                (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
            );
            let remainingMinutes = Math.floor(
                (remainingSeconds % (60 * 60)) / 60
            );
            let remainingSec = Math.floor(remainingSeconds % 60);
            let _endTime;
            if (remainingDay > 0) {
                _endTime = remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
                seteggTime(_endTime);

            }
            else {
                _endTime = remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
                seteggTime(_endTime);

            }
        }

    }





    // let _camount = ethers.utils.parseEther(parseFloat(crdamount)).toString();

    const { config: removeChickenConfig_ } = usePrepareContractWrite({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'removeSolar',
        args: [(isNaN(crdamount)|| crdamount=="")?0:ethers.utils.parseEther(crdamount.toString())]
    })
// console.log(crdamount==""?0:ethers.utils.parseEther(crdamount.toString()));
    const { data: removeChickenData, writeAsync: removeChickenWriteAsync, isError: removeChickenError } = useContractWrite(removeChickenConfig_)

    const { isSuccess: removeChickenSuccess } = useWaitForTransaction({
        hash: removeChickenData?.hash,
    })


    if (removeChickenError && modal) {
        setModal(false);
        
    }
    if (removeChickenSuccess && modal && removeChickenModal) {
        getData();
        setModal(false);
        setremoveChickenModal(false);
    }




    const removeChicken = async () => {
        // let _web3 = new Web3(web3Provider);
        setcrDepositError(false)
        if (chickenDeposited < crdamount) {
            setcrDepositError("Error: Insufficient deposited balance");
            return false;
        }

        else {

            setModal(true);
            await removeChickenWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _famringContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI, CHICKEN_FARMING);

            // let _camount = _web3.utils.toWei(crdamount.toString());
            // console.log(farmTokenId, _camount, dayamount);

            // _famringContract.methods.removeChicken(_camount).send({ from: address }).on('receipt', function (receipt) {

            //     getData();

            //     setModal(modal);
            //     setremoveChickenModal(!removeChickenModal
            //     );

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }
    }



    // let _camount = ethers.utils.parseEther(crdamount).toString();

    const { config: depositMoreChickenConfig_ } = usePrepareContractWrite({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'depositMore',
        args: [cdamount==""? 0: ethers.utils.parseEther(cdamount).toString(), farmTokenId]
    })

    const { data: depositMoreChickenData, writeAsync: depositMoreChickenWriteAsync, isError: depositMoreChickenError } = useContractWrite(depositMoreChickenConfig_)

    const { isSuccess: depositMoreChickenSuccess } = useWaitForTransaction({
        hash: depositMoreChickenData?.hash,
    })


    if (depositMoreChickenError && modal) {
        
        setModal(false);
    }
    if (depositMoreChickenSuccess && modal) {
        getData();
        setModal(false);
        moreChickentoggle();
    }


// alert(cdamount)

    const depositMoreChicken = async () => {
        // let _web3 = new Web3(web3Provider);
        // console.log("moreinfoe",parseInt(chickenFoodBalance), cdamount * dayamount * 20)
        setcDepositError(false)
        if (parseInt(chickenFoodBalance) < cdamount * dayamount * 20) {
            setcDepositError("Error: Insufficient fluid amount");
            return false;
        }
        else if (cdamount > (farmCapacity - chickenDeposited)) {
            setcDepositError("Error: Insufficient Harvest Land");
            return false;
        }
        else {

            setModal(true);
            await depositMoreChickenWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _famringContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI, CHICKEN_FARMING);
            // let _amount = _web3.utils.toWei('5000000000000000000');
            // let _camount = _web3.utils.toWei(cdamount.toString());
            // console.log(farmTokenId, _camount, dayamount);

            // _famringContract.methods.depositMore(_camount, farmTokenId).send({ from: address }).on('receipt', function (receipt) {

            //     getData();

            //     setModal(modal);
            //     moreChickentoggle();

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }
    }

    
    console.log("moreinfoe",parseInt(farmTokenId),solarAmount==""?0: ethers.utils.parseEther(solarAmount).toString(),parseInt(dayamount))

// console.log(parseInt(cdamount), parseInt(farmTokenId), parseInt(dayamount));
    const { config: depositChickenConfig_ } = usePrepareContractWrite({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'deposit',
        args: [parseInt(farmTokenId),solarAmount==""?0: ethers.utils.parseEther(solarAmount).toString(),parseInt(dayamount)]
        // args: [1, 2,1]
    })

    const { data: depositChickenData, writeAsync: depositChickenWriteAsync, isError: depositChickenError } = useContractWrite(depositChickenConfig_)

    const { isSuccess: depositChickenSuccess } = useWaitForTransaction({
        hash: depositChickenData?.hash,
    })


    if (depositChickenError && modal) {
        // getData();

        setModal(false);
    }
    if (depositChickenSuccess && modal) {
        chickentoggle();
        setModal(false);
    }


    const depositChicken = async () => {
        // let _web3 = new Web3(web3Provider);
        setcDepositError(false)
        // con
        // console.log("moreinfoe",parseInt(chickenFoodBalance), solarAmount * dayamount * 20)
        
        if (chickenFoodBalance < solarAmount * dayamount * 600) {
            setcDepositError("Error: Insufficient fluid Balance");
            return false;
        }
        else if (solarAmount > (farmCapacity - chickenDeposited)) {
            setcDepositError("Error: Insufficient Harvest Land");
            return false;
        }
        else {

            setModal(true);
            await depositChickenWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _famringContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI, CHICKEN_FARMING);
            // let _amount = _web3.utils.toWei('5000000000000000000');
            // let _camount = _web3.utils.toWei(cdamount.toString());
            // console.log(farmTokenId, _camount, dayamount);

            // _famringContract.methods.deposit(farmTokenId, _camount, dayamount).send({ from: address }).on('receipt', function (receipt) {

            //     getData();

            //     setModal(modal);
            //     chickentoggle();

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }
    }


    let _amount = ethers.utils.parseEther('5000000000000000000').toString()
    const { config: approvebaseTokenFarmConfig_ } = usePrepareContractWrite({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [CHICKEN_FARMING, _amount]
    })

    const { data: approvebaseTokenFarmData, writeAsync: approvebaseTokenFarmWriteAsync, isError: approvebaseTokenFarmError } = useContractWrite(approvebaseTokenFarmConfig_)

    const { isSuccess: approvebaseTokenFarmSuccess } = useWaitForTransaction({
        hash: approvebaseTokenFarmData?.hash,
    })


    if (approvebaseTokenFarmError && modal) {
        setModal(false);
    }
    if (approvebaseTokenFarmSuccess && modal) {
        getData();
        setModal(false);
    }

    const approvebaseTokenFarm = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approvebaseTokenFarmWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _baseTokenContract.methods.approve(CHICKEN_FARMING, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getData();
        //     setModal(modal);



        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    const { config: approvebaseTokenIncubConfig_ } = usePrepareContractWrite({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [CHICKEN_INCUBATOR,
            ethers.utils.parseEther('5000000000000000000').toString()]
    })

    const { data: approvebaseTokenIncubData, writeAsync: approvebaseTokenIncubWriteAsync, isError: approvebaseTokenIncubError } = useContractWrite(approvebaseTokenIncubConfig_)

    const { isSuccess: approvebaseTokenIncubSuccess } = useWaitForTransaction({
        hash: approvebaseTokenIncubData?.hash,
    })


    if (approvebaseTokenIncubError && modal) {
        setModal(false);
        // depositEgg()
    }
    if (approvebaseTokenIncubSuccess && modal) {
        getEggData();
        setModal(false);
    }


    const approvebaseTokenIncub = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approvebaseTokenIncubWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _baseTokenContract.methods.approve(CHICKEN_INCUBATOR, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getEggData();
        //     setModal(modal);
        //     depositEgg()


        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    const { config: approvebaseTokenConfig_ } = usePrepareContractWrite({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [MARKETPLACE,
            ethers.utils.parseEther('5000000000000000000').toString()]
    })

    const { data: approvebaseTokenData, writeAsync: approvebaseTokenWriteAsync, isError: approvebaseTokenError } = useContractWrite(approvebaseTokenConfig_)

    const { isSuccess: approvebaseTokenSuccess } = useWaitForTransaction({
        hash: approvebaseTokenData?.hash,
    })


    if (approvebaseTokenError && modal) {
        setModal(false);
    }
    if (approvebaseTokenSuccess && modal) {
        buyAreaNFT()
        getData();
        setModal(false);
    }


    const approvebaseToken = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approvebaseTokenWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _baseTokenContract.methods.approve(MARKETPLACE, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getData();
        //     setModal(modal);
        //     buyAreaNFT()


        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }

    const { config: approveChickenFoodConfig_ } = usePrepareContractWrite({
        address: FLUID_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [CHICKEN_FARMING,
            ethers.utils.parseEther('5000000000000000000').toString()]
    })

    const { data: approveChickenFoodData, writeAsync: approveChickenFoodWriteAsync, isError: approveChickenFoodError } = useContractWrite(approveChickenFoodConfig_)

    const { isSuccess: approveChickenFoodSuccess } = useWaitForTransaction({
        hash: approveChickenFoodData?.hash,
    })


    if (approveChickenFoodError && modal) {
        setModal(false);
    }
    if (approveChickenFoodSuccess && modal) {
        setModal(false);
        getData();
        depositChicken();

    }

    const approveChickenFood = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approveChickenFoodWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _chickenFoodContract = new _web3.eth.Contract(TOKEN_ABI, chickenFoodToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _chickenFoodContract.methods.approve(CHICKEN_FARMING, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getData();
        //     setModal(modal);

        //     depositChicken();

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }




    const { config: claimChickenConfig_ } = usePrepareContractWrite({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'claimAdults',
        watch: true,
    })

    const { data: claimChickenData, writeAsync: claimChickenWriteAsync, isError: claimChickenError } = useContractWrite(claimChickenConfig_)

    const { isSuccess: claimChickenSuccess } = useWaitForTransaction({
        hash: claimChickenData?.hash,
    })


    if (claimChickenError && modal) {
        setModal(false);
    }
    if (claimChickenSuccess && modal) {
        getEggData();
        setModal(false);
    }


    const claimChicken = async () => {
        // let _web3 = new Web3(web3Provider);
        if (parseFloat(chickenClaimfee) > parseFloat(baseBalance)) {
            alert("You don't have sufficient MyFarmPet to Pay Claim fees. Required Fee: " + chickenClaimfee + " " + baseSymbol)
            return false
        }
        else {
            setModal(true);
            await claimChickenWriteAsync()
            // const _incubatorContract = new _web3.eth.Contract(CHICKEN_INCUBATOR_ABI, CHICKEN_INCUBATOR);
            // _incubatorContract.methods.claimAdults().send({ from: address }).on('receipt', function (receipt) {

            //     getEggData();
            //     setModal(modal);

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }

    }




    const { config: claimEggsConfig_ } = usePrepareContractWrite({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'claimCells',
        watch: true,
    })

    const { data: claimEggsData, writeAsync: claimEggsWriteAsync, isError: claimEggsError } = useContractWrite(claimEggsConfig_)

    const { isSuccess: claimEggsSuccess } = useWaitForTransaction({
        hash: claimEggsData?.hash,
    })


    if (claimEggsError && modal) {

        setModal(false);
    }
    if (claimEggsSuccess && modal) {
        getData();
        setModal(false);
    }




    const claimEggs = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await claimEggsWriteAsync()
        // const _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI, CHICKEN_FARMING);
        // _farmingContract.methods.claimEggs().send({ from: address }).on('receipt', function (receipt) {

        //     getData();
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });
    }


    const { config: approveChickenEggConfig_ } = usePrepareContractWrite({
        address: CELL_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [CHICKEN_INCUBATOR, ethers.utils.parseEther('5000000000000000000')],
        watch: true,
    })

    const { data: approveChickenEggData, writeAsync: approveChickenEggWriteAsync, isError: approveChickenEggError } = useContractWrite(approveChickenEggConfig_)

    const { isSuccess: approveChickenEggSuccess } = useWaitForTransaction({
        hash: approveChickenEggData?.hash,
    })


    if (approveChickenEggError && modal) {

        setModal(false);
    }
    if (approveChickenEggSuccess && modal) {
        getEggData();
        setModal(false);
    }


    const approveChickenEgg = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approveChickenEggWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI, chickenEggToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _chickenEggContract.methods.approve(CHICKEN_INCUBATOR, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getEggData();
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    const { config: approveChickenConfig_ } = usePrepareContractWrite({
        address: SOLAR_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [CHICKEN_FARMING, ethers.utils.parseEther('5000000000000000000')],
        watch: true,
    })
// console.log( ethers.utils.parseEther('5000000000000000000'));
    const { data: approveChickenData, writeAsync: approveChickenWriteAsync, isError: approveChickenError } = useContractWrite(approveChickenConfig_)

    const { isSuccess: approveChickenSuccess } = useWaitForTransaction({
        hash: approveChickenData?.hash,
    })


    if (approveChickenError && modal) {

        setModal(false);
    }
    if (approveChickenSuccess && modal) {
      
        setModal(false);
        getEggData();
        getData();

    }


    const approveChicken = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approveChickenWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _chickenContract = new _web3.eth.Contract(TOKEN_ABI, chickenToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _chickenContract.methods.approve(CHICKEN_FARMING, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getData();
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }





    const { config: addDaysConfig_ } = usePrepareContractWrite({
        address: CHICKEN_FARMING,
        abi: CHICKEN_FARMING_ABI,
        functionName: 'addMoreDays',
        args: [parseInt(addDayamount)],
        watch: true,
    })

    const { data: addDaysData, writeAsync: addDaysWriteAsync, isError: addDaysError } = useContractWrite(addDaysConfig_)

    const { isSuccess: addDaysSuccess } = useWaitForTransaction({
        hash: addDaysData?.hash,
    })


    if (addDaysError && modal) {

        setModal(false);
    }
    if (addDaysSuccess && modal) {
        getData();
        addDaysChickentoggle();
        setModal(false);
    }

    const addDays = async () => {
        setaddDdepositError(false);
        let _maxamount = chickenFoodBalance / (20 * chickenDeposited);
        if (parseInt(_maxamount) < parseInt(addDayamount)) {
            setaddDdepositError("Error: Insufficient fluid Balance");
            return false;
        }

        else {
            // let _web3 = new Web3(web3Provider);

            setModal(true);
            await addDaysWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI, CHICKEN_FARMING);
            // let _camount = parseInt(addDayamount);
            //    console.log(farmTokenId,_camount,dayamount);

            // _farmingContract.methods.addMoreDays(_camount).send({ from: address }).on('receipt', function (receipt) {

            //     getData();
            //     setModal(modal);
            //     addDaysChickentoggle();

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }
    }


    const { config: depositEggConfig_ } = usePrepareContractWrite({
        address: CHICKEN_INCUBATOR,
        abi: CHICKEN_INCUBATOR_ABI,
        functionName: 'deposit',
        args: [cedamount==""?0:ethers.utils.parseEther?.(cedamount.toString()).toString()],
        watch: true,
    })

    const { data: depositEggData, writeAsync: depositEggWriteAsync, isError: depositEggError } = useContractWrite(depositEggConfig_)

    const { isSuccess: depositEggSuccess } = useWaitForTransaction({
        hash: depositEggData?.hash,
    })


    if (depositEggError && modal) {

        setModal(false);
    }
    if (depositEggSuccess && modal) {
        getEggData();
        eggtoggle();
        setModal(false);
    }


    const depositEgg = async () => {
        setceDepositError(false)
        if (parseInt(chickenEggBalance) < parseInt(cedamount)) {
            setceDepositError("Error: Insufficient Energy Packets");
            return false;
        }

        else {
            // let _web3 = new Web3(web3Provider);

            setModal(true);
            await depositEggWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _incubatorContract = new _web3.eth.Contract(CHICKEN_INCUBATOR_ABI, CHICKEN_INCUBATOR);
            // let _camount = _web3.utils.toWei(cedamount.toString());
            // console.log(farmTokenId, _camount, dayamount);

            // _incubatorContract.methods.deposit(_camount).send({ from: address }).on('receipt', function (receipt) {

            //     getEggData();
            //     setModal(modal);
            //     eggtoggle();

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }
    }




    const { config: sellfarmConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'sellMoonLand',
        args: [farmTokenId],
        enabled:farmTokenId
    })

    const { data: sellfarmData, writeAsync: sellfarmWriteAsync, isError: sellfarmError } = useContractWrite(sellfarmConfig_)

    const { isSuccess: sellfarmSuccess } = useWaitForTransaction({
        hash: sellfarmData?.hash,
    })


    if (sellfarmError && modal) {
        setModal(false);
    }
    if (sellfarmSuccess && modal) {
        getData();
        setModal(false);
    }


    const sellfarm = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await sellfarmWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // //   alert(farmTokenId);
        // _marketContract.methods.sellFarmLand(farmTokenId).send({ from: address }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     getData();



        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });



    }

    let _area = buyareadamount.toString();

    const { config: buyAreaNFTConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'buyMoonLand',
        args: [buyareadamount=="" ? 0:ethers.utils.parseEther(_area)],
        watch: true,
    })

    const { data: buyAreaNFTData, writeAsync: buyAreaNFTWriteAsync, isError: buyAreaNFTError } = useContractWrite(buyAreaNFTConfig_)

    const { isSuccess: buyAreaNFTSuccess } = useWaitForTransaction({
        hash: buyAreaNFTData?.hash,
    })


    if (buyAreaNFTError && modal) {
        setModal(false);
    }
    if (buyAreaNFTSuccess && modal) {
        getData();
        buyAreaToggle();
        setModal(false);
    }




    const buyAreaNFT = async () => {
        // let _web3 = new Web3(web3Provider);
        setbuyareadepositError(false);
       

        if (buyareadamount * farmPrice > baseBalance) {
            setbuyareadepositError("Error: Insufficient Balance");
        }
        else {

            setModal(true);
            await buyAreaNFTWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
            // let _area = _web3.utils.toWei(buyareadamount.toString()) ;
            // let _area = buyareadamount.toString();
            // alert(farmTokenId);
            // _marketContract.methods.buyFarmLand(_area).send({ from: address }).on('receipt', function (receipt) {
            //     setModal(modal);
            //     getData();
            //     buyAreaToggle();


            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }

    }



    const { config: addAreaNFTConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'addMoonLandArea',
        args: [parseFloat(areadamount), farmTokenId],
        watch: true,
    })

    const { data: addAreaNFTData, writeAsync: addAreaNFTWriteAsync, isError: addAreaNFTError } = useContractWrite(addAreaNFTConfig_)

    const { isSuccess: addAreaNFTSuccess } = useWaitForTransaction({
        hash: addAreaNFTData?.hash,
    })


    if (addAreaNFTError && modal) {
        setModal(false);
    }
    if (addAreaNFTSuccess && modal) {
        getData();
        areaToggle();
        setModal(false);
    }


    const addAreaNFT = async () => {
        // let _web3 = new Web3(web3Provider);
        setareadepositError(false);
        if (areadamount * farmPrice > baseBalance) {
            setareadepositError("Error: Insufficient Balance");

        }
        else {

            setModal(true);
            await addAreaNFTWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
            // let _area = _web3.utils.toWei(areadamount.toString()) ;
            // let _area = areadamount.toString();
            // alert(farmTokenId);
            // _marketContract.methods.addFarmLandArea(_area, farmTokenId).send({ from: address }).on('receipt', function (receipt) {
            //     setModal(modal);
            //     getData();
            //     areaToggle();


            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }

    }


    const { config: approveNFTConfig_ } = usePrepareContractWrite({
        address: HARVEST_FARM,
        abi: NFT_ABI,
        functionName: 'approve',
        args: [CHICKEN_FARMING, farmTokenId],
        watch: true,
    })
    // console.log("amount",farmTokenId);

    const { data: approveNFTData, writeAsync: approveNFTWriteAsync, isError: approveNFTError } = useContractWrite(approveNFTConfig_)

    const { isSuccess: approveNFTSuccess } = useWaitForTransaction({
        hash: approveNFTData?.hash,
    })


    if (approveNFTError && modal) {
        setModal(false);
       
    }
    if (approveNFTSuccess && modal) {
        setModal(false);
        // lockNFT();
        getData();

    }

    const approveNFT = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approveNFTWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _nftContract = new _web3.eth.Contract(NFT_ABI, farmToken);



    }
// console.log(chickenEggBalance);
    async function setMaxceDeposit() {
        let _damount = chickenEggBalance;
        if (chickenEggBalance > 50) {
            _damount = 50;
        }
        setcedAmount(parseFloat(_damount))

    }



    const setMaxDayDeposit = async () => {
        let _damount = chickenFoodBalance / (20 * chickenDeposited);

        setaddDayamount(parseFloat(_damount))

    }


    const setMaxcrDeposit = async () => {
        let _damount = chickenDeposited;

        setcrdAmount(parseFloat(_damount))

    }

    // async function setMaxArea(){
    //     let _damount = baseBalance;

    //     setareadamount(parseFloat(_damount))

    // }


    const setMaxcDeposit = async () => {
        let _damount = chickenBalance
        if (chickenBalance > farmCapacity) {
            _damount = farmCapacity
        }
        setcdAmount(_damount)
        setSolarAmount(_damount)
        setcDepositAmount(_damount)
    }





    const handlecDepositChange = (e) => {
        setcDepositAmount(e.target.value);
        setcdAmount(e.target.value);
        setSolarAmount(e.target.value);
    }


    const handleAddDayChange = (e) => {
        setaddDayamount(parseFloat(e.target.value));
    }
    const handlecrDepositChange = (e) => {
        setcrdAmount(parseFloat(e.target.value));
    }


    const handleeDepositChange = (e) => {
        setcedAmount(e.target.value);
    }
    const handleDayChange = (e) => {
        setDayamount(e.target.value);
    }

    const handleBuyAreaChange = (e) => {
        setbuyareadamount(e.target.value);
    }
    const handleAreaChange = (e) => {
        setareadamount(e.target.value);
    }

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show3, setShow3] = useState(false);





    return (
        <div>
            <Header />
            <div className="slide-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="slide-heads">
                                <h1>SOLAR HARVESTING</h1>
                                {/* <p>Combine Solar cells and Fluids Harvest</p> */}
                            </div>
                            {/* <div className="wrp-slide">
                                    <div className="slide-prev">
                                        <a href="/slide1" className="novisible"><img src={lefticon} /></a>
                                    </div>
                                    <div className="slide-imgs">
                                        <img src={slide2} />
                                    </div>
                                    <div className="slide-next">
                                        <a href="/slide3"><img src={righticon} /></a>
                                    </div>
                                </div> */}
                            {/* <div className="bullet-list-wrp">
                                <div className="market-btn">
                                    <a href="/marketplace"><img src={marketbtn} alt="" /></a>
                                    <a href="/slide3"><img src={farmingbtn} /></a>
                                </div>
                            </div> */}
                            <div className='marketplace-box-wrap4'>
                                <div className="newpool-box" >
                                    <div className="alienpool-wrp">
                                        <div className="alienpool">
                                            <div className="alienpool-img">
                                                <img src={land} alt="" />
                                            </div>
                                            <div className="alienpool-content">
                                                <h3>Moon Land</h3>
                                            </div>
                                        </div>
                                        {/* <div className="alienbal">
                                            <div class="balance"><h3>{0.0000}</h3><p>Balance</p></div>
                                            <div class="balance"><h3>0.0000</h3><p>Area</p></div>
                                       </div> */}
                                        <div className='alien___rightBox'>
                                            <div className="alientime">
                                                {/* <div className="time__list">
                                                    <h3>{isNaN(farmBalance)? 0.00 :farmBalance} {farmSymbol}</h3>
                                                    <p>Your Balance</p>
                                                </div> */}
                                                <div className="time__list">
                                                    <h3>{farmArea} sq Yards</h3>
                                                    <p>Your Land’s Area</p>
                                                </div>
                                                {/* <div className="time__list">
                                                    <h3><span className='dollar__text'>${" "}</span>{farmArea * 1}</h3>
                                                    <p>Market Value</p>
                                                </div> */}
                                                <div className="time__list">
                                                    <h3>{farmCapacity ?? 0}</h3>
                                                    <p>Harvesters Capacity</p>
                                                </div>
                                             
                                            <div className='acc__arrow___icon' onClick={() => setShow3(prev => !prev)} >

{show3 ?
    <img src={acc__arrow_revse} alt='' />
    :
    <img src={acc__arrow} alt='' />
}
</div>
                                            </div>

                                            {/* <div className="alienbtns">
                                                

                                                <div className="pool-btns" style={{ justifyContent: 'end' }}>


                                                    {
                                                        !farmLocked && farmBalance > 0 && farmApprove &&
                                                        <a className="bg___BTN2" onClick={lockNFT} >Lock {farmSymbol} NFT</a>
                                                    }
                                                    {
                                                        farmBalance > 0 && !farmApprove &&
                                                        <a className="bg___BTN2" onClick={approveNFT}>Approve & Lock {farmSymbol} NFT</a>
                                                    }
                                                    {
                                                        farmLocked &&
                                                        <a className="bg___BTN2" onClick={areaToggle}>Buy More Harvest Area</a>
                                                    }
                                                    {
                                                        !farmLocked && farmBalance == 0 &&
                                                        <a className="bg___BTN2" onClick={buyAreaToggle}>Buy Harvest Area</a>
                                                    }
                                                    {
                                                        landIsfree &&
                                                        <a className="bg___BTN2 ml-2" onClick={sellfarm}>Sell Harvest Area</a>
                                                    }

                                                </div>
                                            </div> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {show3 &&
                                <div className='acc__summery'>
                                    <div className='acc__summery__in'
                                    
                                    >




                                        {/* <div className="pool-btns">
                                                        <p style={{color: '#fff'}}>Chicken Farming is being upgraded to a newer version with enhanced features between 8:30 hours UTC to 12:30 hours UTC. During this time you won't be able to perform any actions. </p>
                                               </div> */}

                                        <div className="pool-btns">
                                        <div className="alientime">
                                               
                                                {
                                                        !farmLocked && farmBalance > 0 && farmApprove &&
                                                        <a className="bg___BTN2" onClick={lockNFT} >Lock {farmSymbol} NFT</a>
                                                    }
                                                    {
                                                        farmBalance > 0 && !farmApprove &&
                                                        <a className="bg___BTN2" onClick={approveNFT}>Approve & Lock {farmSymbol} NFT</a>
                                                    }
                                               
                                                    {
                                                        farmLocked &&
                                                        <a className="bg___BTN2" onClick={areaToggle}>Buy Area</a>
                                                    }
                                                    {
                                                        !farmLocked && farmBalance == 0 &&
                                                        <a className="bg___BTN2" onClick={buyAreaToggle}>Buy Area</a>
                                                    }
                                                    {
                                                        landIsfree &&
                                                        <a className="bg___BTN2 ml-2" onClick={sellfarm}>Sell Area</a>
                                                    }
                                               
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }


                            <div className='marketplace-box-wrap4'>
                                <div className="newpool-box">
                                    <div className="alienpool-wrp">
                                        <div className="alienpool2">
                                            <div className="alienpool-img">
                                                <img src={solerimg1} alt="" />
                                            </div>
                                            <div className="alienpool-content">
                                                <h3>Solar <br />
                                                    Harvester</h3>

                                            </div>
                                        </div>
                                        <div className='alien___rightBox'>
                                            <div className="alientime__accordian">
                                                <div class="time__list">
                                                    <h3>{isNaN(chickenBalance) ? 0.00 :chickenBalance} {chickenSymbol}
                                                        {/* {
                                                            chickenBalance > 0 && chickenBalance <= 10 &&
                                                            <img src={chicken1} width="60px" alt="" />
                                                        }
                                                        {
                                                            chickenBalance > 10 && chickenBalance <= 100 &&
                                                            <img src={chicken100} width="60px" alt="" />
                                                        }
                                                        {
                                                            chickenBalance > 100 && chickenBalance <= 1000 &&
                                                            <img src={chicken1000} width="60px" alt="" />
                                                        } */}

                                                    </h3>
                                                    <p>Balance</p>
                                                </div>
                                                {/* <div className="time__list"><h3>{isNaN(chickenDeposited)? 0.00:chickenDeposited} {chickenSymbol} */}

                                                    {/* {
                                                        chickenDeposited > 0 && chickenDeposited <= 10 &&
                                                        <img src={chicken1} width="60px" alt="" />
                                                    }
                                                    {
                                                        chickenDeposited > 10 && chickenDeposited <= 100 &&
                                                        <img src={chicken100} width="60px" alt="" />
                                                    }
                                                    {
                                                        chickenDeposited > 100 && chickenDeposited <= 1000 &&
                                                        <img src={chicken1000} width="60px" alt="" />
                                                    } */}

                                                {/* </h3><p>Deposited</p></div> */}
                                                <div className="time__list">
                                                    <h3>
                                                        {eggsearned>0?parseFloat(eggsearned).toFixed():0}
                                                        {/* {
                                                            eggsearned > 0 && eggsearned <= 10 &&
                                                            <img src={eggs1} className="ml-2" width="60px" alt="" />
                                                        }
                                                        {
                                                            eggsearned > 10 && eggsearned <= 100 &&
                                                            <img src={eggs100} className="ml-2" width="60px" alt='' />
                                                        }
                                                        {
                                                            eggsearned > 100 && eggsearned <= 1000 &&
                                                            <img src={eggs1000} className="ml-2" width="60px" alt='' />
                                                        } */}
                                                    </h3>
                                                    <p>Energy Packets Earned</p>
                                                    {/* {
                                                        chickenDeposited > 0 && layEndTime > new Date().getTime() / 1e3 &&
                                                        <>
                                                            <h3><span>{layTime}</span></h3>
                                                            <p>Next Harvesting Time</p>
                                                        </>
                                                    }
                                                    {
                                                        chickenDeposited > 0 && layEndTime < new Date().getTime() / 1e3 &&
                                                        <>
                                                            <h3 className="marquee"><span>Not Harvesting Solar</span></h3>

                                                        </>
                                                    } */}


                                                </div>
                                                {/* <div className="time__list">
                                                    <h3><span className='dollar__text'>${" "}</span>{eggsearned>0 ?parseFloat(eggsearned * 0.12).toFixed(2):0}</h3>
                                                    <p>Earned Value</p>
                                                </div> */}
                                                <div className="time__list">
                                                    <h3>{chickenDeposited>0?(chickenDeposited * 365):0}</h3>
                                                    <p>Cells per Year</p>
                                                    {
                                                        chickenDeposited > 0 && unlockTime > new Date().getTime() / 1e3 &&
                                                        <>
                                                            <h3 className="timer">{endTime}</h3>
                                                            <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Solar Fluid.</span></p>
                                                        </>
                                                    }
                                                    {
                                                        chickenDeposited > 0 && unlockTime < new Date().getTime() / 1e3 &&
                                                        <>
                                                            <h3 className="timer">Fluid Used</h3>
                                                            {/* <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Chicken feed to end.</span></p> */}
                                                        </>
                                                    }


                                                </div>

                                            <div
                                            //  className='acc__arrow'
                                            >
                                                <div className='acc__arrow___icon' onClick={() => setShow(prev => !prev)} >

                                                    {show ?
                                                        <img src={acc__arrow_revse} alt='' />
                                                        :
                                                        <img src={acc__arrow} alt='' />
                                                    }
                                                </div>
                                            </div>
                                            </div>

                                        </div>
                                    </div>








                                </div>
                            </div>

                            {show &&
                                <div className='acc__summery'>
                                    <div className='acc__summery__in'
                                    
                                    >




                                        {/* <div className="pool-btns">
                                                        <p style={{color: '#fff'}}>Chicken Farming is being upgraded to a newer version with enhanced features between 8:30 hours UTC to 12:30 hours UTC. During this time you won't be able to perform any actions. </p>
                                               </div> */}

                                        <div className="pool-btns">
                                            <div >
                                                <img src={solerimg1} alt="" width={100}/>
                                                <Link className="bg___BTN2" to="/buy/solar">Buy Cells</Link>
                                            </div>
                                            <div style={{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"}}>
                                               
                                            {
                                                chickenApproved === 0 &&
                                                <a className="bg___BTN2" onClick={approveChicken} >
                                                    <img className='sine' src={chickSine} alt=""/>
                                                    Approve Solar for Harvest</a>
                                            }

                                            {
                                                chickenApproved > 0 && chickenDeposited == 0 &&
                                                <a className="bg___BTN2" onClick={() => setChickenModal(!chickenModal)} >Assemble Solar Cells</a>
                                            }


                                            {
                                                chickenApproved > 0 && chickenDeposited > 0 && unlockTime > new Date().getTime() / 1e3 &&
                                                <a className="bg___BTN2" onClick={() => setMoreChickenModal(!moreChickenModal)} >Assemble More Solar Cells</a>
                                            }



                                            {
                                                chickenDeposited > 0 && unlockTime < new Date().getTime() / 1e3 &&

                                                <a className="bg___BTN2" onClick={removeChickentoggle}>Remove Solar From Harvest</a>

                                            }
                                            {
                                                eggsearned > 0 &&
                                                <a className="bg___BTN2" onClick={claimEggs} >Claim Energy Packets</a>
                                            }
                                            {
                                                chickenDeposited > 0 &&
                                                <a className="bg___BTN2" onClick={() => setaddDaysChickenModal(!addDaysChickenModal)}>Add Fluid</a>

                                            }

                                                </div>
                                        </div>

                                    </div>
                                </div>
                            }




                            <div className='marketplace-box-wrap4'>
                                <div className="newpool-box">
                                    <div className="alienpool-wrp">
                                        <div className="alienpool2">
                                            <div className="alienpool-img">
                                                <img src={childe} alt="" />
                                            </div>
                                            <div className="alienpool-content">
                                                <h3>Forginator</h3>

                                            </div>
                                        </div>
                                        <div className='alien___rightBox'>
                                            <div className="alientime__accordian">
                                                <div class="time__list">
                                                    <h3>{chickenEggBalance>0 ?chickenEggBalance:0} {chickenEggSymbol}

                                                        {/* {
                                                            chickenEggBalance > 0 && chickenEggBalance <= 10 &&
                                                            <img src={eggs1} className="ml-2" width="60px" alt='' />
                                                        }
                                                        {
                                                            chickenEggBalance > 10 && chickenEggBalance <= 100 &&
                                                            <img src={eggs100} className="ml-2" width="60px" alt='' />
                                                        }
                                                        {
                                                            chickenEggBalance > 100 && chickenEggBalance <= 1000 &&
                                                            <img src={eggs1000} className="ml-2" width="60px" alt='' />
                                                        } */}
                                                    </h3><p>Your Energy Packets</p>
                                                </div>
                                                <div className="time__list"><h3>{chickenEggDeposited} {chickenEggSymbol}

                                                    {/* {
                                                        chickenEggDeposited > 0 && chickenEggDeposited <= 10 &&
                                                        <img src={eggs1} className="ml-2" width="60px" alt='' />
                                                    }
                                                    {
                                                        chickenEggDeposited > 10 && chickenEggDeposited <= 100 &&
                                                        <img src={eggs100} className="ml-2" width="60px" alt='' />
                                                    }
                                                    {
                                                        chickenEggDeposited > 100 && chickenEggDeposited <= 1000 &&
                                                        <img src={eggs1000} className="ml-2" width="60px" alt='' />
                                                    } */}

                                                </h3><p>Forged By You</p></div>
                                                <div className="time__list">
                                                    <h3>

                                                        {adult}  {chickenSymbol}
                                                        {/* {
                                                            adult > 0 && adult <= 10 &&
                                                            <img src={chicken1} width="60px" alt='' />
                                                        }
                                                        {
                                                            adult > 10 && adult <= 100 &&
                                                            <img src={chicken100} width="60px" alt='' />
                                                        }
                                                        {
                                                            adult > 100 && adult <= 1000 &&
                                                            <img src={chicken1000} width="60px" alt='' />
                                                        } */}

                                                    </h3>
                                                    <p>Forged Total</p>
                                                </div>

                                                <div className="time__list">

                                                    <h3 className="timer">{eggTime}</h3>
                                                    <p>Time to Yield </p>


                                                </div>
                                                {/* <div className="time__list">
                                                    <h3><span className='dollar__text'>${" "}</span>{adult * 10}</h3> 
                                                    <p>Market Value</p>
                                                </div> */}
                                                <div className="time__list">
                                                    <h3 className="timer">{incubCapacity>0?incubCapacity:0}</h3>
                                                    <p>Available <br />Slots</p>
                                                </div>
                                                <div 
                                                // className='acc__arrow'
                                                >
                                                <div className='acc__arrow___icon' onClick={() => setShow1(prev => !prev)} >

                                                    {show1 ?
                                                        <img src={acc__arrow_revse} alt='' />
                                                        :
                                                        <img src={acc__arrow} alt='' />
                                                    }
                                                </div>
                                            </div>
                                            </div>

                                           
                                        </div>
                                    </div>








                                </div>
                            </div>

                            {show1 &&
                                <div className='acc__summery'>
                                    <div className='acc__summery__in'>




                                        {/* <div className="pool-btns">
                                                        <p style={{color: '#fff'}}>Chicken Farming is being upgraded to a newer version with enhanced features between 8:30 hours UTC to 12:30 hours UTC. During this time you won't be able to perform any actions. </p>
                                               </div> */}


                                        <div className="pool-btns">
                                        <div className='js__ac'>
                                                <img src={bysine} alt="" width={100}/>
                                                <a className="bg___BTN2" href="/buy/solarCell">Buy Energy Packets</a>
                                            </div>
                                          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                                              
                                          {
                                                chickenEggApproved == 0 &&
                                                <a className="bg___BTN2" onClick={approveChickenEgg} >
                                                     <img className='sine' src={chickSine} alt=""/>
                                                    Approve Cells for Incubator</a>
                                            }
                                            {
                                                chickenEggApproved > 0 && chickenEggDeposited == 0 &&
                                                <a className="bg___BTN2" onClick={eggtoggle} >Forge Solar Cells</a>
                                            }

                                            {
                                                adult > 0 && baseApprovedIncub > 0 &&
                                                <a className="bg___BTN2" onClick={claimChicken} >Claim Solar Cells (Fee: {chickenClaimfee} ${baseSymbol}) </a>
                                            }

                                            {
                                                adult > 0 && baseApprovedIncub == 0 &&
                                                <a className="bg___BTN2" onClick={approvebaseTokenIncub} >Approve {baseSymbol} to claim Solar</a>
                                            }
                                          </div>

                                        </div>

                                    </div>
                                </div>
                            }

                            {/* <div className="col-lg-12">
                               <div className="slide-heads">
                                    <h3>PUT EEGS TO INCUBATORS AND EARN CHICKENS.</h3>
                                </div>
                                <div className="bullet-list-wrp">
                                    <div className="market-btn">
                                        <a href="/marketplace"><img src={marketbtn} /></a>
                                         <a href="/slide3"><img src={farmingbtn} /></a> 
                                    </div>
                                </div>
                               </div> */}


                        </div>
                    </div>
                    <div className='btm___arrow'>
                       <Link to='/choose'> <img src={arrow} alt='arrow image here' /></Link>
                    </div>
                </div>
                {/* <div className="stokes">
                    <img src={stoke} alt='' />
                </div> */}
            </div>
            {/* <Footer /> */}



            <div className="new_modal">
            <Modal isOpen={modal} toggle={toggle} centered={true}>


<ModalBody>
<div  className="modal_img_div1"><img src={modal_earth} alt="moonland" width={"150px"} style={{opacity:"65%"}}/></div>
    <div className="modaltext text-center mt-4" >Processing your Request...</div>

</ModalBody>
<Button className="bg___BTN2  mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

</Modal>
            </div>


            <Modal isOpen={chickenModal} toggle={chickentoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            Your {chickenSymbol} Balance<br />
                            {chickenBalance}
                        </span>
                        <span className="pull-right ">
                            Your available {farmSymbol}<br />
                            {farmCapacity - chickenDeposited} sq yards
                        </span>
                    </div>
                    <label className="mb-3"><br />Enter Solar for Harvest

                    </label>
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>
                    <input className="form-control" onChange={handlecDepositChange} type="number" value={solarAmount} />
                    <span className="info">Max: {farmCapacity - chickenDeposited} {chickenSymbol} @ (1 {chickenSymbol} per sq. m.)</span>

                    <label className=""><br />Enter Days to Harvest
                    </label>

                    <input className="form-control" onChange={handleDayChange} type="number" value={dayamount} />
                    <span className="info">Est. Fluid: {solarAmount * 600 * dayamount} {chickenFoodSymbol} @ (600 {chickenFoodSymbol} per {chickenSymbol} daily)</span>
                    <span className="info mt-3"><b>Your Available SOLAR FLUID:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
                    <span className="info mt-3"><b>Your SOLAR FLUID Cost for Total SOLAR in Harvest:</b> {chickenDeposited>0 ? parseFloat((parseFloat(chickenDeposited) + parseFloat(solarAmount)) * dayamount * 600).toFixed(2):0} {chickenFoodSymbol}</span>
                    <span className="info mt-1"><b>Fee:</b> {chickenDepositFee>0? parseFloat(chickenDepositFee * solarAmount).toFixed(2):0} {baseSymbol} (@ {chickenDepositFee} per chicken )</span>



                    {
                        cdepositError &&
                        <span className="error">{cdepositError}</span>
                    }

                </ModalBody>
                <ModalFooter>
        
                    {
                        baseApprovedFarm == 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

                    }
                    {
                        chickenFoodApproved == 0 && baseApprovedFarm > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
                    }
               
                    {
                        chickenApproved > 0 && chickenFoodApproved > 0 && baseApprovedFarm > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={depositChicken}>Deposit</Button>
                    }
                    <Button className="bg___BTN2" onClick={chickentoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={moreChickenModal} toggle={moreChickentoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            {/* Your {chickenSymbol} Balance  */}
                            Your Solar Cells
                            <br />
                            {chickenBalance}
                        </span>
                        <span className="pull-right ">
                            {/* Your available {farmSymbol} */}
                            Available Area
                            <br />
                            {farmCapacity - chickenDeposited} sq yards
                        </span>
                    </div>
                    <label className="mb-3"><br />Enter number of Solar Cells to assemble

                    </label>
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>

                    <input className="form-control" onChange={handlecDepositChange} type="number" value={cdamount} />
                    <span className="info">Max: {farmCapacity - chickenDeposited} {chickenSymbol} @ (1 {chickenSymbol} per sq. yards)</span>


                    <span className="info">Est. {chickenFoodSymbol}: {cdamount * 600 * depositedDay} {chickenFoodSymbol} @ (600 {chickenFoodSymbol} per {chickenSymbol} daily)</span>
                    <span className="info mt-3"><b>Available {chickenFoodSymbol}:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
                    <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenDepositFee * cdamount).toFixed(2)} ${baseSymbol} (@ {chickenDepositFee} per solar )</span>

                    {
                        cdepositError &&
                        <span className="error">{cdepositError}</span>
                    }

                </ModalBody>
                <ModalFooter>
                    {
                        baseApprovedFarm == 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

                    }
                    {
                        chickenFoodApproved == 0 && baseApprovedFarm > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
                    }
                    {
                        chickenApproved > 0 && chickenFoodApproved > 0 && baseApprovedFarm > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={depositMoreChicken}>Assemble</Button>
                    }
                    <Button className="bg___BTN2" onClick={moreChickentoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>






            <Modal isOpen={buyAreaModal} toggle={buyAreaToggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            {/* Your {baseSymbol} Balance */}
                            Your Land Area
                            <br />
                            {baseBalance}
                        </span>
                        <span className="pull-right ">
                            Your available {farmSymbol}<br />
                            {farmCapacity - chickenDeposited} sq yards
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter Harvest Area to Buy (sq yards)
                        {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}

                    </label>
                    <input className="form-control" onChange={handleBuyAreaChange} type="number" value={buyareadamount} />
                    <span className="info mt-3"><b>Cost:</b> {parseFloat(buyareadamount * farmPrice).toFixed(4)} {baseSymbol}</span>

                    {
                        buyareadepositError &&
                        <span className="error">{buyareadepositError}</span>
                    }

                </ModalBody>
                <ModalFooter>
                    {
                        baseApproved == 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approvebaseToken}>Approve {baseSymbol}</Button>
                    }
                    {
                        baseApproved > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={buyAreaNFT}>Buy</Button>
                    }
                    <Button className="bg___BTN2" onClick={buyAreaToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={areaModal} toggle={areaToggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            Your ${baseSymbol} Balance<br />
                            {baseBalance}
                        </span>
                        <span className="pull-right ">
                            {/* Your available {farmSymbol} */}
                            Your Land Area
                            <br />
                            {farmCapacity - chickenDeposited} sq yards
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter Harvest Area to add-on  (sq yards)
                        {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}

                    </label>
                    <input className="form-control" onChange={handleAreaChange} type="number" value={areadamount} />
                    <span className="info mt-3"><b>Cost:</b> { areadamount>0 ? parseFloat(areadamount * farmPrice).toFixed(4):0} ${baseSymbol}</span>

                    {
                        areadepositError &&
                        <span className="error">{areadepositError}</span>
                    }

                </ModalBody>
                <ModalFooter>

                    {
                        baseApproved == 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approvebaseToken}>Approve {baseSymbol}</Button>
                    }
                    {
                        baseApproved > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={addAreaNFT}>Add</Button>
                    }
                    <Button className="bg___BTN2" onClick={areaToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={eggModal} toggle={eggtoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            {/* Your {chickenEggSymbol} Balance */}
                            Energy Packets
                            
                            <br />
                            {chickenEggBalance}
                        </span>

                    </div>
                    <label className="mb-3">Enter Quantity

                    </label>
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxceDeposit}>Max</span>
                  
                    <input className="form-control" onChange={handleeDepositChange} type="number" value={cedamount} />
                    <span className="info mt-3"><b>Fee:</b> {cedamount * eggDepositFee} ${baseSymbol} (@{eggDepositFee} ${baseSymbol} Energy Packets)</span><br />
                    <span className="info"><b>  Maximum Per User:</b> 50 Energy Packets</span>



                    {
                        cedepositError &&
                        <span className="error">{cedepositError}</span>
                    }

                </ModalBody>
                <ModalFooter>

                    {
                        baseApprovedIncub == 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenIncub}>Approve {baseSymbol}</Button>
                    }
                    {
                        chickenEggApproved > 0 && baseApprovedIncub > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={depositEgg}>Forge</Button>
                    }
                    <Button className="bg___BTN2" onClick={eggtoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>





            <Modal isOpen={addDaysChickenModal} toggle={addDaysChickentoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            {/* Your {chickenSymbol} Deposited */}
                            Solar Cells Assembled By You
                            <br />
                            {chickenDeposited}
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter Days you want to add fluid for

                    </label>
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxDayDeposit}>Max</span>
                    <input className="form-control" onChange={handleAddDayChange} type="number" value={addDayamount} />
                    <span className="info mt-3"><b>Your Solar Fluid Cost for Total Solar in Harvest:</b> {addDayamount>0 ? parseFloat(chickenDeposited * addDayamount * 20).toFixed(2):0} {chickenFoodSymbol}</span>
                    <span className="info mt-3"><b>Available Super Conductor Fluid:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>

                    {
                        addDdepositError &&
                        <span className="error">{addDdepositError}</span>
                    }
                </ModalBody>
                <ModalFooter>
                    {
                        chickenFoodApproved == 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
                    }
                    {
                        chickenFoodApproved > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={addDays}>Add Fluid</Button>
                    }
                    <Button className="bg___BTN2" onClick={addDaysChickentoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={removeChickenModal} toggle={removeChickentoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            Your {chickenSymbol} Deposited<br />
                            {chickenDeposited}
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter Quantity to remove from Harvest

                    </label>
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcrDeposit}>Max</span>
                    <input className="form-control" onChange={handlecrDepositChange} type="number" value={crdamount} />
                    <span className="info mt-1"><b>Fee:</b> {crdamount>0?parseFloat(chickenRemoveFee * crdamount).toFixed(2):0} {baseSymbol} (@ {chickenRemoveFee} per solar )</span>
                    {
                        crdepositError &&
                        <span className="error">{crdepositError}</span>
                    }


                </ModalBody>
                <ModalFooter>
                    {
                        baseApprovedFarm == 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

                    }

                    <Button className="bg___BTN2 mr-3" onClick={removeChicken}>Remove</Button>

                    <Button className="bg___BTN2" onClick={removeChickentoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>



        </div>
    );

}
export default ChickenFarm;