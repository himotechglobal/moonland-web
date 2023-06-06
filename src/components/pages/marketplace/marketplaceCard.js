import React from 'react';
import buybtn from '../../images/button_image.png';
import { MARKETPLACE, ROUTER } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import ROUTER_ABI from '../../../Config/ROUTER_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import cb1 from '../../images/noborder/cb1.png';
import cb2 from '../../images/noborder/cb2.png';
import cb3 from '../../images/noborder/cb3.png';
import cb4 from '../../images/noborder/cb4.png';
import cb5 from '../../images/noborder/cb5.png';
import cb6 from '../../images/noborder/cb6.png';
import cb7 from '../../images/noborder/cb7.png';
import land from '../../images/land_in_moon.svg'
import solor from '../../images/solor_cell.svg';
import mooon from '../../images/moon_pods.svg';
import mat from '../../images/mat.svg';
import energy from '../../images/energy.png';
import eules from '../../images/eules.svg';
import thermix from "../../images/thermix.png";
import metlux from "../../images/metlux.png";
import fluds from '../../images/fluds.png';
import { useEffect } from 'react';
import { useState } from 'react';
import Web3 from "web3"
import { useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';
const ELEMENTS = [
  {
      'slug': 'solar',
      'name': 'SOLAR CELL',
      'price': '10',
      'image': "https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2F8LrpEPcW5NBk5JRCrkrq%2FSolar%20pannel.png?alt=media&token=21a1fb93-aa74-4fe5-8ae1-c0e818202f27",
      'address': '0x57f450240b7a9eAEDfb6FE8DfA83087b4f312109'
  },
  {
      'slug': 'solarCell',
      'name': 'ENERGY PACKET',
      'price': '0.12',
      'image': "https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2FCdrQvkqZvIN6aa5ISoJl%2Fenergy.png?alt=media&token=12fb42df-55b1-464f-ab1e-3c00eb09d9b9",
      'address': '0xD5DF9651c2731dA0d47978A79f4F6594034038eC'
  },
  {
      'slug': 'fluid',
      'name': 'SUPER CONDUCTOR FLUID',
      'price': '1',
      'image': "https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2FJoILLv3a235XSXVrabq4%2FFluid%202.png?alt=media&token=bd0b3667-8570-4920-9991-3f8f939a1d85",
      'address': '0xb4e0f6aEfb68449917879068E9C32703268F9C89'
  },
  {
      'slug': 'thermix',
      'name': 'THERMIX',
      'price': '100',
      'image': "https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2F8DhJInDZW4OFzdsDRiSM%2FThermixes.png?alt=media&token=1e8ad21b-948d-40d4-bb5e-9e31b94e9169",
      'address': '0x12F32f5FC8C87b053DfBc8F56C159094B42730d1'
  },
  {
      'slug': 'metlux',
      'name': 'METLUX',
      'price': '100',
      'image': "https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2FQAgoZzTjyx2FjOpBUWrq%2FMatlux%20Pads.png?alt=media&token=ea8b5f7c-48e5-4c2f-a104-effb3d4a1cf9",
      'address': '0x8D1502d8Acc70b861F58186270Bc81F671e0B2d8'
  },
  {
      'slug': 'eule',
      'name': 'EULE',
      'price': '10',
      'image': "https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2FSdACsQvs8KNQBcxMYTWB%2FEules.png?alt=media&token=9998cacc-172c-4467-afae-07a7fe7f0544",
      'address': '0xd63E96e180661e094383e66AA838863A87FDeB9F'
  },
  {
      'slug': 'positron',
      'name': 'POSITRON',
      'price': '5',
      'image': "https://1193010105-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FySy2cQ7xPCwuFdbC6Xgd%2Fuploads%2F7iSB07jCKP8ic0IlDVhX%2FFluid.png?alt=media&token=cacea51a-d2be-42d2-9e41-ff401cbf5367",
      'address': '0x19Aca1DB633622ADA2cc722991db21989f6F4F9B'
  }
];
const MarketplaceCard = (props) => {
  // const [fa, setFa] = useState(0)
  const [boxArray, setBoxArray] = useState([]);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [sold, setSold] = useState(0);
  const [soldValue, setSoldValue] = useState(0);
  const [available, setAvailable] = useState(0);
  const [symbol, setSymbol] = useState(null);
  const [baseTokenPrice, setBaseTokenPrice] = useState(0);
  const { address, isConnected } = useAccount();
 
  const getData = () => {
    let v = ELEMENTS[props.index]
    setBoxArray(v);
  }

  let _atoken = ELEMENTS[props.index].address;
  let _amt = ethers.utils.parseEther("1").toString()
  const { data: _baseTokenPrice1 } = useContractRead({
    address: ROUTER,
    abi: ROUTER_ABI,
    functionName: "getAmountsOut",
    args: [_amt, ['0x903fcaf1a49b29678c15b43bc9f852232bfa7df1', '0xe9e7cea3dedca5984780bafc599bd69add087d56']],
    watch: true
  })

  const { data: _baseToken } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "baseToken",
    watch: true
  })
  const { data: _symbol } = useContractRead({
    address: _baseToken,
    abi: TOKEN_ABI,
    functionName: "symbol",
    watch: true
  })
  const { data: _available } = useContractRead({
    address: ELEMENTS[props.index]?.address,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [MARKETPLACE],
    watch: true
  })
  const { data: _getPrice1 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerSolar",
    watch: true
  })
 
  const { data: _getSold1 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalSolarSold",
    watch: true
  })

  const { data: _getSoldValue1 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalSolarSoldValue",
    watch: true
  })
  const { data: _available1 } = useContractRead({
    address: _atoken,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [MARKETPLACE],
    watch: true
  })
  const { data: _getPrice2 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerCell",
    watch: true
  })
  const { data: _getSold2 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalCellSold",
    watch: true
  })
  const { data: _getSoldValue2 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalCellSoldValue",
    watch: true
  })
  const { data: _getPrice3 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerSolarFood",
    watch: true
  })
  const { data: _getSold3 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalSolarFoodSold",
    watch: true
  })
  const { data: _getSoldValu3 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalSolarFoodSoldValue",
    watch: true
  })
  const { data: _getPrice4 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerThermix",
    watch: true
  })
  const { data: _getSold4 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalThermixSold",
    watch: true
  })
  const { data: _getSoldValue4 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalThermixSoldValue",
    watch: true
  })
  const { data: _getPrice5 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerMetlux",
    watch: true
  })
  const { data: _getSold5 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalMetluxSold",
    watch: true
  })
  const { data: _getSoldValue5 } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalMetluxSoldValue",
    watch: true
  })
  const { data: _availablePiglet } = useContractRead({
    address: _atoken,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [MARKETPLACE],
    watch: true
  })
  const { data: _getPricePiglet } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerEule",
    watch: true
  })
  const { data: _getSoldPiglet } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalEuleSold",
    watch: true
  })
  const { data: _getSoldValuePiglet } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalEuleSoldValue",
    watch: true
  })
  const { data: _availablePigfood } = useContractRead({
    address: _atoken,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [MARKETPLACE],
    watch: true
  })
  const { data: _getPricePigfood } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getTokenPerPositrons",
    watch: true
  })
  const { data: _getSoldPigfood } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalPositronsSold",
    watch: true
  })
  const { data: _getSoldValuePigfood } = useContractRead({
    address: MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "totalPositronsSoldValue",
    watch: true
  })
  const getTokenPrice = async () => {
    let _baseTokenPrice = parseFloat(_baseTokenPrice1[1] / 1e18).toFixed(2);
    setBaseTokenPrice(_baseTokenPrice)
  }
  const getPrice = async () => {
    setSymbol(_symbol);
    if (props.slug === 'solar') {
      setAvailable(parseFloat(_available / 1e18).toFixed());
      let _getSold = parseFloat(_getSold1 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue1 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      let _getPrice = parseFloat(_getPrice1 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
    }
    else if (props.slug === 'solarCell') {
      let _atoken = ELEMENTS[props.index].address;
      setAvailable(parseFloat(_available1 / 1e18).toFixed());
      let _getPrice = parseFloat(_getPrice2 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      let _getSold = parseFloat(_getSold2 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue2 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
    }
    else if (props.slug === 'fluid') {
      let _atoken = ELEMENTS[props.index].address;
      setAvailable(parseFloat(_available / 1e18).toFixed());
      let _getPrice = parseFloat(_getPrice3 * 600 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      let _getSold = parseFloat(_getSold3 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValu3 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
    }
    else if (props.slug === 'thermix') {
      let _atoken = ELEMENTS[props.index].address;
      setAvailable(parseFloat(_available1 / 1e18).toFixed());
      let _getPrice = parseFloat(_getPrice4 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      let _getSold = parseFloat(_getSold4 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue4 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
    }
    else if (props.slug === 'metlux') {
      let _atoken = ELEMENTS[props.index].address;
      setAvailable(parseFloat(_available / 1e18).toFixed());
      let _getPrice = parseFloat(_getPrice5 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      let _getSold = parseFloat(_getSold5 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue5 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
    }
    else if (props.slug === 'eule') {
      let _atoken = ELEMENTS[props.index].address;
      setAvailable(parseFloat(_availablePiglet / 1e18).toFixed());
      let _getPrice = parseFloat(_getPricePiglet / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      let _getSold = parseFloat(_getSoldPiglet / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValuePiglet / 1e18).toFixed()
      setSoldValue(_getSoldValue);
    }
    else if (props.slug === 'positron') {
      let _atoken = ELEMENTS[props.index].address;
      setAvailable(parseFloat(_availablePigfood / 1e18).toFixed());
      let _getPrice = parseFloat(_getPricePigfood * 600 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      let _getSold = parseFloat(_getSoldPigfood / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValuePigfood / 1e18).toFixed()
      setSoldValue(_getSoldValue);
    }
  }
  useEffect(() => {
    getData();
    getPrice();
    getTokenPrice();
  }, [address,_available])

  return (
    <>
     
      <div className="col-lg-4 mb-5" id='main-box'>
        <div className='marketplace-box-wrap'>
          <div className="marketplace-box">
            <div className="img-cb">
              <img src={boxArray?.image} alt="" style={{width:"100px",height:"100px"}} />
              <div className='title_head'>
                <p className='card-title'>{boxArray?.name}</p>
                {/* <p className='card-content'>Lorem7 demo checkc content</p> */}
              </div>
            </div>
            <div className="market-content">
              {/* <h3>{boxArray?.name}</h3> */}
              <ul className="listmarket">
                <li>
                  <div className="wrp-rate">
                    <div className="rate">Rate:</div>
                    <div className="total-r">$ {" "}
                    {/* {parseFloat(
                      // baseTokenPrice
                      1 * tokenPrice > 0 ? tokenPrice : "0").toFixed(2)} */}
                    {boxArray?.price}   ~ {parseFloat(tokenPrice > 0 ? tokenPrice : "0").toFixed(2)} {symbol}</div>
                  </div>
                </li>
                <li>
                  <div className="wrp-rate">
                    <div className="rate">Total Sold</div>
                    <div className="total-r">{sold > 0 ? sold : "0"}</div>
                  </div>
                </li>
                <li>
                  {/* <div className="wrp-rate">
                    <div className="rate">Total Sold Value</div>
                    <div className="total-r">{soldValue > 0 ? soldValue : '0'} {symbol}</div>
                  </div> */}
                </li>
                <li>
                  <div className="wrp-rate">
                    <div className="rate">Available</div>
                    <div className="total-r">{available === 0 ? "Sold Out" : available > 0 ? available : '0'}</div>

                  </div>
                </li>
              </ul>
              <div className="m-buybtn">
                <a className='bg___BTN4 mrt' href={`/buy/${boxArray?.slug}`}>
                  Buy/Sell
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default MarketplaceCard; 