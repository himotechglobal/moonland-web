/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, } from 'react';
import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/egg-GIF.gif';
import cb1 from '../../images/cb1.png';
import cb2 from '../../images/cb2.png';
import cb3 from '../../images/cb3.png';
import arrow from '../../images/round_arrow.svg';
import cb4 from '../../images/cb4.png';
import cb5 from '../../images/cb5.png';
import cb6 from '../../images/cb6.png';
import cb7 from '../../images/cb7.png';
import { MARKETPLACE } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import Web3 from "web3"
import { useAccount, useBalance, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { Link, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import land from '../../images/land_in_moon.svg'
import solor from '../../images/solor_cell.svg';
import mooon from '../../images/moon_pods.svg';
import mat from '../../images/mat.svg';
import energy from '../../images/energy.png';
import eules from '../../images/eules.svg';
import fluds from '../../images/fluds.png';


import b1 from '../../images/b1.svg'
import b2 from '../../images/b2.svg'
import b3 from '../../images/b3.svg'
import b4 from '../../images/b4.svg'
import b5 from '../../images/b5.svg'
import b6 from '../../images/b6.svg'
import b7 from '../../images/b7.svg'
// import {useWallet} from '@binance-chain/bsc-use-wallet'




const ELEMENTS = {
    'solar': {
        'name': 'SOLAR',
        'price': '10',
        'image': solor,
        'img': b1,
        'address': '0x57f450240b7a9eAEDfb6FE8DfA83087b4f312109'
    },
    'solarCell': {
        'name': 'SOLAR CELL',
        'price': '0.12',
        'image': energy,
        'img': b2,
        'address': '0xD5DF9651c2731dA0d47978A79f4F6594034038eC'
    },
    'fluid': {
        'name': 'FLUID',
        'price': '1',
        'image': fluds,
        'img': b3,
        'address': '0xd6e52657A95248f51cAB46065f314711a4cd1cdc'

    },
    'thermix': {
        'name': 'THERMIX',
        'price': '100',
        'image': mat,
        'img': b4,
        'address': '0x12F32f5FC8C87b053DfBc8F56C159094B42730d1'

    },
    'metlux': {
        'name': 'METLUX',
        'price': '100',
        'image': land,
        'img': b5,
        'address': '0x8D1502d8Acc70b861F58186270Bc81F671e0B2d8'

    },
    'eule': {
        'name': 'EULE',
        'price': '10',
        'image': eules,
        'img': b6,
        'address': '0xd63E96e180661e094383e66AA838863A87FDeB9F'

    },
    'positron': {
        'name': 'POSITRON',
        'price': '5',
        'image': mooon,
        'img': b7,
        'address': '0x16775217Bab1C67D0b60104B52b3504B37E7FB89'

    }
}


const elements = (props) => {
    const [balance, setBalance] = useState(0);

    const { key } = useParams();
    const multiplier = ((key == "fluid" || key == "positron") ? 600 : 1)
    const [symbol, setSymbol] = useState(0);
    const [baseToken, setBaseToken] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [aseetBalance, setAseetBalance] = useState(0);
    const [aseetApproval, setAseetApproval] = useState(0);

    const [approved, setApproved] = useState(0);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [available, setAvailable] = useState(0);

    const [decimals, setDecimals] = useState(0);
    const [damount, setdAmount] = useState(0);



    const [samount, setsamount] = useState('');

    const [depositAmount, setDepositAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);

    const [depositError, setDepositError] = useState(false);
    const [sellError, setSellError] = useState(false);
    const [sellFee, setSellfee] = useState(0);



    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [buyModal, setBuyModal] = useState(false);
    const buyToggle = () => setBuyModal(!buyModal);

    const [sellModal, setSellModal] = useState(false);
    const sellToggle = () => setSellModal(!sellModal);
    const [sold, setSold] = useState(0);
    const [soldValue, setSoldValue] = useState(0);



    // const wallet = useWallet();
    const { address, isConnected } = useAccount();
    let web3Provider = window.ethereum;






    const { data: _getPriceChicken } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerSolar',
        watch: true,
    })
   
    const { data: _getPriceChickenegg } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerCell',
        watch: true,
    })
    const { data: _getPriceChickenfood } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerSolarFood',
        watch: true,
    })
    const { data: _getPriceBoar } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerThermix',
        watch: true,
    })
    const { data: _getPriceSow } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerMetlux',
        watch: true,
    })
    const { data: _getPricePiglet } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerEule',
        watch: true,
    })
    const { data: _getPricePigfood } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerPositrons',
        watch: true,
    })
    const { data: _getFeeSellFee } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'sellFee',
        watch: true,
    })
    const { data: _baseToken } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'baseToken',
        watch: true,
    })
    const { data: _symbol } = useContractRead({
        address: _baseToken,
        abi: TOKEN_ABI,
        functionName: 'symbol',
        watch: true,
    })
    const { data: _decimals } = useContractRead({
        address: _baseToken,
        abi: TOKEN_ABI,
        functionName: 'decimals',
        watch: true,
    })
    const { data: _available } = useContractRead({
        address: ELEMENTS[key].address._atoken,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [MARKETPLACE],
        watch: true,
    })
    // console.log(_available);
    const { data: _balance1 } = useContractRead({
        address: _baseToken,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
    })
   
    const { data: _assetBalance1 } = useContractRead({
        address: ELEMENTS[key].address,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true
    })
    const { data: _getSold1 } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: "totalSolarSold",
        watch: true
      })
    // console.log(parseFloat(_getSold1 / 1e18).toFixed(2));
    const { data: _getSoldValue1 } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: "totalSolarSoldValue",
        watch: true
    })
    // console.log(parseFloat(_getSoldValue1 / 1e18).toFixed(2));
    // console.log(ELEMENTS[key].address);
    const { data: _assetDecimals } = useContractRead({
        address: ELEMENTS[key].address,
        abi: TOKEN_ABI,
        functionName: 'decimals',
        watch: true
    })

    let _assetAdd = ELEMENTS[key].address;
    const { data: _assetApproval1 } = useContractRead({
        address: _assetAdd,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, MARKETPLACE],
        watch: true
    })

    const { data: ContractTokenBalance } = useBalance({
        address: MARKETPLACE,
        token: ELEMENTS[key].address
    })
   
    // console.log(ContractTokenBalance?.formatted>=depositAmount);

    // console.log(_assetAdd)
    const { data: _approval } = useContractRead({
        address: _baseToken,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, MARKETPLACE],
        watch: true,
        enabled: address !== undefined
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
      const { data: _getSoldPiglet } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: "getTokenPerEule",
        watch: true
      })
      const { data: _getSoldValuePiglet } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: "totalEuleSoldValue",
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

    const [isApprovedERC20, setIsApprovedERC20] = useState(true);

    useEffect(() => {
        if (_approval && address) {
            const price = parseFloat?.(depositAmount === "" ? "0" : depositAmount)
            const allowance = parseFloat?.(ethers.utils.formatUnits?.(_approval))
            // console.log(allowance >= price, price, allowance);
            if (allowance >= price) {
                setIsApprovedERC20(true)
            } else {
                setIsApprovedERC20(false)
            }
        }
    }, [_approval, address, depositAmount]);

    // console.log((parseFloat(_approval)));

    // console.log(parseFloat(ethers.utils.formatEther(_approval)) >= parseFloat(depositAmount))

// console.log(_getPriceChicken);
    const getPrice = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        if (key === 'solar') {
            // let _getPrice = await _marketContract.methods.getTokenPerChicken().call();
            let _getPrice = parseFloat(_getPriceChicken / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold1 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue1 / 1e18).toFixed()
      setSoldValue(_getSoldValue);

        }
        else if (key === 'solarCell') {
            // let _getPrice = await _marketContract.methods.getTokenPerEgg().call();
            let _getPrice = parseFloat(_getPriceChickenegg / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            // console.log(_getPriceChickenegg);
            let _getSold = parseFloat(_getSold2 / 1e18).toFixed()
      setSold(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalEggSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValue2 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
        }
        else if (key === 'fluid') {
            // let _getPrice = await _marketContract.methods.getTokenPerChickenFood().call();
            let _getPrice = parseFloat(_getPriceChickenfood * 600 / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold3 / 1e18).toFixed()
            setSold(_getSold);
            // let _getSoldValue = await _marketContract.methods.totalChickenFoodSoldValue().call();
            let _getSoldValue = parseFloat(_getSoldValu3 / 1e18).toFixed()
            setSoldValue(_getSoldValue);

        }
        else if (key === 'thermix') {
            // let _getPrice = await _marketContract.methods.getTokenPerBoar().call();
            let _getPrice = parseFloat(_getPriceBoar / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold4 / 1e18).toFixed()
      setSold(_getSold);
      // console.log(_getSold);
      // let _getSoldValue = await _marketContract.methods.totalBoarSoldValue().call();
      let _getSoldValue = parseFloat(_getSoldValue4 / 1e18).toFixed()
      setSoldValue(_getSoldValue);

        }
        else if (key === 'metlux') {
            // let _getPrice = await _marketContract.methods.getTokenPerSow().call();
            let _getPrice = parseFloat(_getPriceSow / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold5 / 1e18).toFixed()
            setSold(_getSold);
            // let _getSoldValue = await _marketContract.methods.totalSowSoldValue().call();
            let _getSoldValue = parseFloat(_getSoldValue5 / 1e18).toFixed()
            setSoldValue(_getSoldValue);

        }
        else if (key === 'eule') {
            // let _getPrice = await _marketContract.methods.getTokenPerPiglet().call();
            let _getPrice = parseFloat(_getPricePiglet / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSoldPiglet / 1e18).toFixed()
            setSold(_getSold);
            // console.log(_getSold);
            // let _getSoldValue = await _marketContract.methods.totalPigletSoldValue().call();
            let _getSoldValue = parseFloat(_getSoldValuePiglet / 1e18).toFixed()
            setSoldValue(_getSoldValue);
        }
        else if (key === 'positron') {
            // let _getPrice = await _marketContract.methods.getTokenPerPigfood().call();
            let _getPrice = parseFloat(_getPricePigfood * 600 / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSoldPigfood / 1e18).toFixed()
            setSold(_getSold);
            // console.log(_getSold)
            // let _getSoldValue = await _marketContract.methods.totalPigFoodSoldValue().call();
            let _getSoldValue = parseFloat(_getSoldValuePigfood / 1e18).toFixed()
            setSoldValue(_getSoldValue);
        }

        // let _getFee = await _marketContract.methods.sellFee().call();
        let _getFee = parseFloat(_getFeeSellFee / 1000).toFixed(4);
        setSellfee(_getFee);
        // console.log("jbjjbj",_getFee);
    }


    const getData = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // let baseToken = await _marketContract.methods.baseToken().call();
        setBaseToken(_baseToken);
        // console.log(baseToken);
        // let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _baseToken);
        // let _symbol = await _tokenContract.methods.symbol().call();

        // let _decimals = await _tokenContract.methods.decimals().call();
        setDecimals(_decimals)
        setSymbol(_symbol);



        // let _atoken = ELEMENTS[key].address;
        // let _atokenContract = new _web3.eth.Contract(TOKEN_ABI, _atoken);
        // let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call();
        // console.log(_available);
        setAvailable(parseFloat(_available / 1e18).toFixed());



        if (address) {
            // let _balance = await _tokenContract.methods.balanceOf(address).call();
            // console.log(_balance);
            let _balance = parseFloat(_balance1 / 1e1 ** _decimals).toFixed(2);
            // let _assetAdd = ELEMENTS[key].address;
            // let _assetContract = new _web3.eth.Contract(TOKEN_ABI, _assetAdd);
            // let _assetBalance = await _assetContract.methods.balanceOf(address).call();
            // console.log(_assetBalance);
            // let _assetDecimals = await _assetContract.methods.decimals().call();
            // console.log(_assetDecimals);
            // let _assetApproval = await _assetContract.methods.allowance(address, MARKETPLACE).call();
            // console.log(_assetApproval);
            // let _approval = await _tokenContract.methods.allowance(address, MARKETPLACE).call();
            // console.log(_approval);

            let _assetBalance = parseFloat(_assetBalance1 / 1e1 ** _assetDecimals).toFixed(2);
            let _assetApproval = parseFloat(_assetApproval1 / 1e1 ** _assetDecimals).toFixed(2);
            //   alert(_assetApproval);
            setAseetApproval(_assetApproval)
            setAseetBalance(_assetBalance)
            setApproved(_approval)
            setBalance(_balance);
        }

    }

    useEffect(() => {
        // if (window.ethereum) {
        //     web3Provider = window.ethereum;
        // }
        // else {
        //     web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

        // }

        getData();
        getPrice();
    }, [address, modal,_getPriceChicken,_assetApproval1,_approval,_assetBalance1,_balance1,_available,_baseToken,_getFeeSellFee,_getPricePigfood,_getPricePiglet,_getPriceSow,_getPriceBoar,_getPriceChickenfood,_getPriceChicken,_getPriceChickenegg,_getSoldValue1,_getSold1])


    const handleSellChange = (e) => {
        // if(e.target.value!==""&&e.target.value!==0){
        setSellAmount(parseFloat(e.target.value));
        setsamount(e.target.value);
    // }else{
        // setSellAmount(0);
        // setsamount(0);
        // }

    }

    const { config: sellFarmTokensConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'sellMoonTokens',
        args: [ELEMENTS[key].address,isNaN(sellAmount)?0:  ethers.utils.parseEther?.((sellAmount*multiplier).toString())]
    })

// console.log(parseInt(multiplier*parseInt(sellAmount)));

    const { data: sellFarmTokensData, writeAsync: sellFarmTokensWriteAsync, isError: sellFarmTokensError } = useContractWrite(sellFarmTokensConfig_)

    const { isSuccess: sellFarmTokensSuccess } = useWaitForTransaction({
        hash: sellFarmTokensData?.hash,
    })


    if (sellFarmTokensError && modal) {
        getPrice();
        setModal(false);
        //     getData();
        //     setModal(modal);
        //     sellToggle()
    }
    if (sellFarmTokensSuccess && modal && sellModal) {
        setModal(false);
        setSellModal(false)
    }


    const sellFarmTokens = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // setSellError(false)
        // // let _tokenAdd = ELEMENTS[key].address;
        // setModal(!modal);

        setSellError(false)
        // let _tokenAdd = ELEMENTS[key].address;
      

        let _amount = parseFloat(sellAmount);

        if (key === 'fluid' || key === 'positron') {
            _amount = _amount * 600;
        }

        if (_amount > aseetBalance) {
            setSellError("Error: Insufficient Balance");
            return false;
        }
        else {
            setModal(!modal);
            await sellFarmTokensWriteAsync?.()
            // _amount = _web3.utils.toWei(_amount.toString());

            // _marketContract.methods.sellFarmTokens(_tokenAdd, _amount).send({
            //     from: address
            // }).on('receipt', function (receipt) {
            //     getPrice();
            //     getData();
            //     setModal(modal);
            //     sellToggle()

            // }).on('error', function (receipt) {
            //     setModal(modal);

            // })


        }




    }

    const handleDepositChange = (e) => {
        setDepositAmount(parseFloat(e.target.value));
        setdAmount(e.target.value);
    }


  
    // let _tokenAdd = ELEMENTS[key]?.address;
    // console.log(_amount);
    let _amount = isNaN(depositAmount)? 0: ethers.utils.parseEther?.((depositAmount*multiplier).toString())
    console.log(depositAmount*multiplier);

//   console.log((depositAmount));
    const { config: buyFarmTokensConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'buyMoonTokens',
        args: [ELEMENTS[key]?.address,  _amount],
        enabled: ContractTokenBalance?.formatted >= depositAmount && depositAmount > 0

        // enabled: _amount > 0 ? true : false
    })



    const { data: buyFarmTokensData, writeAsync: buyFarmTokensWriteAsync, isError: buyFarmTokensError } = useContractWrite(buyFarmTokensConfig_)

    const { isSuccess: buyFarmTokensSuccess } = useWaitForTransaction({
        hash: buyFarmTokensData?.hash,
    })


    if (buyFarmTokensError && modal) {
        getPrice();
        getData();
        setModal(false);
        setBuyModal(!buyModal)
    }
    if (buyFarmTokensSuccess && modal) {
        setModal(false);
    }

    const buyFarmTokens = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        // let _tokenAdd = ELEMENTS[key].address;
        setModal(!modal);
        await buyFarmTokensWriteAsync?.();
        // let _amount = parseFloat(depositAmount);

        if (key === 'fluid' || key === 'positron') {
            // _amount = _amount * 600;
        }
        // _amount = _web3.utils.toWei(_amount.toString());

        // _marketContract.methods.buyfarmTokens(_tokenAdd, _amount).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     getPrice();
        //     getData();
        //     setModal(modal);
        //     setBuyModal(!buyModal)

        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })

        // let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);



    }

    

    let _amount2 = ethers.utils.parseEther(parseInt('10000000000000')?.toString());
    const { config: approveAssetConfig_ } = usePrepareContractWrite({
        address: ELEMENTS[key].address,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [MARKETPLACE, _amount2]
    })

    const { data: approveAssetData, writeAsync: approveAssetWriteAsync, isError: approveAssetError } = useContractWrite(approveAssetConfig_)

    const { isSuccess: approveAssetSuccess } = useWaitForTransaction({
        hash: approveAssetData?.hash,
    })


    if (approveAssetError && modal) {
        // getPrice();
        // getData();
        setModal(false);
        // sellFarmTokens()
    }
    if (approveAssetSuccess && modal) {
        setModal(false);
    }


    const approveAsset = async () => {
        // let _web3 = new Web3(web3Provider);

        setModal(!modal);
        await approveAssetWriteAsync?.()
        // document.getElementById("exampleModalCenter").modal('show')
        // const asset = ELEMENTS[key].address;
        // const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, asset);
        // const _amount = _web3.utils.toWei('10000000000000');
        // _tokenContract.methods.approve(MARKETPLACE, _amount).send({ from: address }).on('receipt', function (receipt) {
        //     getPrice();
        //     getData();
        //     setModal(modal);
        //     sellFarmTokens()

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }






    const { config: approveTokenConfig_ } = usePrepareContractWrite({
        address: baseToken,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [MARKETPLACE, ethers.utils.parseEther(parseInt('10000000000000').toString())]
    })

    const { data: approveTokenData, writeAsync: approveTokenWriteAsync, isError: approveTokenError } = useContractWrite(approveTokenConfig_)

    const { isSuccess: approveTokenSuccess } = useWaitForTransaction({
        hash: approveTokenData?.hash,
    })


    if (approveTokenError && modal) {
        getPrice();
        getData();
        setModal(false);
        buyFarmTokens()
    }
    if (approveTokenSuccess && modal) {
        setModal(false);
    }



    const approveToken = async () => {
        // let _web3 = new Web3(web3Provider);



        setModal(!modal);
        await approveTokenWriteAsync?.()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, baseToken);
        // const _amount = _web3.utils.toWei('10000000000000');
        // _tokenContract.methods.approve(MARKETPLACE, _amount).send({ from: address }).on('receipt', function (receipt) {
        //     getPrice();
        //     getData();
        //     setModal(modal);
        //     buyFarmTokens()

        // })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }


    async function setMaxDeposit() {


        setdAmount(balance)
        setDepositAmount(balance)
    }


    async function setMaxSell() {
        let _amt = parseFloat(aseetBalance)
        if (key === 'fluid' || key === 'positron') {
            _amt = parseFloat(_amt / 600).toFixed()
        }


        setsamount(_amt)
        setSellAmount(_amt)
    }

    const openbuymodal = () => {
        setBuyModal(!buyModal)
    }

    return (
        <div>
            <Header />
            <div className="bg-chicken">
                <div className="container">
                    <div className='moon___mark'>
                        <h1>MOON MARKETPLACE</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                            <div className='marketplace-box-wrap2 respmrt'>
                                <div className="marketplace-box">
                                    <div className="chicken-content-wrp">

                                        <div className="chicken-c-img">
                                            <img className='imgdesk' src={ELEMENTS[key].image} alt="" />
                                            <img className='imgmob' src={ELEMENTS[key].img} alt="" />
                                        </div>
                                        <div className='moon___buy__bxc'>

                                            <h1>{ELEMENTS[key].name}</h1>
                                            <div className='moon___c'>
                                                <p>Rate</p>
                                                <h6>$ {ELEMENTS[key]?.price} ~ {tokenPrice}</h6>
                                            </div>
                                            <div className='moon___buy__btm mb__m'>
                                                <p>Total Sold</p>
                                                <p className='amount___p'>{sold > 0 ? sold : "0"}</p>

                                            </div>
                                            <div className='moon___buy__btm '>
                                                <p>Total sold value</p>
                                                <p className='amount___p'>{soldValue > 0 ? soldValue : '0'} {symbol}</p>

                                            </div>
                                        </div>

                                    </div>
                                    <div className='para___by'>
                                        <p>Lorem ipsum is placeholder text commonly used in the <br />
                                            graphic, print, and publishing industries for previewing <br />
                                            layouts and visual mockups.</p>
                                    </div>

                                    <div className='buy___btn__box'>
                                        <div className="wrp-btn-back">
                                            {
                                                available === 0 ?
                                                    <a href="#" className="bg___BTN3" >Sold Out</a>
                                                    :
                                                    <a href="#" className="bg___BTN3" onClick={buyToggle} >Buy</a>
                                            }
                                            <a href="#" className="bg___BTN3" onClick={sellToggle} >Sell</a>

                                        </div>
                                        <div className="wrp-btn-back">
                                            <a href="/marketplace" className="bg___BTN3">Marketplace</a>
                                            <a href="/choose" className="bg___BTN3">Farming</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                    <div className='btm___arrow'>
                        <Link to='/marketplace'><img src={arrow} alt='arrow image here' /></Link>
                    </div>

                </div>

                <Modal isOpen={buyModal} toggle={buyToggle} centered={true}>


                    <ModalBody>

                        <div className="moveRight">
                            <span className="pull-left">
                                Your {ELEMENTS[key].name} Balance<br />
                                {aseetBalance > 0 ? aseetBalance : "0"}
                            </span>
                            <span className="pull-right">
                                Your Token Balance<br />
                                {balance > 0 ? balance : "0.00"} {symbol}
                            </span>
                        </div>
                        <label className="mb-3"><br />
                            {
                                (key === 'fluid' || key === 'positron') &&

                                <>
                                    Enter number in multiple of 600 ml to Buy
                                </>
                            }
                            {
                                key !== 'fluid' && key !== 'positron' &&
                                <>
                                    Enter Quantity to Buy
                                </>
                            }

                            {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxDeposit}>Max</span> */}
                          
                        </label>
                        <input className="form-control mb-3" onChange={handleDepositChange} type="number" value={damount} />
                        {
                            (key === 'fluid' || key === 'positron') &&

                            <span className="info mt-3">Quantity: {parseFloat(damount * 600).toFixed(2)} ml ({ELEMENTS[key].name})</span>

                        }
                        <span className="info mt-3">Cost: {parseFloat(damount * tokenPrice).toFixed(2)} {symbol}</span>

                        {
                            depositError &&
                            <span className="error">{depositError}</span>
                        }


                    </ModalBody>
                    <ModalFooter>







                    
                        {
                            !isApprovedERC20 ?
                                <Button className="bg___BTN2 mr-3" onClick={approveToken}>Approve</Button>
                                :
                                ContractTokenBalance?.formatted < depositAmount*multiplier
                                    ? <p>
                                        Marketplace have no {ELEMENTS[key].name} Balance
                                    </p>
                                    :
                                    <Button className="bg___BTN2 mr-3" onClick={buyFarmTokens}>Buy</Button>

                        }
                    
                        {/* {
                            isApprovedERC20  && 

                            <Button className="depositButton mr-3" onClick={buyFarmTokens}>Buy</Button>
                        } */}


                        {
                            aseetApproval < sellAmount &&
                            <Button className="bg___BTN2 mr-3" onClick={approveAsset}>Approve {ELEMENTS[key].name}</Button>
                        }
  
                        {
                            aseetApproval > sellAmount &&
                            <Button className="bg___BTN2 mr-3" onClick={sellFarmTokens}>Sell</Button>
                        }


                        <Button className="bg___BTN2" onClick={buyToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={sellModal} toggle={sellToggle} centered={true}>


                    <ModalBody>

                        <div className="moveRight">
                            <span className="pull-left">
                                Your {ELEMENTS[key].name} Balance<br />
                                {aseetBalance}
                            </span>
                            <span className="pull-right">
                                Your Token Balance<br />
                                {balance} {symbol}
                            </span>
                        </div>
                        <label className="mb-3"><br />
                            {/* {key} */}
                            {
                                (key === 'fluid' || key === 'positron') &&
                                <>
                                    Enter number in multiple of 600 ml to Sell
                                </>
                            }
                            {
                                (key !== 'fluid' && key !== 'positron') &&
                                <>
                                    Enter Quantity to Sell
                                </>
                            }

                            <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxSell}>Max</span>
                        </label>
                        <input className="form-control mb-3" onChange={handleSellChange} type="text" value={samount} />
                        {
                            (key === 'fluid' || key === 'positron') &&
                            <span className="info mt-3">Weight: {parseFloat(samount * 600).toFixed(2)} ml ({ELEMENTS[key].name})</span>

                        }
                        <span className="info mt-3">Price: {parseFloat(samount * tokenPrice).toFixed(2)} {symbol}</span>
                        <span className="info mt-3">Fee: {parseFloat(samount * tokenPrice * sellFee).toFixed(2)} {symbol}</span>

                        {
                            sellError &&
                            <span className="error">{sellError}</span>
                        }


                    </ModalBody>
                    <ModalFooter>
                        {
                            aseetApproval < sellAmount &&
                            <Button className="bg___BTN2 mr-3" onClick={approveAsset}>Approve {ELEMENTS[key].name}</Button>
                        }

                        {
                            aseetApproval >= sellAmount &&
                            <Button className="bg___BTN2 mr-3" onClick={sellFarmTokens}>Sell</Button>
                        }
                        <Button className="bg___BTN2" onClick={sellToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={modal} toggle={toggle} centered={true}>


                    <ModalBody>
                        <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

                    </ModalBody>
                    <Button className="bg___BTN2 mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

                </Modal>
            </div>
            {/* <div className="stokes">
                <img src={stoke} alt="" />
            </div> */}
            {/* <Footer /> */}
        </div>
    );


}
export default elements;