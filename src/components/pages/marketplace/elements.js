/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, } from 'react';
import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";
import Header from '../../pages/header.js';
import arrow from '../../images/round_arrow.svg';
import moon_img from '../../images/moon_img.png';
import modal_earth from '../../images/modal_earth.png';
import bg_img from '../../images/bg_img.png';
import { MARKETPLACE, METLUX_TOKEN } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
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




const ELEMENTS = {
    'solar': {
        'name': 'SOLAR CELL',
        'price': '10',
        'image': solor,
        'desc':"A solar cell is a device that converts light energy from the sun into electrical energy. It is a valuable resource for generating renewable energy on Moon. Solar cells can be placed on the land for solar harvesting, through which they generate energy packets. These energy packets are valuable resources that can be used to power equipment, habitats, and other infrastructure on Moon. Solar cells are highly efficient in converting sunlight into electrical energy, making them an ideal solution for generating sustainable energy.",
        'img': b1,
        'address': '0x57f450240b7a9eAEDfb6FE8DfA83087b4f312109'
    },
    'solarCell': {
        'name': 'ENERGY PACKET',
        'price': '0.12',
        'image': energy,
        'img': b2,
        'address': '0xD5DF9651c2731dA0d47978A79f4F6594034038eC',
        'desc':"Energy Packets are containers that hold electricity generated by solar cells through solar harvesting. They are a valuable resource on moon as they provide a reliable source of energy for equipment and habitats. Energy Packets can be sold or used to forge new solar cells, which can further increase the energy-generating capabilities through solar harvesting."
    },
    'fluid': {
        'name': 'SUPERCONDUCTOR FLUID',
        'price': '1',
        'image': fluds,
        'img': b3,
        'desc':"Superconductor fluid is a type of fluid used by solar cells to power the process of solar harvesting. It is a critical resource required for the efficient and effective generation of electricity by solar cells. Superconductor fluid enables the smooth flow of electrons, reducing resistance and increasing the conductivity of solar cells. This, in turn, helps to increase the efficiency of solar cells in converting sunlight into electrical energy. Without superconductor fluid, the process of solar harvesting is not possible.",
        'address': '0xb4e0f6aEfb68449917879068E9C32703268F9C89'

    },
    'thermix': {
        'name': 'THERMIX',
        'price': '100',
        'image': mat,
        'img': b4,
        'address': '0x12F32f5FC8C87b053DfBc8F56C159094B42730d1',
        'desc':"Thermix is a cutting-edge technology designed to maintain a comfortable temperature inside MoonPods, which are structures built for human habitation on the moon. The device generates the ideal temperature for a human-friendly environment by using advanced algorithms and sensors. With its sophisticated features, high demand and limited supply, the Thermix is a highly sought-after product among moon settlers and space enthusiasts."

    },
    'metlux': {
        'name': 'METLUX',
        'price': '100',
        'image': land,
        'img': b5,
        'address': '0x8D1502d8Acc70b861F58186270Bc81F671e0B2d8',
        'desc':"Metlux is a specially crafted metal made by mixing different materials to create a highly durable and protective material that can safeguard MoonPods from a variety of environmental hazards. It is designed to provide protection from space debris, UV radiation, and gamma rays, which are dangerous to both humans and equipments. Metlux is lightweight, conductive, and resistant to extreme temperatures and harsh conditions as well, making it ideal to use it on moon. Its advanced properties make it an essential component for ensuring the safety and longevity of Moonpods."

    },
    'eule': {
        'name': 'EULE',
        'price': '10',
        'image': eules,
        'img': b6,
        'address': '0xd63E96e180661e094383e66AA838863A87FDeB9F',
        'desc':"Eule is a material that can be earned by renting MoonPods, which are space habitats designed for human habitation on the moon. It is a valuable resource and can be used in Forginator to create materials like Thermix and Metlux, which are essential components for constructing Moonpods. Eule is often sold for $MOON tokens, which is native token of Moonland."

    },
    'positron': {
        'name': 'POSITRON',
        'price': '5',
        'image': mooon,
        'img': b7,
        'address': '0x19Aca1DB633622ADA2cc722991db21989f6F4F9B',
        'desc':"Positron is a fuel that is essential for the functioning of Thermix and Metlux, two materials used in the creation of MoonPods. The combination of Thermix and Metlux provides the necessary insulation and protection from the harsh lunar environment, while Positron acts as the fuel source for these materials to function properly. Without Positron, the construction of MoonPods and other space habitats would not be possible, highlighting the crucial role it plays in the development of a sustainable Moopod."

    }
}


const elements = (props) => {
    const [balance, setBalance] = useState(0);

    const { key } = useParams();
    const multiplier = ((key == "fluid" || key == "positron") ? 600 : 1)
    const [symbol, setSymbol] = useState(0);
    const [baseToken, setBaseToken] = useState(null);
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
    const closeModal = () => {
		setModal(false);
	  };

    const [buyModal, setBuyModal] = useState(false);
    const buyToggle = () => setBuyModal(!buyModal);
    const buyToggleClose = () => setBuyModal(false);

    const [sellModal, setSellModal] = useState(false);
    const sellToggle = () => setSellModal(!sellModal);
    const sellToggleClose = () => setSellModal(false);
    const [sold, setSold] = useState(0);
    const [soldValue, setSoldValue] = useState(0);
    const { address, isConnected } = useAccount();
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
        address: ELEMENTS[key].address,
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
    const { data:ContractTokenBalance } = useBalance({
        addressOrName: MARKETPLACE,
        token: ELEMENTS[key].address
    })
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
        
            if (allowance >= price) {
                setIsApprovedERC20(true)
            } else {
                setIsApprovedERC20(false)
            }
        }
    }, [_approval, address, depositAmount,isApprovedERC20]);
    const getPrice = async () => {
        if (key === 'solar') {
    
            let _getPrice = parseFloat(_getPriceChicken / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold1 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue1 / 1e18).toFixed()
      setSoldValue(_getSoldValue);

        }
        else if (key === 'solarCell') {
        
            let _getPrice = parseFloat(_getPriceChickenegg / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
        
            let _getSold = parseFloat(_getSold2 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue2 / 1e18).toFixed()
      setSoldValue(_getSoldValue);
        }
        else if (key === 'fluid') {
            let _getPrice = parseFloat(_getPriceChickenfood * 600 / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold3 / 1e18).toFixed()
            setSold(_getSold);
            let _getSoldValue = parseFloat(_getSoldValu3 / 1e18).toFixed()
            setSoldValue(_getSoldValue);

        }
        else if (key === 'thermix') {
            let _getPrice = parseFloat(_getPriceBoar / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold4 / 1e18).toFixed()
      setSold(_getSold);
      let _getSoldValue = parseFloat(_getSoldValue4 / 1e18).toFixed()
      setSoldValue(_getSoldValue);

        }
        else if (key === 'metlux') {
            let _getPrice = parseFloat(_getPriceSow / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSold5 / 1e18).toFixed()
            setSold(_getSold);
            let _getSoldValue = parseFloat(_getSoldValue5 / 1e18).toFixed()
            setSoldValue(_getSoldValue);

        }
        else if (key === 'eule') {
            let _getPrice = parseFloat(_getPricePiglet / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSoldPiglet / 1e18).toFixed()
            setSold(_getSold);
            let _getSoldValue = parseFloat(_getSoldValuePiglet / 1e18).toFixed()
            setSoldValue(_getSoldValue);
        }
        else if (key === 'positron') {
            let _getPrice = parseFloat(_getPricePigfood * 600 / 1e18).toFixed(2)
            setTokenPrice(_getPrice);
            let _getSold = parseFloat(_getSoldPigfood / 1e18).toFixed()
            setSold(_getSold);
            let _getSoldValue = parseFloat(_getSoldValuePigfood / 1e18).toFixed()
            setSoldValue(_getSoldValue);
        }

        let _getFee = parseFloat(_getFeeSellFee / 1000).toFixed(4);
        setSellfee(_getFee);
    }


    const getData = async () => {
        setBaseToken(_baseToken);
        setDecimals(_decimals)
        setSymbol(_symbol);
        setAvailable(parseFloat(_available / 1e18).toFixed());



        if (address) {
            let _balance = parseFloat(_balance1 / 1e1 ** _decimals).toFixed(2);

            let _assetBalance = parseFloat(_assetBalance1 / 1e1 ** _assetDecimals).toFixed(2);
            let _assetApproval = parseFloat(_assetApproval1 / 1e1 ** _assetDecimals).toFixed(2);
            setAseetApproval(_assetApproval)
            setAseetBalance(_assetBalance)
            setApproved(_approval)
            setBalance(_balance);
        }

    }

    useEffect(() => {
        getData();
        getPrice();
    }, [address,_getPriceChicken,_assetApproval1,_approval,_assetBalance1,_balance1,_available,_baseToken,_getFeeSellFee,_getPricePigfood,_getPricePiglet,_getPriceSow,_getPriceBoar,_getPriceChickenfood,_getPriceChicken,_getPriceChickenegg,_getSoldValue1,_getSold1,sellAmount,depositAmount,multiplier])


    const handleSellChange = (e) => {
        setSellAmount(parseFloat(e.target.value));
        setsamount(e.target.value);

    }

    const { config: sellFarmTokensConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'sellMoonTokens',
        args: [ELEMENTS[key].address,isNaN(samount)?0:  ethers.utils.parseEther?.((samount*multiplier).toString())],
        enabled:  aseetApproval >= sellAmount
    })


    const { data: sellFarmTokensData, writeAsync: sellFarmTokensWriteAsync, isError: sellFarmTokensError } = useContractWrite(sellFarmTokensConfig_)

    const { isSuccess: sellFarmTokensSuccess } = useWaitForTransaction({
        hash: sellFarmTokensData?.hash,
    })


    // if (sellFarmTokensSuccess && sellModal) {
    //     sellToggleClose()
    // }


    const sellFarmTokens = async () => {

        setSellError(false)
      

        let _amount = parseFloat(samount);

        if (key === 'fluid' || key === 'positron') {
            _amount = _amount * 600;
        }

        if (_amount > aseetBalance) {
            setSellError("Error: Insufficient Balance");
            return false;
        }
       else if (_amount < 0 || _amount == 0 || _amount == "") {
            setSellError("Error: Invalid Amount");
            return false;
        }
        else {
            setModal(true);
            await sellFarmTokensWriteAsync?.()
        }




    }

    const handleDepositChange = (e) => {
        setDepositAmount(parseFloat(e.target.value));
        setdAmount(e.target.value);
        // alert(parseFloat(e.target.value))
    }

    let _amount = isNaN(depositAmount)? 0: ethers.utils.parseEther?.((depositAmount*multiplier).toString())

    const { config: buyFarmTokensConfig_ } = usePrepareContractWrite({
        address: MARKETPLACE,
        abi: MARKETPLACE_ABI,
        functionName: 'buyMoonTokens',
        args: [ELEMENTS[key]?.address,  _amount],
    })



    const { data: buyFarmTokensData, writeAsync: buyFarmTokensWriteAsync, isError: buyFarmTokensError } = useContractWrite(buyFarmTokensConfig_)

    const { isSuccess: buyFarmTokensSuccess } = useWaitForTransaction({
        hash: buyFarmTokensData?.hash,
    })


    // if (buyFarmTokensSuccess && buyModal) {
    //     buyToggleClose()
    // }

    const buyFarmTokens = async () => {
        setModal(true);
        await buyFarmTokensWriteAsync?.();
        if (key === 'fluid' || key === 'positron') {
            // _amount = _amount * 600;
        }
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



    const approveAsset = async () => {
        setModal(true);
        await approveAssetWriteAsync?.()
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

    const approveToken = async () => {
        setModal(true);
        await approveTokenWriteAsync?.()

    }


    async function setMaxDeposit() {
        setdAmount(balance)
        setDepositAmount(balance)
    }


    async function setMaxSell() {
        let _amt = aseetBalance
        if (key === 'fluid' || key === 'positron') {
            _amt = _amt / 600
        }


        setsamount(_amt)
        setSellAmount(_amt)
    }

    const openbuymodal = () => {
        setBuyModal(!buyModal)
    }

	useEffect(() => {
		if (sellFarmTokensSuccess||buyFarmTokensSuccess||approveAssetSuccess||approveTokenSuccess) {
		  closeModal();
        //   getData()
        //   getPrice()
		}
	  }, [sellFarmTokensSuccess,buyFarmTokensSuccess,approveAssetSuccess,approveTokenSuccess]);
	  
	  useEffect(() => {
		if (sellFarmTokensError||buyFarmTokensError||approveAssetError||approveTokenError) {
		  closeModal();
		}
	  }, [sellFarmTokensError,buyFarmTokensError,approveAssetError,approveTokenError]);


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
                                                <p>Available sold value</p>
                                                <p className='amount___p'>{soldValue > 0 ? soldValue : '0'} {symbol}</p>

                                            </div>
                                        </div>

                                    </div>
                                    <div className='para___by'>
                                        <p>{ELEMENTS[key].desc}</p>
                                    </div>

                                    <div className='buy___btn__box'>
                                        <div className="wrp-btn-back">
                                            
                                            {
                                                available == 0 ?
                                                    <a href="#" className="bg___BTN3" >Sold Out</a>
                                                    :
                                                    <a href="#" className="bg___BTN3" onClick={buyToggle} >Buy</a>
                                            }
                                            <a href="#" className="bg___BTN3" onClick={sellToggle} >Sell</a>

                                        </div>
                                        {/* <div className="wrp-btn-back">
                                            <a href="/marketplace" className="bg___BTN3">Marketplace</a>
                                            <a href="/choose" className="bg___BTN3">Invest</a>

                                        </div> */}
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
<div  className="modal_img_div"><img src={moon_img} alt="moonland" width={"250px"} style={{backgroundImage:`url(${bg_img})`,backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat",padding:"14px",borderRadius:"27px",}}/></div>
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
                        <label ><br />
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
                        <input className="form-control mb-3" onChange={(e) => handleDepositChange(e)} type="number" value={damount} />
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


                        {/* {
                            aseetApproval < sellAmount &&
                            <Button className="bg___BTN2 mr-3" onClick={approveAsset}>Approve {ELEMENTS[key].name}</Button>
                        }
  
                        {
                            aseetApproval > sellAmount &&
                            <Button className="bg___BTN2 mr-3" onClick={sellFarmTokens}>Sell</Button>
                        } */}


                        <Button className="bg___BTN2" onClick={buyToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={sellModal} toggle={sellToggle} centered={true}>


                    <ModalBody>
                    <div  className="modal_img_div"><img src={moon_img} alt="moonland" width={"250px"} style={{backgroundImage:`url(${bg_img})`,backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat",padding:"14px",borderRadius:"27px",}}/></div>
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
                        <label ><br />
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
                        <input className="form-control mb-3" onChange={handleSellChange} type="number" value={samount} />
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
                            aseetApproval >= sellAmount && samount > 0 && samount != "" &&
                            <Button className="bg___BTN2 mr-3" onClick={sellFarmTokens}>Sell</Button>
                        }
                        <Button className="bg___BTN2" onClick={sellToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={modal} toggle={toggle} centered={true}>
                    <ModalBody>
                    <div  className="modal_img_div1"><img src={modal_earth} alt="moonland" width={"150px"} style={{opacity:"51%"}}/></div>
                        <div className="modaltext text-center mt-4" >Processing your Request...</div>

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