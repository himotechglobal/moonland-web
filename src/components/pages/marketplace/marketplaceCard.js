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
import fluds from '../../images/fluds.png';
import { useEffect } from 'react';
import { useState } from 'react';
import Web3 from "web3"
import { useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';
const ELEMENTS = [
  {
      'slug': 'solar',
      'name': 'SOLAR',
      'price': '10',
      'image': solor,
      'address': '0x57f450240b7a9eAEDfb6FE8DfA83087b4f312109'
  },
  {
      'slug': 'solarCell',
      'name': 'SOLAR CELL',
      'price': '0.12',
      'image': energy,
      'address': '0xD5DF9651c2731dA0d47978A79f4F6594034038eC'
  },
  {
      'slug': 'fluid',
      'name': 'FLUID',
      'price': '1',
      'image': fluds,
      'address': '0xd6e52657A95248f51cAB46065f314711a4cd1cdc'
  },
  {
      'slug': 'thermix',
      'name': 'THERMIX',
      'price': '100',
      'image': mat,
      'address': '0x12F32f5FC8C87b053DfBc8F56C159094B42730d1'
  },
  {
      'slug': 'metlux',
      'name': 'METLUX',
      'price': '100',
      'image': land,
      'address': '0x8D1502d8Acc70b861F58186270Bc81F671e0B2d8'
  },
  {
      'slug': 'eule',
      'name': 'EULE',
      'price': '10',
      'image': eules,
      'address': '0xd63E96e180661e094383e66AA838863A87FDeB9F'
  },
  {
      'slug': 'positron',
      'name': 'POSITRON',
      'price': '5',
      'image': mooon,
      'address': '0x16775217Bab1C67D0b60104B52b3504B37E7FB89'
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
  //  const wallet = useWallet();
  // let web3Provider = window.ethereum;
  // console.log(boxArray);
  useEffect(() => {
    // if (window.ethereum) {
    //   web3Provider = window.ethereum;
    // }
    // else {
    //   web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
    // }
    getData();
    getPrice();
    getTokenPrice();
  }, [])
  const getData = () => {
    // console.log(props)
    let v = ELEMENTS[props.index]
    setBoxArray(v);
  }

  let _atoken = ELEMENTS[props.index].address;
  let _amt = ethers.utils.parseEther("1")
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
    address: ELEMENTS[props.index].address,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [MARKETPLACE],
    watch: true
  })

  // const { data: baseToken } = useContractRead({
  //   address: MARKETPLACE,
  //   abi: MARKETPLACE_ABI,
  //   functionName: "baseToken",
  //   watch: true
  // })
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
  console.log(parseInt(_getPrice3));
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
  console.log((_getPricePiglet));
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
  // console.log(parseInt(_getSoldValuePigfood))
  const getTokenPrice = async () => {
    // let _web3 = new Web3(web3Provider);
    // let _marketContract = new _web3.eth.Contract(ROUTER_ABI, ROUTER);
    // let _amt = _web3.utils.toWei('1');
    // let _baseTokenPrice = await _marketContract.methods.getAmountsOut(_amt, ['0x903fcaf1a49b29678c15b43bc9f852232bfa7df1', '0xe9e7cea3dedca5984780bafc599bd69add087d56']).call();
    let _baseTokenPrice = parseFloat(_baseTokenPrice1[1] / 1e18).toFixed(2);
    setBaseTokenPrice(_baseTokenPrice)
    // console.log(_baseTokenPrice);
  }
  const getPrice = async () => {
    // let _web3 = new Web3(web3Provider);
    // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
    // let _baseToken = await _marketContract.methods.baseToken().call();
    // setBaseToken(baseToken);
    // console.log(_baseToken); 
    // let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);
    // let _symbol = await _tokenContract.methods.symbol().call();
    setSymbol(_symbol);
    // console.log(_symbol);
    if (props.slug === 'solar') {
      // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
      // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
      // console.log(_available);
      setAvailable(parseFloat(_available / 1e18).toFixed());
      // let _baseToken = await _marketContract.methods.baseToken().call();
      // setBaseToken(baseToken);
      // let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _baseToken);
      // let _getPrice = await _marketContract.methods.getTokenPerChicken().call();
      //  console.log(_getPrice);
      // let _getSold = await _marketContract.methods.totalChickenSold().call();
      let _getSold = parseFloat(_getSold1 / 1e18).toFixed()
      setSold(_getSold);
      // console.log(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalChickenSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValue1 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      // console.log(_getSoldValue);
      let _getPrice = parseFloat(_getPrice1 / 1e18).toFixed(2)
      // console.log(_getPrice);
      setTokenPrice(_getPrice);
    }
    else if (props.slug === 'solarCell') {
      let _atoken = ELEMENTS[props.index].address;
      // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
      // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
      // console.log(_available);
      setAvailable(parseFloat(_available1 / 1e18).toFixed());
      // let _getPrice = await _marketContract.methods.getTokenPerEgg().call();
      let _getPrice = parseFloat(_getPrice2 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      // console.log(_getPrice);
      // let _getSold = await _marketContract.methods.totalEggSold().call();
      let _getSold = parseFloat(_getSold2 / 1e18).toFixed()
      setSold(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalEggSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValue2 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      // console.log(_getSoldValue);
    }
    else if (props.slug === 'fluid') {
      let _atoken = ELEMENTS[props.index].address;
      // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
      // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
      // console.log(parseFloat(_available));
      setAvailable(parseFloat(_available / 1e18).toFixed());
      // let _getPrice = await _marketContract.methods.getTokenPerChickenFood().call();
      let _getPrice = parseFloat(_getPrice3 * 600 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
  
      // console.log(_getPrice);
      // let _getSold = await _marketContract.methods.totalChickenFoodSold().call();
      let _getSold = parseFloat(_getSold3 / 1e18).toFixed()
      setSold(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalChickenFoodSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValu3 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      // console.log(_getSoldValue);
    }
    else if (props.slug === 'thermix') {
      let _atoken = ELEMENTS[props.index].address;
      // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
      // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
      setAvailable(parseFloat(_available1 / 1e18).toFixed());
      // let _getPrice = await _marketContract.methods.getTokenPerBoar().call();
      let _getPrice = parseFloat(_getPrice4 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      // console.log(_getPrice);
      // let _getSold = await _marketContract.methods.totalBoarSold().call();
      let _getSold = parseFloat(_getSold4 / 1e18).toFixed()
      setSold(_getSold);
      // console.log(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalBoarSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValue4 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      // console.log(_getSoldValue);
    }
    else if (props.slug === 'metlux') {
      let _atoken = ELEMENTS[props.index].address;
      // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
      // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
      // console.log(_available);
      setAvailable(parseFloat(_available / 1e18).toFixed());
      // let _getPrice = await _marketContract.methods.getTokenPerSow().call();
      let _getPrice = parseFloat(_getPrice5 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      // console.log(_getPrice);
      // let _getSold = await _marketContract.methods.totalSowSold().call();
      let _getSold = parseFloat(_getSold5 / 1e18).toFixed()
      setSold(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalSowSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValue5 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      // console.log(_getSoldValue);
    }
    else if (props.slug === 'eule') {
      let _atoken = ELEMENTS[props.index].address;
      // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
      // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
      setAvailable(parseFloat(_availablePiglet / 1e18).toFixed());
      // console.log(_available);
      // let _getPrice = await _marketContract.methods.getTokenPerPiglet().call();
      let _getPrice = parseFloat(_getPricePiglet / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      // console.log(_getPrice);
      // let _getSold = await _marketContract.methods.totalPigletSold().call();
      let _getSold = parseFloat(_getSoldPiglet / 1e18).toFixed()
      setSold(_getSold);
      // console.log(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalPigletSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValuePiglet / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      // console.log(_getSoldValue);
    }
    else if (props.slug === 'positron') {
      let _atoken = ELEMENTS[props.index].address;
      // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
      // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
      // console.log(_available);
      setAvailable(parseFloat(_availablePigfood / 1e18).toFixed());
      // let _getPrice = await _marketContract.methods.getTokenPerPigfood().call();
      let _getPrice = parseFloat(_getPricePigfood * 600 / 1e18).toFixed(2)
      setTokenPrice(_getPrice);
      // console.log(_getPrice);
      // let _getSold = await _marketContract.methods.totalPigFoodSold().call();
      let _getSold = parseFloat(_getSoldPigfood / 1e18).toFixed()
      setSold(_getSold);
      // console.log(_getSold)
      // let _getSoldValue = await _marketContract.methods.totalPigFoodSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValuePigfood / 1e18).toFixed()
      setSoldValue(_getSoldValue);
      // console.log(_getSoldValue);
    }
  }
  return (
    <>
     
      <div className="col-lg-4 mb-5" id='main-box'>
        <div className='marketplace-box-wrap'>
          <div className="marketplace-box">
            <div className="img-cb">
              <img src={boxArray?.image} alt="" />
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
                  <div className="wrp-rate">
                    <div className="rate">Total Sold Value</div>
                    <div className="total-r">{soldValue > 0 ? soldValue : '0'} {symbol}</div>
                  </div>
                </li>
                <li>
                  <div className="wrp-rate">
                    <div className="rate">Total Available</div>
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