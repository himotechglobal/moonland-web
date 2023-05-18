/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';

import check from '../../images/check.png';
import Config, { NFT_MARKETPLACE, TOKEN } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config2/MARKETPLACE_ABI.json';
import NFT_MARKETPLACE_ABI from '../../../Config/NFT_MARKETPLACE_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import Web3 from "web3"
import { useState, useEffect } from 'react';
import nft_item from "../../images/nft_item.svg"

import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import { useParams } from 'react-router-dom';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { ConnectWalletBtn } from '../ConnectWalletBtn.js';

const Product = (props) => {
    const { tradeid } = useParams();
    let web3Provider = window.ethereum;

    const [modal, setModal] = useState(false);
    const [bidModal, setBidmodal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const toggle = () => setModal(!modal);
    const bidToggle = () => setBidmodal(!bidModal);


    const [renewSaleModal, setRenewSaleModal] = useState(false);
    const [renewAuctionModal, setRenewAuctionModal] = useState(false);

    const renewSaleToggle = () => setRenewSaleModal(!renewSaleModal);
    const renewAuctionToggle = () => setRenewAuctionModal(!renewAuctionModal);


    // const wallet = useWallet();

    const bidStatusName = ['Inactive', 'Open', 'Paused', 'Closed']
    const [name, setName] = useState("Moon");
    const [balance, setBalance] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);

    const [bidStatus, setBidStatus] = useState(null);
    const [lister, setLister] = useState("");

    const [userbid, setUserbid] = useState(0);

    const [price, setPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [newStartTime, setNewStartTime] = useState(null);
    const [newEndTime, setNewEndTime] = useState(null);


    const [media, setMedia] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [highestBidder, setHighestBidder] = useState(null);
    const [highestBid, setHighestBid] = useState(null);
    const [tokenAddress, setTokenAddress] = useState(null);
    const [approval, setApproval] = useState(0);
    const [owner, setOwner] = useState(null);
    const [buyer, setBuyer] = useState(null);
    const [depositError, setDepositError] = useState(null);
    const [bidIncreasePercentage, setBidIncreasePercentage] = useState(0);
    const [minimumBid, setMinimumBid] = useState(0);

    const [decimals, setDecimals] = useState(0);
    const [damount, setdAmount] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [nftAddress, setNftAddress] = useState("");
    const [canClaim, setCanClaim] = useState(false);
    let timeInterval;
    let timeInterval2;


    const { address } = useAccount()

    useEffect(() => {
        // clearInterval(timeInterval);
        // if (bidStatus === 1) {
        //     timeInterval = setInterval(() => {
        //         getTimer();

        //     }, 1000);
        // }
        getTimer();
    }, [bidStatus]);

    useEffect(() => {


        // if (window.ethereum) {
        //     web3Provider = window.ethereum;
        // }
        // else {
        //     web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)

        // }

        clearInterval(timeInterval2);

        timeInterval2 = setInterval(() => {

            init();
        }, 1000);

    }, [address]);


    const { data: _tradeTime } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "getAuctionTime",
        args: [tradeid],
    })

    // console.log(_tradeTime);


    const getTimer = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // let _tradeTime = await _marketPlaceContract.methods.getAuctionTime(tradeid).call();

        let _now = new Date().getTime() / 1e3;

        if (_tradeTime._endtime > _now) {
            let remainingSeconds = _tradeTime._endtime - _now;

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
            if (remainingSeconds <= 0) {
                _endTime = "Ended";
                setEndTime(_endTime);

            }
            else if (remainingDay > 0) {
                _endTime = remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
                setEndTime(_endTime);

            }
            else {
                _endTime = remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
                setEndTime(_endTime);
            }
        }
    }
    useEffect(() => {
        // clearInterval(timeInterval);
        // if (bidStatus === 1) {
        //     timeInterval = setInterval(() => {
        //         getTimer();

        //     }, 1000);
        // }
        getTimer();
    }, [bidStatus,_tradeTime]);

    const { config: unLikeTradeConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'unLike',
        args: [tradeid]
    })

    const { data: unLikeTradeData, writeAsync: unLikeTradeWriteAsync, isError: unLikeTradeError } = useContractWrite(unLikeTradeConfig_)

    const { isSuccess: unLikeTradeSuccess } = useWaitForTransaction({
        hash: unLikeTradeData?.hash,
    })


    if (unLikeTradeError && modal) {
        setModal(false);
    }
    if (unLikeTradeSuccess && modal) {
        setModal(false);
    }



    const unLikeTrade = async () => {
        // let _web3 = new Web3(web3Provider);
        setModal(true);
        await unLikeTradeWriteAsync();
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        // _marketPlaceContract.methods.unLike(tradeid).send({ from: address }).on('receipt', function (receipt) {
        //     // init();          
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }

    const { config: likeTradeConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'like',
        args: [tradeid]
    })

    const { data: likeTradeData, writeAsync: likeTradeWriteAsync, isError: likeTradeError } = useContractWrite(likeTradeConfig_)

    const { isSuccess: likeTradeSuccess } = useWaitForTransaction({
        hash: likeTradeData?.hash,
    })


    if (likeTradeError && modal) {
        setModal(false);
    }
    if (likeTradeSuccess && modal) {
        setModal(false);
    }



    const likeTrade = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await likeTradeWriteAsync()

        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        // _marketPlaceContract.methods.like(tradeid).send({ from: address }).on('receipt', function (receipt) {
        //     // init();          
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    const { data: _trade } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "getTrade",
        args: [tradeid],
    })

    const { data: _fullTrade } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "getFullTrade",
        args: [tradeid],
       
    })

    const { data: _bidIncreasePercentage } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "bidIncreasePercentage",
        watch: true,
    })

    
    const { data: _symbol } = useContractRead({
        address: TOKEN,
        // address: _fullTrade?.[5],
        abi: TOKEN_ABI,
        functionName: "symbol",
        watch: true,
    })
    const { data: _decimals } = useContractRead({
           address: _fullTrade?.[5],
        abi: TOKEN_ABI,
        functionName: "decimals",
        watch: true,
    })
    const { data: _status } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "getAuctionStatus",
        args: [tradeid],
        watch: true,
    })

    const { data: _canClaim } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "claim",
        args: [tradeid, address],
        watch: true,
    })
    const { data: _balance2 } = useContractRead({
        address: _fullTrade?.[5],
        abi: TOKEN_ABI,
        functionName: "balanceOf",
        args: [address],
        watch: true,
    })
    const { data: _approval } = useContractRead({
        address: _fullTrade?.[5],
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, NFT_MARKETPLACE],
        watch: true,
    })
    const { data: _userBid1 } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "getBid",
        args: [tradeid,address],
        watch: true,
    })
    // let _nftTokenId = _trade?.nftid;
    // let _nftToken = _trade?.nftadd;
    const { data: _mediaURI_One } = useContractRead({
        address: _trade?.nftadd,
        abi: NFT_ABI,
        functionName: "tokenURI",
        args: [0],
        watch: true,
    })
    const { data: _owner } = useContractRead({
        address: _trade?.nftadd,
        abi: NFT_ABI,
        functionName: "ownerOf",
        args: [0],
        watch: true,
    })
    const { data: _liked } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "likesMap",
        args: [tradeid, address],
        watch: true,
    })
    const { data: _likes } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: "likes",
        args: [tradeid],
        watch: true,
    })









    const init = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // let _trade = await _marketPlaceContract.methods.getTrade(tradeid).call();

        //    console.log(_trade);

        // let _fullTrade = await _marketPlaceContract.methods.getFullTrade(tradeid).call();
        let _token = _fullTrade[5];

        //   console.log(_fullTrade);
        //  let _status =  await _marketPlaceContract.methods.getAuctionStatus(tradeid).call() ;
        //  setBidStatus(_status)

        setTokenAddress(_token)



        // let _bidIncreasePercentage = await _marketPlaceContract.methods.bidIncreasePercentage().call();
        setBidIncreasePercentage(parseInt(_bidIncreasePercentage));

        // let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token);
        // let _symbol = await _tokenContract.methods.symbol().call();
        // let _decimals = await _tokenContract.methods.decimals().call();
        if (_fullTrade[8]) {

            // let _status = await _marketPlaceContract.methods.getAuctionStatus(tradeid).call();
            setBidStatus(_status)
        }
        else {
            setBidStatus(4)
            let _buyPrice = parseFloat(_fullTrade.nftTokenPrice / 1e1 ** _decimals).toFixed(2)
            setBuyPrice(_buyPrice)
        }

        setDecimals(_decimals);
        setSymbol(_symbol);
        if (address) {
            // let _canClaim = await _marketPlaceContract.methods.claim(tradeid, address).call();
            setCanClaim(_canClaim)

            // let _balance = await _tokenContract.methods.balanceOf(address).call();
            let _balance = parseFloat(_balance2 / 1e1 ** _decimals).toFixed(2);
            setBalance(_balance)

            // let _approval = await _tokenContract.methods.allowance(address, MARKETPLACE).call();
            setApproval(parseInt(_approval));

            // let _userBid = await _marketPlaceContract.methods.getBid(tradeid, address).call();
            let _userBid = parseFloat(_userBid1 / 1e1 ** _decimals).toFixed(2);
            setUserbid(_userBid)

        }

        let _nftToken = _trade.nftadd;
        setNftAddress(_nftToken);

        // let _nftTokenId = _trade.nftid;
        // let _nftContract = new _web3.eth.Contract(NFT_ABI, _nftToken);
        // let _mediaURI = await _nftContract.methods.tokenURI(_nftTokenId).call();

        // let _owner = await _nftContract.methods.ownerOf(_nftTokenId).call();
        setOwner(_owner);
        if (_trade.buyer !== '0x0000000000000000000000000000000000000000') {
            setBuyer(_trade.buyer);
        }
        //  let _hs = await _nftContract.methods.tokenURI(_nftTokenId).call() ;
        setHighestBidder(_trade.highestBidder);
        setLister(_fullTrade.lister);

        let _highestBid = parseFloat(_trade.maxbid / 1e1 ** _decimals).toFixed(2);

        let _minimumBid = parseFloat(parseFloat(_highestBid) + parseFloat(_highestBid * _bidIncreasePercentage / 100)).toFixed(2);

        setMinimumBid(_minimumBid)

        if (address) {
            // let _liked = await _marketPlaceContract.methods.likesMap(tradeid, address).call();
            // console.log(props.tradeid);
            // console.log(_liked);
            setLiked(_liked);
        }


        // let _likes = await _marketPlaceContract.methods.likes(tradeid).call();
        setLikes(parseInt(_likes));
        //  setEndTime(_trade.)

        setHighestBid(_highestBid);
        let originalUrl = _mediaURI_One;
      let replacedUrl = originalUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
  setMedia(replacedUrl);
        //  alert(_mediaURI)
        //  let _media = await getBase64FromUrl(_mediaURI)  ; 
        //  setMedia(_media.toDataURL());
        // let _mediaURI = await fetch(_mediaURI_One);
        // _mediaURI = await _mediaURI.json();
        //  console.log(_mediaURI);
        // if(_media.includes('data:text/html;')){
        //  setMedia(WIZARDGIF);
        // }
        // else{
        // console.log(_mediaURI);

        // setMedia(encodeURI(_mediaURI.image));
        // alert(encodeURI(_mediaURI.image))

        // }
        let _name = _trade.title;
        setName(_name);
        let _price = parseFloat(_trade.startingPrice / 1e1 ** _decimals).toFixed(2);
        setPrice(_price);

    }

    const _amount = ethers.utils.parseEther('1').toString()
    const { config: placeBidConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'placeBid',
        args: [tradeid, _amount]
    })

    const { data: placeBidData, writeAsync: placeBidWriteAsync, isError: placeBidError } = useContractWrite(placeBidConfig_)

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




    const placeBid = async () => {
        setDepositError(false);


        if (_amount + parseFloat(userbid) < minimumBid) {
            setDepositError('Bid must be at least ' + bidIncreasePercentage + '% higher than highest bid. Suggested Bid: ' + (minimumBid) + ' ' + symbol);

            return false;
        }


        if (_amount + parseFloat(userbid) <= highestBid && highestBidder !== address) {
            setDepositError('Please bid amount higher than your last bid.');
            return false;
        }




        if (balance <= 0 || (_amount - parseFloat(userbid)) > balance) {
            setDepositError('Insufficient Balance. Please fund your wallet with some ' + symbol + ' Token and try again.');
            return false;
        }

        if (_amount <= 0 || _amount === "") {
            setDepositError('Invalid Deposit Amount. Please enter a valid amount greater than 0.');
            return false;
        }



        // let _web3 = new Web3(web3Provider);
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);


        // _amount = _web3.utils.toWei(_amount.toString());

        setModal(true);
        await placeBidWriteAsync()
        // _marketPlaceContract.methods.placeBid(tradeid, _amount).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     init();
        //     bidToggle();
        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

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

    const handleDepositChange = (e) => {
        setDepositAmount(e.target.value);
        setdAmount(e.target.value);

    }

    const handleStartTimeChange = (e) => {
        // console.log(e.target.value);
        setNewStartTime(e.target.value);
    }

    const handleNewEndTimeChange = (e) => {
        // console.log(e.target.value);
        setNewEndTime(e.target.value);
    }

    const handleNewPriceChange = (e) => {
        setNewPrice(e.target.value);


    }


    const setMaxDeposit = async () => {


        setdAmount(balance * 0.99)
        setDepositAmount(balance * 0.99)
    }




    // let _newPrice = ethers.utils.parseEther(newPrice.toString());

    const { config: renewSaleConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'renewInstantSellAuction',
        args: [tradeid,newPrice>0? ethers.utils.parseEther(parseFloat(newPrice)).toString():0],
    })

    const { data: renewSaleData, writeAsync: renewSaleWriteAsync, isError: renewSaleError } = useContractWrite(renewSaleConfig_)

    const { isSuccess: renewSaleSuccess } = useWaitForTransaction({
        hash: renewSaleData?.hash,
    })


    if (renewSaleError && modal) {
        setModal(false);
    }
    if (renewSaleSuccess && modal) {
        setModal(false);
        setRenewSaleModal(!renewSaleModal)
        init();
    }



    const renewSale = async () => {

        // let _web3 = new Web3(web3Provider);
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // let _newPrice = _web3.utils.toWei(newPrice.toString());
        setModal(true);
        await renewSaleWriteAsync()
        // _marketPlaceContract.methods.renewInstantSellAuction(tradeid, _newPrice).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     setRenewSaleModal(!renewSaleModal)
        //     init();
        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

    }


    const { config: cancelSaleConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'cancelInstantSellAuction',
        args: [tradeid],
    })

    const { data: cancelSaleData, writeAsync: cancelSaleWriteAsync, isError: cancelSaleError } = useContractWrite(cancelSaleConfig_)

    const { isSuccess: cancelSaleSuccess } = useWaitForTransaction({
        hash: cancelSaleData?.hash,
    })


    if (cancelSaleError && modal) {
        setModal(false);
    }
    if (cancelSaleSuccess && modal) {
        setModal(false);
        init();
    }

    const cancelSale = async () => {

        // let _web3 = new Web3(web3Provider);
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(true);
        await cancelSaleWriteAsync()
        // _marketPlaceContract.methods.cancelInstantSellAuction(tradeid).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     init();
        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

    }

    const { config: cancelAuctionConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'endAuction',
        args: [tradeid],
    })

    const { data: cancelAuctionData, writeAsync: cancelAuctionWriteAsync, isError: cancelAuctionError } = useContractWrite(cancelAuctionConfig_)

    const { isSuccess: cancelAuctionSuccess } = useWaitForTransaction({
        hash: cancelAuctionData?.hash,
    })


    if (cancelAuctionError && modal) {
        setModal(false);
    }
    if (cancelAuctionSuccess && modal) {
        init();
        setModal(false);
    }

    const cancelAuction = async () => {

        // let _web3 = new Web3(web3Provider);
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(true);
        await cancelAuctionWriteAsync()
        // _marketPlaceContract.methods.endAuction(tradeid).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     init();
        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

    }

    let _newStartTime = new Date(newStartTime).getTime() / 1e3;
    let _newEndTime = new Date(newEndTime).getTime() / 1e3;

    const { config: renewAuctionConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'renewAuction',
        args: [tradeid,newPrice>0? ethers.utils.parseEther(parseFloat(newPrice)).toString():0, _newStartTime, _newEndTime],
    })

    const { data: renewAuctionData, writeAsync: renewAuctionWriteAsync, isError: renewAuctionError } = useContractWrite(renewAuctionConfig_)

    const { isSuccess: renewAuctionSuccess } = useWaitForTransaction({
        hash: renewAuctionData?.hash,
    })


    if (renewAuctionError && modal) {
        setModal(false);
    }
    if (renewAuctionSuccess && modal) {
        setModal(false);
        init();
    }

    const renewAuction = async () => {

        // let _web3 = new Web3(web3Provider);
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // let _newPrice = _web3.utils.toWei(newPrice.toString());

        setModal(true);
        await renewAuctionWriteAsync()
        // _marketPlaceContract.methods.renewAuction(tradeid, _newPrice, _newStartTime, _newEndTime).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     init();
        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

    }



    const { config: claimBidConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'withdraw',
        args: [tradeid]
    })

    const { data: claimBidData, writeAsync: claimBidWriteAsync, isError: claimBidError } = useContractWrite(claimBidConfig_)

    const { isSuccess: claimBidSuccess } = useWaitForTransaction({
        hash: claimBidData?.hash,
    })


    if (claimBidError && modal) {
        setModal(false);
    }
    if (claimBidSuccess && modal) {
        setModal(false);
        init();
    }


    const claimBid = async () => {

        // let _web3 = new Web3(web3Provider);
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(true);
        await claimBidWriteAsync()
        // _marketPlaceContract.methods.withdraw(tradeid).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     init();
        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

    }


    const { config: buyNftConfig_ } = usePrepareContractWrite({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'buyNft',
        args: [tradeid]
    })

    const { data: buyNftData, writeAsync: buyNftWriteAsync, isError: buyNftError } = useContractWrite(buyNftConfig_)

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

    const buyNft = async () => {

        // let _web3 = new Web3(web3Provider);
        // const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(true);
        await buyNftWriteAsync()
        // _marketPlaceContract.methods.buyNft(tradeid).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     setModal(modal);
        //     init();
        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

    }



    const _amount2 = ethers.utils.parseEther('10000000000000000000000').toString()
    // console.log(ethers.utils.parseEther('10000000000000000000000').toString());
    const { config: approveTokenConfig_ } = usePrepareContractWrite({
        address: tokenAddress,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [NFT_MARKETPLACE, _amount2]
    })

    const { data: approveTokenData, writeAsync: approveTokenWriteAsync, isError: approveTokenError } = useContractWrite(approveTokenConfig_)

    const { isSuccess: approveTokenSuccess } = useWaitForTransaction({
        hash: approveTokenData?.hash,
    })


    if (approveTokenError && modal) {
        setModal(false);
    }
    if (approveTokenSuccess && modal) {
        setModal(false);
        init();
        bidToggle();
    }


    const approveToken = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(true);
        await approveTokenWriteAsync?.()
        // const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, tokenAddress); 
        // const _amount = _web3.utils.toWei('10000000000000000000000');
        // _tokenContract.methods.approve(MARKETPLACE, _amount).send({ from: address }).on('receipt', function (receipt) {
        //     init();
        //     setModal(modal);

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    return (
        <div>

            <div className="product-bg">
                <Header />
                <div class="container">
                    <section id="product-sec">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="product-contents">
                                            {
                                                media != null ?
                                                    <img src={media} style={{width:"100%",borderRadius:"25px"}}/>
                                                    :
                                                     <img src={nft_item} style={{width:"100%"}}/>
                                                 

                                            }
                                            {/* <div class="heart-wrp">
                        <div class="heart-child1">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="heart-child1 mart-h">
                            <i class="fas fa-expand-arrows-alt"></i>
                        </div>
                        </div> */}
                                            {/* <p>we use <img src={gamecontroller1} /><a href="#"> Learn more</a></p> */}
                                        </div>

                                    </div>
                                    <div class="col-lg-6">
                                        <div class="product-right-content">

                                            <h1 className="text-white" style={{fontSize:"35px",textTransform:"capitalize"}}>{name}
                                              {/* <span className="p-1">

                                                {
                                                    liked ?
                                                        <i className="fa fa-heart liked clickable" onClick={unLikeTrade} ></i>
                                                        :
                                                        <i className="fa fa-heart clickable" onClick={likeTrade} ></i>
                                                }
                                                {likes}
                                            </span> */}
                                            </h1>
                                            {
                                                buyer === lister ?
                                                    <p className="text-white" id="bidding">Cancelled</p>
                                                    :
                                                    bidStatus === 4 ?
                                                        <p className="text-white" id="bidding">Buy Now</p>
                                                        :
                                                        <p className="text-white" id="bidding">Bidding {bidStatusName[bidStatus]}</p>

                                            }
                                            {
                                                !address &&
                                                <span className="text-white" id="connect">Please connect Metamask to buy item.</span>
                                            }
                                            <div className="d-flex mt-3 socialcontainer">
                                                <FacebookShareButton url={window.location.href} quote={name} >
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                                <TwitterShareButton url={window.location.href} title={name} >
                                                    <TwitterIcon size={32} round />
                                                </TwitterShareButton >
                                                <TelegramShareButton url={window.location.href} title={name} >
                                                    <TelegramIcon size={32} round />
                                                </TelegramShareButton >
                                                <WhatsappShareButton url={window.location.href} title={name} separator=":: " >
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton >
                                            </div>
                                            <div className="holders">
                                                <h3></h3>
                                            </div>
                                            {
                                                bidStatus === 1 &&
                                                <span>Ends in {endTime}</span>
                                            }
                                            {/* <div class="icons-p-wrp">
                          <a href="#">
                          <div class="circle-icon2">
                          <i class="fas fa-ellipsis-h"></i>
                      </div>
                      </a>
                      <a href="#" class="mrt-l">
                          <div class="circle-icon2">
                         <i class="fas fa-cloud-upload-alt"></i>
                      </div>
                      </a>
                      </div>
                      <p v-if="product.forsale == 1">For sale <span>1 of 1</span></p>
                      <p v-else>Not for sale <span>1 of 1</span></p>
                       <div class="games-contents">
                          <a href="#"><img src="../assets/images/paint.png" /> Art</a>
                           <a href="#" class="mart-g"><img src="../assets/images/game_controller1.png" /> Games</a>
                      </div> 
                      <div class="product-paragraph">
                          <p>
                         <a href="#">Read more</a>
                        </p>
                      </div> */}
                                            <div className="mt-4 mb-2">
                                                {/* <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked /> */}
                                                {/* <label for="tab-btn-1">Info</label> */}
                                                {/* <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
                        <label for="tab-btn-2">Owners</label>
                        <input type="radio" name="tab-btn" id="tab-btn-3" value="" />
                        <label for="tab-btn-3">History</label>
                        <input type="radio" name="tab-btn" id="tab-btn-4" value="" />
                        <label for="tab-btn-4">Details</label>
                        <input type="radio" name="tab-btn" id="tab-btn-5" value="" />
                        <label for="tab-btn-5">Bids</label> */}

                                                <div id="content-1" >
                                                    <div class="products-list-wrp">
                                                        <ul class="products-list">
                                                            <li>
                                                                <div class="p-list-content-wrp">
                                                                    <div class="p-list-content-c">
                                                                        <div class="p-l-img">
                                                                            <img src="../assets/images/avatar.png" alt="" />
                                                                            <img alt="" />
                                                                        </div>
                                                                        <div class="check-img2" >
                                                                            <img src={check} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="p-list-content-c2">
                                                                        <div class="x-font-normal-blue">Owner</div>
                                                                        <div class="x-font-normal-white" >
                                                                            <a className="" href={"/profile/view/"+lister}>{lister.substring(0, 8) +
                  "...." +
                  lister.substring(lister.length - 6)}</a></div>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div class="p-list-content-wrp">
                                                                    <div class="p-list-content-c">
                                                                        <div class="p-l-img">
                                                                            <img src="../assets/images/avatar.png" alt="" />
                                                                            <img alt="" />
                                                                        </div>
                                                                        <div class="check-img2" >
                                                                            <img src={check} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="p-list-content-c2">
                                                                        <div class="x-font-normal-blue">NFT Address</div>
                                                                        <div class="x-font-normal-white"><a href={Config.EX_LINK + nftAddress}>{nftAddress.substring(0, 8) +
                  "...." +
                  nftAddress.substring(nftAddress.length - 6)}</a></div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {
                                                                buyer && buyer !== lister &&
                                                                <li>
                                                                    <div class="p-list-content-wrp">
                                                                        <div class="p-list-content-c">
                                                                            <div class="p-l-img">
                                                                                <img src={check} alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Buyer</div>
                                                                            <div class="x-font-normal-white"><a className="text-white" href={"/profile/view/" + buyer}>{buyer}</a></div>

                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            }
                                                            {
                                                                !buyer && (bidStatus === 1 || !canClaim) && bidStatus !== 4 &&
                                                                <li>
                                                                    <div class="p-list-content-wrp">
                                                                        <div class="p-list-content-c">
                                                                            <div class="p-l-img">
                                                                                <img src={check} alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Highest Bid</div>
                                                                            <div class="x-font-normal-white">{highestBid} {symbol}</div>

                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Your Bid</div>
                                                                            <div class="x-font-normal-white">{userbid} {symbol}</div>

                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            }

                                                            {
                                                                bidStatus === 4 &&
                                                                <li>
                                                                    <div class="p-list-content-wrp">
                                                                        <div class="p-list-content-c">
                                                                            <div class="p-l-img">
                                                                                <img src={check} alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Price</div>
                                                                            <div class="x-font-normal-white">{buyPrice} {symbol}</div>

                                                                        </div>

                                                                    </div>
                                                                </li>
                                                            }



                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* <div id="content-2">
                        <div class="products-list-wrp">
                                <ul class="products-list">
                                   <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                                {/* <div id="content-3">
                        <div class="products-list-wrp">
                                <ul class="products-list">
                                    <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                                {/* <div id="content-4">
                       <div class="products-list-wrp">
                                <ul class="products-list">
                                   <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                                {/* <div id="content-5">
                        <div class="products-list-wrp">
                                <ul class="products-list">
                                   <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                            </div>
                                            {address && bidStatus === 1 && buyer !== lister &&
                                                <button class="x-product-place-bid-button" onClick={bidToggle} >Place Bid</button>
                                            }
                                            {address && bidStatus === 4 && approval > 0 && buyer !== lister &&
                                                <button class="x-product-place-bid-button" onClick={buyNft} >Buy Now</button>
                                            }
                                            {address && bidStatus === 4 && approval === 0 && buyer !== lister &&
                                                <button class="x-product-place-bid-button" onClick={approveToken} >Approve Now</button>
                                            }
                                            {!address &&
                                                <div className="mt-3 text-center"  >
                                                    <ConnectWalletBtn />
                                                </div>
                                            }
                                            {address && !canClaim && bidStatus === 3 && highestBidder === address && address !== lister && buyer == null &&
                                                <button class="x-product-place-bid-button" onClick={claimBid} >Claim</button>

                                            }
                                            {address && !canClaim && userbid > 0 && bidStatus === 3 && highestBidder !== address &&
                                                <button class="x-product-place-bid-button" onClick={claimBid} >Withdraw</button>

                                            }
                                            {address && buyer == null && bidStatus === 4 && lister === address &&
                                                <>
                                                    <button class="x-product-place-bid-button" onClick={cancelSale} >Cancel Sale</button>
                                                    <button class="x-product-place-bid-button" onClick={renewSaleToggle} >Renew Sale</button>

                                                </>
                                            }
                                            {
                                                address && bidStatus === 3 && lister === address && buyer == null &&
                                                <>
                                                    <button class="x-product-place-bid-button" onClick={cancelAuction} >Cancel Auction</button>
                                                    <button class="x-product-place-bid-button" onClick={renewAuctionToggle} >Renew Auction</button>
                                                </>

                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                    <label><br />Enter Deposit Amount <span className="maxButton ml-2 p-2" onClick={setMaxDeposit}>Max</span></label>
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
                        (approval === 0 || approval < damount * decimals) &&
                        <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
                    }
                    {
                        (approval > 0 && approval >= damount * decimals) &&
                        <Button className="depositButton mr-3" onClick={placeBid}>Bid Now</Button>


                    }
                    <Button className="depositButton" onClick={bidToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={renewSaleModal} toggle={renewSaleToggle} centered={true}>


                <ModalBody className="popup">

                    <label><br />Enter New Price Amount  </label>
                    <input className="form-control popup" onChange={handleNewPriceChange} type="text" value={newPrice} />

                </ModalBody>
                <ModalFooter>

                    <Button className="depositButton mr-3" onClick={renewSale}>Renew Sale</Button>


                    <Button className="depositButton" onClick={renewSaleToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={renewAuctionModal} toggle={renewAuctionToggle} className="popupModal" centered={true}>


                <ModalBody >

                    <label><br />Enter New Price Amount  </label>
                    <input className="form-control popupModal" onChange={handleNewPriceChange} type="text" value={newPrice} />
                    <label><br />Choose New Start Date & Time  </label>
                    <input className="form-control popupModal" onChange={handleStartTimeChange} type="datetime-local" value={newStartTime} />
                    <label><br />Choose New End Date & Time  </label>
                    <input className="form-control popupModal" onChange={handleNewEndTimeChange} type="datetime-local" value={newEndTime} />
                </ModalBody>
                <ModalFooter>

                    <Button className="depositButton mr-3" onClick={renewAuction}>Renew Auction</Button>


                    <Button className="depositButton" onClick={renewAuctionToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* <Footer /> */}
        </div>
    );


}
export default Product;