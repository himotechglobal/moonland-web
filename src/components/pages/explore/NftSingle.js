import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import Config, {
  NFT_LINK,
  NFT,
} from "../../../Config/index.js";
import NFT_MARKETPLACE_ABI from "../../../Config/NFT_MARKETPLACE_ABI.json";
import NFT_ABI from "../../../Config2/NFT_ABI.json";
import { useState, useEffect } from "react";
import SinglePop from "../../pages/single/SinglePop";
import { useAccount, useContractRead } from "wagmi";

const NftSingle = (props) => {
  const { address, isConnected } = useAccount();
  const [name, setName] = useState(0);
  const [media, setMedia] = useState(null);
 
  const [modal, setModal] = useState(false);
  const [saleModal, setSalemodal] = useState(false);

  const toggle = () => setModal(!modal);
  const saleToggle = () => setSalemodal(!saleModal);



  const { data: _tokenId } = useContractRead({
    address: NFT,
    abi: NFT_ABI,
    functionName: "tokenOfOwnerByIndex",
    args: [address,props?.nftindex],
    enabled:props?.nftindex !== undefined && address !==undefined
  });
  // console.log("tokenid"+NFT+parseInt(props?.nftindex)+parseInt(_tokenId))
  const { data: _media } = useContractRead({
    address: NFT,
    abi: NFT_ABI,
    functionName: "BASE_URI",
    // args: [_tokenId],
    // enabled:_tokenId
  });
  const init = async () => {
    let originalUrl = _media;
    let replacedUrl = originalUrl.replace("ipfs://", "https://ipfs.io/ipfs/");

    setMedia(replacedUrl);
    setName(_media.name);
  };

  const taketo = async (taketo) => {
    window.open(NFT_LINK + taketo, "_blank");
  };

  useEffect(() => {
    init();
  }, [address, _media]);

  return (
    <div className="col-lg-4 col-md-6 pb-4">
      <div className="marketplace-box-wrap3">
      <div class="product-list">

{media == null ? (
  <div class="product-img">{/* <img src={media} /> */}</div>
) : (
  <div className="image_background" style={{borderRadius:"20px"}}>
           <div
            class="product-img"
            style={{ backgroundImage: "url(" + media + ")" }}
          >
            {/* <img src={media} /> */}
          </div>
       </div>
)}
<div className="more-detail">
  <ul className="mt-3 p-0">
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
      <p className="value  clickable"> {parseInt(_tokenId)} </p>{" "}
    </li>
  </ul>
</div>

<button class="bg___BTN_J" onClick={saleToggle}>
  Put On Sale
</button>
</div>
      </div>

      <Modal isOpen={saleModal} toggle={saleToggle} centered={true}>
        <ModalBody style={{ padding: "0px" }}>
          <SinglePop
            name={name}

            address={props.nftAddress}
            id={_tokenId}
            saleToggle={saleToggle}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default NftSingle;
