import React, { useState, useEffect } from "react";
import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";
import "aos/dist/aos.css";
import Header from "../header.js";
import {
  PIG_FARMING,
  PIG_INCUBATOR,
  MARKETPLACE,
  BUILD_FARM,
  METLUX_TOKEN,
  THERMIX_TOKEN,
  POSITRONS_TOKEN,
  TOKEN,
  EULE_TOKEN,
} from "../../../Config/index.js";
import PIG_FARMING_ABI from "../../../Config/PIG_FARMING_ABI.json";
import PIG_INCUBATOR_ABI from "../../../Config/PIG_INCUBATOR_ABI.json";
import MARKETPLACE_ABI from "../../../Config/MARKETPLACE_ABI.json";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import TOKEN_ABI from "../../../Config/TOKEN_ABI.json";
import childe from "../../images/childe.svg";
import mbuild from "../../images/mbuild.png";
import arrow from "../../images/round_arrow.svg";
import moon from '../../images/cb7.png';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import acc__arrow_revse from "../../images/acc__arrow_revse.svg";
import acc__arrow from "../../images/acc__arrow.svg";
import { ethers } from "ethers";
import land from "../../images/land.svg";
import { Link } from "react-router-dom";
import thermix from "../../images/thermix.png";
import metlux from "../../images/metlux.png";
import modal_earth from "../../images/modal_earth.png";

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

  const [eggTime, seteggTime] = useState("70 days");
  const [eggTime2, seteggTime2] = useState("40 days");
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
  const [damount, setdAmount] = useState("");
  const [cdamount, setcdAmount] = useState(0);
  const [cedamount, setcedAmount] = useState("");
  const [crdamount, setcrdAmount] = useState("");
  const [addDayamount, setaddDayamount] = useState("");

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
  const closeModal = () => {
    setModal(false);
  };
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
  const addDaysChickentoggle = () =>
    setaddDaysChickenModal(!addDaysChickenModal);

  const [buyModal, setBuyModal] = useState(false);
  const buyToggle = () => setBuyModal(!buyModal);
  const [show, setShow] = useState(false);


  const { address, isConnected } = useAccount();

  let web3Provider = window.ethereum;

  const { data: _tokenPerfarm } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerFarmArea",
    watch: true,
  });
  const { data: _baseToken } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "baseToken",
    watch: true,
  });
  const { data: _farmToken } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "MoonLand",
    watch: true,
  });

  const { data: _sowToken } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "metluxToken",
    watch: true,
  });
  const { data: _boarToken } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "thermixToken",
    watch: true,
  });
  const { data: _chickenFoodToken } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "positronsToken",
    watch: true,
  });
  const { data: _depositFee } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "getDepositFee",
    args: [1],
    watch: true,
  });

  const { data: _removeFee } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "getRemoveFee",
    args: [1],
    watch: true,
  });
  const { data: _chickenFoodSymbol } = useContractRead({
    address: POSITRONS_TOKEN,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch: true,
  });
  const { data: _symbol } = useContractRead({
    address: BUILD_FARM,
    abi: NFT_ABI,
    functionName: "symbol",
    watch: true,
  });
  const { data: _sowSymbol } = useContractRead({
    address: METLUX_TOKEN,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch: true,
  });
  const { data: _boarymbol } = useContractRead({
    address: THERMIX_TOKEN,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch: true,
  });
  const { data: _baseSymbol } = useContractRead({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch: true,
  });
  const { data: _baseApproved } = useContractRead({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, MARKETPLACE],
    watch: true,
  });
  const { data: _baseApprovedFarm } = useContractRead({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, PIG_FARMING],
    watch: true,
  });

  const { data: _baseApprovedIncub } = useContractRead({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, PIG_INCUBATOR],
    watch: true,
  });
  const { data: _baseBalance } = useContractRead({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  const { data: _nftBalance } = useContractRead({
    address: BUILD_FARM,
    abi: NFT_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  const { data: _userInfo } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "userInfo",
    args: [address],
    watch: true,
  });

  const { data: _userSow } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "getUserMetlux",
    args: [address],
    watch: true,
  });

  const { data: _userBoar } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "getUserThermix",
    args: [address],
    watch: true,
  });
  const { data: _userEggs } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "pendingEules",
    args: [address],
    watch: true,
  });

  const { data: _userChickenDie } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "getUnlockTime",
    args: [address],
    watch: true,
  });
  const { data: _userClaimTimes1 } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "getNextClaim",
    args: [address],
    watch: true,
  });

  const { data: _chickenFoodBalance1 } = useContractRead({
    address: POSITRONS_TOKEN,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const { data: _sowBalance1 } = useContractRead({
    address: METLUX_TOKEN,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const { data: _sowApproved } = useContractRead({
    address: METLUX_TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, PIG_FARMING],
    watch: true,
  });
  const { data: _chickenFoodApproved } = useContractRead({
    address: POSITRONS_TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, PIG_FARMING],
    watch: true,
  });

  const { data: _boarBalance1 } = useContractRead({
    address: THERMIX_TOKEN,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  const { data: _boarApproved } = useContractRead({
    address: THERMIX_TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, PIG_FARMING],
    watch: true,
  });

  const { data: _nftTokenId } = useContractRead({
    address: BUILD_FARM,
    abi: NFT_ABI,
    functionName: "ownerTokens",
    args: [address],
    watch: true,
  });
  const { data: _approved } = useContractRead({
    address: BUILD_FARM,
    abi: NFT_ABI,
    functionName: "getApproved",
    args: [farmTokenId],
    watch: true,
  });
  const { data: _landIsfree } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "landIsfree",
    args: [farmTokenId, address],
    watch: true,
  });

  const { data: _userInfo1 } = useContractRead({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "getUserToken",
    args: [address],
    watch: true,
  });

  const getData = async () => {
    setProcessed(true);

    setApprovalProcessing(true);

    setFarmPrice(parseFloat(_tokenPerfarm / 1e18).toFixed(2));

    setbaseToken(_baseToken);

    setFarmToken(_farmToken);

    setChickenDepositFee(parseInt(_depositFee));

    setChickenRemoveFee(_removeFee);
    setChickenFoodToken(_chickenFoodToken);
    setsowToken(_sowToken);
    setboarToken(_boarToken);

    setChickenFoodSymbol(_chickenFoodSymbol);
    setFarmSymbol(_symbol);
    setsowSymbol(_sowSymbol);

    setboarSymbol(_boarymbol);
    setBaseSymbol(_baseSymbol);
    setFarmBalance(parseInt(_nftBalance));
    setApprovalProcessing(false);
    if (address) {
      setBaseApproved(_baseApproved);
      setBaseApprovedFarm(parseInt(_baseApprovedFarm));
      setBaseApprovedIncub(parseInt(_baseApprovedIncub));
      setBaseBalance(parseFloat(_baseBalance / 1e18).toFixed(2));
      setboarDeposited(parseFloat(_userBoar / 1e18).toFixed());

      setEggsearned(parseFloat(_userEggs / 1e18).toFixed());

      setSowDeposited(parseFloat(_userSow / 1e18).toFixed());
      if (parseFloat(_userInfo?.sow) > 0) {
      }

      if (_userSow > 0) {
        setUnlockTime(_userChickenDie);
      }

      let _current = new Date().getTime() / 1e3;
      if (parseInt(unlockTime) > _current) {
        setlayUnlockTime(parseInt(_userClaimTimes1[1]));
        setlayEndTime(parseInt(_userClaimTimes1[0]));
      }

      setChickenFoodBalance(parseFloat(_chickenFoodBalance1) / 1e18);
      setSowApproved(_sowApproved);

      setChickenFoodApproved(parseInt(_chickenFoodApproved));

      let _sowBalance = parseFloat(_sowBalance1 / 1e18).toFixed(3);
      setSowBalance(_sowBalance);

      let _boarBalance = parseFloat(_boarBalance1 / 1e18).toFixed(3);
      setBoarBalance(_boarBalance);
      setBoarApproved(parseInt(_boarApproved));
      setFarmTokenId(_nftTokenId);

      setLandIsfree(_landIsfree);
      setFarmLocked(_userInfo1?.[4]);
      //  setFarmTokenId(_userInfo1?.[1]);

      setFarmArea(parseFloat(_userInfo1?.[2] / 1e18).toFixed());
      setFarmCapacity(parseFloat(_userInfo1?.[3] / 1e18).toFixed());
      if (_nftBalance > 0 || _userInfo?.landlocked) {
        if (_approved === PIG_FARMING) {
          setFarmApprove(true);
        }

        // if (_userInfo1?.[4]) {
        //   setFarmTokenId(_userInfo1?.[1]);

        //   setFarmArea(parseFloat(_userInfo1?.[2] / 1e18).toFixed());
        //   setFarmCapacity(parseFloat(_userInfo1?.[3] / 1e18).toFixed());
        // }
      }
    }
  };

  const { data: _capacity } = useContractRead({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "capacity",
    watch: true,
  });
  const { data: _depositFee1 } = useContractRead({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "getDepositFee",
    args: [1],
    watch: true,
  });

  const { data: _chickenEggSymbol } = useContractRead({
    address: EULE_TOKEN,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch: true,
  });

  const { data: _balance } = useContractRead({
    address: EULE_TOKEN,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  const { data: _userInfo2 } = useContractRead({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "userInfo",
    args: [address],
    watch: true,
  });
  const { data: _chickenEggApproved } = useContractRead({
    address: EULE_TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, PIG_INCUBATOR],
    watch: true,
  });
  const { data: _userItens } = useContractRead({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "pendingItems",
    args: [address],
    watch: true,
  });
  const { data: _unlockItem } = useContractRead({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "getUnlockTime",
    args: [address],
    watch: true,
  });

  let _amt = ethers.utils.parseEther("1").toString();
  const { data: _claimChickenFee } = useContractRead({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "getClaimFee",
    args: [_amt],
    watch: true,
  });

  const { data: _unlockItem2 } = useContractRead({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "getUnlockTime",
    args: [address],
    watch: true,
  });

  const getEggData = async () => {
    setIncubCapacity(parseFloat(parseInt(_capacity) / 1e18).toFixed(2));

    setChickenEggSymbol(_chickenEggSymbol);

    setEggDepositFee(parseInt(_depositFee1));

    if (address) {
      setChickenEggBalance(parseFloat(_balance / 1e18).toFixed());
      setChickenEggDeposited(parseFloat(_userInfo2?.[0] / 1e18).toFixed());
      setChickenEggApproved(parseInt(_chickenEggApproved));
      setAdult(parseFloat(parseFloat(_userItens) / 1e18).toFixed());
      if (parseInt(_userInfo2?.[0]) > 0) {
        setEggUnlockTime(_unlockItem);
        setEggHatchTime(_unlockItem2);
        setChickenClaimfee(parseInt(_claimChickenFee) / 1e18);
      }
    }
  };

  const { config: lockNFTConfig_ } = usePrepareContractWrite({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "checkAndTransferLand",
    args: [address, farmTokenId],
    enabled: farmTokenId && farmBalance > 0,
  });

  const {
    data: lockNFTData,
    writeAsync: lockNFTWriteAsync,
    isError: lockNFTError,
  } = useContractWrite(lockNFTConfig_);

  const { isSuccess: lockNFTSuccess } = useWaitForTransaction({
    hash: lockNFTData?.hash,
  });

  useEffect(() => {
    getEggData();
    getData();
    // if(endTime==0){
    //   window.location
    // }
    if (unlockTime > 0) {
      // clearInterval(timeInterval);
      // timeInterval = setInterval(() => {
      //     getTime();
      // }, 1000);
      const interval = setInterval(() => {
        getTime();
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 1000);
    }

    if (layEndTime > 0) {
      // clearInterval(timeInterval1);
      // timeInterval1 = setInterval(() => {
      //     getlayTime();

      // }, 1000);
      setInterval(() => {
        getlayTime();
      }, 1000);
    }
    // console.log("eggitme",eggunlockTime)
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
  }, [
    farmTokenId,
    _nftTokenId,
    _userEggs,
    eggsearned,
    layEndTime,
    eggHatchTime,
    eggunlockTime,
    _userInfo,
    _userItens,
    _userInfo2,
    _baseApprovedIncub,
    _baseBalance,
    _userBoar,
    _userSow,
    _userChickenDie,
    unlockTime,
    _userClaimTimes1,
    _chickenFoodBalance1,
    _capacity,
    _depositFee1,
    _balance,
    _chickenEggApproved,
    _claimChickenFee,
    _unlockItem2,
    _baseApprovedFarm,
    _baseApproved,
    _chickenFoodApproved,
    _sowApproved,
    _userInfo1,
    address,
    _sowBalance1,
    _boarBalance1,
    _nftBalance,
    _unlockItem,
    approvalProcessing,
    baseApprovedFarm,
    chickenFoodApproved,
    sowApproved,
    _boarApproved,
    _approved,
    _landIsfree,
  ]);

  const lockNFT = async () => {
    setModal(true);
    await lockNFTWriteAsync();
  };

  const getlayTime = async () => {
    let _current = new Date().getTime() / 1e3;
    if (parseInt(_current) > parseInt(layEndTime)) {
      setlayTime(null);
    } else {
      if (parseInt(_current) > parseInt(layunlockTime)) {
        getData();
      } else {
        let remainingSecondsLay = layunlockTime - _current;

        let remainingDayLay = Math.floor(remainingSecondsLay / (60 * 60 * 24));

        let remainingHourLay = Math.floor(
          (remainingSecondsLay % (60 * 60 * 24)) / (60 * 60)
        );
        let remainingMinutesLay = Math.floor(
          (remainingSecondsLay % (60 * 60)) / 60
        );
        let remainingSecLay = Math.floor(remainingSecondsLay % 60);
        let _endTimeLay;
        if (remainingDayLay > 0) {
          _endTimeLay =
            remainingDayLay +
            "d : " +
            remainingHourLay +
            "h : " +
            remainingMinutesLay +
            "m";
          setlayTime(_endTimeLay);
        } else {
          _endTimeLay =
            remainingHourLay +
            "h : " +
            remainingMinutesLay +
            "m : " +
            remainingSecLay +
            "s";
          setlayTime(_endTimeLay);
        }
      }
    }
  };
  const getTime = async () => {
    let _current = new Date().getTime() / 1e3;

    if (parseInt(_current) > parseInt(unlockTime)) {
      setendTime(null);
    } else {
      let remainingSeconds = unlockTime - _current;

      let remainingDay = Math.floor(remainingSeconds / (60 * 60 * 24));

      let _depositDay = Math.round(remainingSeconds / (60 * 60 * 24));

      setDepositedDay(_depositDay);

      let remainingHour = Math.floor(
        (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
      );
      let remainingMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      let remainingSec = Math.floor(remainingSeconds % 60);
      let _endTime;
      if (remainingDay > 0) {
        _endTime =
          remainingDay +
          "d : " +
          remainingHour +
          "h : " +
          remainingMinutes +
          "m";
        setendTime(_endTime);
      } else {
        _endTime =
          remainingHour +
          "h : " +
          remainingMinutes +
          "m : " +
          remainingSec +
          "s";
        setendTime(_endTime);
      }
    }
  };

  const getEggHatchTime = async () => {
    let _current = new Date().getTime() / 1e3;
    if (parseInt(_current) > parseInt(eggHatchTime)) {
      seteggTime2(0);
    } else {
      let remainingSeconds = eggHatchTime - _current;

      let remainingDay = Math.floor(remainingSeconds / (60 * 60 * 24));
      let remainingHour = Math.floor(
        (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
      );
      let remainingMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      let remainingSec = Math.floor(remainingSeconds % 60);
      let _endTime;
      if (remainingDay > 0) {
        _endTime =
          remainingDay +
          "d : " +
          remainingHour +
          "h : " +
          remainingMinutes +
          "m";
        seteggTime2(_endTime);
      } else {
        _endTime =
          remainingHour +
          "h : " +
          remainingMinutes +
          "m : " +
          remainingSec +
          "s";
        seteggTime2(_endTime);
      }
    }
  };

  const getEggTime = async () => {
    let _current = new Date().getTime() / 1e3;
    if (parseInt(_current) > parseInt(eggunlockTime)) {
      seteggTime(0);
    } else {
      let remainingSeconds = parseInt(eggunlockTime) - _current;

      let remainingDay = Math.floor(remainingSeconds / (60 * 60 * 24));
      let remainingHour = Math.floor(
        (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
      );
      let remainingMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      let remainingSec = Math.floor(remainingSeconds % 60);
      let _endTime;
      if (remainingDay > 0) {
        _endTime =
          remainingDay +
          "d : " +
          remainingHour +
          "h : " +
          remainingMinutes +
          "m";
        seteggTime(_endTime);
      } else {
        _endTime =
          remainingHour +
          "h : " +
          remainingMinutes +
          "m : " +
          remainingSec +
          "s";
        seteggTime(_endTime);
      }
    }
  };

  const { config: removeChickenConfig_ } = usePrepareContractWrite({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "removeMetlux",

    args: [
      crdamount == ""
        ? 0
        : ethers.utils.parseEther?.(crdamount.toString()).toString(),
    ],
    watch: true,
  });

  const {
    data: removeChickenData,
    writeAsync: removeChickenWriteAsync,
    isError: removeChickenError,
  } = useContractWrite(removeChickenConfig_);

  const { isSuccess: removeChickenSuccess } = useWaitForTransaction({
    hash: removeChickenData?.hash,
  });

  if (removeChickenSuccess && removeChickenModal) {
    removeChickentoggle();
  }

  const removeChicken = async () => {
    setcrDepositError(false);
    if (sowDeposited < crdamount) {
      setcrDepositError("Error: Insufficient deposited balance");
      return false;
    } else {
      setModal(true);
      await removeChickenWriteAsync();

      document.getElementById("exampleModalCenter").modal("show");
    }
  };

  const { config: depositMoreChickenConfig_ } = usePrepareContractWrite({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "depositMoreMetlux",
    args: [
      cdamount == "" ? 0 : ethers.utils.parseEther(cdamount.toString()),
      parseInt(farmTokenId),
    ],
    enabled: cdamount > 0,
  });

  const {
    data: depositMoreChickenData,
    writeAsync: depositMoreChickenWriteAsync,
    isError: depositMoreChickenError,
  } = useContractWrite(depositMoreChickenConfig_);

  const { isSuccess: depositMoreChickenSuccess } = useWaitForTransaction({
    hash: depositMoreChickenData?.hash,
  });

  if (depositMoreChickenSuccess && moreChickenModal) {
    moreChickentoggle();
  }

  const depositMoreChicken = async () => {
    setcDepositError(false);
    if (parseInt(sowBalance) < parseInt(cdamount)) {
      setcDepositError("Error: Insufficient Metlux Balance");
      return false;
    } else if (
      parseInt(cdamount) >
      parseInt(farmCapacity) -
        parseInt(parseInt(sowDeposited) + parseInt(boarDeposited))
    ) {
      setcDepositError("Error: Insufficient Harvest Land");
      return false;
    } else if (
      chickenFoodBalance <
      parseInt(parseInt(cdamount) * parseInt(depositedDay) * 20)
    ) {
      setcDepositError(`Error: Insufficient ${chickenFoodSymbol} Balance`);
      return false;
    } else if (parseInt(cdamount) <= 0) {
      setcDepositError("Error: Quantity must be greater than 0.");
      return false;
    } else if (chickenDepositFee * cdamount > baseBalance) {
      setcDepositError(`Error: Insufficient ${baseSymbol} Balance`);
      return false;
    } else {
      setModal(true);
      await depositMoreChickenWriteAsync();
    }
  };

  let _boar = requiredBoar.toString();
  let _dayamount = dayamount * 7;
  const { config: depositSowConfig_ } = usePrepareContractWrite({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "deposit",
    args: [
      parseInt(farmTokenId),
      cdamount == ""
        ? 0
        : ethers.utils.parseEther(parseInt(cdamount).toString()).toString(),
      ethers.utils.parseEther(_boar).toString(),
      _dayamount,
    ],
    watch: true,
  });

  const {
    data: depositSowData,
    writeAsync: depositSowWriteAsync,
    isError: depositSowError,
  } = useContractWrite(depositSowConfig_);

  const { isSuccess: depositSowSuccess } = useWaitForTransaction({
    hash: depositSowData?.hash,
  });

  if (depositSowSuccess && sowModal) {
    sowtoggle();
  }

  const depositSow = async () => {
    setcDepositError(false);
    if (cdamount === "" || cdamount === 0) {
      setcDepositError("Error: Invalid Sow Quantity");
      return false;
    }
    if (dayamount === "" || dayamount === 0) {
      setcDepositError("Error: Invalid Day");
      return false;
    }

    if (chickenFoodBalance < cdamount * dayamount * 7 * 20) {
      setcDepositError("Error: Insufficient POS Balance");
      return false;
    } else if (cdamount > farmCapacity - sowDeposited) {
      setcDepositError("Error: Insufficient Harvest Land");
      return false;
    } else if (
      parseInt(parseInt(cdamount) + parseInt(requiredBoar)) >
      parseInt(farmCapacity) -
        parseInt(parseInt(sowDeposited) + parseInt(boarDeposited))
    ) {
      setcDepositError("Error: Insufficient Harvest Land");
      return false;
    } else {
      setModal(true);
      await depositSowWriteAsync();
    }
  };

  let _amount = ethers.utils.parseEther("5000000000000000000").toString();
  const { config: approvebaseTokenFarmConfig_ } = usePrepareContractWrite({
    address: baseToken,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [PIG_FARMING, _amount],
    watch: true,
  });

  const {
    data: approvebaseTokenFarmData,
    writeAsync: approvebaseTokenFarmWriteAsync,
    isError: approvebaseTokenFarmError,
  } = useContractWrite(approvebaseTokenFarmConfig_);

  const { isSuccess: approvebaseTokenFarmSuccess } = useWaitForTransaction({
    hash: approvebaseTokenFarmData?.hash,
  });

  const approvebaseTokenFarm = async () => {
    setApprovalProcessing(true);

    setModal(true);
    await approvebaseTokenFarmWriteAsync();
  };

  const { config: approvebaseTokenIncubConfig_ } = usePrepareContractWrite({
    address: baseToken,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [
      PIG_INCUBATOR,
      ethers.utils.parseEther("5000000000000000000").toString(),
    ],
    watch: true,
  });

  const {
    data: approvebaseTokenIncubData,
    writeAsync: approvebaseTokenIncubWriteAsync,
    isError: approvebaseTokenIncubError,
  } = useContractWrite(approvebaseTokenIncubConfig_);

  const { isSuccess: approvebaseTokenIncubSuccess } = useWaitForTransaction({
    hash: approvebaseTokenIncubData?.hash,
  });

  const approvebaseTokenIncub = async () => {
    setModal(true);
    await approvebaseTokenIncubWriteAsync();
  };

  const { config: approvebaseTokenConfig_ } = usePrepareContractWrite({
    address: baseToken,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [
      MARKETPLACE,
      ethers.utils.parseEther("5000000000000000000").toString(),
    ],
    watch: true,
  });

  const {
    data: approvebaseTokenData,
    writeAsync: approvebaseTokenWriteAsync,
    isError: approvebaseTokenError,
  } = useContractWrite(approvebaseTokenConfig_);

  const { isSuccess: approvebaseTokenSuccess } = useWaitForTransaction({
    hash: approvebaseTokenData?.hash,
  });

  const approvebaseToken = async () => {
    setModal(true);
    await approvebaseTokenWriteAsync();
  };

  const { config: approveChickenFoodConfig_ } = usePrepareContractWrite({
    address: chickenFoodToken,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [
      PIG_FARMING,
      ethers.utils.parseEther("5000000000000000000").toString(),
    ],
    watch: true,
  });

  const {
    data: approveChickenFoodData,
    writeAsync: approveChickenFoodWriteAsync,
    isError: approveChickenFoodError,
  } = useContractWrite(approveChickenFoodConfig_);

  const { isSuccess: approveChickenFoodSuccess } = useWaitForTransaction({
    hash: approveChickenFoodData?.hash,
  });

  const approveChickenFood = async () => {
    setApprovalProcessing(true);

    setModal(true);
    await approveChickenFoodWriteAsync();
  };

  const { config: claimMaterialConfig, isError: err } = usePrepareContractWrite(
    {
      address: PIG_INCUBATOR,
      abi: PIG_INCUBATOR_ABI,
      functionName: "claimMaterial",
      enabled: adult > 0,
    }
  );
  const {
    data: claimMaterialData,
    writeAsync: claimMaterialWriteAsync,
    isError: claimMaterialError,
  } = useContractWrite(claimMaterialConfig);
  const { isSuccess: claimMaterialSuccess } = useWaitForTransaction({
    hash: claimMaterialData?.hash,
  });

  const claimMaterial = async () => {
    setModal(true);
    await claimMaterialWriteAsync?.();
  };

  const { config: claimEggsConfig_ } = usePrepareContractWrite({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "claimEules",
    watch: true,
  });

  const {
    data: claimEggsData,
    writeAsync: claimEggsWriteAsync,
    isError: claimEggsError,
  } = useContractWrite(claimEggsConfig_);

  const { isSuccess: claimEggsSuccess } = useWaitForTransaction({
    hash: claimEggsData?.hash,
  });

  const claimEggs = async () => {
    setModal(true);
    await claimEggsWriteAsync();
  };
  let euleAmount = ethers.utils.parseEther("5000000000000000000").toString();
  const { config: claimEuleConfig_ } = usePrepareContractWrite({
    address: EULE_TOKEN,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [PIG_INCUBATOR, euleAmount],
    watch: true,
  });

  const {
    data: approveEule,
    writeAsync: claimChickenWriteAsync,
    isError: claimEuleError,
  } = useContractWrite(claimEuleConfig_);

  const { isSuccess: claimEuleSuccess } = useWaitForTransaction({
    hash: approveEule?.hash,
  });

  const approveChickenEgg = async () => {
    setModal(true);
    await claimChickenWriteAsync();
  };

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
    functionName: "approve",
    args: [
      PIG_FARMING,
      ethers.utils.parseEther("5000000000000000000").toString(),
    ],
    watch: true,
  });

  const {
    data: approveBoarData,
    writeAsync: approveBoarWriteAsync,
    isError: approveBoarError,
  } = useContractWrite(approveBoarConfig_);

  const { isSuccess: approveBoarSuccess } = useWaitForTransaction({
    hash: approveBoarData?.hash,
  });

  const approveBoar = async () => {
    setApprovalProcessing(true);

    setModal(true);
    await approveBoarWriteAsync();
  };

  const { config: approveSowConfig_ } = usePrepareContractWrite({
    address: METLUX_TOKEN,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [
      PIG_FARMING,
      ethers.utils.parseEther("5000000000000000000").toString(),
    ],
    watch: true,
  });

  const {
    data: approveSowData,
    writeAsync: approveSowWriteAsync,
    isError: approveSowError,
  } = useContractWrite(approveSowConfig_);

  const { isSuccess: approveSowSuccess } = useWaitForTransaction({
    hash: approveSowData?.hash,
  });

  const approveSow = async () => {
    setApprovalProcessing(true);
    setModal(true);
    await approveSowWriteAsync();
  };

  const { config: addDaysConfig_ } = usePrepareContractWrite({
    address: PIG_FARMING,
    abi: PIG_FARMING_ABI,
    functionName: "addMoreDays",
    args: [parseInt(addDayamount * 7)],
    watch: true,
  });

  const {
    data: addDaysData,
    writeAsync: addDaysWriteAsync,
    isError: addDaysError,
  } = useContractWrite(addDaysConfig_);

  const { isSuccess: addDaysSuccess } = useWaitForTransaction({
    hash: addDaysData?.hash,
  });

  if (addDaysSuccess && addDaysChickenModal) {
    addDaysChickentoggle();
  }

  const addDays = async () => {
    setaddDdepositError(false);
    setModal(true);
    await addDaysWriteAsync();
  };

  const { config: depositEggConfig_ } = usePrepareContractWrite({
    address: PIG_INCUBATOR,
    abi: PIG_INCUBATOR_ABI,
    functionName: "deposit",
    args: [
      cedamount == "" ? 0 : ethers.utils.parseEther?.(cedamount).toString(),
    ],
    enabled: cedamount > 0 && cedamount != "" && cedamount != 0,
  });

  const {
    data: depositEggData,
    writeAsync: depositEggWriteAsync,
    isError: depositEggError,
  } = useContractWrite(depositEggConfig_);

  const { isSuccess: depositEggSuccess } = useWaitForTransaction({
    hash: depositEggData?.hash,
  });

  if (depositEggSuccess && eggModal) {
    eggtoggle();
    window.location.reload();
  }

  const depositEgg = async () => {
    setceDepositError(false);
    if (parseInt(chickenEggBalance) < parseInt(cedamount)) {
      setceDepositError("Error: Insufficient Eule Balance");
      return false;
    } else {
      setModal(true);
      await depositEggWriteAsync();
    }
  };

  const { config: sellfarmConfig_ } = usePrepareContractWrite({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "sellMoonLandPigsty",
    args: [farmTokenId],
    watch: true,
  });

  const {
    data: sellfarmData,
    writeAsync: sellfarmWriteAsync,
    isError: sellfarmError,
  } = useContractWrite(sellfarmConfig_);

  const { isSuccess: sellfarmSuccess } = useWaitForTransaction({
    hash: sellfarmData?.hash,
  });

  const sellfarm = async () => {
    setModal(true);
    await sellfarmWriteAsync();
  };

  let _area = buyareadamount.toString();

  const { config: buyAreaNFTConfig_ } = usePrepareContractWrite({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "buyMoonLandPigsty",
    args: [_area],
    watch: true,
  });

  const {
    data: buyAreaNFTData,
    writeAsync: buyAreaNFTWriteAsync,
    isError: buyAreaNFTError,
  } = useContractWrite(buyAreaNFTConfig_);

  const { isSuccess: buyAreaNFTSuccess } = useWaitForTransaction({
    hash: buyAreaNFTData?.hash,
  });

  if (buyAreaNFTSuccess && buyAreaModal) {
    buyAreaToggle();
  }

  const buyAreaNFT = async () => {
    setbuyareadepositError(false);
    if (buyareadamount * farmPrice > baseBalance) {
      setbuyareadepositError("Error: Insufficient Balance");
    } else {
      setModal(true);
      await buyAreaNFTWriteAsync();
    }
  };

  const { config: addAreaNFTConfig_ } = usePrepareContractWrite({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "addMoonLandAreaPigsty",
    args: [parseInt(areadamount).toString(), farmTokenId],
    watch: true,
  });

  const {
    data: addAreaNFTData,
    writeAsync: addAreaNFTWriteAsync,
    isError: addAreaNFTError,
  } = useContractWrite(addAreaNFTConfig_);

  const { isSuccess: addAreaNFTSuccess } = useWaitForTransaction({
    hash: addAreaNFTData?.hash,
  });

  if (addAreaNFTSuccess && areaModal) {
    areaToggle();
    window.location.reload();
  }

  const addAreaNFT = async () => {
    setareadepositError(false);
    if (areadamount * farmPrice > baseBalance) {
      setareadepositError(`Error: Insufficient ${baseSymbol} Balance`);
    } else {
      setModal(true);
      await addAreaNFTWriteAsync();
    }
  };

  const { config: approveNFTConfig_ } = usePrepareContractWrite({
    address: BUILD_FARM,
    abi: NFT_ABI,
    functionName: "approve",
    args: [PIG_FARMING, farmTokenId],
    enabled: farmTokenId,
  });

  const {
    data: approveNFTData,
    writeAsync: approveNFTWriteAsync,
    isError: approveNFTError,
  } = useContractWrite(approveNFTConfig_);

  const { isSuccess: approveNFTSuccess } = useWaitForTransaction({
    hash: approveNFTData?.hash,
  });

  const approveNFT = async () => {
    setModal(true);
    await approveNFTWriteAsync();
  };

  const setMaxceDeposit = () => {
    let _damount = chickenEggBalance;
    if (chickenEggBalance > 50) {
      _damount = 50;
      setcedAmount(_damount.toString());
    }
  };

  const setMaxDayDeposit = async () => {
    let _damount =
      chickenFoodBalance /
      (20 * (parseInt(boarDeposited) + parseInt(sowDeposited)));

    setaddDayamount(parseFloat(_damount));
  };

  const setMaxcrDeposit = async () => {
    let _damount = sowDeposited;

    setcrdAmount(parseFloat(_damount));
  };

  const setMaxcDeposit = async () => {
    let _damount = sowBalance;
    if (sowBalance > farmCapacity) {
      _damount = farmCapacity;
    }
    setcdAmount(_damount);
    setcDepositAmount(_damount);
  };

  const handlecDepositChange = (e) => {
    setcDepositAmount(e.target.value);
    setcdAmount(e.target.value);
    setRequiredBoar(Math.ceil(parseFloat(e.target.value / 10).toFixed(2)));
  };

  const handleAddDayChange = (e) => {
    setaddDayamount(parseFloat(e.target.value));
  };
  const handlecrDepositChange = (e) => {
    setcrdAmount(parseFloat(e.target.value));
  };

  const handleeDepositChange = (e) => {
    setcedAmount(e.target.value);
  };
  const handleDayChange = (e) => {
    setDayamount(e.target.value);
  };

  const handleBuyAreaChange = (e) => {
    setbuyareadamount(e.target.value);
  };
  const handleAreaChange = (e) => {
    setareadamount(e.target.value);
  };

  useEffect(() => {
    if (
      lockNFTSuccess ||
      removeChickenSuccess ||
      depositMoreChickenSuccess ||
      depositSowSuccess ||
      approvebaseTokenFarmSuccess ||
      approvebaseTokenIncubSuccess ||
      approvebaseTokenSuccess ||
      approveChickenFoodSuccess ||
      claimMaterialSuccess ||
      claimEggsSuccess ||
      claimEuleSuccess ||
      approveBoarSuccess ||
      approveSowSuccess ||
      addDaysSuccess ||
      depositEggSuccess ||
      sellfarmSuccess ||
      buyAreaNFTSuccess ||
      addAreaNFTSuccess ||
      approveNFTSuccess
    ) {
      closeModal();
    }
  }, [
    lockNFTSuccess,
    removeChickenSuccess,
    depositMoreChickenSuccess,
    depositSowSuccess,
    approvebaseTokenFarmSuccess,
    approvebaseTokenIncubSuccess,
    approvebaseTokenSuccess,
    approveChickenFoodSuccess,
    claimMaterialSuccess,
    claimEggsSuccess,
    claimEuleSuccess,
    approveBoarSuccess,
    approveSowSuccess,
    addDaysSuccess,
    depositEggSuccess,
    sellfarmSuccess,
    buyAreaNFTSuccess,
    addAreaNFTSuccess,
    approveNFTSuccess,
  ]);

  useEffect(() => {
    if (
      lockNFTError ||
      removeChickenError ||
      depositMoreChickenError ||
      depositSowError ||
      approvebaseTokenFarmError ||
      approvebaseTokenIncubError ||
      approvebaseTokenError ||
      approveChickenFoodError ||
      claimMaterialError ||
      claimEggsError ||
      claimEuleError ||
      approveBoarError ||
      approveSowError ||
      addDaysError ||
      depositEggError ||
      sellfarmError ||
      buyAreaNFTError ||
      addAreaNFTError ||
      approveNFTError
    ) {
      closeModal();
    }
  }, [
    lockNFTError,
    removeChickenError,
    depositMoreChickenError,
    depositSowError,
    approvebaseTokenFarmError,
    approvebaseTokenIncubError,
    approvebaseTokenError,
    approveChickenFoodError,
    claimMaterialError,
    claimEggsError,
    claimEuleError,
    approveBoarError,
    approveSowError,
    addDaysError,
    depositEggError,
    sellfarmError,
    buyAreaNFTError,
    addAreaNFTError,
    approveNFTError,
  ]);

  return (
    <div>
      <Header />
      <div className="slide-bg">
        <section id="pigs-sec1">
          <div className="container">
            <div className="slide-heads">
              <h1>MOONSCAPE</h1>
              {/* <p>Combine Solor cells and Fluids Harvest</p> */}
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
                <div className="marketplace-box-wrap4">
                  <div className="newpool-box">
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
                      <div className="alien___rightBox">
                        <div className="alientime">
                          <div className="time__list">
                            <h3>
                              {farmBalance ? farmBalance : 0} {farmSymbol}
                            </h3>
                            <p>Your Balance</p>
                          </div>
                          <div className="time__list">
                            <h3>{farmArea ?? 0} sq yards</h3>
                            <p>Your Locked Build Area</p>
                          </div>
                          <div className="time__list">
                            <h3>
                              <span className="dollar__text">$ </span>
                              {farmArea * 1}
                            </h3>
                            <p>Market Value</p>
                          </div>
                          <div className="time__list">
                            <h3>{farmCapacity}</h3>
                            <p>SoPods Capacity</p>
                          </div>
                          {/* <div className="time__list">
                                                        <h3>0</h3>
                                                        <p>DuoPods Capacity</p>
                                                    </div> */}
 <div
                          className="acc__arrow___icon"
                          onClick={() => setShow((prev) => !prev)}
                        >
                          {show ? (
                            <img src={acc__arrow_revse} alt="" />
                          ) : (
                            <img src={acc__arrow} alt="" />
                          )}
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
            
            {show && <div className="acc__summery">
                  <div className="acc__summery__in">
                  <div
                            className="pool-btns"
                            // style={{ justifyContent: "end" }}
                          >
                            {!farmLocked &&
                              farmBalance > 0 &&
                              farmApprove &&
                              processed && (
                                <a className="bg___BTN2" onClick={lockNFT}>
                                  Lock {farmSymbol} NFT
                                </a>
                              )}
                            {farmBalance > 0 && !farmApprove && processed && (
                              <a className="bg___BTN2" onClick={approveNFT}>
                                Approve & Lock {farmSymbol} NFT
                              </a>
                            )}
                            {farmLocked && processed && (
                              <a className="bg___BTN2 " onClick={areaToggle}>
                                Buy More Build Area
                              </a>
                            )}
                            {!farmLocked && farmBalance == 0 && processed && (
                              <a className="bg___BTN2" onClick={buyAreaToggle}>
                                Buy Build Area
                              </a>
                            )}
                            {landIsfree && farmBalance > 0 && (
                              <a
                                className="bg___BTN2"
                                onClick={() => sellfarm()}
                              >
                                Sell Build Area
                              </a>
                            )}
                          </div>

                    
                  </div>
                </div>
             }
            <div className="row">
              <div className="col-lg-6">
                <div className="marketplace-box-wrap5">
                  <div className="small-pigfarm-box">
                    <div className="marketplace-box-wrap4">
                      <div className="mbuild__TopBox">
                        <div className="mbuild___box" style={{ width: "auto" }}>
                          <div>
                            <img src={mbuild} alt="" />
                          </div>
                          <div
                            className="uses-box-child1"
                            style={{ marginLeft: "20px" }}
                          >
                            <h3>SoPod</h3>
                          </div>
                        </div>

                        <div className="build___left">
                          <div className="build___item">
                            <h3>{eggsearned > 0 ? eggsearned : 0} </h3>
                            <p> EULE Earned</p>
                          </div>
                          {/* <div className="build___item">
                                                        <h3><span className='dollar__text'>$</span>{eggsearned * 10}</h3>
                                                        <p>Earned Value</p>
                                                    </div> */}
                          <div className="pigvalue-child1">
                            {/* {layunlockTime}
                                            {layEndTime} */}

                            <>
                              {(sowDeposited > 0 && unlockTime) >
                              new Date().getTime() / 1e3 ? (
                                <h3 style={{ paddingTop: "5px" }}>{endTime}</h3>
                              ) : (
                                <h3 style={{ paddingTop: "5px" }}>
                                  0d : 0h : 0m
                                </h3>
                              )}
                              <p className="marquee">
                                <span>
                                  <i className="fa fa-warning yellow"></i>{" "}
                                  {/* Time remaining for {chickenFoodSymbol} to end. */}
                                  SoPod will be built in
                                </span>
                              </p>
                            </>

                            {sowDeposited > 0 &&
                              unlockTime < new Date().getTime() / 1e3 && (
                                <>
                                  <h3 style={{ paddingTop: "5px" }}>
                                    {chickenFoodSymbol} Exhausted
                                  </h3>
                                  {/* <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Chicken feed to end.</span></p> */}
                                </>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pig-value-wrp">
                      <div className="build__value mrt">
                        <p>SoPods Built</p>
                        <h3 className="text-right">
                          {isNaN(sowDeposited) ? 0 : sowDeposited}{" "}
                          {/* {sowSymbol} */}
                        </h3>
                      </div>
                      <div className="build__value mrt">
                        <p>SoPods Rented</p>
                        <h3 className="text-right">
                          {isNaN(boarDeposited) ? 0 : boarDeposited}{" "}
                          {/* {boarSymbol} */}
                        </h3>
                      </div>
                    </div>

                    <div className="pig-value-wrp">
                      <div className="build__value">
                        <h3>
                          {sowBalance}
                          {/* {sowSymbol} */}
                        </h3>
                        <p>Metlux Balance</p>
                      </div>
                      <div className="build__value pigmr">
                        <h3>
                          {boarBalance}
                          {/* {boarSymbol} */}
                        </h3>
                        <p>Thermix Balance</p>
                      </div>
                    </div>
                    {/* <div className="pig-value-wrp">
                                            <div className="pigvalue-child1">
                                          
                                                {
                                                    sowDeposited > 0 && unlockTime > new Date().getTime() / 1e3 &&
                                                    <>
                                                        <h3 className="timer">{endTime}</h3>
                                                        <p className="marquee"><span><i className="fa fa-warning yellow" ></i>
                                                    
                                                         Time until the next SoPod is built
                                                         </span></p>
                                                    </>
                                                }
                                                {
                                                    sowDeposited > 0 && unlockTime < new Date().getTime() / 1e3 &&
                                                    <>
                                                        <h3 className="timer">{chickenFoodSymbol} Exhausted</h3>
                                                      
                                                    </>
                                                }
                                            </div>

                                            <div className="pigvalue-child1  text-right">
                                            
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
                                        </div> */}

                    <div className="thermix_btn">
                      <div className="thermix_sub_btn">
                        <div style={{ textAlign: "center" }}>
                          <img
                            src={thermix}
                            alt="thermix"
                            style={{ height: "109px", paddingLeft: "12px" }}
                          />
                        </div>
                        <a href="/buy/thermix#" className="bg___BTN2">
                          Buy Thermix
                        </a>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <img src={metlux} alt="metlux" />
                        </div>
                        <a href="/buy/metlux#" className="bg___BTN2">
                          Buy Metlux
                        </a>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <img style={{height:"95px"}} src={"https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2F7iSB07jCKP8ic0IlDVhX%2FFluid.png?alt=media&token=cacea51a-d2be-42d2-9e41-ff401cbf5367"} alt="metlux" />
                        </div>
                        <a href="/buy/positron#" className="bg___BTN2">
                          Buy Positron
                        </a>
                      </div>
                    </div>
                    <div className="btn-bp btn_new">
                      {eggsearned > 0 && (
                        <a
                          href="javacript:void"
                          className="bg___BTN2"
                          onClick={claimEggs}
                        >
                          Claim {chickenEggSymbol}
                        </a>
                      )}

                      {boarBalance > 0 &&
                        sowBalance > 0 &&
                        sowDeposited == 0 && (
                          <a
                            className="bg___BTN2"
                            onClick={sowtoggle}
                          >
                            {/* Deposit {sowSymbol} */}
                            Build SoPod
                          </a>
                        )}
                    </div>
                    <div className="btn-bp btn_new">
                      {sowDeposited > 0 &&
                        unlockTime > new Date().getTime() / 1e3 && (
                          <a
                            // href="javacript:void"
                            className="bg___BTN2"
                            onClick={() =>
                              setMoreChickenModal(!moreChickenModal)
                            }
                          >
                            Build More
                          </a>
                        )}

                      {sowDeposited > 0 &&
                        unlockTime < new Date().getTime() / 1e3 && (
                          <a
                            href="javacript:void"
                            className="bg___BTN2"
                            onClick={() =>
                              setremoveChickenModal(!removeChickenModal)
                            }
                          >
                            Remove {sowSymbol} From Harvest
                          </a>
                        )}

                      {sowDeposited > 0 && (
                        <a
                          // href="javacript:void"
                          className="bg___BTN2"
                          onClick={() =>
                            setaddDaysChickenModal(!addDaysChickenModal)
                          }
                        >
                          Add {chickenFoodSymbol}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="marketplace-box-wrap5">
                  <div className="small-pigfarm-box">
                    <div className="marketplace-box-wrap4">
                      <div className="mbuild__TopBox">
                        <div className="mbuild___box2" style={{ width: "0" }}>
                          <div>
                            <img className="mrb" src={childe} alt="" />
                          </div>
                          <div className="uses-box-child1">
                            <h3 className="ml-3">FORGINATOR</h3>
                          </div>
                        </div>
                        <div className="build___left">
                          <div className="build___item">
                            <h3>{adult} Material</h3>
                            <p>Forged By You</p>
                          </div>
                          <div className="build___item">
                            <h3>
                              <span className="dollar__text">$ </span>
                              {adult * 10}
                            </h3>
                            <p>Earned Value</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pig-value-wrp mrt">
                      <div className="build___item">
                        <h3> {chickenEggBalance}</h3>
                        <p>Your Eule</p>
                      </div>
                      <div className="build___item">
                        <h3>
                          {chickenEggDeposited} {chickenEggSymbol}
                        </h3>
                        <p> Forged in Total</p>
                      </div>
                      <div className="build___item bi__one">
                        <h3>{incubCapacity ? incubCapacity : 0}</h3>
                        <p>Available Slot</p>
                      </div>

                      {/* <div className="build___item">
                                                <h3><span className='dollar__text'>$</span>0.00</h3>
                                                <p>Earned Value</p>
                                            </div> */}
                    </div>
                    {/* <div className="pig-value-wrp2 mrt">
                                           
                                        </div> */}

                    <div
                      className="build___item"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 20px 20px",
                      }}
                    >
                      <p>Time to Yield </p>
                      <h3>{eggTime == 0 ? "98 days" : eggTime}</h3>
                    </div>
                    <div className="btn-bp">
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <a href="/marketplace" className="bg___BTN2">
                          Buy Eule
                        </a>

                        {chickenEggApproved == 0 && (
                          <a className="bg___BTN2" onClick={approveChickenEgg}>
                            Approve {chickenEggSymbol}
                          </a>
                        )}
                        {chickenEggApproved > 0 && chickenEggDeposited == 0 && (
                          <a className="bg___BTN2" onClick={eggtoggle}>
                            {/* Put {chickenEggSymbol} in Forge */}
                            Forge Materials
                          </a>
                        )}

                        {adult > 0 && baseApprovedIncub > 0 && (
                          <a
                            className="bg___BTN2"
                            onClick={() => claimMaterial()}
                          >
                            Claim Material (Fee: {chickenClaimfee} {baseSymbol}){" "}
                          </a>
                        )}

                        {adult > 0 && baseApprovedIncub == 0 && (
                          <a
                            className="bg___BTN2"
                            onClick={approvebaseTokenIncub}
                          >
                            Approve {baseSymbol} to claim Solar
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="btm___arrow">
          <Link to="/choose">
            <img src={arrow} alt="arrow image here" />
          </Link>
        </div>
        {/* <div className="stokes">
                    <img src={stoke} alt='' />
                </div> */}
      </div>
      {/* <Footer /> */}

      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalBody>
          <div className="modal_img_div1">
            <img
              src={modal_earth}
              alt="moonland"
              width={"150px"}
              style={{ opacity: "65%" }}
            />
          </div>
          <div className="modaltext text-center mt-4">
            Processing your Request....
          </div>
        </ModalBody>
        <Button className="bg___BTN2 mr-auto ml-auto mb-5" onClick={toggle}>
          Close
        </Button>
      </Modal>

      <Modal isOpen={sowModal} toggle={sowtoggle} centered={true}>
        <ModalBody>
          <div >
        <div className="sopod_build">
        <div style={{display:"flex",flexDirection:"column",gap:"15px"}}>
          <span>
              <b>Your {sowSymbol} Balance</b>
              <br />
              {sowBalance}
            </span>
            <span >
              <b>Your {boarSymbol} Balance</b>
              <br />
              {boarBalance}
            </span>
          </div>
      <div className="align_center">
      <span>
              <b>Your available Capacity</b>
              <br />
              {parseFloat(farmCapacity) -
                (parseFloat(sowDeposited) + parseFloat(boarDeposited))}{" "}
              Material
            </span>
      </div>
        </div>
          </div>
          <label className="mb-3">
            <br />
            <b>Enter Quantity to Build</b>
          </label>
          <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcDeposit}>
            Max
          </span>
          <input
            className="form-control"
            onChange={handlecDepositChange}
            type="number"
            value={cdamount}
          />
          <span className="info">
            <b>Max:</b>{" "}
            {parseFloat(farmCapacity) -
              (parseFloat(sowDeposited) + parseFloat(boarDeposited))}{" "}
            Materials @ (1 {sowSymbol}/{boarSymbol} per 10 sq. m.)
          </span>
          <span className="info">
            <b>Note:</b> 1 {boarSymbol} is required for 1 {sowSymbol} to build one SoPod.{" "}
            {boarSymbol} is automatically dedcuted from your wallet and adjusted
            to remaining space and required {chickenFoodSymbol}(Positron) is dedcuted from
            your wallet
          </span>
          <span className="info mt-1">
            <b>Required {boarSymbol}:</b> {requiredBoar} {boarSymbol} (@ 1{" "}
            {boarSymbol} per 1 {sowSymbol} )
          </span>

          <label className="">
            <br />
            <b>Enter Amount to Build</b>
          </label>

          <input
            className="form-control"
            onChange={handleDayChange}
            type="number"
            value={dayamount}
          />
          {/* <span className="info">
            <b>Note:</b> It takes One week for each {sowSymbol} to deliver one{" "}
            {chickenEggSymbol}
          </span> */}
           <span className="info">
            <b>Note:</b> It takes 1 week for a SoPod to get built, rented and generate 1{" "}
            {chickenEggSymbol}.
          </span>
          <span className="info mt-1">
            <b>Est. Positron:</b>{" "}
            {parseFloat(parseFloat(requiredBoar) + parseFloat(cdamount)) *
              20 *
              dayamount *
              7}{" "}
            {chickenFoodSymbol} @ (20 {chickenFoodSymbol} per material daily)
          </span>
          <span className="info mt-3">
            <b>Available {chickenFoodSymbol}:</b> {chickenFoodBalance}{" "}
            {chickenFoodSymbol}
          </span>
          {/* <span className="info mt-3">
            <b>Your {chickenFoodSymbol} Cost for Total Materials in Farm: </b>{" "}
            {parseFloat(
              (parseFloat(sowDeposited) +
                parseFloat(cdamount) +
                parseFloat(requiredBoar)) *
                dayamount *
                7 *
                20
            ).toFixed(2)}{" "}
            {chickenFoodSymbol}
          </span> */}
          <span className="info mt-1">
            <b>Fee:</b> {parseFloat(chickenDepositFee * cdamount).toFixed(2)}{" "}
            ${baseSymbol} (@ {chickenDepositFee} per Material )
          </span>

          {cdepositError && <span className="error">{cdepositError}</span>}
        </ModalBody>
        <ModalFooter>
          {/* {baseApprovedFarm} */}
          {(boarApproved == 0 ||
            sowApproved == 0 ||
            chickenFoodApproved == 0 ||
            baseApprovedFarm == 0) && (
            <div className="container">
              <h5 style={{ textAlign: "center" }}>
                Approve following in order to deposit
              </h5>
              <ul className="progressbar mt-3">
                <li className={baseApprovedFarm > 0 ? "active" : ""}>
                  ${baseSymbol}
                </li>
                <li className={chickenFoodApproved > 0 ? "active" : ""}>
                  {chickenFoodSymbol}
                </li>
                <li className={sowApproved > 0 ? "active" : ""}>{sowSymbol}</li>
                <li className={boarApproved > 0 ? "active" : ""}>
                  {boarSymbol}
                </li>
              </ul>
            </div>
          )}
          {approvalProcessing && (
            <Button className="bg___BTN2 mr-3">Processing...</Button>
          )}
          {baseApprovedFarm == 0 && !approvalProcessing && (
            <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenFarm}>
              Approve ${baseSymbol}
            </Button>
          )}

          {chickenFoodApproved == 0 &&
            baseApprovedFarm > 0 &&
            !approvalProcessing && (
              <Button className="bg___BTN2 mr-3" onClick={approveChickenFood}>
                Approve {chickenFoodSymbol}
              </Button>
            )}
          {sowApproved == 0 &&
            chickenFoodApproved > 0 &&
            baseApprovedFarm > 0 &&
            !approvalProcessing && (
              <Button className="bg___BTN2 mr-3" onClick={approveSow}>
                Approve {sowSymbol}
              </Button>
            )}
          {boarApproved == 0 &&
            sowApproved > 0 &&
            chickenFoodApproved > 0 &&
            baseApprovedFarm > 0 &&
            !approvalProcessing && (
              <Button className="bg___BTN2 mr-3" onClick={approveBoar}>
                Approve {boarSymbol}
              </Button>
            )}
          {sowApproved > 0 &&
            boarApproved > 0 &&
            chickenFoodApproved > 0 &&
            baseApprovedFarm > 0 && (
              <Button className="bg___BTN2 mr-3" onClick={depositSow}>
                Build
              </Button>
            )}
          <Button className="bg___BTN2" onClick={sowtoggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={moreChickenModal}
        toggle={moreChickentoggle}
        centered={true}
      >
        <ModalBody>
          <div>
            {/* <span className="pull-left">
              Your {sowSymbol} Balance
              <br />
              {sowBalance}
            </span>
            <span className="pull-right ">
              Your available {farmSymbol} Capacity
              <br />
              {farmCapacity -
                (parseInt(sowDeposited) + parseInt(boarDeposited))}
            </span> */}
             <div className="sopod_build">
        <div style={{display:"flex",flexDirection:"column",gap:"15px"}}>
          <span>
              <b>Your {sowSymbol} Balance</b>
              <br />
              {sowBalance}
            </span>
            <span >
              <b>Your {boarSymbol} Balance</b>
              <br />
              {boarBalance}
            </span>
          </div>
      <div className="align_center">
      <span>
              {/* Your available {farmSymbol} Capacity */}
              Your available Land (sq yards)
              <br />
              {farmCapacity -
                (parseInt(sowDeposited) + parseInt(boarDeposited))}
            </span>
      </div>
        </div>
          </div>
          <label className="mb-3">
            <br />
            {/* Enter Quantity to add in Harvest */}
            Enter number of SoPods to build
          </label>
          <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcDeposit}>
            Max
          </span>

          <input
            className="form-control"
            onChange={handlecDepositChange}
            type="number"
            value={cdamount}
          />
          <span className="info">
            Max:{" "}
            {farmCapacity - (parseInt(sowDeposited) + parseInt(boarDeposited))}{" "}
            {sowSymbol} @ (1 {sowSymbol} per sq yards)
          </span>

          <span className="info">
            Est. {chickenFoodSymbol}: {cdamount * 20 * depositedDay}{" "}
            {chickenFoodSymbol} @ (600 {chickenFoodSymbol} per Material{" "}
            daily)
          </span>
          <span className="info mt-1">
            <b>Note:</b> “1 {boarSymbol} is required against 1 {sowSymbol} to build 1 SoPod.
{boarSymbol} will be deducted automatically from your wallet.”
          </span>
          <span className="info mt-3">
            <b>Available {chickenFoodSymbol}:</b> {chickenFoodBalance}{" "}
            {chickenFoodSymbol}
          </span>
          <span className="info mt-1">
            <b>Fee:</b> {parseFloat(chickenDepositFee * cdamount).toFixed(2)}{" "}
            ${baseSymbol} (@ {chickenDepositFee} per MATERIAL(s) )
          </span>

          {cdepositError && <span className="error">{cdepositError}</span>}
        </ModalBody>
        <ModalFooter>
          {baseApprovedFarm == 0 && (
            <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenFarm}>
              Approve {baseSymbol}
            </Button>
          )}
          {chickenFoodApproved == 0 && baseApprovedFarm > 0 && (
            <Button className="bg___BTN2 mr-3" onClick={approveChickenFood}>
              Approve {chickenFoodSymbol}
            </Button>
          )}
          {chickenDepositFee * cdamount > baseBalance ? (
            <p style={{ color: "red" }}>Insufficient {baseSymbol} Balance.</p>
          ) : (
            sowApproved > 0 &&
            chickenFoodApproved > 0 &&
            baseApprovedFarm > 0 && (
              <Button className="bg___BTN2 mr-3" onClick={depositMoreChicken}>
                Build
              </Button>
            )
          )}
          <Button className="bg___BTN2" onClick={moreChickentoggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={buyAreaModal} toggle={buyAreaToggle} centered={true}>
        <ModalBody>
          <div className="moveRight">
            <span className="pull-left">
              Your {baseSymbol} Balance
              <br />
              {baseBalance}
            </span>
            <span className="pull-right ">
              Your available {farmSymbol}
              <br />
              {farmCapacity - sowDeposited} sq yards
            </span>
          </div>
          <label className="mb-3">
            <br />
            Enter in Multiple of ten for Build Area to Buy (sq yards)
            {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}
          </label>
          <input
            className="form-control"
            onChange={handleBuyAreaChange}
            type="number"
            value={buyareadamount}
          />
          <span className="info mt-3">
            <b>Cost:</b> {buyareadamount * farmPrice * 10} {baseSymbol}
          </span>
          <span className="info mt-1">
            <b>Area:</b> {buyareadamount * 10} sq. m.
          </span>
          <span className="info mt-1">
            <b>Capacity:</b> {buyareadamount} MATERIAL(s)
          </span>

          {buyareadepositError && (
            <span className="error">{buyareadepositError}</span>
          )}
        </ModalBody>
        <ModalFooter>
          {baseApproved == 0 && (
            <Button className="bg___BTN2 mr-3" onClick={approvebaseToken}>
              Approve {baseSymbol}
            </Button>
          )}
          {buyareadamount * farmPrice * 10 > baseBalance ? (
            <p style={{ color: "red" }}>Insufficient {baseSymbol} Balance</p>
          ) : (
            baseApproved > 0 && (
              <Button className="bg___BTN2 mr-3" onClick={buyAreaNFT}>
                Buy
              </Button>
            )
          )}
          <Button className="bg___BTN2" onClick={buyAreaToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={areaModal} toggle={areaToggle} centered={true}>
        <ModalBody>
          <div className="moveRight">
            <span className="pull-left">
              Your ${baseSymbol} Balance
              <br />
              {baseBalance}
            </span>
            <span className="pull-right ">
              {/* Your available {farmSymbol} */}
              Your Land Area
              <br />
              {farmCapacity * 10} sq yards
            </span>
          </div>
          <label className="mb-3">
            <br />
            Enter area you want to add (sq yards)
            {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}
          </label>
          <input
            className="form-control"
            onChange={handleAreaChange}
            type="number"
            value={areadamount}
          />
          <span className="info mt-3">
            <b>Cost:</b> {areadamount * farmPrice * 10} ${baseSymbol}
          </span>
          <span className="info mt-1">
            <b>Area:</b> {areadamount * 10} sq. yards
          </span>
          <span className="info mt-1">
            <b>Capacity:</b> {areadamount} Material(s)
          </span>

          {areadepositError && (
            <span className="error">{areadepositError}</span>
          )}
        </ModalBody>
        <ModalFooter>
          {baseApproved == 0 && (
            <Button className="bg___BTN2 mr-3" onClick={approvebaseToken}>
              Approve {baseSymbol}
            </Button>
          )}

          {areadamount * farmPrice * 10 > baseBalance ? (
            <p style={{ color: "red" }}>Insufficient {baseSymbol} Balance</p>
          ) : (
            baseApproved > 0 && (
              <Button className="bg___BTN2 mr-3" onClick={addAreaNFT}>
                Add
              </Button>
            )
          )}
          <Button className="bg___BTN2" onClick={areaToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={eggModal} toggle={eggtoggle} centered={true}>
        <ModalBody>
          <div className="moveRight">
            <span className="pull-left">
              Your {chickenEggSymbol} Balance
              <br />
              {chickenEggBalance}
            </span>
          </div>
          <label className="mb-3">
            <br />
            Enter Quantity to Transform
          </label>
          {/* <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxceDeposit}>
            Max
          </span> */}
          <input
            className="form-control"
            onChange={handleeDepositChange}
            type="number"
            value={cedamount}
          />
          <span className="info mt-3">
            <b>Fee:</b> {cedamount * eggDepositFee} {baseSymbol} (@
            {eggDepositFee} {baseSymbol} per Eules)
          </span>
          <br />
          <span className="info">
            <b>Maximum Per User:</b> 50 {chickenEggSymbol}
          </span>

          {cedepositError && <span className="error">{cedepositError}</span>}
        </ModalBody>
        <ModalFooter>
          {baseApprovedIncub == 0 && (
            <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenIncub}>
              Approve {baseSymbol}
            </Button>
          )}
          {cedamount * eggDepositFee > baseBalance ? (
            <p style={{ color: "red" }}>Insufficient {baseSymbol} Balance</p>
          ) : (
            chickenEggApproved > 0 &&
            baseApprovedIncub > 0 && (
              <Button className="bg___BTN2 mr-3" onClick={depositEgg}>
                Deposit
              </Button>
            )
          )}
          <Button className="bg___BTN2" onClick={eggtoggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={addDaysChickenModal}
        toggle={addDaysChickentoggle}
        centered={true}
      >
        <ModalBody>
          <div className="moveRight">
            <span className="pull-left">
              Your Material(s) Deposited
              <br />
              {sowDeposited} {sowSymbol} and {boarDeposited} {boarSymbol}
            </span>
          </div>
          <label className="mb-3">
            <br />
            Extend building weeks for assembled Materials
          </label>
          <span
            className="bg___BTN2 maxbtn ml-2 p-2"
            onClick={setMaxDayDeposit}
          >
            Max
          </span>
          <input
            className="form-control"
            onChange={handleAddDayChange}
            type="number"
            value={addDayamount}
          />

          <span className="info mt-3">
            <b>Your {chickenFoodSymbol} Cost for Total assembled Materials:</b>{" "}
            {(sowDeposited && boarDeposited && addDayamount) > 0
              ? parseFloat(
                  (parseInt(sowDeposited) + parseInt(boarDeposited)) *
                    addDayamount *
                    7 *
                    20
                ).toFixed(2)
              : 0}{" "}
            {chickenFoodSymbol}
          </span>
          <span className="info mt-3">
            <b>Available {chickenFoodSymbol}:</b> {chickenFoodBalance}{" "}
            {chickenFoodSymbol}
          </span>

          {addDdepositError && (
            <span className="error">{addDdepositError}</span>
          )}
        </ModalBody>
        <ModalFooter>
          {chickenFoodApproved == 0 && (
            <Button className="bg___BTN2 mr-3" onClick={approveChickenFood}>
              Approve {chickenFoodSymbol}
            </Button>
          )}
          {parseFloat(
            (parseInt(sowDeposited) + parseInt(boarDeposited)) *
              addDayamount *
              7 *
              20
          ).toFixed(2) > chickenFoodBalance ? (
            <p style={{ color: "red" }}>
              Insufficient {chickenFoodSymbol} Balance.
            </p>
          ) : (
            chickenFoodApproved > 0 && (
              <Button className="bg___BTN2 mr-3" onClick={addDays}>
                {/* Add Days */}
                Add
              </Button>
            )
          )}
          <Button className="bg___BTN2" onClick={addDaysChickentoggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={removeChickenModal}
        toggle={removeChickentoggle}
        centered={true}
      >
        <ModalBody>
          <div className="moveRight">
            <span className="pull-left">
              Your {sowSymbol} Deposited
              <br />
              {sowDeposited}
            </span>
          </div>
          <label className="mb-3">
            <br />
            Enter Quantity to remove from Build
          </label>
          <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxcrDeposit}>
            Max
          </span>
          <input
            className="form-control"
            onChange={handlecrDepositChange}
            type="number"
            value={crdamount}
          />
          <span className="info mt-1">
            <b>Fee:</b> {parseFloat(chickenRemoveFee * crdamount).toFixed(2)}{" "}
            {baseSymbol} (@ {chickenRemoveFee} per Metlux )
          </span>
          {crdepositError && <span className="error">{crdepositError}</span>}
        </ModalBody>
        <ModalFooter>
          {baseApprovedFarm == 0 && (
            <Button className="bg___BTN2 mr-3" onClick={approvebaseTokenFarm}>
              Approve {baseSymbol}
            </Button>
          )}

          <Button className="bg___BTN2 mr-3" onClick={removeChicken}>
            Remove
          </Button>

          <Button className="bg___BTN2" onClick={removeChickentoggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default PigFarm;
