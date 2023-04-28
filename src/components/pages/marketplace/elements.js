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
// import {useWallet} from '@binance-chain/bsc-use-wallet'

 


const ELEMENTS = {
    'chicken': {
        'name': 'CHICKEN',
        'price': '10',
        'image': land,
        'address': '0x0a92bc06443E7D4cd38735ED01B5C5C3C74F6773'
    },
    'chickenegg': {
        'name': 'CHICKEN EGG',
        'price': '0.12',
        'image': solor,
        'address': '0x78AC3A5bC58455B41601189FDCF028F63e8c9ced'
    },
    'chickenfood': {
        'name': 'CHICKEN FOOD',
        'price': '1',
        'image': mooon,
        'address': '0x50C0268e1D368420Ce99766BF89AbecEfCFC7644'

    },
    'boar': {
        'name': 'BOAR',
        'price': '100',
        'image': mat,
        'address': '0x486bfd5AE6bf094E403bCF8dae14b708b15B143E'

    },
    'sow': {
        'name': 'SOW',
        'price': '100',
        'image': energy,
        'address': '0x26B00Fb006Cb64c1f5D4ed407c6aBdF902F1c595'

    },
    'piglet': {
        'name': 'PIGLET',
        'price': '10',
        'image': eules,
        'address': '0x7f7936Bf782F327bF549809bC6469dbE52280867'

    },
    'pigfood': {
        'name': 'PIG FOOD',
        'price': '5',
        'image': fluds,
        'address': '0xea049FB6D789deEb85630c16576cC0CEB75555F7'

    }
}


const elements = (props) => {
    const [balance, setBalance] = useState(0);
    const { key } = useParams();
    const [symbol, setSymbol] = useState(0);
    const [baseToken, setBaseToken] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [aseetBalance, setAseetBalance] = useState(0);
    const [aseetApproval, setAseetApproval] = useState(0);

    const [approved, setApproved] = useState(0);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [available, setAvailable] = useState(0);

    const [decimals, setDecimals] = useState(0);
    const [damount, setdAmount] = useState('');



    const [samount, setsamount] = useState('');

    const [depositAmount, setDepositAmount] = useState("");
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



    // const wallet = useWallet();
    const { address, isConnected } = useAccount();
    let web3Provider = window.ethereum;



    useEffect(() => {
        // if (window.ethereum) {
        //     web3Provider = window.ethereum;
        // }
        // else {
        //     web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

        // }

        getData();
        getPrice();
    }, [address, modal])



    const { data: _getPriceChicken } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerChicken',
        watch: true,
    })
    const { data: _getPriceChickenegg } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerEgg',
        watch: true,
    })
    const { data: _getPriceChickenfood } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerChickenFood',
        watch: true,
    })
    const { data: _getPriceBoar } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerBoar',
        watch: true,
    })
    const { data: _getPriceSow } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerSow',
        watch: true,
    })
    const { data: _getPricePiglet } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerPiglet',
        watch: true,
    })
    const { data: _getPricePigfood } = useContractRead({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'getTokenPerPigfood',
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
        address: ELEMENTS[key].address?._atoken,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [MARKETPLACE],
        watch: true,
    })
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

    const {data:ContractTokenBalance}=useBalance({
        address:MARKETPLACE,
        token:ELEMENTS[key].address
    })
    // console.log(ContractTokenBalance?.formatted>=depositAmount);

    // console.log(_assetAdd)
    const { data: _approval } = useContractRead({
        address: _baseToken,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, MARKETPLACE],
        watch: true,
        enabled:address!==undefined
    })

    const [isApprovedERC20,setIsApprovedERC20]=useState(true);

    useEffect(() => {
        if (_approval && address) {
            const price = parseFloat?.(depositAmount === "" ? "0" : depositAmount)
            const allowance = parseFloat?.(ethers.utils.formatUnits?.(_approval))
            console.log(allowance >= price,price,allowance);
            if (allowance >= price) {
                setIsApprovedERC20(true)
            } else {
                setIsApprovedERC20(false)
            }
        }
    }, [_approval, address, depositAmount]);

    // console.log((parseFloat(_approval)));

    // console.log(parseFloat(ethers.utils.formatEther(_approval)) >= parseFloat(depositAmount))


    const getPrice = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        if (key === 'chicken') {
            // let _getPrice = await _marketContract.methods.getTokenPerChicken().call();
            let _getPrice = parseFloat(_getPriceChicken / 1e18).toFixed(2)
            setTokenPrice(_getPrice);

        }
        else if (key === 'chickenegg') {
            // let _getPrice = await _marketContract.methods.getTokenPerEgg().call();
            let _getPrice = parseFloat(_getPriceChickenegg / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            // console.log(_getPriceChickenegg);
        }
        else if (key === 'chickenfood') {
            // let _getPrice = await _marketContract.methods.getTokenPerChickenFood().call();
            let _getPrice = parseFloat(_getPriceChickenfood * 600 / 1e18).toFixed(2)
            setTokenPrice(_getPrice);

        }
        else if (key === 'boar') {
            // let _getPrice = await _marketContract.methods.getTokenPerBoar().call();
            let _getPrice = parseFloat(_getPriceBoar / 1e18).toFixed(2)
            setTokenPrice(_getPrice);

        }
        else if (key === 'sow') {
            // let _getPrice = await _marketContract.methods.getTokenPerSow().call();
            let _getPrice = parseFloat(_getPriceSow / 1e18).toFixed(2)
            setTokenPrice(_getPrice);

        }
        else if (key === 'piglet') {
            // let _getPrice = await _marketContract.methods.getTokenPerPiglet().call();
            let _getPrice = parseFloat(_getPricePiglet / 1e18).toFixed(2)
            setTokenPrice(_getPrice);

        }
        else if (key === 'pigfood') {
            // let _getPrice = await _marketContract.methods.getTokenPerPigfood().call();
            let _getPrice = parseFloat(_getPricePigfood * 600 / 1e18).toFixed(2)
            setTokenPrice(_getPrice);

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


    const { config: sellFarmTokensConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'sellFarmTokens',
        args: [ELEMENTS[key].address, parseFloat(sellAmount)]
    })

    const { data: sellFarmTokensData, writeAsync: sellFarmTokensWriteAsync, isError: sellFarmTokensError } = useContractWrite(sellFarmTokensConfig_)

    const { isSuccess: sellFarmTokensSuccess } = useWaitForTransaction({
        hash: sellFarmTokensData?.hash,
    })


    if (sellFarmTokensError && modal) {
        getPrice();
        //     getData();
        //     setModal(modal);
        //     sellToggle()
    }
    if (sellFarmTokensSuccess && modal) {
        setModal(false);
    }


    const sellFarmTokens = async () => {
        // let _web3 = new Web3(web3Provider);
        // let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        // setSellError(false)
        // // let _tokenAdd = ELEMENTS[key].address;
        // setModal(!modal);

        setSellError(false)
        // let _tokenAdd = ELEMENTS[key].address;
        setModal(!modal);
        await sellFarmTokensWriteAsync?.()



        let _amount = parseFloat(sellAmount);

        if (key === 'chickenfood' || key === 'pigfood') {
            _amount = _amount * 600;
        }
        if (_amount > aseetBalance) {
            setSellError("Error: Insufficient Balance");
            return false;
        }
        else {

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


    // let _tokenAdd = ELEMENTS[key]?.address;
    let _amount = parseInt(depositAmount) ? ethers.utils.parseUnits?.(parseInt(depositAmount).toString()) : 0
    // console.log(_amount);
    const { config: buyFarmTokensConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'buyfarmTokens',
        args: [ELEMENTS[key]?.address, _amount],
        enabled:ContractTokenBalance?.formatted>=depositAmount && _amount>0

        // enabled: _amount > 0 ? true : false
    })

    // console.log(_amount);

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

        if (key === 'chickenfood' || key === 'pigfood') {
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

    const handleDepositChange = (e) => {
        setDepositAmount(e.target.value);
        setdAmount(e.target.value);

    }


    const handleSellChange = (e) => {
        setSellAmount(parseFloat(e.target.value));
        setsamount(e.target.value);

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
        if (key === 'chickenfood' || key === 'pigfood') {
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
                                    <img src={ELEMENTS[key].image} alt=""  />
                                </div>
                                <div className='moon___buy__bxc'>
                                   
                                   <h1>LAND IN MOON</h1>
                                   <div className='moon___c'>
                                    <p>Rate</p>
                                   
                                    <h6>${ELEMENTS[key].price} ~ {tokenPrice}</h6>
                                    </div>
                                    <div className='moon___buy__btm mb__m'>
                                        <p>Total Sold</p>
                                        <p className='amount___p'>0</p>

                                    </div>
                                    <div className='moon___buy__btm '>
                                        <p>Total sold value</p>
                                        <p className='amount___p'>0</p>

                                    </div>
                                </div>
                               
                            </div>
<div className='para___by'>
    <p>Lorem ipsum is placeholder text commonly used in the <br/>
    graphic, print, and publishing industries for previewing <br/>
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
                                <a  href="/marketplace" className="bg___BTN3">Marketplace</a>
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
                                {aseetBalance> 0 ? aseetBalance : "0"}
                            </span>
                            <span className="pull-right">
                                Your Token Balance<br />
                                {balance > 0 ? balance : "0.00"} {symbol}
                            </span>
                        </div>
                        <label className="mb-3"><br />
                            {
                                (key === 'chickenfood' || key === 'pigfood') &&

                                <>
                                    Enter number in multiple of 600 gms to Buy
                                </>
                            }
                            {
                                key !== 'chickenfood' && key !== 'pigfood' &&
                                <>
                                    Enter Quantity to Buy
                                </>
                            }

                            {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxDeposit}>Max</span> */}
                        </label>
                        <input className="form-control mb-3" onChange={handleDepositChange} type="text" value={damount} />
                        {
                            (key === 'chickenfood' || key === 'pigfood') &&

                            <span className="info mt-3">Weight: {parseFloat(damount * 600).toFixed(2)} grams ({ELEMENTS[key].name})</span>

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

                            <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
                            :
                            ContractTokenBalance?.formatted<depositAmount
                            ?<p>
                                marketplace have no {ELEMENTS[key].name} Balance
                            </p> 
                            :
                            <Button className="depositButton mr-3" onClick={buyFarmTokens}>Buy</Button>

                        }
                        {/* {
                            isApprovedERC20  && 

                            <Button className="depositButton mr-3" onClick={buyFarmTokens}>Buy</Button>
                        } */}


                        {
                            aseetApproval < sellAmount &&
                            <Button className="depositButton mr-3" onClick={approveAsset}>Approve {ELEMENTS[key].name}</Button>
                        }

                        {
                            aseetApproval > sellAmount &&
                            <Button className="depositButton mr-3" onClick={sellFarmTokens}>Sell</Button>
                        }


                        <Button className="depositButton" onClick={buyToggle}>Cancel</Button>
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
                                (key === 'chickenfood' || key === 'pigfood') &&
                                <>
                                    Enter number in multiple of 600 gms to Sell
                                </>
                            }
                            {
                                (key !== 'chickenfood' && key !== 'pigfood') &&
                                <>
                                    Enter Quantity to Sell
                                </>
                            }

                            <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxSell}>Max</span>
                        </label>
                        <input className="form-control mb-3" onChange={handleSellChange} type="text" value={samount} />
                        {
                            (key === 'chickenfood' || key === 'pigfood') &&
                            <span className="info mt-3">Weight: {parseFloat(samount * 600).toFixed(2)} grams ({ELEMENTS[key].name})</span>

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
                            <Button className="depositButton mr-3" onClick={approveAsset}>Approve {ELEMENTS[key].name}</Button>
                        }

                        {
                            aseetApproval >= sellAmount &&
                            <Button className="depositButton mr-3" onClick={sellFarmTokens}>Sell</Button>
                        }
                        <Button className="depositButton" onClick={sellToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={modal} toggle={toggle} centered={true}>


                    <ModalBody>
                        <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

                    </ModalBody>
                    <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

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