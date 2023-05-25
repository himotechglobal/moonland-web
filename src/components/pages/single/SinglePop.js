import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Button, Modal, ModalBody } from "reactstrap";
import Config, { MARKETPLACE } from "../../../Config2";
import NFT_MARKETPLACE_ABI from "../../../Config/NFT_MARKETPLACE_ABI.json";
import NFT_ABI from "../../../Config/NFT_ABI.json";
import axios from "axios";
import Web3 from "web3";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { NFT, NFT_MARKETPLACE } from "../../../Config";
import Options from "./Options";
import { ethers } from "ethers";

const SinglePop = (props) => {
  const { address, isConnected } = useAccount();
  const [filedata, setFileData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);

  const [saleon, setSaleon] = useState(true);
  const [instantsale, setInstantsale] = useState(false);
  const [price, setPrice] = useState("");
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [artist, setArtist] = useState(null);

  const [height, setHeight] = useState(null);
  const [breadth, setBreadth] = useState(null);
  const [length, setLength] = useState(null);
  const [weight, setWeight] = useState(null);
  const [tags, setTags] = useState(null);

  const [publicProfileLink, setPublicProfileLink] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [auctionToken, setAuctionToken] = useState(null);
  const [auctionTokenArray, setAuctionTokenArray] = useState([]);
  const [tokenCount, setTokenCount] = useState([]);

  const [modal, setModal] = useState(false);
  const [apiModal, setApiModal] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [onSaleModal, setOnSaleModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [mined, setMinded] = useState(false);
  const [approved, setApproved] = useState(false);

  const apiToggle = () => setApiModal(!apiModal);
  const mintToggle = () => setMintModal(!mintModal);
  const saleToggle = () => setOnSaleModal(!onSaleModal);
  const successToggle = () => setSuccessModal(!successModal);
  const modalToggle = () => setModal(!modal);
  const closeModal = () => {
    setOnSaleModal(false);
  };

  useEffect(() => {
    $(window).scroll(function () {
      if ($(window).scrollTop() >= 300) {
        $(".wrp-preview").addClass("fixed-header");
      } else {
        $(".wrp-preview").removeClass("fixed-header");
      }
    });

    function readURL(input, imgControlName) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $(imgControlName).attr("src", e.target.result);
        };
        setFileName(input.files[0].name);
        setFileType(input.files[0].type);
        setFileData(input.files[0]);

        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#imag").change(function () {
      var imgControlName = "#ImgPreview";
      readURL(this, imgControlName);
      $(".preview1").addClass("it");
      $(".btn-rmv1").addClass("rmv");
    });

    $("#removeImage1").click(function (e) {
      e.preventDefault();
      $("#imag").val("");
      $("#ImgPreview").attr("src", "");
      $(".preview1").removeClass("it");
      $(".btn-rmv1").removeClass("rmv");
    });

    getTokenList();
  });

  const handleSaleon = (e) => {
    setSaleon(e.target.checked);
  };

  const handleInstantSale = (e) => {
    setInstantsale(e.target.checked);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleArtist = (e) => {
    setArtist(e.target.value);
  };

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const handleBreadth = (e) => {
    setBreadth(e.target.value);
  };

  const handleHeight = (e) => {
    setHeight(e.target.value);
  };

  const handleWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const handlePublicProfileLink = (e) => {
    setPublicProfileLink(e.target.value);
  };

  const handleAuctionToken = (e) => {
    setAuctionToken(e.target.value);
  };

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const { data: _length } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "gettokenCount",
    watch: true,
  });

  const getTokenList = async () => {
    let temp = [];
    let tokens = [];
    let count = [];
    for (let i = 0; i < parseInt(_length); i++) {
      count.push({ id: i });
      setTokenCount(count);
    }
  };

  const reset = () => {
    setAuctionToken("");
    setFileName("");
    setFileType("");
    setFileData("");
    setName("");
    setDescription("");
    setArtist("");
    setPublicProfileLink("");
    setPrice("");
    setStartTime("");
    setEndTime("");
    setInstantsale(false);
    setSaleon(true);
    setMinded(false);
    $("#imag").val("");
    $("#ImgPreview").attr("src", "");
    $(".preview1").removeClass("it");
    $(".btn-rmv1").removeClass("rmv");
  };

  let id = props.id;
  let _sPrice = price == "" ? 0 : ethers.utils.parseEther(price).toString();
  let _sTime = new Date(startTime).getTime() / 1000;

  let _eTime = new Date(endTime).getTime() / 1000;
  let _title = "moonland";
  const { config: putauctionConfig_ } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "openInstantSellAuction",
    args: [id, _sPrice, auctionToken, _title],
  });

  const {
    data: putauctionData,
    writeAsync: putauctionWriteAsync,
    isError: putauctionError,
  } = useContractWrite(putauctionConfig_);

  const { isSuccess: putauctionSuccess } = useWaitForTransaction({
    hash: putauctionData?.hash,
  });

  const { config: openAuctionConfig_ } = usePrepareContractWrite({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "openAuction",
    args: [auctionToken, id, _sPrice, _sTime, _eTime, _title],
  });
  const {
    data: openAuctionData,
    writeAsync: openAuctionWriteAsync,
    isError: openAuctionError,
  } = useContractWrite(openAuctionConfig_);

  const { isSuccess: openAuctionSuccess } = useWaitForTransaction({
    hash: openAuctionData?.hash,
  });

  const putauction = async () => {
    if (instantsale) {
      setOnSaleModal(true);
      await putauctionWriteAsync();
    } else {
      setOnSaleModal(true);
      await openAuctionWriteAsync();
    }
  };

  const { data: _nft } = useContractRead({
    address: NFT_MARKETPLACE,
    abi: NFT_MARKETPLACE_ABI,
    functionName: "nftAddress",
    watch: true,
  });

  const { data: _approevd } = useContractRead({
    address: _nft,
    abi: NFT_ABI,
    functionName: "isApprovedForAll",
    args: [address, NFT_MARKETPLACE],
    watch: true,
  });

  const getApproval = async () => {
    setApproved(_approevd);
  };

  useEffect(() => {
    if (address) {
      getApproval();
    }
  }, [address, _approevd]);

  const { config: approveTokenConfig_ } = usePrepareContractWrite({
    address: NFT,
    abi: NFT_ABI,
    functionName: "setApprovalForAll",
    args: [NFT_MARKETPLACE, true],
    enabled: address ? true : false,
  });

  const {
    data: approveTokenData,
    writeAsync: approveTokenWriteAsync,
    isError: approveTokenError,
  } = useContractWrite(approveTokenConfig_);

  const { isSuccess: approveTokenSuccess } = useWaitForTransaction({
    hash: approveTokenData?.hash,
  });

 

  const approveToken = async () => {
    setModal(true);
    await approveTokenWriteAsync?.();
  };

  useEffect(() => {
    if (putauctionSuccess || openAuctionSuccess || approveTokenSuccess) {
      closeModal();
      reset();
    }
  }, [putauctionSuccess, openAuctionSuccess, approveTokenSuccess]);

  useEffect(() => {
    if (putauctionError || openAuctionError || approveTokenError) {
      closeModal();
    }
  }, [putauctionError, openAuctionError, approveTokenError]);
  return (
    <div>
      <section id="create-sec-pop">
        <div class="container">
          <div class="row coloum-r">
            <div class="col-lg-12">
              <ul class="list-sales">
                {saleon === true && (
                  <li>
                    <div class="sales-l-c-wrp">
                      <div class="sales-l-c-child">
                        <h4>Instant sale</h4>
                        <p>
                          Enter the price for which the item will be <br></br>
                          instantly sold
                        </p>
                      </div>
                      <div class="sales-l-c-child">
                        <input
                          class="switch"
                          type="checkbox"
                          checked={instantsale}
                          onChange={handleInstantSale}
                          value={instantsale}
                        />
                      </div>
                    </div>
                  </li>
                )}

                {saleon === true && (
                  <div class="wrp-royalities marti-top">
                    <div class="royalities-child mart-in">
                      <label>Price</label>
                      <input
                        placeholder="Enter Price"
                        onChange={handlePrice}
                        type="text"
                        value={price}
                      />
                    </div>
                    <div class="royalities-child martb-top">
                      <label>Token</label>
                      <select
                        onChange={handleAuctionToken}
                        value={auctionToken}
                      >
                        <option style={{ background: "#ae00c5" }} value="">
                          ---Select---
                        </option>

                        {tokenCount.length > 0 &&
                          tokenCount.map((v, i) => {
                            return (
                              // <option value={v[2]} >{v[0]} (Fee: {parseFloat(v[1] / 100)}%)</option>
                              <Options tokenIndex={v.id} />
                            );
                          })}
                      </select>
                    </div>
                  </div>
                )}
                {saleon === true && !instantsale && (
                  <div class="wrp-royalities marti-top">
                    <div class="royalities-child mart-in">
                      <label>Start Date</label>
                      <input
                        placeholder="eg. size"
                        onChange={handleStartTime}
                        type="datetime-local"
                        value={startTime}
                      />
                    </div>
                    <div class="royalities-child martb-top">
                      <label>End Date</label>
                      <input
                        onChange={handleEndTime}
                        type="datetime-local"
                        placeholder="eg. M"
                        value={endTime}
                      />
                    </div>
                  </div>
                )}

                <div class="crate-items d-flex justify-content-center">
                  {approved ? (
                    // props.imported ?
                    //     <button onClick={putauctionImported}>Put On Sale</button>

                    <button onClick={putauction}>Put On Sale</button>
                  ) : (
                    <button onClick={approveToken}>Approve to Create</button>
                  )}
                </div>

                {/* <li>
                            
                                <div class="wrp-input">
                                    <label>Name</label>
                                    <input placeholder="eg. Reedimable T-shirt with logo" 
                                  onChange={handleName}
                                    
                                    value={name} />
                                </div>
                                <div class="wrp-input">
                                    <label>Description <span>(optional)</span></label>
                                    <textarea placeholder="eg. Reedimable T-shirt with logo" 
                                  onChange={handleDescription}
                                    
                                    value={description} ></textarea>
                                </div>
                                
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Artist</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleArtist}
                                
                                        value={artist} />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>Public Profile Link</label>
                                        <input  
                                        
                                        onChange={handlePublicProfileLink}
                                        
                                        placeholder="eg. M" value={publicProfileLink} />
                                    </div>
                                </div>
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Length</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleLength}
                                
                                        value={length} />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>Breadth</label>
                                        <input  
                                        
                                        onChange={handleBreadth}
                                        
                                        placeholder="eg. M" value={breadth} />
                                    </div>
                                </div>
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Height</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleHeight}
                                
                                        value={height} />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>Weight</label>
                                        <input  
                                        
                                        onChange={handleWeight}
                                        
                                        placeholder="eg. M" value={weight} />
                                    </div>
                                </div>
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Tags</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleTags}
                                
                                        value={tags} />
                                    </div>
                                   
                                </div>
                                <div class="crate-items">
                                    {
                                        approved ?
                                        <button onClick={createToken}>Create item</button>
                                        :
                                    <button onClick={approveToken}>Approve to Create</button>
                                        
                                    }
                                </div>
                                
                                
                        </li> */}
              </ul>
            </div>
            <Button
              className="depositButton mr-auto ml-auto mb-5 mt-5"
              onClick={props.saleToggle}
            >
              Close
            </Button>
          </div>
        </div>
      </section>

      <Modal isOpen={apiModal} toggle={apiToggle} centered={true}>
        <ModalBody>
          <div className="modaltext text-center mt-4 pb-3">
            Saving NFT Media and Creating Meta... <br />
            Do not Close Tab/Window or reload
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={mintModal} toggle={mintToggle} centered={true}>
        <ModalBody>
          <div className="modaltext text-center mt-4 pb-3">
            Minting NFT Transaction in progress... <br />
            Do not Close Tab/Window or reload
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={onSaleModal} toggle={saleToggle} centered={true}>
        <ModalBody>
          <div className="modaltext text-center mt-4 pb-3">
            Creating Auction on Marketplace.
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={successModal} toggle={successToggle} centered={true}>
        <ModalBody>
          <div className="modaltext text-center mt-4 pb-3">
            Transaction Successfull.
          </div>
        </ModalBody>
        <Button
          className="depositButton mr-auto ml-auto mb-5"
          onClick={successToggle}
        >
          Close
        </Button>
      </Modal>

      <Modal isOpen={modal} toggle={modalToggle} centered={true}>
        <ModalBody>
          <div className="modaltext text-center mt-4 pb-3">
            Transaction is Processing...
          </div>
        </ModalBody>
        <Button
          className="depositButton mr-auto ml-auto mb-5"
          onClick={modalToggle}
        >
          Close
        </Button>
      </Modal>
    </div>
  );
};
export default SinglePop;
