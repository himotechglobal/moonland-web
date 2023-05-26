import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalBody,
} from "reactstrap";

import Config, { NFT_MARKETPLACE } from "../../../Config/index.js";
import NFT_MARKETPLACE_ABI from "../../../Config/NFT_MARKETPLACE_ABI.json";
import TOKEN_ABI from "../../../Config/TOKEN_ABI.json";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import Web3 from "web3";
import { useState, useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ConnectWalletBtn } from "../ConnectWalletBtn.js";
import { TOKEN } from "../../../Config/index.js";
import modal_earth from "../../images/modal_earth.png";
import { ethers } from "ethers";

const ExploreSingle = (props) => {
  let web3Provider = window.ethereum;
  const { address, isConnected } = useAccount();
  const [name, setName] = useState(0);
  const [price, setPrice] = useState(0);
  const [media, setMedia] = useState(null);
  const [balance, setBalance] = useState(0);
  const [approval, setApproval] = useState(0);
  const [damount, setdAmount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [depositError, setDepositError] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [lister, setLister] = useState(null);
  const [show, setShow] = useState(true);
  const [isAuction, setIsAuction] = useState(false);
  const [decimals, setDecimals] = useState(0);
  const [bidIncreasePercentage, setBidIncreasePercentage] = useState(0);
  const [minimumBid, setMinimumBid] = useState(0);
  const [symbol, setSymbol] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [userbid, setUserbid] = useState(0);
  const [endTime, setEndTime] = useState("Ended");

  const [bidStatus, setBidStatus] = useState(null);
  const bidStatusName = [
    "Bidding Inactive",
    "Bidding Open",
    "Bidding Paused",
    "Bidding Closed",
    "",
  ];
  const [highestBidder, setHighestBidder] = useState(null);
  const [canClaim, setCanClaim] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  let timeInterval;
  let timeInterval2;
  const [modal, setModal] = useState(false);
  const [bidModal, setBidmodal] = useState(false);

  const toggle = () => setModal(!modal);
  const closeModal = () => {
    setModal(false);
  };
  const bidToggle = () => setBidmodal(!bidModal);

  const [tokenAddress, settokenAddress] = useState(null);

  // useEffect(() => {
  //   if (window.ethereum) {
  //     web3Provider = window.ethereum;
  //   } else {
  //     web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL);
  //   }

  //   init();
  // }, [address]);

  const { data: _trade } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "getTrade",
    args: [props.tradeid],
    watch: true,
  });

  const { data: _fullTrade } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "getFullTrade",
    args: [props.tradeid],
    watch: true,
  });

  const { data: _symbol } = useContractRead({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch: true,
  });

  const { data: _mediaURI } = useContractRead({
    address: _trade?.nftadd,
    abi: NFT_ABI,
    functionName: "tokenURI",
    args: [_trade?.nftid],
    watch: true,
  });

  const { data: _statusF } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "getFullTrade",
    args: [props?.tradeid],
    watch: true,
  });
  const { data: _status } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "getAuctionStatus",
    args: [props?.tradeid],
    watch: true,
  });
  const { data: _bidIncreasePercentage } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "bidIncreasePercentage",
    watch: true,
  });

  const { data: _likes } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "likes",
    args: [props?.tradeid],
    watch: true,
  });

  const { data: _decimals } = useContractRead({
    address: _fullTrade?.[5],
    abi: TOKEN_ABI,
    functionName: "decimals",
    watch: true,
  });

  const { data: _balance1 } = useContractRead({
    address: _fullTrade?.[5],
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  const { data: _approval } = useContractRead({
    address: _fullTrade?.[5],
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, NFT_MARKETPLACE],
    watch: true,
  });

  const { data: _liked } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "likesMap",
    args: [props?.tradeid, address],
    watch: true,
  });

  const { data: _canClaim } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "claim",
    args: [props.tradeid, address],
    watch: true,
  });

  const { data: _userBid } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "getBid",
    args: [props?.tradeid, address],
    watch: true,
  });

  const init = async () => {
    setIsAuction(_statusF?.isAuction);
    let _web3 = new Web3(web3Provider);
    let _token = _fullTrade?.[5];
    settokenAddress(_token);
    setSymbol(_symbol);

    try {
      let originalUrl = _mediaURI;
      let replacedUrl = originalUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
      setMedia(replacedUrl);
    } catch {}
    setHighestBidder(_trade?.highestBidder);
    if (_statusF?.[8]) {
      setBidStatus(_status);
    } else {
      setBidStatus(4);
    }

    setLister(_statusF?.lister);
    setBidIncreasePercentage(parseInt(_bidIncreasePercentage));
    setLikes(parseInt(_likes));
    let _name = _trade?.title;
    setName(_name);
    setDecimals(_decimals);
    setPrice(_trade?.startingPrice / 1e1 ** _decimals);
    let _highestBid = parseFloat(_trade?.maxbid / 1e1 ** _decimals).toFixed(2);
    setHighestBid(_highestBid);
    setBuyer(_trade?.buyer);
    let _minimumBid = parseFloat(
      parseFloat(_highestBid) +
        parseFloat((_highestBid * _bidIncreasePercentage) / 100)
    ).toFixed(2);
    setMinimumBid(_minimumBid);
    if (address) {
      setLiked(_liked);
      let _balance = parseFloat(_balance1 / 1e1 ** _decimals).toFixed(2);
      setBalance(_balance);
      setApproval(parseInt(_approval));
      setCanClaim(_canClaim);
      setUserbid(parseFloat(_userBid / 1e1 ** _decimals).toFixed(2));
    }
  };

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
    setdAmount(e.target.value);
  };

  async function setMaxDeposit() {
    setdAmount(balance * 0.99);
    setDepositAmount(balance * 0.99);
  }

  const { config: placeBidConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "placeBid",
    args: [
      props?.tradeid,
      parseFloat(depositAmount) > 0
        ? ethers.utils.parseEther(parseFloat(depositAmount).toString())
        : 0,
    ],
  });

  const {
    data: placeBidData,
    writeAsync: placeBidWriteAsync,
    isError: placeBidError,
  } = useContractWrite(placeBidConfig);

  const { isSuccess: placeBidSuccess } = useWaitForTransaction({
    hash: placeBidData?.hash,
  });

  if (placeBidSuccess && bidModal) {
    bidToggle();
  }
  const { config: buyNftConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "buyNft",
    args: [props?.tradeid],
  });

  const {
    data: buyNftData,
    writeAsync: buyNftWriteAsync,
    isError: buyNftError,
  } = useContractWrite(buyNftConfig);

  const { isSuccess: buyNftSuccess } = useWaitForTransaction({
    hash: buyNftData?.hash,
  });

  const { config: withdrawConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "withdraw",
    args: [props?.tradeid],
  });

  const {
    data: withdrawData,
    writeAsync: withdrawWriteAsync,
    isError: withdrawError,
  } = useContractWrite(withdrawConfig);
  const { isSuccess: withdrawSuccess } = useWaitForTransaction({
    hash: withdrawData?.hash,
  });

  async function placeBid() {
    setDepositError(false);
    let _amount = parseFloat(depositAmount);

    if (_amount + parseFloat(userbid) < minimumBid) {
      setDepositError(
        "Bid must be at least " +
          bidIncreasePercentage +
          "% higher than highest bid. Suggested Bid: " +
          minimumBid +
          " " +
          symbol +
          ""
      );
      return false;
    }

    if (
      _amount + parseFloat(userbid) <= highestBid &&
      highestBidder != address
    ) {
      setDepositError("Please bid amount higher than your last bid.");
      return false;
    }

    if (balance <= 0 || _amount - parseFloat(userbid) > balance) {
      setDepositError(
        "Insufficient Balance. Please fund your wallet with some " +
          symbol +
          " Token and try again."
      );
      return false;
    }

    if (_amount <= 0 || _amount == "") {
      setDepositError(
        "Invalid Deposit Amount. Please enter a valid amount greater than 0."
      );
      return false;
    }
    setModal(true);
    await placeBidWriteAsync();
  }

  async function buyNft() {
    setModal(true);
    await buyNftWriteAsync();
  }

  async function claimBid() {
    setModal(true);
    await withdrawWriteAsync?.();
  }

  const { data: _tradeTime } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "getAuctionTime",
    args: [props.tradeid],
    watch: true,
  });

  const getTimer = () => {
    let _now = new Date().getTime() / 1e3;
    if (parseInt(_tradeTime?._endtime) > _now) {
      setEndTime(parseInt(_tradeTime?._endtime) - _now);
    }
    let _startTime = _tradeTime?._starttime;
    let _endTime = _tradeTime?._endtime;
    let _timer = _tradeTime?._starttime;
    if (parseInt(_startTime) > _now) {
      _timer = _tradeTime?._starttime;
    } else if (parseInt(_endTime) > _now) {
      _timer = _tradeTime?._endtime;
    } else {
      _timer = "Ended";
      setEndTime(_timer);
    }
    if (_timer != "Ended") {
      let remainingSeconds = parseInt(_timer) - _now;

      let remainingDay = Math.floor(remainingSeconds / (60 * 60 * 24));
      let remainingHour = Math.floor(
        (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
      );
      let remainingMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      let remainingSec = Math.floor(remainingSeconds % 60);

      if (remainingSeconds <= 0) {
        let _endTime = "Ended";
        setEndTime(_endTime);
      } else if (remainingDay > 0) {
        let _endTime =
          remainingDay +
          "d : " +
          remainingHour +
          "h : " +
          remainingMinutes +
          "m";
        setEndTime(_endTime);
      } else {
        let _endTime =
          remainingHour +
          "h : " +
          remainingMinutes +
          "m : " +
          remainingSec +
          "s";
        setEndTime(_endTime);
      }
    }
  };

  useEffect(() => {
    // clearInterval(timeInterval);
    // if (bidStatus === 1) {
    //     timeInterval = setInterval(() => {
    //         getTimer();

    //     }, 1000);
    // }
    init();
    const interval = setInterval(() => {
      getTimer();
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 1000);
  }, [bidStatus, _tradeTime, _approval, _statusF, new Date().getTime() / 1e3,address]);
  async function unLikeTrade() {
    let _web3 = new Web3(web3Provider);

    setModal(true);
  }

  const _amountApprove = ethers.utils
    .parseEther("10000000000000000000000")
    .toString();
  const { config: approveTokenConfig } = usePrepareContractWrite({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [NFT_MARKETPLACE, _amountApprove],
  });

  const {
    data: approveTokenData,
    writeAsync: approveTokenWriteAsync,
    isError: approveTokenError,
  } = useContractWrite(approveTokenConfig);

  const { isSuccess: approveTokenSuccess } = useWaitForTransaction({
    hash: approveTokenData?.hash,
  });

  async function approveToken() {
    let _web3 = new Web3(web3Provider);

    setModal(true);
    await approveTokenWriteAsync?.();
  }

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  useEffect(() => {
    if (
      placeBidSuccess ||
      buyNftSuccess ||
      withdrawSuccess ||
      approveTokenSuccess
    ) {
      closeModal();
      // init();
    }
  }, [placeBidSuccess, buyNftSuccess, withdrawSuccess, approveTokenSuccess]);

  useEffect(() => {
    if (placeBidError || buyNftError || withdrawError || approveTokenError) {
      closeModal();
    }
  }, [placeBidError, buyNftError, withdrawError || approveTokenError]);
  return (
    <>
      {show && (
        <div className="col-lg-4 col-md-6 pb-4">
          <div className="marketplace-box-wrap3">
            <div class="product-list">
              <a href={"/product/" + props.tradeid}>
                {media == null ? (
                  <div class="product-img">{/* <img src={media} /> */}</div>
                ) : (
                  <div
                    class="product-img"
                    style={{ backgroundImage: "url(" + media + ")" }}
                  >
                    {/* <img src={media} /> */}
                  </div>
                )}
              </a>
              <div class="product-content">
                <div className="d-flex w-100 justify-content-between">
                  <h4 className="">
                    <a href={"/product/" + props.tradeid}>{name}</a>
                  </h4>
                  {/* <span className="p-1">
              
              {
                liked ?
                  <i className="fa fa-heart liked clickable" onClick={unLikeTrade} ></i>
                  :
                  <i className="fa fa-heart clickable" onClick={likeTrade} ></i>
              }
              {likes}
            </span> */}
                </div>
                <div className="wrp-busd">
                  <div className="busd-child1">
                    <h5>
                      {price} {symbol}
                    </h5>
                  </div>
                  <div className="busd-child2">
                    <p>{bidStatusName?.[bidStatus]}</p>
                  </div>
                </div>

                <div className="more-detail">
                  {/* {bidStatus  } */}

                  <ul className="m-0">
                    {bidStatus != 4 && (
                      <>
                        <li className="d-flex justify-content-between mt-1">
                          <p className="title font-weight-bold p_new">
                            Highest Bid
                          </p>{" "}
                          <p className="value p_new">
                            {highestBid} {symbol}
                          </p>{" "}
                        </li>
                        <li className="d-flex justify-content-between mt-1">
                          <p className="title font-weight-bold p_new">
                            Your Bid
                          </p>{" "}
                          <p className="value p_new">
                            {isNaN(userbid) ? 0.0 : userbid} {symbol}
                          </p>
                        </li>
                      </>
                    )}

                    {/* {endTime} */}
                    {/* { && <li className="d-flex justify-content-between mt-1"><p className="title font-weight-bold p_new">Starts In</p> <p className="value p_new">{endTime}</p> </li>} */}

                    {endTime != "Ended" ? (
                      <li className="d-flex justify-content-between mt-1">
                        <p className="title font-weight-bold p_new">
                          {parseInt(_tradeTime?._starttime) >
                          new Date().getTime() / 1e3
                            ? "Starts In"
                            : "Ends In"}
                        </p>{" "}
                        <p className="value p_new">{endTime}</p>{" "}
                      </li>
                    ) : buyer == lister ? (
                      <li className="d-flex justify-content-between mt-1">
                        <p className="title font-weight-bold p_new">
                          Cancelled
                        </p>{" "}
                      </li>
                    ) : buyer == "0x0000000000000000000000000000000000000000" &&
                      endTime == "Ended" &&
                      isAuction ? (
                      <li className="d-flex justify-content-between mt-1">
                        <p className="title font-weight-bold p_new">Expired</p>{" "}
                      </li>
                    ) : buyer !=
                      "0x0000000000000000000000000000000000000000" ? (
                      <li className="d-flex justify-content-between mt-1">
                        <p className="title font-weight-bold p_new">Sold Out</p>{" "}
                      </li>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>

                {address && bidStatus == 1 && address !== lister && (
                  <button className="bg___BTN_J" onClick={bidToggle}>
                    Place Bid
                  </button>
                )}
                {address &&
                  bidStatus == 4 &&
                  approval > 0 &&
                  address !== lister &&
                  buyer == "0x0000000000000000000000000000000000000000" && (
                    <button className="bg___BTN_J" onClick={buyNft}>
                      Buy Now
                    </button>
                  )}
                {address && bidStatus == 4 && approval == 0 && address !== lister &&
                  buyer == "0x0000000000000000000000000000000000000000" && (
                  <button className="bg___BTN_J" onClick={approveToken}>
                    Approve to Buy
                  </button>
                )}
                {!address && (
                  <div className="mt-3 text-center">
                    <ConnectWalletBtn />
                  </div>
                )}
                {address &&
                  !canClaim &&
                  bidStatus == 3 &&
                  highestBidder == address &&
                  buyer == null && (
                    <button className="bg___BTN_J" onClick={claimBid}>
                      Claim
                    </button>
                  )}
                {address &&
                  !canClaim &&
                  userbid > 0 &&
                  bidStatus == 3 &&
                  highestBidder != address && (
                    <button className="bg___BTN_J" onClick={claimBid}>
                      Withdraw
                    </button>
                  )}
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
                  style={{ opacity: "51%" }}
                />
              </div>
              <div className="modaltext text-center mt-4">
                Transaction is Processing...
              </div>
            </ModalBody>
            <Button
              className="depositButton mr-auto ml-auto mb-5"
              onClick={toggle}
            >
              Close
            </Button>
          </Modal>

          <Modal isOpen={bidModal} toggle={bidToggle} centered={true}>
            <ModalBody>
              <div className="moveRight">
                <span>
                  Your Balance
                  <br />
                  {balance} {symbol}
                </span>
              </div>
              <label>
                <br />
                Enter Bid Amount{" "}
                <span
                  className="bg___BTN2 ml-2"
                  style={{ padding: "8px 12px" }}
                  onClick={setMaxDeposit}
                >
                  Max
                </span>
              </label>
              <input
                className="form-control"
                onChange={handleDepositChange}
                type="text"
                value={damount}
              />

              {parseFloat(damount) > userbid && (
                <h6 className="info pt-3">
                  Your Deduction: {damount - userbid}
                </h6>
              )}

              {depositError && <span className="error">{depositError}</span>}
            </ModalBody>
            <ModalFooter>
              {(approval == 0 || approval < damount * decimals) && (
                <Button className="depositButton mr-3" onClick={approveToken}>
                  Approve
                </Button>
              )}
              {approval > 0 && approval >= damount * decimals && (
                <Button className="depositButton mr-3" onClick={placeBid}>
                  Bid Now
                </Button>
              )}
              <Button className="depositButton" onClick={bidToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </>
  );
};
export default ExploreSingle;
