import React, { Component } from "react";
import $ from "jquery";
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
import Config, {
  NFT_MARKETPLACE,
  NFT_LINK,
  NFT,
} from "../../../Config/index.js";
import NFT_MARKETPLACE_ABI from "../../../Config/NFT_MARKETPLACE_ABI.json";
import TOKEN_ABI from "../../../Config2/TOKEN_ABI.json";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import Web3 from "web3";
import { useState, useEffect } from "react";
// import useWallet from '@binance-chain/bsc-use-wallet'

import SinglePop from "../../pages/single/SinglePop";
import { useAccount, useContractRead } from "wagmi";

const NftSingle = (props) => {

  let web3Provider = window.ethereum;
  // const wallet = useWallet();
  const { address, isConnected } = useAccount();
  const [name, setName] = useState(0);
  const [price, setPrice] = useState(0);
  const [media, setMedia] = useState(null);
  const [balance, setBalance] = useState(0);
  const [approval, setApproval] = useState(0);
  const [damount, setdAmount] = useState(0);
  const [depositError, setDepositError] = useState(null);
  const [decimals, setDecimals] = useState(0);
  const [bidIncreasePercentage, setBidIncreasePercentage] = useState(0);
  const [minimumBid, setMinimumBid] = useState(0);
  const [symbol, setSymbol] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [userbid, setUserbid] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [bidStatus, setBidStatus] = useState(null);
  const bidStatusName = ["Inactive", "Open", "Paused", "Closed"];
  const [highestBidder, setHighestBidder] = useState(null);
  const [canClaim, setCanClaim] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  let timeInterval;
  let timeInterval2;
  const [modal, setModal] = useState(false);
  const [bidModal, setBidmodal] = useState(false);
  const [saleModal, setSalemodal] = useState(false);

  const toggle = () => setModal(!modal);
  const saleToggle = () => setSalemodal(!saleModal);



  // const { data: _userToken } = useContractRead({
  //   address: NFT,
  //   abi: NFT_ABI,
  //   functionName: "tokenOfOwnerByIndex",
  //   args: [address, props.nftindex],
  //   watch: true,
  // });
  // console.log(_userToken);
  const {data:_media} =useContractRead({
    address:NFT,
    abi:NFT_ABI,
    functionName:"tokenURI",
    args:[props.nftindex],
      })

  const init = async () => {

    let _web3 = new Web3(web3Provider);
    let _nftContract = new _web3.eth.Contract(NFT_ABI, props.nftAddress);
    // let _media = await _nftContract.methods.tokenURI(props.nftindex).call();
    let originalUrl = _media;
    let replacedUrl = originalUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
// console.log(replacedUrl);
setMedia(replacedUrl);
    // let response = await fetch(replacedUrl);
    // let responseData = await response.json();
    //  setMedia(_media.preview);

    // setMedia(encodeURI(replacedUrl));

    setName(_media.name);
    //  _media = await getBase64FromUrl(_media);
    //  setMedia(_media);
  };
 
  const taketo = async (taketo) => {
    window.open(NFT_LINK + taketo, "_blank");
  };

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
    // if (window.ethereum) {
    //   web3Provider = window.ethereum;
    // } else {
    //   web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL);
    // }

    init();
  }, [address,_media]);

  return (
    <div className="col-lg-4 col-md-6 pb-4">
      <div class="product-list">
        {/* <a href={"/product/"+props.tradeid}> */}

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
        <div className="more-detail">
          <ul className="mt-3 p-0">
            {/* <li className="d-flex justify-content-between">
              <p className="title font-weight-bold">Name</p>{" "}
              <p
                className="value clickable"
                onClick={() => taketo(props.nftAddress)}
              >
                {name}{" "}
              </p>{" "}
            </li> */}
            <li className="d-flex justify-content-between">
              <p className="title font-weight-bold">NFT Adress</p>{" "}
              <p
                className="value clickable"
                onClick={() => taketo(props.nftAddress)}
              >
                {props.nftAddress.substring(0, 6) +
                  "...." +
                  props.nftAddress.substring(props.nftAddress.length - 6)}{" "}
              </p>{" "}
            </li>
            <li className="d-flex justify-content-between">
              <p className="title font-weight-bold">Token ID</p>{" "}
              <p className="value  clickable">{props.nftindex} </p>{" "}
            </li>
          </ul>
        </div>

        <button class="bg___BTN_J" onClick={saleToggle}>
          Put On Sale
        </button>
      </div>

      <Modal isOpen={saleModal} toggle={saleToggle} centered={true}>
        <ModalBody style={{ padding: "0px" }}>
          <SinglePop
            name={name}
            // imported={props.imported}
            address={props.nftAddress}
            id={props.nftindex}
            saleToggle={saleToggle}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default NftSingle;
