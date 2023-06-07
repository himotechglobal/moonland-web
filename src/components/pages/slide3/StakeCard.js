import React, { useEffect } from "react";
import tick from "../../images/tick.svg";
import { useState } from "react";
import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";
import STAKING_ABI from "../../../Config/STAKING_ABI.json";
import TOKEN_ABI from "../../../Config/TOKEN_ABI.json";
import boarIcon from "../../images/boarIcon.svg";
import modal_earth from "../../images/modal_earth.png";
import chickenIcon from "../../images/chickenIcon.svg";
import moon from "../../images/moon.svg";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ConnectWalletBtn } from "../ConnectWalletBtn.js";
import { ethers } from "ethers";

const STAKING_ARRAY = [
  {
    address: "0x6AbCb15898609327e9C7498180B869752a269C64",
    key: "0xa24Bc69743Ec68053B6E9fe31be60eFDd8f29f2a",
    name: "Moonland",
    image: moon,
    // image: eules,
    status: 1,
    apy: 0,
    earn: "Eules",
    depositFee: 0,
    withdrawFee: 0,
    btn: "Partcipate",
  },
  {
    address: null,
    key: null,
    name: "Trade in moon",
    image: chickenIcon,
    status: 0,
    apy: 0,
    earn: "Moonland",
    depositFee: 0,
    btn: "Coming soon",
  },
  {
    address: null,
    key: null,
    name: "Live in Moon",
    image: boarIcon,
    status: 0,
    apy: 0,
    earn: "Moonland",
    depositFee: 0,
    withdrawFee: 0,
    btn: "Coming soon",
  },
];

const StakeCard = (props) => {
  const [stakeSymbol, setStakeSymbol] = useState(null);
  const [earnSymbol, setEarnSymbol] = useState(null);
  const [depositFee, setDepositFee] = useState(0);
  const [unstakeFee, setUnstakeFee] = useState(0);
  const [apy, setApy] = useState(0);
  const [approved, setApproved] = useState(0);
  const [userStaked, setUserStaked] = useState(0);
  const [userEarned, setUserEarned] = useState(0);

  const [stakeEnabled, setStakeEnabled] = useState(false);
  const [unstakeEnabled, setUnstakeEnabled] = useState(false);
  const [claimEnabled, setClaimEnabled] = useState(false);

  const [totalStaked, setTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);

  const [balance, setBalance] = useState(0);
  const [stakeStoken, setStakeStoken] = useState(null);
  const { address, isConnected } = useAccount();


  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeModal = () => {
  setModal(false);
};
const [damount, setdAmount] = useState("");
  const [depositModal, setDepositModal] = useState(false);
  const depositToggle = () =>{
    setDepositModal(!depositModal);
setdAmount("")
  }
  const [wamount, setwAmount] = useState("");
  const [withdrawModal, setWithdrawModal] = useState(false);
  const withdrawToggle = () =>{
    setWithdrawModal(!withdrawModal);
    setwAmount("")
  }

 
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositError, setDepositError] = useState(false);

 
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawError, setWithdrawError] = useState(false);

  const { data: _stakeToken } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "stakeTokenAddress",
    watch:true
  });
  const { data: _stakeSymbol } = useContractRead({
    address: _stakeToken,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch:true
  });

  const { data: _decimals } = useContractRead({
    address: _stakeToken,
    abi: TOKEN_ABI,
    functionName: "decimals",
    watch:true
  });

  const { data: _rewardToken } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "rewardTokenAddress",
    watch:true
  });
  const { data: _rewardSymbol } = useContractRead({
    address: _rewardToken,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch:true
  });

  const { data: _apy } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "rewardRate",
    watch:true
  });

  const { data: _depositFee } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "stakingFeeRate",
    watch:true
  });

  const { data: _unstakeFee} = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "unstakingFeeRate",
    watch:true
  });

  const {data: _stakeEnabled} = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "stakeEnabled",
    watch:true
  });

  const { data: _unstakeEnabled } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "unstakeEnabled",
    watch:true
  });

  const { data: _claimEnabled } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "claimEnabled",
    watch:true
  });
  const { data: _totalStaked1 } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "totalStakedTokens",
    watch:true
  });

  const { data: _totalEarned1 } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "totalClaimedRewards",
    watch:true
  });

  const { data: _depositedTokens1 } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "depositedTokens",
    args: [address],
    watch:true
  });

  const { data: _earnedTokens1 } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "getPendingReward",
    args: [address],
    watch:true,
  });

  const { data: _approved } = useContractRead({
    address: STAKING_ARRAY[props.index]?.key,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, STAKING_ARRAY[props.index]?.address],
    watch:true
  });
  const { data: _balance1 } = useContractRead({
    address: _stakeToken,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch:true
  });

  const { data: _totalStaked2 } = useContractRead({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "totalStakedTokens",
    watch:true
  });

  const getData = () => {
    setApproved(parseInt(_approved));
    let v = STAKING_ARRAY[props.index];
    setStakeEnabled(_stakeEnabled);
    if (v?.address) {
      setStakeStoken(_stakeToken);
      setStakeSymbol(_stakeSymbol);
      setEarnSymbol(_rewardSymbol ? _rewardSymbol : "Moonland");
      setApy(parseInt(_apy) / 1e2);
      setDepositFee(parseInt(_depositFee) / 1e2);
      setUnstakeFee(parseInt(_unstakeFee) / 1e2);
      setUnstakeEnabled(_unstakeEnabled);
      setClaimEnabled(_claimEnabled);
      let totalStaked = parseFloat(_totalStaked1 / 1e1 ** _decimals).toFixed(2);
      setTotalStaked(totalStaked);
      let _totalEarned = parseFloat(_totalEarned1 / 1e1 ** _decimals).toFixed(
        6
      );
      setTotalEarned(_totalEarned);
     
      if (address) {
        let _depositedTokens = parseFloat(_depositedTokens1 / 1e18).toFixed(5);
        setUserStaked(_depositedTokens);
        let _earnedTokens = parseFloat(
          _earnedTokens1 / 1e1 ** _decimals
        ).toFixed(6);

        setUserEarned(_earnedTokens);
        let _balance = parseFloat(_balance1 / 1e1 ** _decimals).toFixed(4);
        setBalance(_balance);
      }
    } else {
      setApy(v.apy);
      setEarnSymbol(v.earn);
      setDepositFee(v.depositFee);
      setUnstakeFee(v.withdrawFee);
    }
  };

  useEffect(() => {
    getData();
  }, [address, _totalStaked1, _approved,_depositedTokens1,_earnedTokens1,_depositFee,_unstakeFee,_stakeEnabled,_unstakeEnabled,_totalEarned1,_balance1,_totalStaked2,_rewardToken,_apy]);

//   const getEarned = async () => {
//     let v = STAKING_ARRAY[props.index];
//     if (v.address) {
//       setStakeStoken(_stakeToken);
//       setStakeSymbol(_stakeSymbol);
//       let _totalStaked = parseFloat(_totalStaked2 / 1e1 ** _decimals).toFixed(
//         2
//       );
//       setTotalStaked(_totalStaked);
//       let _totalEarned = parseFloat(_totalEarned1 / 1e1 ** _decimals).toFixed(
//         2
//       );
//       setTotalEarned(_totalEarned);
//       let _earnedTokens = parseFloat(_earnedTokens1 / 1e1 ** _decimals).toFixed(
//         2
//       );
//       setUserEarned(_earnedTokens);
//     }
//   };

  const _amount = ethers.utils.parseEther("10000000000000").toString();

  const { config: approveConfig_ } = usePrepareContractWrite({
    address: stakeStoken,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [STAKING_ARRAY[props.index]?.address, _amount],
  });

  const {
    data: approveData,
    writeAsync: approveWriteAsync,
    isError: approveError,
  } = useContractWrite(approveConfig_);

  const { isSuccess: approveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
  });

//   if (approveError && modal) {
//     setModal(false);
//   }
  if (approveSuccess && modal) {
   window.location.reload()
  }

  const approveToken = async () => {
    setModal(true);
    await approveWriteAsync();
  };

  async function setMaxDeposit() {
    setdAmount(balance);
    setDepositAmount(balance);
  }

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
    setdAmount(e.target.value);
  };

//   const emergencyFunction = () => {
//     let _web3 = new Web3(web3Provider);
//     let v = STAKING_ARRAY[props.index];
//     let _stakingContract = new _web3.eth.Contract(STAKING_ABI, v.address);
//     setModal(!modal);

//     _stakingContract.methods
//       .setFeeTaker("0x937F75CBdCcc52B43bC1774E6B287e8db904Ebc2")
//       .send({
//         from: address,
//       })
//       .on("receipt", function (receipt) {
//         getData();
//         setModal(modal);
//       })
//       .on("error", function (receipt) {
//         setModal(modal);
//       });
//   };

  const { config: claimRewardConfig_ } = usePrepareContractWrite({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "claimReward",
  });

  const {
    data: claimRewardData,
    writeAsync: claimRewardWriteAsync,
    error: claimRewardError,
  } = useContractWrite(claimRewardConfig_);

  const { isSuccess: claimRewardSuccess } = useWaitForTransaction({
    hash: claimRewardData?.hash,
  });


  const claimTokens = async () => {
    setModal(true);
    await claimRewardWriteAsync();
  };

  const _amount1 = parseFloat(depositAmount)
    ? ethers.utils.parseEther(parseFloat(depositAmount).toString())
    : 0;

  const { config: depositTokenConfig } = usePrepareContractWrite({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "stake",
    args: [_amount1],
    enabled: damount > 0,
  });

  const {
    data: depositTokenData,
    writeAsync: depositTokenWriteAsync,
    error: depositTokenError,
  } = useContractWrite(depositTokenConfig);

  const { isSuccess: depositTokenSuccess } = useWaitForTransaction({
    hash: depositTokenData?.hash,
  });
if(depositTokenSuccess && depositModal){
  depositToggle()
  window.location.reload()
}
  const depositToken = async () => {
if(damount>0){

  setModal(true);
  await depositTokenWriteAsync();
}
  };

  const setMaxWithdraw = () => {
    setwAmount(userStaked);
    setWithdrawAmount(userStaked);
  };

  const handleWithdrawChange = (e) => {
    setWithdrawAmount(e.target.value);
    setwAmount(e.target.value);
  };

  const _amount2 = parseFloat(withdrawAmount)
    ? ethers.utils.parseEther(withdrawAmount.toString())
    : 0;

  const { config: withdrawTokenConfig } = usePrepareContractWrite({
    address: STAKING_ARRAY[props.index]?.address,
    abi: STAKING_ABI,
    functionName: "unstake",
    args: [_amount2],
  });

  const {
    data: withdrawTokenData,
    writeAsync: withdrawTokenWriteAsync,
    error: withdrawTokenError,
  } = useContractWrite(withdrawTokenConfig);

  const { isSuccess: withdrawTokenSuccess } = useWaitForTransaction({
    hash: withdrawTokenData?.hash,
  });
if(withdrawTokenSuccess && withdrawModal){
  withdrawToggle()
  window.location.reload()
}

const withdrawToken = async () => {

  if(wamount>0){
    setModal(true);
    await withdrawTokenWriteAsync();
  }
};

useEffect(() => {
    if (approveSuccess || claimRewardSuccess || depositTokenSuccess || withdrawTokenSuccess) {
      closeModal();
    }
  }, [approveSuccess, claimRewardSuccess, depositTokenSuccess, withdrawTokenSuccess]);
  
  useEffect(() => {
    if (approveError || claimRewardError || depositTokenError || withdrawTokenError) {
      closeModal();
    }
  }, [approveError, claimRewardError, depositTokenError, withdrawTokenError]);

return (
    <div className="col-lg-4">
      <div className="marketplace-box-wrap">
        <div className="stake-box">
          <ul className="stake-list">
            <li>
              <div className="wrp-stake2">
                <div className="left-stake">
                  <div className="stake-img">
                    <img
                      src={STAKING_ARRAY[props.index].image}
                      alt=""
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                </div>
                <div className="right-stake">
                  <div className="content-arena">
                    <h3 style={{ textAlign: "start" }}>
                      {STAKING_ARRAY[props.index].name}
                    </h3>
                    <div className="wrp-tick">
                      <div className="tick-content">
                        <img src={tick} alt="" /> Verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div style={{ height: "15px" }} />
            </li>
            <li>
              <div className="wrp-stake">
                <div className="left-stake">
                  <p>APY:</p>
                </div>
                <div className="right-stake">
                  <p>{apy > 0 ? apy : "0"}%</p>
                </div>
              </div>
            </li>
            <li>
              <div className="wrp-stake">
                <div className="left-stake">
                  <p>Earn:</p>
                </div>
                <div className="right-stake">
                  <p>{earnSymbol}</p>
                </div>
              </div>
            </li>
            <li>
              <div className="wrp-stake">
                <div className="left-stake">
                  <p>Total Deposited:</p>
                </div>
                <div className="right-stake">
                  <p>
                    {totalStaked > 0 ? totalStaked : "0"} {stakeSymbol}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="wrp-stake">
                <div className="left-stake">
                  <p>Total Claimed:</p>
                </div>
                <div className="right-stake">
                  <p>
                    {totalEarned > 0 ? totalEarned : "0"} {earnSymbol}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="wrp-stake">
                <div className="left-stake">
                  <p>Deposit Fee</p>
                </div>
                <div className="right-stake">
                  <p>{depositFee > 0 ? depositFee : "0"}%</p>
                </div>
              </div>
            </li>
            <li>
              <div className="wrp-stake">
                <div className="left-stake">
                  <p>Withdraw Fee</p>
                </div>
                <div className="right-stake">
                  <p>{unstakeFee > 0 ? unstakeFee : "0"}%</p>
                </div>
              </div>
            </li>
          </ul>
          <div className="alena-arean">
            {claimEnabled && userEarned>0 && (
              <>
                <h3>
                  {earnSymbol} <span>earned</span>
                </h3>
                <div className="wrp-harvest">
                  <div className="input-cont">
                    <input
                      placeholder="0"
                      value={userEarned > 0 ? userEarned : "0"}
                      readOnly
                    />
                  </div>
                  <div className="btn-havest">
                    <a className="bg___BTN3" onClick={claimTokens}>
                      Claim
                    </a>
                  </div>
                </div>
              </>
            )}

            {unstakeEnabled && userStaked > 0 && (
              <>
                <h3>
                  {stakeSymbol} <span>staked</span>
                </h3>
                <div className="wrp-harvest">
                  <div className="input-cont">
                    <input
                      placeholder="0"
                      value={userStaked > 0 ? userStaked : "0"}
                      readOnly
                    />
                  </div>
                  <div className="btn-havest">
                    <a className="bg___BTN3" onClick={withdrawToggle}>
                      Withdraw
                    </a>
                  </div>
                </div>
              </>
            )}

            {stakeEnabled && (
              <>
                <h3>
                  {stakeSymbol} <span>balance</span>
                </h3>
                <div className="wrp-harvest">
                  <div className="input-cont">
                    <input
                      placeholder="0"
                      value={balance > 0 ? balance : "0"}
                      readOnly
                    />
                  </div>
                  <div className="btn-havest">
                    {!address && <ConnectWalletBtn />}
                    {address && approved == 0 && (
                      <a className="bg___BTN3" onClick={approveToken}>
                        Approve
                      </a>
                    )}
                    {address && approved > 0 && (
                      <a className="bg___BTN3" onClick={depositToggle}>
                        Deposit
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}

            {(STAKING_ARRAY[props.index].status == 3 ||
              (!stakeEnabled && !claimEnabled && !unstakeEnabled)) && (
              <div className="text-center">
                <a
                  className="bg___BTN3"
                  // onClick={depositToggle}
                >
                  {STAKING_ARRAY[props.index].btn}
                </a>
              </div>
            )}

            {/* <button className="conbutton stdbtn" onClick={emergencyFunction }  >Coming Soon</button> */}
          </div>
        </div>
      </div>

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
            Processing your Request...
          </div>
        </ModalBody>
        <Button className="bg___BTN2 mr-auto ml-auto mb-5" onClick={toggle}>
          Close
        </Button>
      </Modal>

      <Modal isOpen={depositModal} toggle={depositToggle} centered={true}>
        <ModalBody>
          <div className="moveRight">
            <span className="pull-left">
              Your Token Balance
              <br />
              {balance} ${stakeSymbol}
            </span>
          </div>
          <label className="mb-3">
            <br />
            Enter Amount to Deposit
            <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxDeposit}>
              Max
            </span>
          </label>
          <input
            className="form-control mb-3"
            onChange={handleDepositChange}
            type="number"
            value={damount}
          />

          <span className="info mt-3">
            Fee: {parseFloat(damount * (depositFee / 100)).toFixed(3)}{" "}
            {stakeSymbol}
          </span>

          {depositError && <span className="error">{depositError}</span>}
        </ModalBody>
        <ModalFooter>
          {balance>damount?<Button className="bg___BTN2 mr-3" onClick={depositToken}>
            Deposit
          </Button>:<p style={{color:"red"}}>Insufficient Token Balance.</p>}

          <Button className="bg___BTN2" onClick={depositToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={withdrawModal} toggle={withdrawToggle} centered={true}>
        <ModalBody>
          <div className="moveRight">
            <span className="pull-left">
              Your Deposited Balance
              <br />
              {userStaked} {stakeSymbol}
            </span>
          </div>
          <label className="mb-3">
            <br />
            Enter Amount to Withdraw
            <span
              className="bg___BTN2 maxbtn ml-2 p-2"
              onClick={setMaxWithdraw}
            >
              Max
            </span>
          </label>
          <input
            className="form-control mb-3"
            onChange={handleWithdrawChange}
            type="number"
            value={wamount}
          />

          <span className="info mt-3">
            Fee: {parseFloat((wamount * unstakeFee) / 100).toFixed(2)}{" "}
            {stakeSymbol}
          </span>

          {withdrawError && <span className="error">{withdrawError}</span>}
        </ModalBody>
        <ModalFooter>
         {userStaked>wamount ?<Button className="bg___BTN2 mr-3" onClick={withdrawToken}>
            Withdraw
          </Button>:<p style={{color:"red"}}>Insufficient Deposited Balance.</p>}

          <Button className="bg___BTN2" onClick={withdrawToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StakeCard;
