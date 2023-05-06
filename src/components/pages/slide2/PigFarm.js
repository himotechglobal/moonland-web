/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";
import 'aos/dist/aos.css';
import Header from '../header.js';
import Footer from '../footer.js';
import stoke from '../../images/stoke.png';
import Web3 from "web3"
import { PIG_FARMING, PIG_INCUBATOR, MARKETPLACE, BUILD_FARM, METLUX_TOKEN, THERMIX_TOKEN, POSITRONS_TOKEN, TOKEN, EULE_TOKEN } from '../../../Config/index.js';
import PIG_FARMING_ABI from '../../../Config/PIG_FARMING_ABI.json';
import PIG_INCUBATOR_ABI from '../../../Config/PIG_INCUBATOR_ABI.json';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import gtm from '../../images/gtm.png';
import pigicon from '../../images/pigicon.png';
import childe from '../../images/childe.svg'
import pigicon2 from '../../images/pigicon2.png';
import pigicon3 from '../../images/pigicon3.png';
import mbuild from '../../images/mbuild.png'
import arrow from '../../images/round_arrow.svg';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import land from '../../images/land.svg';
import { Link } from 'react-router-dom';
const PigFarm = () => {
    const [chickenClaimfee, setChickenClaimfee] = useState(0);

    const [farmArea, setFarmArea] = useState(0);
    const [farmCapacity, setFarmCapacity] = useState(0);
    const [farmBalance, setFarmBalance] = useState(0);
    const [farmSymbol, setFarmSymbol] = useState(null);
    const [sowSymbol, setsowSymbol] = useState(null);
    const [boarSymbol, setboarSymbol] = useState(null);
    const [chickenEggSymbol, setChickenEggSymbol] = useState(null);
    const [chickenFoodSymbol, setChickenFoodSymbol] = useState(null);
    const [areadamount, setareadamount] = useState(0);
    const [buyareadamount, setbuyareadamount] = useState(0);
    const [eggDepositFee, setEggDepositFee] = useState(0);
    const [chickenDepositFee, setChickenDepositFee] = useState(0);
    const [chickenRemoveFee, setChickenRemoveFee] = useState(0);

    const [depositedDay, setDepositedDay] = useState(0);

    const [approvalProcessing, setApprovalProcessing] = useState(false);



    const [farmLocked, setFarmLocked] = useState(false);
    const [farmApprove, setFarmApprove] = useState(false);
    const [farmTokenId, setFarmTokenId] = useState(null);
    const [landIsfree, setLandIsfree] = useState(false);

    const [farmPrice, setFarmPrice] = useState(0);




    const [sowBalance, setSowBalance] = useState(0);
    const [boarBalance, setBoarBalance] = useState(0);
    const [chickenEggBalance, setChickenEggBalance] = useState(0);
    const [chickenFoodBalance, setChickenFoodBalance] = useState(0);
    const [unlockTime, setUnlockTime] = useState(0);
    const [layunlockTime, setlayUnlockTime] = useState(0);
    const [layEndTime, setlayEndTime] = useState(0);


    const [eggunlockTime, setEggUnlockTime] = useState(0);
    const [eggHatchTime, setEggHatchTime] = useState(0);

    const [baseBalance, setBaseBalance] = useState(0);
    const [baseSymbol, setBaseSymbol] = useState(0);
    const [baseApproved, setBaseApproved] = useState(0);
    const [baseApprovedIncub, setBaseApprovedIncub] = useState(0);
    const [baseApprovedFarm, setBaseApprovedFarm] = useState(0);

    const [baseToken, setbaseToken] = useState();

    const [endTime, setendTime] = useState(null);
    const [layTime, setlayTime] = useState(null);

    const [eggTime, seteggTime] = useState('70 days');
    const [eggTime2, seteggTime2] = useState('40 days');
    const [areadepositError, setareadepositError] = useState(null);
    const [buyareadepositError, setbuyareadepositError] = useState(null);


    let timeInterval;
    let timeInterval1;
    let timeInterval2;
    let timeInterval3;
    const [sowDeposited, setSowDeposited] = useState(0);
    const [boarDeposited, setboarDeposited] = useState(0);

    const [chickenEggDeposited, setChickenEggDeposited] = useState(0);
    const [eggsearned, setEggsearned] = useState(0);
    const [hatched, setHatched] = useState(0);
    const [adult, setAdult] = useState(0);
    const [chickenEggApproved, setChickenEggApproved] = useState(0);
    const [sowApproved, setSowApproved] = useState(0);
    const [boarApproved, setBoarApproved] = useState(0);
    const [chickenFoodApproved, setChickenFoodApproved] = useState(0);

    const [sowToken, setsowToken] = useState(0);
    const [boarToken, setboarToken] = useState(0);
    const [requiredBoar, setRequiredBoar] = useState(0);

    const [chickenpigletToken, setChickenpigletToken] = useState(0);
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
    const [cdamount, setcdAmount] = useState(0);
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

    // console.log(eggunlockTime);
    const [cedepositError, setceDepositError] = useState(false);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [sowModal, setChickenModal] = useState(false);
    const sowtoggle = () => setChickenModal(!sowModal);

    const [moreChickenModal, setMoreChickenModal] = useState(false);
    const moreChickentoggle = () => setMoreChickenModal(!moreChickenModal);

    const [areaModal, setareaModal] = useState(false);
    const areaToggle = () => setareaModal(!areaModal);

    const [processed, setProcessed] = useState(false);



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

    // const wallet = useWallet();\
    const { address, isConnected } = useAccount()
  
    let web3Provider = window.ethereum;

   




    const { data: _tokenPerfarm } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: "getTokenPerFarmArea",
    })
    const { data: _baseToken } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: "baseToken",
    })
    const { data: _farmToken } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "MoonLand",
    })
 
    const { data: _sowToken } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "metluxToken",
    })
    const { data: _boarToken } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "thermixToken",
    })
    const { data: _chickenFoodToken } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "positronsToken",
    })
    const { data: _depositFee } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "getDepositFee",
        args: [1],
    })

    console.log("DF",_depositFee)
    const { data: _removeFee } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "getRemoveFee",
        args: [1],
    })
    const { data: _chickenFoodSymbol } = useContractRead({
        address: POSITRONS_TOKEN,
        abi: TOKEN_ABI,
        functionName: "symbol",
    })
    const { data: _symbol } = useContractRead({
        address: BUILD_FARM,
        abi: NFT_ABI,
        functionName: "symbol",
    })
    const { data: _sowSymbol } = useContractRead({
        address: METLUX_TOKEN,
        abi: TOKEN_ABI,
        functionName: "symbol",
    })
    const { data: _boarymbol } = useContractRead({
        address: THERMIX_TOKEN,
        abi: TOKEN_ABI,
        functionName: "symbol",
    })
    const { data: _baseSymbol } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: "symbol",
    })
    const { data: _baseApproved } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, MARKETPLACE],
    })
    const { data: _baseApprovedFarm } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, PIG_FARMING],
    })


    console.log("BA",parseInt(_baseApprovedFarm))
    const { data: _baseApprovedIncub } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, PIG_INCUBATOR],
    })
    const { data: _baseBalance } = useContractRead({
        address: TOKEN,
        abi: TOKEN_ABI,
        functionName: "balanceOf",
        args: [address],
    })
    const { data: _nftBalance } = useContractRead({
        address: BUILD_FARM,
        abi: NFT_ABI,
        functionName: "balanceOf",
        args: [address],
    })
    const { data: _userInfo } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "userInfo",
        args: [address],
    })
  
    const { data: _userSow } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "getUserMetlux",
        args: [address],
    })
    const { data: _userBoar } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "getUserThermix",
        args: [address],
    })
    const { data: _userEggs } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "pendingEules",
        args: [address],
    })
   
    const { data: _userChickenDie } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "getUnlockTime",
        args: [address],
    })
    const { data: _userClaimTimes1 } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "getNextClaim",
        args: [address],
        watch: true,
    })

    // console.log(_userClaimTimes1);

    const { data: _chickenFoodBalance1 } = useContractRead({
        address: POSITRONS_TOKEN,
        abi: TOKEN_ABI,
        functionName: "balanceOf",
        args: [address],
    })

    const { data: _sowBalance1 } = useContractRead({
        address: METLUX_TOKEN,
        abi: TOKEN_ABI,
        functionName: "balanceOf",
        args: [address],
    })
    const { data: _sowApproved } = useContractRead({
        address: METLUX_TOKEN,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, PIG_FARMING],
    })
    const { data: _chickenFoodApproved } = useContractRead({
        address: POSITRONS_TOKEN,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, PIG_FARMING],
    })

    const { data: _boarBalance1 } = useContractRead({
        address: THERMIX_TOKEN,
        abi: TOKEN_ABI,
        functionName: "balanceOf",
        args: [address],
    })
    const { data: _boarApproved } = useContractRead({
        address: THERMIX_TOKEN,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, PIG_FARMING],
    })
    const { data: _nftTokenId } = useContractRead({
        address: BUILD_FARM,
        abi: NFT_ABI,
        functionName: "ownerTokens",
        args: [address],
    })
    const { data: _approved } = useContractRead({
        address: BUILD_FARM,
        abi: NFT_ABI,
        functionName: "getApproved",
        args: [farmTokenId],
    })
    const { data: _landIsfree } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "landIsfree",
        args: [farmTokenId, address],
    })
    console.log("fee 1",parseInt(farmTokenId))
    console.log("fee",_landIsfree);
    const { data: _userInfo1 } = useContractRead({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: "getUserToken",
        args: [address],
    })


    // console.log(parseInt(_userInfo1))




    const getData = async () => {

        setProcessed(true);
 
        setApprovalProcessing(true);
 
        setFarmPrice(parseFloat(_tokenPerfarm / 1e18).toFixed(2));
     
        setbaseToken(_baseToken);
        
        setFarmToken(_farmToken);
        
        setChickenDepositFee(parseInt(_depositFee));
 
        setChickenRemoveFee(_removeFee);
        setChickenFoodToken(_chickenFoodToken)
        setsowToken(_sowToken)
        setboarToken(_boarToken)
        
        setChickenFoodSymbol(_chickenFoodSymbol);

        // let _symbol = await _nftContract.methods.symbol().call();
        setFarmSymbol(_symbol);


        // let _sowSymbol = await _sowContract.methods.symbol().call();
        setsowSymbol(_sowSymbol);

        // let _boarymbol = await _boarContract.methods.symbol().call();
        setboarSymbol(_boarymbol);

        // let _baseSymbol = await _baseTokenContract.methods.symbol().call();
        setBaseSymbol(_baseSymbol);
        // console.log(_baseSymbol);
        setFarmBalance(parseInt(_nftBalance));
        setApprovalProcessing(false);
        if (address) {
            //address = '0xbe7c30E0945d019F3aDc84AeEC55Ee2eCEb4247d' ;
            // let _baseApproved = await _baseTokenContract.methods.allowance(address, MARKETPLACE).call();
            setBaseApproved(_baseApproved);

            // console.log(_baseApproved);

            // let _baseApprovedFarm = await _baseTokenContract.methods.allowance(address, PIG_FARMING).call();
            setBaseApprovedFarm(parseInt(_baseApprovedFarm));
            //  console.log(_baseApprovedFarm);
            // let _baseApprovedIncub = await _baseTokenContract.methods.allowance(address, PIG_INCUBATOR).call();
            setBaseApprovedIncub(parseInt(_baseApprovedIncub));
            //   console.log(_baseApprovedIncub);    
            // let _baseBalance = await _baseTokenContract.methods.balanceOf(address).call();

            setBaseBalance(parseFloat(_baseBalance / 1e18).toFixed(2));

            // console.log(_baseBalance);


            // let _nftBalance = await _nftContract.methods.balanceOf(address).call();

            // let _userInfo = await _farmingContract.methods.userInfo(address).call();

            // let _userSow = await _farmingContract.methods.getUserSow(address).call();
            //   console.log(_userSow)
            // let _userBoar = await _farmingContract.methods.getUserBoar(address).call();
            setboarDeposited(parseFloat(_userBoar / 1e18).toFixed())
            // if(_userInfo)
            // console.log("eggs",_userInfo);
            // console.log("eggs",ethers.utils.parseEther(_userEggs.toString()).toString());
            setEggsearned(parseFloat(_userEggs / 1e18).toFixed());

            setSowDeposited(parseFloat(_userSow / 1e18).toFixed());
            if (parseFloat(_userInfo.sow) > 0) {
                // let _userEggs = await _farmingContract.methods.pendingPiglets(address).call();
            }


            if (_userSow > 0) {


                // let _userChickenDie = await _farmingContract.methods.getUnlockTime(address).call();

                setUnlockTime(_userChickenDie);

                //   console.log(parseInt(unlockTime));
            }

            let _current = new Date().getTime() / 1e3;
            if (unlockTime > _current) {

                // let _userClaimTimes = await _farmingContract.methods.getNextClaim(address).call();
                // let _userClaimTimes = Object.keys((_userClaimTimes1?.toString())).map((key) => _userClaimTimes[key]);
                // console.log(_userClaimTimes,"yyyyy");
                setlayUnlockTime(parseInt(_userClaimTimes1[1]));
                setlayEndTime(parseInt(_userClaimTimes1[0]));


            }



            // let _chickenFoodBalance = await _chickenFoodContract.methods.balanceOf(address).call();
            let _chickenFoodBalance = parseFloat(ethers.utils.formatEther(_chickenFoodBalance1)).toFixed();
            setChickenFoodBalance(_chickenFoodBalance);

            // let _sowBalance = await _sowContract.methods.balanceOf(address).call();

            // let _sowApproved = await _sowContract.methods.allowance(address, PIG_FARMING).call();
            setSowApproved(_sowApproved);
            //   console.log(_sowApproved);

            // let _chickenFoodApproved = await _chickenFoodContract.methods.allowance(address, PIG_FARMING).call();
            setChickenFoodApproved(_chickenFoodApproved);

            let _sowBalance = parseFloat(_sowBalance1 / 1e18).toFixed();
            setSowBalance(_sowBalance);
            // let _boarBalance = await _boarContract.methods.balanceOf(address).call();

            let _boarBalance = parseFloat(_boarBalance1 / 1e18).toFixed();
            setBoarBalance(_boarBalance)
            // let _boarApproved = await _boarContract.methods.allowance(address, PIG_FARMING).call();
            setBoarApproved(_boarApproved);
            // console.log(_boarApproved);

            // console.log(_userInfo);
            if (_nftBalance > 0 || _userInfo.landlocked) {
                // let _nftTokenId = await _nftContract.methods.ownerTokens(address).call();
                // console.log(_nftTokenId);
                // let _approved = await _nftContract.methods.getApproved(_nftTokenId).call();
                if (_approved === PIG_FARMING) {
                    setFarmApprove(true);
                }
                setFarmTokenId(_nftTokenId);
                // let _landIsfree = await _farmingContract.methods.landIsfree(_nftTokenId, address).call();
                setLandIsfree(_landIsfree);

                // let _userInfo = await _farmingContract.methods.getUserToken(address).call();
                setFarmLocked(_userInfo1[4]);

                //   console.log(_userInfo[4]);
                if (_userInfo1[4]) {
                    setFarmTokenId(_userInfo1[1]);

                    setFarmArea(parseFloat(_userInfo1[2] / 1e18).toFixed());
                    setFarmCapacity(parseFloat(_userInfo1[3] / 1e18).toFixed());

                }
            }
          

        }




    }
  
   

    // const { data: _chickenpigletToken } = useContractRead({
    //     address: PIG_INCUBATOR,
    //     abi: PIG_INCUBATOR_ABI,
    //     functionName: "pigletToken",
    //     watch: true,
    // })
    const { data: _capacity } = useContractRead({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: "capacity",
        watch: true,
    })
    // console.log(parseInt(_capacity)/1e18);
    const { data: _depositFee1 } = useContractRead({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: "getDepositFee",
        args: [1],
        watch: true,
    })
  
    const { data: _chickenEggSymbol } = useContractRead({
        address: EULE_TOKEN,
        abi: TOKEN_ABI,
        functionName: "symbol",
        watch: true,
    })

    // console.log("ES",_chickenEggSymbol)

    const { data: _balance } = useContractRead({
        address: EULE_TOKEN,
        abi: TOKEN_ABI,
        functionName: "balanceOf",
        args: [address],
        watch: true,
    })
    const { data: _userInfo2 } = useContractRead({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: "userInfo",
        args: [address],
        watch: true,
    })
    const { data: _chickenEggApproved } = useContractRead({
        address: EULE_TOKEN,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, PIG_INCUBATOR],
        watch: true,
    })
 console.log(_chickenEggApproved);
    const { data: _userItens } = useContractRead({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: "pendingItems",
        args: [address],
        watch: true,
    })
console.log(_userItens);
    const { data: _unlockItem } = useContractRead({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: "getUnlockTime",
        args: [address],
        // onSuccess:(data)=>{
        //     console.log(data?.toString());
        // }
        //    enabled:true
    })


    let _amt = ethers.utils.parseEther('1').toString();
    const { data: _claimChickenFee } = useContractRead({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: 'getClaimFee',
        args: [_amt],
        watch: true,
    })
    // console.log("jasim",_unlockItem?.toString())


    const { data: _unlockItem2 } = useContractRead({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: "getUnlockTime",
        args: [address],
        watch: true,
    })



    const getEggData = async () => {
        
        // let _web3 = new Web3(web3Provider);
        // let _incubatorContract = new _web3.eth.Contract(PIG_INCUBATOR_ABI, PIG_INCUBATOR);
        // let _chickenpigletToken = await _incubatorContract.methods.pigletToken().call();

        // setChickenpigletToken(_chickenpigletToken);

        // console.log(_chickenpigletToken);

        // let _capacity = await _incubatorContract.methods.capacity().call();
        // console.log(_capacity);
        setIncubCapacity(parseInt(_capacity)/1e18);

        setChickenEggSymbol(_chickenEggSymbol);
        // console.log(parseFloat(_capacity));

        // let _depositFee = await _incubatorContract.methods.getDepositFee(1).call();
        setEggDepositFee(parseInt(_depositFee1));
        // let _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI, _chickenpigletToken);

        // let _chickenEggSymbol = await _chickenEggContract.methods.symbol().call();

        if (address) {

            // let _balance = await _chickenEggContract.methods.balanceOf(address).call();
            // let _userInfo = await _incubatorContract.methods.userInfo(address).call();
            setChickenEggBalance(parseFloat(_balance / 1e18).toFixed())
            setChickenEggDeposited(parseFloat(_userInfo2[0] / 1e18).toFixed());

            // let _chickenEggApproved = await _chickenEggContract.methods.allowance(address, PIG_INCUBATOR).call();
            setChickenEggApproved(parseInt(_chickenEggApproved));

            console.log("eggunlick",parseInt(_userInfo[0]))

            if (parseInt(_userInfo2[0]) > 0) {
                // let _userItens = await _incubatorContract.methods.pendingItems(address).call();
                //   console.log(_userEggs);

                // setHatched(parseFloat(parseFloat(_userItens[0] )/ 1e18).toFixed());
                setAdult(parseFloat(parseFloat(_userItens) / 1e18).toFixed());
                // let _unlockItem = await _incubatorContract.methods.getUnlockTime(address).call();
                // console.log("jas",_unlockItem.toString());
                // alert()
                console.log("eggunlick",_userItens)
                setEggUnlockTime(_unlockItem);
                // let _unlockItem2 = await _incubatorContract.methods.getHatchTime(address).call();
                setEggHatchTime(_unlockItem2);
                setChickenClaimfee(parseInt(_claimChickenFee)/1e18);

            }

        }


    }


    // const _amount = ethers.utils.parseEther('10000000000000').toString()

    const { config: lockNFTConfig_ } = usePrepareContractWrite({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: 'checkAndTransferLand',
        args: [address, farmTokenId]
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
    }
    useEffect(() => {
        setProcessed(false);

        // if (window.ethereum) {
        //     web3Provider = window.ethereum;
        // }
        // else {
        //     web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

        // }
          getEggData() ;
        getData();
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
        // console.log("eggitme",eggunlockTime)
        if (eggunlockTime > 0) {
            clearInterval(timeInterval2);
            timeInterval2 = setInterval(() => {

                getEggTime() ;
            }, 1000);

        }

        if (eggHatchTime > 0) {
            clearInterval(timeInterval3);
            timeInterval3 = setInterval(() => {
                // getEggHatchTime() ;

            }, 1000);

        }

    }, [farmTokenId,_nftTokenId,_userEggs,eggsearned,layEndTime,eggHatchTime,eggunlockTime,unlockTime,_userInfo,_userItens,_userInfo2])



    const lockNFT = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
        await lockNFTWriteAsync()

        // document.getElementById("exampleModalCenter").modal('show')
        // const _farmingContract = new _web3.eth.Contract(PIG_FARMING_ABI, PIG_FARMING);

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
        // console.log(unlockTime);

        // console.log("Next Time" , layunlockTime )
        if (parseInt(_current) > parseInt(layEndTime)) {
            setlayTime(null);

        }
        else {
            if (parseInt(_current) > parseInt(layunlockTime)) {
                getData();
            }
            else {
                let remainingSecondsLay = layunlockTime - _current;
                // console.log("Remaining Sec" , remainingSecondsLay);

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
        // console.log(unlockTime);

        if (parseInt(_current) > parseInt(unlockTime)) {
            setendTime(null);
            // console.log('ended')
            // console.log('Current' , _current)
        }
        else {

            let remainingSeconds = unlockTime - _current;
            // console.log("Remaining Sec" , remainingSeconds);

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
        // console.log(eggHatchTime);
        if (parseInt(_current) > parseInt(eggHatchTime)) {
            seteggTime2(0);
            // console.log('ended')
            // console.log('Current' , _current)
        }
        else {
            let remainingSeconds = eggHatchTime - _current;
            // console.log("Remaining Sec" , remainingSeconds);

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
        console.log("eggitme",eggunlockTime);
        if (parseInt(_current) > parseInt(eggunlockTime)) {
            seteggTime(0);
            // console.log('ended')
            // console.log('Current' , _current)
        }
        else {
            let remainingSeconds = eggunlockTime - _current;
            // console.log("Remaining Sec" , remainingSeconds);

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




    // const { config: removeChickenConfig_ } = usePrepareContractWrite({
    //     address: PIG_FARMING,
    //     abi: PIG_FARMING_ABI,
    //     functionName: 'removeSow',
    //     args: [ethers.utils.parseEther(crdamount).toString()]
    // })

    // const { data: removeChickenData, writeAsync: removeChickenWriteAsync, isError: removeChickenError } = useContractWrite(removeChickenConfig_)

    // const { isSuccess: removeChickenSuccess } = useWaitForTransaction({
    //     hash: removeChickenData?.hash,
    // })


    // if (removeChickenError && modal) {
    //     getData();
    //     setModal(false);
    //     setremoveChickenModal(!removeChickenModal
    //     );
    // }
    // if (removeChickenSuccess && modal) {
    //     setModal(false);
    // }


    const { config: removeChickenConfig_ } = usePrepareContractWrite({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: 'removeMetlux',

        args: [crdamount==""?0:ethers.utils.parseEther?.(crdamount.toString()).toString()],
        watch: true,
    })



    const { data: removeChickenData, writeAsync: removeChickenWriteAsync, isError: removeChickenError } = useContractWrite(removeChickenConfig_)

    const { isSuccess: removeChickenSuccess } = useWaitForTransaction({
        hash: removeChickenData?.hash,
    })


    if (removeChickenError && modal) {
        getData();
        setModal(modal);
        setremoveChickenModal(!removeChickenModal);
    }
    if (removeChickenSuccess && modal) {
        setModal(false);
    }

    const removeChicken = async () => {
        // let _web3 = new Web3(web3Provider);
        setcrDepositError(false)
        if (sowDeposited < crdamount) {
            setcrDepositError("Error: Insufficient deposited balance");
            return false;
        }

        else {

            setModal(!modal);
            await removeChickenWriteAsync()

            document.getElementById("exampleModalCenter").modal('show')
            // const _famringContract = new _web3.eth.Contract(PIG_FARMING_ABI, PIG_FARMING);

            // let _camount = _web3.utils.toWei(crdamount.toString());
            // console.log(farmTokenId, _camount, dayamount);

            // _famringContract.methods.removeSow(_camount).send({ from: address }).on('receipt', function (receipt) {

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


    const { config: depositMoreChickenConfig_ } = usePrepareContractWrite({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: 'depositMoreMetlux',
        args: [cdamount == "" ? 0 : ethers.utils.parseEther(cdamount).toString(), parseInt(farmTokenId)],
        watch: true,
    })

    console.log("DM",cdamount == "" ? 0 : ethers.utils.parseEther(cdamount).toString(), parseInt(farmTokenId));



    const { data: depositMoreChickenData, writeAsync: depositMoreChickenWriteAsync, isError: depositMoreChickenError } = useContractWrite(depositMoreChickenConfig_)

    const { isSuccess: depositMoreChickenSuccess } = useWaitForTransaction({
        hash: depositMoreChickenData?.hash,
    })


    if (depositMoreChickenError && modal) {
        getData();
        setModal(false);
        moreChickentoggle();
    }
    if (depositMoreChickenSuccess && modal) {
        setModal(false);
    }


    const depositMoreChicken = async () => {
        // let _web3 = new Web3(web3Provider);

        console.log("FB" ,parseInt(ethers.utils.formatEther(_chickenFoodBalance1)) , parseInt(parseInt(cdamount) * parseInt(depositedDay) * 20))
        
        setcDepositError(false)
        if (parseInt(sowBalance) < parseInt(cdamount)) {
            setcDepositError("Error: Insufficient Sow Balance");
            return false;
        }

        else if (parseInt(cdamount) > (parseInt(farmCapacity) - parseInt(parseInt(sowDeposited) + parseInt(boarDeposited)))) {
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else if (chickenFoodBalance < parseInt(parseInt(cdamount) * parseInt(depositedDay) * 20)) {
            console.log("FB" ,parseInt(chickenFoodBalance) , parseInt(parseInt(cdamount) * parseInt(depositedDay) * 20))
            setcDepositError("Error: Inssufficient food Balance");
            return false;
        }
        else {

            setModal(!modal);
            await depositMoreChickenWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _famringContract = new _web3.eth.Contract(PIG_FARMING_ABI, PIG_FARMING);
            // let _amount = _web3.utils.toWei('5000000000000000000');
            // let _camount = _web3.utils.toWei(cdamount.toString());
            // console.log(farmTokenId,_camount,dayamount);

            // _famringContract.methods.depositMoreSow(_camount, farmTokenId).send({ from: address }).on('receipt', function (receipt) {

            //     getData();

            //     setModal(modal);
            //     moreChickentoggle();

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }
    }



    let _boar = requiredBoar.toString();
    let _dayamount = dayamount * 7;
    const { config: depositSowConfig_ } = usePrepareContractWrite({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: 'deposit',
        args: [parseInt(farmTokenId), ethers.utils.parseEther(parseInt(cdamount).toString()).toString(), ethers.utils.parseEther(_boar).toString(), _dayamount],
        watch: true,
    })

    console.log("depost" ,farmTokenId, parseInt(cdamount), (_boar), _dayamount)



    const { data: depositSowData, writeAsync: depositSowWriteAsync, isError: depositSowError } = useContractWrite(depositSowConfig_)

    const { isSuccess: depositSowSuccess } = useWaitForTransaction({
        hash: depositSowData?.hash,
    })


    if (depositSowError && modal) {
        getData();
        setModal(false);
        sowtoggle();
    }
    if (depositSowSuccess && modal) {
        setModal(false);
    }


    const depositSow = async () => {
        // let _web3 = new Web3(web3Provider);
        setcDepositError(false)
        if (cdamount === '' || cdamount === 0) {
            setcDepositError("Error: Invalid Sow Quantity");
            return false;
        }
        if (dayamount === '' || dayamount === 0) {
            setcDepositError("Error: Invalid Day");
            return false;
        }

        if (chickenFoodBalance < cdamount * dayamount * 7 * 20) {
            setcDepositError("Error: Insufficient food Balance");
            return false;
        }
        else if (cdamount > (farmCapacity - sowDeposited)) {
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else if (parseInt(parseInt(cdamount) + parseInt(requiredBoar)) > (parseInt(farmCapacity) - parseInt(parseInt(sowDeposited) + parseInt(boarDeposited)))) {
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else {

            setModal(!modal);
            await depositSowWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _famringContract = new _web3.eth.Contract(PIG_FARMING_ABI, PIG_FARMING);
            // let _amount = _web3.utils.toWei('5000000000000000000');
            // let _camount = _web3.utils.toWei(cdamount.toString());
            // let _boar = requiredBoar.toString();
            // let _dayamount = dayamount * 7;
            // _boar = _web3.utils.toWei(_boar);

            // console.log(farmTokenId,_camount,dayamount);
            // console.log(farmTokenId,_camount,_boar,dayamount);

            // _famringContract.methods.deposit(farmTokenId, _camount, _boar, _dayamount).send({ from: address }).on('receipt', function (receipt) {

            //     getData();

            //     setModal(modal);
            //     sowtoggle();

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        }
    }

    let _amount = ethers.utils.parseEther('5000000000000000000').toString()
    const { config: approvebaseTokenFarmConfig_ } = usePrepareContractWrite({
        address: baseToken,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [PIG_FARMING, _amount],
        watch: true,
    })



    const { data: approvebaseTokenFarmData, writeAsync: approvebaseTokenFarmWriteAsync, isError: approvebaseTokenFarmError } = useContractWrite(approvebaseTokenFarmConfig_)

    const { isSuccess: approvebaseTokenFarmSuccess } = useWaitForTransaction({
        hash: approvebaseTokenFarmData?.hash,
    })


    if (approvebaseTokenFarmError && modal) {
        getData();
        setModal(false);
        setApprovalProcessing(false);
    }
    if (approvebaseTokenFarmSuccess && modal) {
        getData();
        setModal(false);
        setApprovalProcessing(false);
    }



    const approvebaseTokenFarm = async () => {
        // let _web3 = new Web3(web3Provider);
        setApprovalProcessing(true);

        setModal(!modal);
        await approvebaseTokenFarmWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _baseTokenContract.methods.approve(PIG_FARMING, _amount).send({ from: address }).on('receipt', function (receipt) {
        //     getData();
        //     setModal(modal);
        //     setApprovalProcessing(false);



        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);
        //         setApprovalProcessing(false);

        //     });

    }



    const { config: approvebaseTokenIncubConfig_ } = usePrepareContractWrite({
        address: baseToken,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [PIG_INCUBATOR, ethers.utils.parseEther('5000000000000000000').toString()],
        watch: true,
    })



    const { data: approvebaseTokenIncubData, writeAsync: approvebaseTokenIncubWriteAsync, isError: approvebaseTokenIncubError } = useContractWrite(approvebaseTokenIncubConfig_)

    const { isSuccess: approvebaseTokenIncubSuccess } = useWaitForTransaction({
        hash: approvebaseTokenIncubData?.hash,
    })


    if (approvebaseTokenIncubError && modal) {
        setModal(false);
    }
    if (approvebaseTokenIncubSuccess && modal) {
        setModal(false);
        getEggData();

    }

    const approvebaseTokenIncub = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
        await approvebaseTokenIncubWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _baseTokenContract.methods.approve(PIG_INCUBATOR, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getEggData();
        //     setModal(modal);
        //     depositEgg()


        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }



    const { config: approvebaseTokenConfig_ } = usePrepareContractWrite({
        address: baseToken,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [MARKETPLACE, ethers.utils.parseEther('5000000000000000000').toString()],
        watch: true,
    })



    const { data: approvebaseTokenData, writeAsync: approvebaseTokenWriteAsync, isError: approvebaseTokenError } = useContractWrite(approvebaseTokenConfig_)

    const { isSuccess: approvebaseTokenSuccess } = useWaitForTransaction({
        hash: approvebaseTokenData?.hash,
    })


    if (approvebaseTokenError && modal) {
        setModal(false);
    
    }
    if (approvebaseTokenSuccess && modal) {
        setModal(false);
        getData();
       

    }

    const approvebaseToken = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
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
        address: chickenFoodToken,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [PIG_FARMING, ethers.utils.parseEther('5000000000000000000').toString()],
        watch: true,
    })



    const { data: approveChickenFoodData, writeAsync: approveChickenFoodWriteAsync, isError: approveChickenFoodError } = useContractWrite(approveChickenFoodConfig_)

    const { isSuccess: approveChickenFoodSuccess } = useWaitForTransaction({
        hash: approveChickenFoodData?.hash,
    })


    if (approveChickenFoodError && modal) {

        setApprovalProcessing(false);
        setModal(false);
    }
    if (approveChickenFoodSuccess && modal) {
        getData();

        setModal(false);
        setApprovalProcessing(false);
    }


    const approveChickenFood = async () => {
        // let _web3 = new Web3(web3Provider);
        setApprovalProcessing(true);

        setModal(!modal);
        await approveChickenFoodWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _chickenFoodContract = new _web3.eth.Contract(TOKEN_ABI, chickenFoodToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _chickenFoodContract.methods.approve(PIG_FARMING, _amount).send({ from: address }).on('receipt', function (receipt) {
        //     setApprovalProcessing(false);

        //     getData();
        //     setModal(modal);

        //     // depositSow() ;

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);
        //         setApprovalProcessing(false);

        //     });

    }




    async function claimChicken() {
        let _web3 = new Web3(web3Provider);

        setModal(!modal);
        const _incubatorContract = new _web3.eth.Contract(PIG_INCUBATOR_ABI, PIG_INCUBATOR);
        _incubatorContract.methods.claimAdults().send({ from: address }).on('receipt', function (receipt) {

            getEggData();
            setModal(modal);

        })

            .on('error', function (error, receipt) {
                setModal(modal);

            });
    }



    const { config: claimEggsConfig_ } = usePrepareContractWrite({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: 'claimEules',
        watch: true,
    })



    const { data: claimEggsData, writeAsync: claimEggsWriteAsync, isError: claimEggsError } = useContractWrite(claimEggsConfig_)

    const { isSuccess: claimEggsSuccess } = useWaitForTransaction({
        hash: claimEggsData?.hash,
    })


    if (claimEggsError && modal) {

        getData();
        setModal(false);
    }
    if (claimEggsSuccess && modal) {
        setModal(false);
    }



    const claimEggs = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
        await claimEggsWriteAsync()
        // const _farmingContract = new _web3.eth.Contract(PIG_FARMING_ABI, PIG_FARMING);
        // _farmingContract.methods.claimPiglets().send({ from: address }).on('receipt', function (receipt) {

        //     getData();
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });
    }
    let euleAmount = ethers.utils.parseEther('5000000000000000000').toString()
    const { config: claimEuleConfig_ } = usePrepareContractWrite({
        address: EULE_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args:[PIG_INCUBATOR,euleAmount],
        watch: true,
    })



    const { data: approveEule, writeAsync: claimChickenWriteAsync, isError: claimEuleError } = useContractWrite(claimEuleConfig_)

    const { isSuccess: claimEuleSuccess } = useWaitForTransaction({
        hash: claimEggsData?.hash,
    })


    if (claimEuleError && modal) {

        getData();
        setModal(false);
    }
    if (claimEuleSuccess && modal) {
        setModal(false);
    }
    const  approveChickenEgg= async()=> {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
        await claimChickenWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI, chickenpigletToken);
        
        // _chickenEggContract.methods.approve(PIG_INCUBATOR, _amount).send({ from: address }).on('receipt', function (receipt) {

        //     getEggData();
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    async function approveBoarSow() {

        if (sowApproved === 0) {
            approveSow();
        }

        if (boarApproved === 0) {
            approveBoar();
        }
    }



    const { config: approveBoarConfig_ } = usePrepareContractWrite({
        address: THERMIX_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [PIG_FARMING, ethers.utils.parseEther('5000000000000000000').toString()],
        watch: true,
    })



    const { data: approveBoarData, writeAsync: approveBoarWriteAsync, isError: approveBoarError } = useContractWrite(approveBoarConfig_)

    const { isSuccess: approveBoarSuccess } = useWaitForTransaction({
        hash: approveBoarData?.hash,
    })


    if (approveBoarError && modal) {

        setApprovalProcessing(false);
        setModal(false);
    }
    if (approveBoarSuccess && modal) {
        setModal(false);
        setApprovalProcessing(false);
        getData();

    }


    const approveBoar = async () => {
        // let _web3 = new Web3(web3Provider);
        setApprovalProcessing(true);

        setModal(!modal);
        await approveBoarWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _boarContract = new _web3.eth.Contract(TOKEN_ABI, boarToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _boarContract.methods.approve(PIG_FARMING, _amount).send({ from: address }).on('receipt', function (receipt) {
        //     setApprovalProcessing(false);


        //     getData();
        //     setModal(modal);


        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);
        //         setApprovalProcessing(false);

        //     });

    }


    const { config: approveSowConfig_ } = usePrepareContractWrite({
        address: METLUX_TOKEN,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [PIG_FARMING, ethers.utils.parseEther('5000000000000000000').toString()],
        watch: true,
    })



    const { data: approveSowData, writeAsync: approveSowWriteAsync, isError: approveSowError } = useContractWrite(approveSowConfig_)

    const { isSuccess: approveSowSuccess } = useWaitForTransaction({
        hash: approveSowData?.hash,
    })


    if (approveSowError && modal) {

        setModal(false);
        setApprovalProcessing(false);
    }
    if (approveSowSuccess && modal) {
        setModal(false);
        setApprovalProcessing(false);
        getData();

    }


    const approveSow = async () => {
        // let _web3 = new Web3(web3Provider);
        setApprovalProcessing(true);
        setModal(!modal);
        await approveSowWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _sowContract = new _web3.eth.Contract(TOKEN_ABI, sowToken);
        // let _amount = _web3.utils.toWei('5000000000000000000')
        // _sowContract.methods.approve(PIG_FARMING, _amount).send({ from: address }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     setApprovalProcessing(false);

        //     getData();

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);
        //         setApprovalProcessing(false);

        //     });

    }


    const { config: addDaysConfig_ } = usePrepareContractWrite({
        address: PIG_FARMING,
        abi: PIG_FARMING_ABI,
        functionName: 'addMoreDays',
        args: [parseInt(addDayamount * 7)],
        watch: true,
    })



    const { data: addDaysData, writeAsync: addDaysWriteAsync, isError: addDaysError } = useContractWrite(addDaysConfig_)

    const { isSuccess: addDaysSuccess } = useWaitForTransaction({
        hash: addDaysData?.hash,
    })


    if (addDaysError && modal) {

        getData();
        setModal(false);
        addDaysChickentoggle();
    }
    if (addDaysSuccess && modal) {
        setModal(false);
    }


    const addDays = async () => {
        setaddDdepositError(false);
        // let _maxamount = parseInt(chickenFoodBalance / parseInt(20 * parseFloat(parseFloat(sowDeposited) + parseFloat(boarDeposited))));
        // // console.log(chickenFoodBalance);
        // // console.log(sowDeposited);
        // // console.log(boarDeposited);
        // // console.log(_maxamount);
        // // console.log(addDayamount * 7);
        // if (parseInt(_maxamount) < parseInt(addDayamount * 7)) {

        //     setaddDdepositError("Error: Insufficient Food Balance");
        //     return false;
        // }

        // else {
            // let _web3 = new Web3(web3Provider);

            setModal(!modal);
            await addDaysWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _farmingContract = new _web3.eth.Contract(PIG_FARMING_ABI, PIG_FARMING);
            // let _camount = parseInt(addDayamount * 7);
            //    console.log(farmTokenId,_camount,dayamount);

            // _farmingContract.methods.addMoreDays(_camount).send({ from: address }).on('receipt', function (receipt) {

            //     getData();
            //     setModal(modal);
            //     addDaysChickentoggle();

            // })

            //     .on('error', function (error, receipt) {
            //         setModal(modal);

            //     });

        // }
    }



    const { config: depositEggConfig_ } = usePrepareContractWrite({
        address: PIG_INCUBATOR,
        abi: PIG_INCUBATOR_ABI,
        functionName: 'deposit',
        args: [cedamount==""?0:ethers.utils.parseEther?.(cedamount).toString()],
        watch: true,
    })



    const { data: depositEggData, writeAsync: depositEggWriteAsync, isError: depositEggError } = useContractWrite(depositEggConfig_)

    const { isSuccess: depositEggSuccess } = useWaitForTransaction({
        hash: depositEggData?.hash,
    })


    if (depositEggError && modal) {

        getEggData();
        setModal(false);
        eggtoggle();
    }
    if (depositEggSuccess && modal) {
        setModal(false);
    }


    const depositEgg = async () => {
        setceDepositError(false)
        if (parseInt(chickenEggBalance) < parseInt(cedamount)) {
            setceDepositError("Error: Insufficient Egg Balance");
            return false;
        }

        else {
            // let _web3 = new Web3(web3Provider);

            setModal(!modal);
            await depositEggWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _incubatorContract = new _web3.eth.Contract(PIG_INCUBATOR_ABI, PIG_INCUBATOR);
            // let _camount = _web3.utils.toWei(cedamount.toString());
            //    console.log(farmTokenId,_camount,dayamount);

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
        functionName: 'sellMoonLandPigsty',
        args: [farmTokenId],
        watch: true,
    })

    console.log()


    const { data: sellfarmData, writeAsync: sellfarmWriteAsync, isError: sellfarmError } = useContractWrite(sellfarmConfig_)

    const { isSuccess: sellfarmSuccess } = useWaitForTransaction({
        hash: sellfarmData?.hash,
    })


    if (sellfarmError && modal) {

        setModal(false);
        getData();
    }
    if (sellfarmSuccess && modal) {
        setModal(false);
    }






    const sellfarm = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
        await sellfarmWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        //   alert(farmTokenId);
        // _marketContract.methods.sellFarmLandPigsty(farmTokenId).send({ from: address }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     getData();



        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });



    }


    let _area = buyareadamount.toString();
    console.log("AREA",_area)
    const { config: buyAreaNFTConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'buyMoonLandPigsty',
        args: [_area],
        watch: true,
    })



    const { data: buyAreaNFTData, writeAsync: buyAreaNFTWriteAsync, isError: buyAreaNFTError } = useContractWrite(buyAreaNFTConfig_)

    const { isSuccess: buyAreaNFTSuccess } = useWaitForTransaction({
        hash: buyAreaNFTData?.hash,
    })


    if (buyAreaNFTError && modal) {

        setModal(false);
        getData();
        buyAreaToggle();
    }
    if (buyAreaNFTSuccess && modal) {
        setModal(false);
        getData();
        buyAreaToggle();
    }


    const buyAreaNFT = async () => {
        // let _web3 = new Web3(web3Provider);
        setbuyareadepositError(false);
        if (buyareadamount * farmPrice > baseBalance) {
            setbuyareadepositError("Error: Insufficient Balance");
        }
        else {

            setModal(!modal);
            await buyAreaNFTWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
            // let _area = _web3.utils.toWei(buyareadamount.toString()) ;
            // let _area = buyareadamount.toString();
            // alert(farmTokenId);
            // _marketContract.methods.buyFarmLandPigsty(_area).send({ from: address }).on('receipt', function (receipt) {
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
        functionName: 'addMoonLandAreaPigsty',
        args: [parseInt(areadamount).toString(), farmTokenId],
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
        setModal(false);
        getData();
        areaToggle();
    }


    const addAreaNFT = async () => {
        // let _web3 = new Web3(web3Provider);
        setareadepositError(false);
        if (areadamount * farmPrice > baseBalance) {
            setareadepositError("Error: Insufficient Balance");

        }
        else {

            setModal(!modal);
            await addAreaNFTWriteAsync()
            // document.getElementById("exampleModalCenter").modal('show')
            // const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
            // let _area = _web3.utils.toWei(areadamount.toString()) ;
            // let _area = areadamount.toString();
            // alert(farmTokenId);
            // _marketContract.methods.addFarmLandAreaPigsty(_area, farmTokenId).send({ from: address }).on('receipt', function (receipt) {
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
        address: BUILD_FARM,
        abi: NFT_ABI,
        functionName: 'approve',
        args: [PIG_FARMING, farmTokenId],
        watch: true,
        enabled: farmTokenId
    })

    console.log("bd:",farmTokenId)


    const { data: approveNFTData, writeAsync: approveNFTWriteAsync, isError: approveNFTError } = useContractWrite(approveNFTConfig_)

    const { isSuccess: approveNFTSuccess } = useWaitForTransaction({
        hash: approveNFTData?.hash,
    })


    if (approveNFTError && modal) {

        setModal(false);
    }
    if (approveNFTSuccess && modal) {
        setModal(false);
        lockNFT();
        getData();


    }

    const approveNFT = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
        await approveNFTWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _nftContract = new _web3.eth.Contract(NFT_ABI, farmToken);

        // _nftContract.methods.approve(PIG_FARMING, farmTokenId).send({ from: address }).on('receipt', function (receipt) {
        //     setModal(modal);

        //     getData();
        //     lockNFT();

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }

    const setMaxceDeposit = async () => {
        let _damount = chickenEggBalance;
        if (chickenEggBalance > 50) {
            _damount = 50;
        }
        setcedAmount(parseFloat(_damount))

    }



    const setMaxDayDeposit = async () => {
        let _damount = chickenFoodBalance / (20 * (parseInt(boarDeposited) + parseInt(sowDeposited)));

        setaddDayamount(parseFloat(_damount))

    }


    const setMaxcrDeposit = async () => {
        let _damount = sowDeposited;

        setcrdAmount(parseFloat(_damount))

    }

    // async function setMaxArea(){
    //     let _damount = baseBalance;

    //     setareadamount(parseFloat(_damount))

    // }


    const setMaxcDeposit = async () => {
        let _damount = sowBalance
        if (sowBalance > farmCapacity) {
            _damount = farmCapacity
        }
        setcdAmount(_damount)
        setcDepositAmount(_damount)
    }





    const handlecDepositChange = (e) => {
        setcDepositAmount(e.target.value);
        setcdAmount(e.target.value);
        setRequiredBoar(Math.ceil(parseFloat(e.target.value / 10).toFixed(2)))
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





    return (
        <div>
            <Header />
            <div className="slide-bg">
                <section id="pigs-sec1">
                    <div className="container">
                        <div className="slide-heads">
                            <h1>BUY MOON LAND,BUILD <span className='dollar__text2'>&</span> TRADE</h1>
                            <p>Combine Solor cells and Fluids Harvest</p>
                        </div>
                        {/* <div className="pig-head">
                        
                            <div className="btn-gmt">
                                <a href="/marketplace">
                                    <img src={gtm} alt="" />
                                </a>
                            </div>
                        </div> */}
                        <div className="row">



                            <div className="col-lg-12">
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
                                                    <div className="time__list">
                                                        <h3>{farmBalance ?? 0} {farmSymbol}</h3>
                                                        <p>Your Balance</p>
                                                    </div>
                                                    <div className="time__list">
                                                        <h3>{farmArea ?? 0} sq m</h3>
                                                        <p>Your Locked Build Area</p>
                                                    </div>
                                                    <div className="time__list">
                                                        <h3><span className='dollar__text'>$</span>{farmArea * 1}</h3>
                                                        <p>Market Value</p>

                                                    </div>
                                                    <div className="time__list">
                                                        <h3>{farmCapacity}</h3>
                                                        <p>Material Capacity</p>
                                                    </div>
                                                    <div className="pool-btns" style={{ justifyContent: 'end' }}>

{
    !farmLocked && farmBalance > 0 && farmApprove && processed &&
    <a  className="bg___BTN2" onClick={lockNFT} >Lock {farmSymbol} NFT</a>
}
{
    farmBalance > 0 && !farmApprove && processed &&
    <a className="bg___BTN2" onClick={approveNFT}>Approve & Lock {farmSymbol} NFT</a>
}
{
    farmLocked && processed &&
    <a className="bg___BTN2 "  onClick={areaToggle}>Buy More Build Area</a>
}
{
    !farmLocked && farmBalance == 0 && processed &&
    <a className="bg___BTN2" onClick={buyAreaToggle}>Buy Build Area</a>
}
{
    landIsfree && farmBalance > 0 &&
    <a className="bg___BTN2" onClick={() => sellfarm()}>Sell Build Area</a>
}

</div>
                                                </div>
                                                <div className="alienbtns">
                                                    {/* <div className="pool-btns">
                                   <p style={{color: '#fff'}}>Chicken Farming is being upgraded to a newer version with enhanced features between 8:30 hours UTC to 12:30 hours UTC. During this time you won't be able to perform any actions. </p>
                                   </div> */}

                                               
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className='marketplace-box-wrap5'>
                                    <div className="small-pigfarm-box">
                                        <div className='marketplace-box-wrap4'>
                                            <div className='mbuild__TopBox'>
                                                <div className="mbuild___box">
                                                    <div>
                                                        <img src={mbuild} alt="" />
                                                    </div>
                                                    <div className="uses-box-child1">
                                                        <h3>moonpod <br />Builder</h3>
                                                    </div>

                                                </div>

                                                <div className='build___left'>
                                                    <div className="build___item">
                                                        <h3>{eggsearned} EULE</h3>
                                                        <p>Earned</p>
                                                    </div>
                                                    <div className="build___item">
                                                        <h3><span className='dollar__text'>$</span>{eggsearned * 10}</h3>
                                                        <p>Earned Value</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="pig-value-wrp">
                                            <div className="build__value mrt">
                                                <p>Deposited</p>
                                                <h3 className='text-right'>{isNaN(sowDeposited)?0:sowDeposited} {sowSymbol}</h3>
                                            </div>
                                            <div className="build__value mrt">
                                            <p>Deposited</p>
                                                <h3 className='text-right'>{isNaN(boarDeposited)?0:boarDeposited} {boarSymbol}</h3>
                                            </div>


                                        </div>

                                        <div className="pig-value-wrp">
                                            <div className="build__value">
                                                <h3>{sowBalance} {sowSymbol}</h3>
                                                <p>Balance</p>
                                            </div>
                                            <div className="build__value pigmr">
                                                <h3>{boarBalance} {boarSymbol}</h3>
                                                <p>Balance</p>
                                            </div>
                                        </div>
                                        <div className="pig-value-wrp">
                                            <div className="pigvalue-child1">
                                                {/* {layunlockTime}
                                            {layEndTime} */}
                                                {
                                                    sowDeposited > 0 && unlockTime > new Date().getTime() / 1e3 &&
                                                    <>
                                                        <h3 className="timer">{endTime}</h3>
                                                        <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for {chickenFoodSymbol} to end.</span></p>
                                                    </>
                                                }
                                                {
                                                    sowDeposited > 0 && unlockTime < new Date().getTime() / 1e3 &&
                                                    <>
                                                        <h3 className="timer">{chickenFoodSymbol} Exhausted</h3>
                                                        {/* <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Chicken feed to end.</span></p> */}
                                                    </>
                                                }
                                            </div>

                                            <div className="pigvalue-child1  text-right">
                                                {/* {layEndTime} */}
                                                {
                                                    sowDeposited > 0 && layEndTime > new Date().getTime() / 1e3 &&
                                                    <>
                                                        <h3><span>{layTime}</span></h3>
                                                        <p>Next Delivery Time</p>
                                                    </>
                                                }
                                                {
                                                    sowDeposited > 0 && layEndTime < new Date().getTime() / 1e3 &&
                                                    <>
                                                        <h3 className=""><span>Not Building</span></h3>

                                                    </>
                                                }
                                            </div>
                                        </div>


                                        <div className="btn-bp btn_new">
                                        

                                            <a href="/marketplace" className="bg___BTN2 ">Buy Material</a>

                                            {
                                                eggsearned > 0 &&
                                                <a href="javacript:void" className="bg___BTN2" onClick={claimEggs} >Claim {chickenEggSymbol}</a>
                                            }

                                            {
                                                boarBalance > 0 && sowBalance > 0 && sowDeposited == 0 &&
                                                <a href="javacript:void" className="bg___BTN2" onClick={sowtoggle} >Deposit {sowSymbol}</a>
                                            }
                                        </div>


                                        <div className="btn-bp btn_new">
                                      {
                                                sowDeposited > 0 && unlockTime > new Date().getTime() / 1e3 &&
                                                <a href="javacript:void" className="bg___BTN2" onClick={() => setMoreChickenModal(!moreChickenModal)} >Put more {sowSymbol} in Farm</a>
                                            }

                                            {
                                                sowDeposited > 0 && unlockTime < new Date().getTime() / 1e3 &&

                                                <a href="javacript:void" className="bg___BTN2" onClick={() => setremoveChickenModal(!removeChickenModal)}>Remove {sowSymbol} From Farm</a>

                                            }

                                            {
                                                sowDeposited > 0 &&
                                                <a href="javacript:void" className="bg___BTN2" onClick={() => setaddDaysChickenModal(!addDaysChickenModal)}>Add {chickenFoodSymbol}</a>

                                            }

                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className='marketplace-box-wrap5'>
                                    <div className="small-pigfarm-box">
                                        <div className='marketplace-box-wrap4'>
                                    <div className='mbuild__TopBox'>
                                                <div className="mbuild___box2">
                                                    <div>
                                                        <img className='mrb' src={childe} alt="" />
                                                    </div>
                                                    <div className="uses-box-child1">
                                                        <h3 className='ml-3'>FACTORY <br />(Coming Soon)</h3>
                                                    </div>

                                                </div>
                                                <div className='build___left'>
                                                    <div className="build___item">
                                                        <h3>{adult} Material</h3>
                                                        <p>Earned</p>
                                                    </div>
                                                    <div className="build___item">
                                                        <h3><span className='dollar__text'>$</span>{adult * 10}</h3>
                                                        <p>Earned Value</p>
                                                    </div>

                                                </div>
                                                 
                                            </div>
                                            </div>
                                        <div className="pig-value-wrp mrt">
                                            <div className="build___item">
                                                <h3>  {chickenEggBalance} {chickenEggSymbol}</h3>
                                                <p>Balance</p>
                                            </div>
                                            <div className="build___item">
                                                <h3>{chickenEggDeposited} {chickenEggSymbol}</h3>
                                                <p>Deposited</p>
                                            </div>
                                            <div className="build___item bi__one">
                                                <h3>{incubCapacity}</h3>
                                                <p>Available Slot</p>
                                            </div>
                                           
                                            {/* <div className="build___item">
                                                <h3><span className='dollar__text'>$</span>0.00</h3>
                                                <p>Earned Value</p>
                                            </div> */}
                                        </div>
                                        {/* <div className="pig-value-wrp2 mrt">
                                           
                                        </div> */}

<div className="build___item">

<h3 className="timer">{eggTime == 0 ? "70 days" : eggTime}</h3>
<p>Time to Yield </p>


</div>
                                        <div className="btn-bp">
                                            <div style={{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"}}>
                                            <a href="/marketplace" className="bg___BTN2">Buy {chickenEggSymbol}</a>
                                              
                                              {
                                                    chickenEggApproved == 0 &&
                                                    <a className="bg___BTN2" onClick={approveChickenEgg} >
                                               
                                                        Approve {chickenEggSymbol} for Factory</a>
                                                }
                                                {
                                                    chickenEggApproved > 0 && chickenEggDeposited == 0 &&
                                                    <a className="bg___BTN2" onClick={eggtoggle} >Put {chickenEggSymbol} in Factory</a>
                                            }
    
                                                {
                                                    adult > 0 && baseApprovedIncub > 0 &&
                                                    <a className="bg___BTN2" onClick={claimChicken} >Claim Material (Fee: {chickenClaimfee} {baseSymbol}) </a>
                                                }
    
                                                {
                                                    adult > 0 && baseApprovedIncub == 0 &&
                                                    <a className="bg___BTN2" onClick={approvebaseTokenIncub} >Approve {baseSymbol} to claim Solar</a>
                                                }
                                              </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='btm___arrow'>
                    <Link to='/choose'><img src={arrow} alt='arrow image here' /></Link>
                </div>
                {/* <div className="stokes">
                    <img src={stoke} alt='' />
                </div> */}
            </div>
            {/* <Footer /> */}



            <Modal isOpen={modal} toggle={toggle} centered={true}>


                <ModalBody>
                    <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

                </ModalBody>
                <Button className="bg___BTN2 mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

            </Modal>


            <Modal isOpen={sowModal} toggle={sowtoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            <b>Your {sowSymbol} Balance</b><br />
                            {sowBalance}
                        </span>
                        <span className="pull-right text-right">
                            <b>Your available Capacity</b><br />
                            {parseFloat(farmCapacity) - (parseFloat(sowDeposited) + parseFloat(boarDeposited))} Material
                        </span>
                    </div>
                    <label className="mb-3"><br /><b>Enter Quantity to Build</b>
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>

                    </label>
                    <input className="form-control" onChange={handlecDepositChange} type="text" value={cdamount} />
                    <span className="info"><b>Max:</b> {parseFloat(farmCapacity) - (parseFloat(sowDeposited) + parseFloat(boarDeposited))} Materials @ (1 {sowSymbol}/{boarSymbol} per 10 sq. m.)</span>
                    <span className="info"><b>Note:</b> 1 {boarSymbol} is required for 10 {sowSymbol} to build. {boarSymbol} is automatically dedcuted from your wallet and adjusted to remaining space and required {chickenFoodSymbol} is dedcuted from your wallet</span>
                    <span className="info mt-1"><b>Required {boarSymbol}:</b> {requiredBoar} {boarSymbol} (@ 1 {boarSymbol} per 10 {sowSymbol} )</span>

                    <label className=""><br /><b>Enter Weeks to Build</b>
                    </label>

                    <input className="form-control" onChange={handleDayChange} type="text" value={dayamount} />
                    <span className="info"><b>Note:</b> It takes One week for each {sowSymbol} to deliver one {chickenEggSymbol}</span>
                    <span className="info mt-1"><b>Est. {chickenEggSymbol}:</b> {parseFloat(parseFloat(requiredBoar) + parseFloat(cdamount)) * 20 * dayamount * 7} {chickenFoodSymbol} @ (20 {chickenFoodSymbol} per material daily)</span>
                    <span className="info mt-3"><b>Your Available {chickenFoodSymbol}:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
                    <span className="info mt-3"><b>Your {chickenFoodSymbol} Cost for Total Materials in Farm: </b> {parseFloat((parseFloat(sowDeposited) + parseFloat(cdamount) + parseFloat(requiredBoar)) * dayamount * 7 * 20).toFixed(2)} {chickenFoodSymbol}</span>
                    <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenDepositFee * cdamount).toFixed(2)} {baseSymbol} (@ {chickenDepositFee} per Material )</span>



                    {
                        cdepositError &&
                        <span className="error">{cdepositError}</span>
                    }

                </ModalBody>
                <ModalFooter>
                    {/* {baseApprovedFarm} */}
                    {
                        (boarApproved == 0 || sowApproved == 0 || chickenFoodApproved == 0 || baseApprovedFarm == 0) &&

                        <div className="container">
                            <h5>Approve following in order to deposit</h5>
                            <ul className="progressbar mt-3">
                                <li className={baseApprovedFarm > 0 ? "active" : ""}>{baseSymbol}</li>
                                <li className={chickenFoodApproved > 0 ? "active" : ""}>{chickenFoodSymbol}</li>
                                <li className={sowApproved > 0 ? "active" : ""}>{sowSymbol}</li>
                                <li className={boarApproved > 0 ? "active" : ""}>{boarSymbol}</li>
                            </ul>
                        </div>
                    }
                    {
                        approvalProcessing &&
                        <Button className="bg___BTN2 mr-3"  >Processing...</Button>

                    }
                    {
                        baseApprovedFarm == 0 && !approvalProcessing &&
                        <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

                    }

                    {
                        chickenFoodApproved == 0 && baseApprovedFarm > 0 && !approvalProcessing &&
                        <Button className="bg___BTN2 mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
                    }
                    {
                        sowApproved == 0 && chickenFoodApproved > 0 && baseApprovedFarm > 0 && !approvalProcessing &&
                        <Button className="bg___BTN2 mr-3" onClick={approveSow}>Approve {sowSymbol}</Button>

                    }
                    {
                        boarApproved == 0 && sowApproved > 0 && chickenFoodApproved > 0 && baseApprovedFarm > 0 && !approvalProcessing &&
                        <Button className="bg___BTN2 mr-3" onClick={approveBoar}>Approve {boarSymbol}</Button>

                    }
                    {
                        sowApproved > 0 && boarApproved > 0 && chickenFoodApproved > 0 && baseApprovedFarm > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={depositSow}>Deposit</Button>
                    }
                    <Button className="bg___BTN2" onClick={sowtoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={moreChickenModal} toggle={moreChickentoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            Your {sowSymbol} Balance<br />
                            {sowBalance}
                        </span>
                        <span className="pull-right text-right">
                            Your available {farmSymbol} Capacity<br />
                            {farmCapacity - (parseInt(sowDeposited) + parseInt(boarDeposited))}
                        </span>
                    </div>
                    <label className="mb-3"><br />Enter Quantity to add in Farm
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>

                    </label>

                    <input className="form-control" onChange={handlecDepositChange} type="text" value={cdamount} />
                    <span className="info">Max: {farmCapacity - (parseInt(sowDeposited) + parseInt(boarDeposited))} {sowSymbol} @ (1 {sowSymbol} per sq. m.)</span>


                    <span className="info">Est. {chickenFoodSymbol}: {cdamount * 20 * depositedDay} {chickenFoodSymbol} @ (600 {chickenFoodSymbol} per {sowSymbol} daily)</span>
                    <span className="info mt-3"><b>Your Available {chickenFoodSymbol}:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
                    <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenDepositFee * cdamount).toFixed(2)} {baseSymbol} (@ {chickenDepositFee} per pig )</span>

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
                        sowApproved > 0 && chickenFoodApproved > 0 && baseApprovedFarm > 0 &&
                        <Button className="bg___BTN2 mr-3" onClick={depositMoreChicken}>Deposit</Button>
                    }
                    <Button className="bg___BTN2" onClick={moreChickentoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>






            <Modal isOpen={buyAreaModal} toggle={buyAreaToggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            Your {baseSymbol} Balance<br />
                            {baseBalance}
                        </span>
                        <span className="pull-right text-right">
                            Your available {farmSymbol}<br />
                            
                            {farmCapacity - sowDeposited} sq m
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter in Multiple of ten for Build Area to Buy (sq m)
                        {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}

                    </label>
                    <input className="form-control" onChange={handleBuyAreaChange} type="text" value={buyareadamount} />
                    <span className="info mt-3"><b>Cost:</b> {buyareadamount * farmPrice * 10} {baseSymbol}</span>
                    <span className="info mt-1"><b>Area:</b> {buyareadamount * 10} sq. m.</span>
                    <span className="info mt-1"><b>Capacity:</b> {buyareadamount} MATERIAL(s)</span>

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
                            Your {baseSymbol} Balance<br />
                            {baseBalance}
                        </span>
                        <span className="pull-right text-right">
                            Your available {farmSymbol}<br />
                            {farmCapacity*10} sq m
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter in Multiple of ten for Build Area to add-on  (sq m)
                        {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}

                    </label>
                    <input className="form-control" onChange={handleAreaChange} type="text" value={areadamount} />
                    <span className="info mt-3"><b>Cost:</b> {areadamount * farmPrice * 10} {baseSymbol}</span>
                    <span className="info mt-1"><b>Area:</b> {areadamount * 10} sq. m.</span>
                    <span className="info mt-1"><b>Capacity:</b> {areadamount} Material(s)</span>

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
                            Your {chickenEggSymbol} Balance<br />
                            {chickenEggBalance}
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter Quantity to Transform
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxceDeposit}>Max</span>

                    </label>
                    <input className="form-control" onChange={handleeDepositChange} type="text" value={cedamount} />
                    <span className="info mt-3"><b>Fee:</b> {cedamount * eggDepositFee} {baseSymbol} (@{eggDepositFee} {baseSymbol} per Egg)</span><br />
                    <span className="info"><b>Maximum Per User:</b> 50 {chickenEggSymbol}</span>



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
                        <Button className="bg___BTN2 mr-3" onClick={depositEgg}>Deposit</Button>
                    }
                    <Button className="bg___BTN2" onClick={eggtoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>





            <Modal isOpen={addDaysChickenModal} toggle={addDaysChickentoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            Your Material(s) Deposited<br />
                            {sowDeposited} {sowSymbol} and {boarDeposited} {boarSymbol}
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter Weeks to add in Building
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxDayDeposit}>Max</span>

                    </label>
                    <input className="form-control" onChange={handleAddDayChange} type="text" value={addDayamount} />
                    <span className="info mt-3"><b>Your {chickenFoodSymbol} Cost for Total Material in Build:</b> {parseFloat((parseInt(sowDeposited) + parseInt(boarDeposited)) * addDayamount * 7 * 20).toFixed(2)} {chickenFoodSymbol}</span>
                    <span className="info mt-3"><b>Your Available {chickenFoodSymbol}:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>

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
                        <Button className="bg___BTN2 mr-3" onClick={addDays}>Add Days</Button>
                    }
                    <Button className="bg___BTN2" onClick={addDaysChickentoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={removeChickenModal} toggle={removeChickentoggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">
                        <span className="pull-left">
                            Your {sowSymbol} Deposited<br />
                            {sowDeposited}
                        </span>

                    </div>
                    <label className="mb-3"><br />Enter Quantity to remove from Build
                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcrDeposit}>Max</span>

                    </label>
                    <input className="form-control" onChange={handlecrDepositChange} type="text" value={crdamount} />
                    <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenRemoveFee * crdamount).toFixed(2)} {baseSymbol} (@ {chickenRemoveFee} per sow )</span>
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
export default PigFarm;