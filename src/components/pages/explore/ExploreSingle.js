import React, { Component } from 'react';
import $, { inArray } from "jquery";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";


import Config, { NFT_MARKETPLACE } from '../../../Config/index.js';
import NFT_MARKETPLACE_ABI from '../../../Config/NFT_MARKETPLACE_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import Web3 from "web3"
import { useState, useEffect } from 'react';
// import useWallet from '@binance-chain/bsc-use-wallet'


import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ConnectWalletBtn } from '../ConnectWalletBtn.js';
import { TOKEN } from '../../../Config/index.js';
import { ethers } from 'ethers';

const ExploreSingle = (props) => {
  // console.log(props);
  let web3Provider = window.ethereum;
  // const wallet = useWallet();
  const { address, isConnected } = useAccount()
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

  const [decimals, setDecimals] = useState(0);
  const [bidIncreasePercentage, setBidIncreasePercentage] = useState(0);
  const [minimumBid, setMinimumBid] = useState(0);
  const [symbol, setSymbol] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [userbid, setUserbid] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [bidStatus, setBidStatus] = useState(null);
  const bidStatusName = ['Bidding Inactive', 'Bidding Open', 'Bidding Paused', 'Bidding Closed', ''];
  const [highestBidder, setHighestBidder] = useState(null);
  const [canClaim, setCanClaim] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  let timeInterval;
  let timeInterval2;
  const [modal, setModal] = useState(false);
  const [bidModal, setBidmodal] = useState(false);

  const toggle = () => setModal(!modal);
  const bidToggle = () => setBidmodal(!bidModal);
  const [tokenAddress, settokenAddress] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      web3Provider = window.ethereum;
    }
    else {
      web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
    }

    init();

  }, [address])
  
  const {data:_trade} =useContractRead({
    address:NFT_MARKETPLACE,
    abi:NFT_MARKETPLACE_ABI,
    functionName:"getTrade",
    args:[props.tradeid],
    watch:true
      })

  const {data:_fullTrade} =useContractRead({
    address:NFT_MARKETPLACE,
    abi:NFT_MARKETPLACE_ABI,
    functionName:"getFullTrade",
    args:[props.tradeid],
    watch:true
      })

  const {data:_symbol} =useContractRead({
    address:TOKEN,
    abi:TOKEN_ABI,
    functionName:"symbol",
    watch:true
      })
     
  const {data:_mediaURI} =useContractRead({
    address:_trade.nftadd,
    abi:NFT_ABI,
    functionName:"tokenURI",
    args:[parseInt(_trade.nftid)],
    watch:true
      })
    
      const {data:_statusF} =useContractRead({
        address:NFT_MARKETPLACE,
        abi:NFT_MARKETPLACE_ABI,
        functionName:"getFullTrade",
        args:[props.tradeid],
        watch:true
          })
        // console.log(_statusF);
      const {data:_status} =useContractRead({
        address:NFT_MARKETPLACE,
        abi:NFT_MARKETPLACE_ABI,
        functionName:"getAuctionStatus",
        args:[props.tradeid],
        watch:true
          })
         
      const {data:_bidIncreasePercentage} =useContractRead({
        address:NFT_MARKETPLACE,
        abi:NFT_MARKETPLACE_ABI,
        functionName:"bidIncreasePercentage",
        watch:true
          })
       
      const {data:_likes} =useContractRead({
        address:NFT_MARKETPLACE,
        abi:NFT_MARKETPLACE_ABI,
        functionName:"likes",
        args:[props.tradeid],
        watch:true
          })

      const {data:_decimals} =useContractRead({
        address:_fullTrade[5],
        abi:TOKEN_ABI,
        functionName:"decimals",
        watch:true
          })
         
      const {data:_balance1} =useContractRead({
        address:_fullTrade[5],
        abi:TOKEN_ABI,
        functionName:"balanceOf",
        args:[address],
        watch:true
          })
      const {data:_approval} =useContractRead({
        address:_fullTrade[5],
        abi:TOKEN_ABI,
        functionName:"allowance",
        args:[address, NFT_MARKETPLACE],
        watch:true
          })
       
      const {data:_liked} =useContractRead({
        address:NFT_MARKETPLACE,
        abi:NFT_MARKETPLACE_ABI,
        functionName:"likesMap",
        args:[props.tradeid, address],
        watch:true
          })
      
      const {data:_canClaim} =useContractRead({
        address:NFT_MARKETPLACE,
        abi:NFT_MARKETPLACE_ABI,
        functionName:"claim",
        args:[props.tradeid, address],
        watch:true
          })
      
      const {data:_userBid} =useContractRead({
        address:NFT_MARKETPLACE,
        abi:NFT_MARKETPLACE_ABI,
        functionName:"getBid",
        args:[props.tradeid, address],
        watch:true
          })

  const init = async () => {
    let _web3 = new Web3(web3Provider);
    let _marketPlaceContract = new _web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE);
    // let _trade = await _marketPlaceContract.methods.getTrade(props.tradeid).call();
    // let _fullTrade = await _marketPlaceContract.methods.getFullTrade(props.tradeid).call();
    let _token = _fullTrade[5];
    settokenAddress(_token);
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token);
    // let _symbol = await _tokenContract.methods.symbol().call();
    setSymbol(_symbol);
    let _nftToken = _trade.nftadd;
    let _nftTokenId = _trade.nftid;
    let _nftContract = new _web3.eth.Contract(NFT_ABI, _nftToken);
    // let _mediaURI = await _nftContract.methods.tokenURI(_nftTokenId).call();

    try {
      let originalUrl = _mediaURI;
      let replacedUrl = originalUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
  setMedia(replacedUrl);
      // _mediaURI = await fetch(_mediaURI);
      // _mediaURI = await _mediaURI.json();
      // setMedia(encodeURI(_mediaURI.image));
    }
    catch {

    }

    //  alert(encodeURI(_mediaURI.image))
    //  let _media = await getBase64FromUrl(_mediaURI)  ;
  
    setHighestBidder(_trade.highestBidder);

    // let _statusF = await _marketPlaceContract.methods.getFullTrade(props.tradeid).call();
    if (_statusF[8]) {

      // let _status = await _marketPlaceContract.methods.getAuctionStatus(props.tradeid).call();
      setBidStatus(_status)
    }
    else {
      setBidStatus(4)

    }
    
    setLister(_statusF.lister)
    // let _bidIncreasePercentage = await _marketPlaceContract.methods.bidIncreasePercentage().call();
    setBidIncreasePercentage(parseInt(_bidIncreasePercentage));

    // let _likes = await _marketPlaceContract.methods.likes(props.tradeid).call();
    setLikes(parseInt(_likes));




    //  setMedia(_media.toDataURL());
    //  setMedia(_media);
    let _name = _trade.title;


    setName(_name);

    // let _decimals = await _tokenContract.methods.decimals().call();
    setDecimals(_decimals);
    setPrice(_trade.startingPrice / 1e1 ** _decimals);
    
    let _highestBid = parseFloat(_trade.maxbid / 1e1 ** _decimals).toFixed(2);
   
    setHighestBid(_highestBid);

    setBuyer(_trade.buyer)
    let _minimumBid = parseFloat(parseFloat(_highestBid) + parseFloat(_highestBid * _bidIncreasePercentage / 100)).toFixed(2);
    setMinimumBid(_minimumBid)

    if (address) {

      // let _liked = await _marketPlaceContract.methods.likesMap(props.tradeid, address).call();
      setLiked(_liked);

      // let _balance = await _tokenContract.methods.balanceOf(address).call();
      let _balance = parseFloat(_balance1 / 1e1 ** _decimals).toFixed(2);
      setBalance(_balance)

      // let _approval = await _tokenContract.methods.allowance(address, NFT_MARKETPLACE).call();
      setApproval(parseInt(_approval))

      // let _canClaim = await _marketPlaceContract.methods.claim(props.tradeid, address).call();
      setCanClaim(_canClaim)
      // let _userBid = await _marketPlaceContract.methods.getBid(props.tradeid, address).call();
      // let _userBid = parseFloat(_userBid / 1e1 ** _decimals).toFixed(2);
      setUserbid(parseFloat(_userBid / 1e1 ** _decimals).toFixed(2))


    }
  }

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
    setdAmount(e.target.value);

  }

  async function setMaxDeposit() {


    setdAmount(balance * 0.99)
    setDepositAmount(balance * 0.99)
  }

  const { config: placeBidConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: 'placeBid',
    args: [props.tradeid, parseFloat(depositAmount)>0 ? ethers.utils.parseEther(parseFloat(depositAmount).toString()):0],
    
})
// console.log("amount",farmTokenId);

const { data: placeBidData, writeAsync: placeBidWriteAsync, isError: placeBidError } = useContractWrite(placeBidConfig)

const { isSuccess: placeBidSuccess } = useWaitForTransaction({
    hash: placeBidData?.hash,
})

if (placeBidError && modal) {
  setModal(false);
 
}
if (placeBidSuccess && modal) {
  setModal(false);

    init();
    bidToggle();

}


  const { config: buyNftConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: 'buyNft',
    args: [props.tradeid],
    

})
// console.log("amount",farmTokenId);

const { data: buyNftData, writeAsync: buyNftWriteAsync, isError: buyNftError } = useContractWrite(buyNftConfig)

const { isSuccess: buyNftSuccess } = useWaitForTransaction({
    hash: buyNftData?.hash,
})

if (buyNftError && modal) {
  setModal(false);
 
}
if (buyNftSuccess && modal) {
  setModal(false);

    init();

}


  const { config: withdrawConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: 'withdraw',
    args: [props.tradeid],

})
// console.log("amount",farmTokenId);

const { data: withdrawData, writeAsync: withdrawWriteAsync, isError: withdrawError } = useContractWrite(withdrawConfig)

const { isSuccess: withdrawSuccess } = useWaitForTransaction({
    hash: withdrawData?.hash,
})

if (withdrawError && modal) {
  setModal(false);
 
}
if (withdrawSuccess && modal) {
  setModal(false);

    init();

}
  async function placeBid() {
    setDepositError(false);
    let _amount = parseFloat(depositAmount);

    if (_amount + parseFloat(userbid) < minimumBid) {
      setDepositError('Bid must be at least ' + bidIncreasePercentage + '% higher than highest bid. Suggested Bid: ' + (minimumBid) + ' ' + symbol + '');
      return false;
    }

    if (_amount + parseFloat(userbid) <= highestBid && highestBidder != address) {
      setDepositError('Please bid amount higher than your last bid.');
      return false;
    }





    if (balance <= 0 || (_amount - parseFloat(userbid)) > balance) {
      setDepositError('Insufficient Balance. Please fund your wallet with some ' + symbol + ' Token and try again.');
      return false;
    }

    if (_amount <= 0 || _amount == "") {
      setDepositError('Invalid Deposit Amount. Please enter a valid amount greater than 0.');
      return false;
    }



    // let _web3 = new Web3(web3Provider);
    // const _marketPlaceContract = new _web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE);


    // _amount = _web3.utils.toWei(_amount.toString());

    setModal(true);
    await placeBidWriteAsync()
    // _marketPlaceContract.methods.placeBid(props.tradeid, _amount).send({
    //   from: address
    // }).on('receipt', function (receipt) {
    //   setModal(modal);
    //   init();
    //   bidToggle();
    // }).on('error', function (receipt) {
    //   setModal(modal);

    // })


  }




  async function buyNft() {

    let _web3 = new Web3(web3Provider);
    const _marketPlaceContract = new _web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE);

    // setModal(!modal);
    // _marketPlaceContract.methods.buyNft(props.tradeid).send({
    //   from: address
    // }).on('receipt', function (receipt) {
    //   setModal(modal);
    //   init();
    // }).on('error', function (receipt) {
    //   setModal(modal);

    // })
    setModal(true);
    await buyNftWriteAsync()

  }



  async function claimBid() {

    let _web3 = new Web3(web3Provider);
    const _marketPlaceContract = new _web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE);

    setModal(true);
    await withdrawWriteAsync?.()
    // _marketPlaceContract.methods.withdraw(props.tradeid).send({
    //   from: address
    // }).on('receipt', function (receipt) {
    //   setModal(modal);
    //   init();
    // }).on('error', function (receipt) {
    //   setModal(modal);

    // })

  }

  const { data: _tradeTime } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "getAuctionTime",
    args: [props.tradeid],
})

  const getTimer =() => {
   
    let _now = new Date().getTime() / 1e3;

    if (_tradeTime._endtime > _now) {
      let remainingSeconds = _tradeTime._endtime - _now;
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
     
      if (remainingSeconds <= 0) {
      let _endTime = "Ended";
        setEndTime(_endTime);

      }
      else if (remainingDay > 0) {
      let _endTime = remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
        setEndTime(_endTime);

      }
      else {
       let _endTime = remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
        setEndTime(_endTime);
      }
    }
  }

useEffect(() => {
    // clearInterval(timeInterval);
    // if (bidStatus == 1) {
    //   timeInterval = setInterval(() => {
    //     getTimer();

    //   }, 1000);
    // }
    getTimer();
  }, [bidStatus,_tradeTime]);

  const { config: unLikeTradeConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: 'unLike',
    args: [props.tradeid],



})


const { data: unLikeTradeData, writeAsync: unLikeTradeWriteAsync, isError: unLikeTradeError } = useContractWrite(unLikeTradeConfig)

const { isSuccess: unLikeTradeSuccess } = useWaitForTransaction({
    hash: unLikeTradeData?.hash,
})

if (unLikeTradeError && modal) {
  setModal(false);
 
}
if (unLikeTradeSuccess && modal) {
  setModal(false);
    init();

}
  async function unLikeTrade() {
    let _web3 = new Web3(web3Provider);

    setModal(true);

    // const _marketPlaceContract = new _web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE);

    // _marketPlaceContract.methods.unLike(props.tradeid).send({ from: address }).on('receipt', function (receipt) {
    //   init();
    //   setModal(modal);

    // })

    //   .on('error', function (error, receipt) {
    //     setModal(modal);

    await unLikeTradeWriteAsync()

  }

  const { config: likeTradeConfig } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: 'likes',
    args: [0],

})
// console.log("amount",farmTokenId);

const { data: likeTradeData, writeAsync: likeTradeWriteAsync, isError: likeTradeError } = useContractWrite(likeTradeConfig)

const { isSuccess: likeTradeSuccess } = useWaitForTransaction({
    hash: likeTradeData?.hash,
})

if (likeTradeError && modal) {
  setModal(false);
 
}
if (likeTradeSuccess && modal) {
  setModal(false);

    init();

}
  async function likeTrade() {
    let _web3 = new Web3(web3Provider);

    setModal(true);
    await likeTradeWriteAsync?.()

    // const _marketPlaceContract = new _web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE);

    // _marketPlaceContract.methods.like(props.tradeid).send({ from: address }).on('receipt', function (receipt) {
    //   init();
    //   setModal(modal);

    // })

    //   .on('error', function (error, receipt) {
    //     setModal(modal);

    //   });

  }
  const _amountApprove = ethers.utils.parseEther('10000000000000000000000').toString();
  const { config: approveTokenConfig } = usePrepareContractWrite({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: 'approve',
    args: [NFT_MARKETPLACE,_amountApprove],

})
// console.log("amount",farmTokenId);

const { data: approveTokenData, writeAsync: approveTokenWriteAsync, isError: approveTokenError } = useContractWrite(approveTokenConfig)

const { isSuccess: approveTokenSuccess } = useWaitForTransaction({
    hash: approveTokenData?.hash,
})

if (approveTokenError && modal) {
  setModal(false);
 
}
if (approveTokenSuccess && modal) {
  setModal(false);
  init()

}
  async function approveToken() {
    let _web3 = new Web3(web3Provider);

    setModal(true);
    await approveTokenWriteAsync?.()

    // const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, tokenAddress);
    // const _amount = _web3.utils.toWei('10000000000000000000000');
    // _tokenContract.methods.approve(NFT_MARKETPLACE, _amount).send({ from: address }).on('receipt', function (receipt) {
    //   init();
    //   setModal(modal);

    // })

    //   .on('error', function (error, receipt) {
    //     setModal(modal);

    //   });

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
      }
    });
  }
  return (

    <div className="col-lg-3">
     <div className='marketplace-box-wrap3'>
     <div class="product-list">
        <a href={"/product/" + props.tradeid}>

          {
            media == null ?
              <div class="product-img" >
                {/* <img src={media} /> */}
              </div>
              :
              <div class="product-img" style={{ backgroundImage: 'url(' + media + ')' }}>
                {/* <img src={media} /> */}
              </div>
          }

        </a>
        <div class="product-content">
          <div className="d-flex w-100 justify-content-between">
            <h4 className=""><a href={"/product/" + props.tradeid}>{name}</a></h4>
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
              <h5>{price} {symbol}</h5>
            </div>
            <div className="busd-child2">
              <p>{bidStatusName[bidStatus]}</p>
            </div>
          </div>
          <div className="more-detail">
            {
              bidStatus != 4 &&
              <ul className="m-0">
                <li className="d-flex justify-content-between mt-1"><p className="title font-weight-bold p_new">Highest Bid</p> <p className="value p_new">{highestBid} {symbol}</p> </li>
                <li className="d-flex justify-content-between mt-1"><p className="title font-weight-bold p_new">Your Bid</p> <p className="value p_new">{userbid} {symbol}</p> </li>
                {

                  endTime != 0 ?
                    <li className="d-flex justify-content-between mt-1"><p className="title font-weight-bold p_new">Ends In</p> <p className="value p_new">{endTime}</p> </li>
                    :
                    highestBidder == lister ?
                      <li className="d-flex justify-content-between mt-1"><p className="title font-weight-bold p_new">Expired</p> </li>
                      :
                      <li className="d-flex justify-content-between mt-1"><p className="title font-weight-bold p_new">Sold Out</p> </li>

                }

              </ul>
            }
          </div>


          {address && bidStatus == 1 &&
            <button class="x-product-place-bid-button" onClick={bidToggle} >Place Bid</button>
          }
          {address && bidStatus == 4 && approval > 0 &&
            <button class="x-product-place-bid-button" onClick={buyNft} >Buy Now</button>
          }
          {address && bidStatus == 4 && approval == 0 &&
            <button class="x-product-place-bid-button" onClick={approveToken} >Approve to Buy</button>
          }
          {!address &&
            <div className="mt-3 text-center"  >
              <ConnectWalletBtn />
            </div>
          }
          {address && !canClaim && bidStatus == 3 && highestBidder == address && buyer == null &&
            <button class="x-product-place-bid-button" onClick={claimBid} >Claim</button>

          }
          {address && !canClaim && userbid > 0 && bidStatus == 3 && highestBidder != address &&
            <button class="x-product-place-bid-button" onClick={claimBid} >Withdraw</button>

          }
        </div>
      </div>
     </div>


      <Modal isOpen={modal} toggle={toggle} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

        </ModalBody>
        <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

      </Modal>

      <Modal isOpen={bidModal} toggle={bidToggle} centered={true}>


        <ModalBody>

          <div className="moveRight">

            <span>
              Your Balance<br />
              {balance} {symbol}
            </span>
          </div>
          <label><br />Enter Bid Amount <span className="maxButton ml-2 p-2" onClick={setMaxDeposit}>Max</span></label>
          <input className="form-control" onChange={handleDepositChange} type="text" value={damount} />

          {
            parseFloat(damount) > userbid &&
            <h5 className="info font-size-large" >Your Deduction: {damount - userbid}</h5>
          }

          {
            depositError &&
            <span className="error">{depositError}</span>
          }




        </ModalBody>
        <ModalFooter>
          {
            (approval == 0 || approval < damount * decimals) &&
            <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
          }
          {
            (approval > 0 && approval >= damount * decimals) &&
            <Button className="depositButton mr-3" onClick={placeBid}>Bid Now</Button>

          }
          <Button className="depositButton" onClick={bidToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>

  );


}
export default ExploreSingle;