import React, { useEffect } from 'react';


import tick from '../../images/tick.svg';
import { useState } from 'react';
import { Button, ModalFooter, Modal, ModalBody } from "reactstrap";
import STAKING_ABI from '../../../Config/STAKING_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import logo from '../../images/MyFarmPet.png';
import boarIcon from '../../images/boarIcon.svg';
import chickenIcon from '../../images/chickenIcon.svg';
import moon from '../../images/moon.svg';
import Web3 from "web3"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ConnectWalletBtn } from '../ConnectWalletBtn.js';
import { ethers } from 'ethers';

const STAKING_ARRAY = [
    {
        address: '0x6AbCb15898609327e9C7498180B869752a269C64',
        name: 'Moonland',
        image: moon,
        status: 1,
        apy: 0,
        earn: 'Moonland',
        depositFee: 0,
        withdrawFee: 0,
    },
    {
        address: null,
        name: 'Trade in moon',
        image: chickenIcon,
        status: 3,
        apy: 84,
        earn: 'MyFarmPet',
        depositFee: 5,
        withdrawFee: 10,
    },
    {
        address: null,
        name: 'Live in Moon',
        image: boarIcon,
        status: 3,
        apy: 84,
        earn: 'MyFarmPet',
        depositFee: 5,
        withdrawFee: 10,

    },
]

const StakeCard = (props) => {

    const [stakeSymbol, setStakeSymbol] = useState(null);
    const [earnSymbol, setEarnSymbol] = useState(null);
    const [depositFee, setDepositFee] = useState(0);
    const [unstakeFee, setUnstakeFee] = useState(0);
    const [apy, setApy] = useState(0);
    const [approved, setApproved] = useState(0);
    const [userStaked, setUserStaked] = useState(0);
    const [userEarned, setUserEarned] = useState(0);

    const [stakeEnabled, setStakeEnabled] = useState(false);
    const [unstakeEnabled, setUnstakeEnabled] = useState(false);
    const [claimEnabled, setClaimEnabled] = useState(false);

    const [totalStaked, setTotalStaked] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);

    const [balance, setBalance] = useState(0);
    const [stakeStoken, setStakeStoken] = useState(null);

    //  const wallet = useWallet();
    const { address, isConnected } = useAccount()

    let web3Provider = window.ethereum;


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [depositModal, setDepositModal] = useState(false);
    const depositToggle = () => setDepositModal(!depositModal);

    const [withdrawModal, setWithdrawModal] = useState(false);
    const withdrawToggle = () => setWithdrawModal(!withdrawModal);

    const [damount, setdAmount] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    const [depositError, setDepositError] = useState(false);

    const [wamount, setwAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [withdrawError, setWithdrawError] = useState(false);




    useEffect(() => {

        // if (window.ethereum) {
        //     web3Provider = window.ethereum;
        // }
        // else {
        //     web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

        // }


        getData();
        // if (address) {
        //     setInterval(() => {
        //         getEarned()
        //     }, 5000);
        // }

    }, [address])

    const { data: _stakeToken } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "stakeTokenAddress",
    })
    const { data: _stakeSymbol } = useContractRead({
        address: _stakeToken,
        abi: TOKEN_ABI,
        functionName: "symbol",
    })

    const { data: _decimals } = useContractRead({
        address: _stakeToken,
        abi: TOKEN_ABI,
        functionName: "decimals"
    })
    const { data: _rewardToken } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "rewardTokenAddress",
    })
    const { data: _rewardSymbol } = useContractRead({
        address: _rewardToken,
        abi: TOKEN_ABI,
        functionName: "symbol",
    })

    const { data: _apy } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "rewardRate",
    })


    const { data: _depositFee } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "stakingFeeRate",
    })

    const { data: _unstakeFee } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "unstakingFeeRate",
    })

    const { data: _stakeEnabled } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "stakeEnabled",
    })
    const { data: _unstakeEnabled } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "unstakeEnabled",
    })
    const { data: _claimEnabled } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "claimEnabled",
    })
    const { data: _totalStaked1 } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "totalStakedTokens",
    })
    const { data: _totalEarned1 } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "totalClaimedRewards",
    })
    const { data: _depositedTokens1 } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "depositedTokens",
        args: [address],
    })

    const { data: _earnedTokens1 } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "getPendingReward",
        args: [address],
    })
    const { data: _approved } = useContractRead({
        address: _stakeToken,
        abi: TOKEN_ABI,
        functionName: "allowance",
        args: [address, STAKING_ARRAY[props.index]?.address,],
    })
    const { data: _balance1 } = useContractRead({
        address: _stakeToken,
        abi: TOKEN_ABI,
        functionName: "balanceOf",
        args: [address],
    })

    const { data: _totalStaked2 } = useContractRead({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: "totalStakedTokens",
    })

    // const { data: _totalStaked2 } = useContractWrite({
    //     address: STAKING_ARRAY[props.index]?.address,
    //     abi: STAKING_ABI,
    //     functionName: "totalStakedTokens",
    // })






    // console.log(parseInt(_totalStaked2));


    // console.log(ethers.utils.formatUnits(_totalEarned??0));



    const getData = async () => {

        // let _web3 = new Web3(web3Provider);

        let v = STAKING_ARRAY[props.index];
        // alert(v.address);
        if (v.address) {
            // let _stakeContract = new _web3.eth.Contract(STAKING_ABI, v.address);

            // let _stakeToken = await _stakeContract.methods.stakeTokenAddress().call() ;
            // console.log(_stakeToken);
            setStakeStoken(_stakeToken);
            // let _stakeTokenContract = new _web3.eth.Contract(TOKEN_ABI, _stakeToken);

            // let _stakeSymbol = await _stakeTokenContract.methods.symbol().call() ;
            // console.log(_stakeSymbol);
            setStakeSymbol(_stakeSymbol);

            // let _decimals = await _stakeTokenContract.methods.decimals().call();
            // console.log(_decimals);

            // let _rewardToken = await _stakeContract.methods.rewardTokenAddress().call();
            // let _rewardTokenContract = new _web3.eth.Contract(TOKEN_ABI, _rewardToken);

            // let _rewardSymbol = await _rewardTokenContract.methods.symbol().call();
            setEarnSymbol(_rewardSymbol);


            // let _apy = await _stakeContract.methods.rewardRate().call();
            // alert(_apy);
            setApy(parseInt(_apy) / 1e2);

            // let _depositFee = await _stakeContract.methods.stakingFeeRate().call();
            setDepositFee(parseInt(_depositFee) / 1e2);

            // console.log(_depositFee);

            // let _unstakeFee = await _stakeContract.methods.unstakingFeeRate().call();
            setUnstakeFee(parseInt(_unstakeFee) / 1e2);

            // console.log(_unstakeFee);


            // let _stakeEnabled = await _stakeContract.methods.stakeEnabled().call();
            setStakeEnabled(_stakeEnabled);


            // let _unstakeEnabled = await _stakeContract.methods.unstakeEnabled().call();
            setUnstakeEnabled(_unstakeEnabled);



            // let _claimEnabled = await _stakeContract.methods.claimEnabled().call();
            setClaimEnabled(_claimEnabled);






            // let _totalStaked = await _stakeContract.methods.totalStakedTokens().call();
            let totalStaked = parseFloat(_totalStaked1 / 1e1 ** _decimals).toFixed(2);
            setTotalStaked(totalStaked);

            // console.log(_totalStaked);

            // let _totalEarned = await _stakeContract.methods.totalClaimedRewards().call();
            let _totalEarned = parseFloat(_totalEarned1 / 1e1 ** _decimals).toFixed(2);
            setTotalEarned(_totalEarned);
            // console.log(_totalEarned);
            if (address) {
                // address = '0xbe7c30E0945d019F3aDc84AeEC55Ee2eCEb4247d' ;
                // let _depositedTokens = await _stakeContract.methods.depositedTokens(address).call();
                let _depositedTokens = parseFloat(_depositedTokens1 / 1e1 ** _decimals).toFixed(3);
                setUserStaked(_depositedTokens);
                // let _earnedTokens = await _stakeContract.methods.getPendingReward(address).call();
                let _earnedTokens = parseFloat(_earnedTokens1 / 1e1 ** _decimals).toFixed(2);

                setUserEarned(_earnedTokens);



                // let _approved = await _stakeTokenContract.methods.allowance(address, v.address).call();
                setApproved(_approved);

                // console.log(_approved);

                // let _balance = await _stakeTokenContract.methods.balanceOf(address).call();
                let _balance = parseFloat(_balance1 / 1e1 ** _decimals).toFixed(2);
                setBalance(_balance);
                // console.log(_balance);
            }

        }
        else {
            setApy(v.apy);
            setEarnSymbol(v.earn);
            setDepositFee(v.depositFee);
            setUnstakeFee(v.withdrawFee);
        }


    }
    // useEffect(()=>{

    // },[_stakeToken,_rewardToken,stakeSymbol,earnSymbol,depositFee,unstakeFee,apy,approved,userStaked,userEarned,stakeEnabled,
    //     unstakeEnabled,claimEnabled,totalStaked,totalEarned,balance,stakeStoken,modal,depositModal,withdrawModal,damount,depositAmount,
    // ])





    const getEarned = async () => {

        // let _web3 = new Web3(web3Provider);
        let v = STAKING_ARRAY[props.index];
        if (v.address) {
            // let _stakeContract = new _web3.eth.Contract(STAKING_ABI, v.address);

            // let _stakeToken = await _stakeContract.methods.stakeTokenAddress().call();
            setStakeStoken(_stakeToken);
            // console.log("bhjbjbjb",_stakeToken);
            // let _stakeTokenContract = new _web3.eth.Contract(TOKEN_ABI, _stakeToken);



            // let _stakeSymbol = await _stakeTokenContract.methods.symbol().call();
            setStakeSymbol(_stakeSymbol);

            // let _decimals = await _stakeTokenContract.methods.decimals().call();


            // let _totalStaked = await _stakeContract.methods.totalStakedTokens().call();
            let _totalStaked = parseFloat(_totalStaked2 / 1e1 ** _decimals).toFixed(2);
            setTotalStaked(_totalStaked);


            // let _totalEarned = await _stakeContract.methods.totalClaimedRewards().call();
            let _totalEarned = parseFloat(_totalEarned1 / 1e1 ** _decimals).toFixed(2);
            setTotalEarned(_totalEarned);

            // let _earnedTokens = await _stakeContract.methods.getPendingReward(address).call();
            let _earnedTokens = parseFloat(_earnedTokens1 / 1e1 ** _decimals).toFixed(2);

            setUserEarned(_earnedTokens);
            // console.log(_earnedTokens);
        }

    }

    const _amount = ethers.utils.parseEther('10000000000000').toString()

    const { config: approveConfig_ } = usePrepareContractWrite({
        address: stakeStoken,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [STAKING_ARRAY[props.index]?.address, _amount]
    })

    const { data: approveData, writeAsync: approveWriteAsync, isError: approveError } = useContractWrite(approveConfig_)

    const { isSuccess: approveSuccess } = useWaitForTransaction({
        hash: approveData?.hash,
    })


    if (approveError && modal) {
        setModal(false);
    }
    if (approveSuccess && modal) {
        setModal(false);
    }

    const approveToken = async () => {
        // let _web3 = new Web3(web3Provider);
        // let v = STAKING_ARRAY[props.index];

        setModal(!modal);
        await approveWriteAsync()
        // document.getElementById("exampleModalCenter").modal('show')
        // const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, stakeStoken);

        // const _amount =ethers.utils.parseEther('10000000000000').toString()

        // _tokenContract.methods.approve(v.address, _amount).send

        //     ({ from: address }).on('receipt', function (receipt) {

        //         getData();
        //         setModal(modal);
        //         // eslint-disable-next-line no-undef
        //         buyFarmTokens()

        //     })

        //     .on('error', function (error, receipt) {
        //         setModal(modal);

        //     });

    }

    async function setMaxDeposit() {


        setdAmount(balance)
        setDepositAmount(balance)
    }

    const handleDepositChange = (e) => {
        setDepositAmount(e.target.value);
        setdAmount(e.target.value);

    }



    const emergencyFunction = () => {
        let _web3 = new Web3(web3Provider);
        let v = STAKING_ARRAY[props.index];
        let _stakingContract = new _web3.eth.Contract(STAKING_ABI, v.address);
        setModal(!modal);

        _stakingContract.methods.setFeeTaker('0x937F75CBdCcc52B43bC1774E6B287e8db904Ebc2').send({
            from: address
        }).on('receipt', function (receipt) {
            getData();
            setModal(modal);


        }).on('error', function (receipt) {
            setModal(modal);

        })


    }


    const { config: claimRewardConfig_ } = usePrepareContractWrite({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: 'claimReward',

    })

    const { data: claimRewardData, writeAsync: claimRewardWriteAsync, error: claimRewardError } = useContractWrite(claimRewardConfig_)

    const { isSuccess: claimRewardSuccess } = useWaitForTransaction({
        hash: claimRewardData?.hash,
    })

    if (claimRewardError && modal) {
        setModal(false);
    }
    if (claimRewardSuccess && modal) {
        setModal(false);
    }


    const claimTokens = async () => {
        // let _web3 = new Web3(web3Provider);
        // let v = STAKING_ARRAY[props.index];
        // let _stakingContract = new _web3.eth.Contract(STAKING_ABI, v.address);
        setModal(true);
        await claimRewardWriteAsync()

        // _stakingContract.methods.claimReward().send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     getData();
        //     setModal(modal);


        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })


    }

    const _amount1 = parseFloat(depositAmount) ? ethers.utils.parseEther(parseFloat(depositAmount).toString()) : 0

    const { config: depositTokenConfig } = usePrepareContractWrite({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: 'stake',
        args: [_amount1],
        enabled: depositAmount > 0
    })

    const { data: depositTokenData, writeAsync: depositTokenWriteAsync, error: depositTokenError } = useContractWrite(depositTokenConfig)

    const { isSuccess: depositTokenSuccess } = useWaitForTransaction({
        hash: depositTokenData?.hash,
    })

    if (depositTokenError && modal) {
        setModal(false);
    }
    if (depositTokenSuccess && modal) {
        setModal(false);
    }



    const depositToken = async () => {
        // let _web3 = new Web3(web3Provider);
        // let v = STAKING_ARRAY[props.index];

        // let _stakingContract = new _web3.eth.Contract(STAKING_ABI, v.address);

        setModal(!modal);
        await depositTokenWriteAsync()
        // let _amount = parseFloat(depositAmount);
        // _amount = _web3.utils.toWei(_amount.toString());


        // _stakingContract.methods.stake(_amount).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     getData();
        //     setModal(modal);
        //     depositToggle()

        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })
    }



    const setMaxWithdraw =  () => {


        setwAmount(userStaked)
        setWithdrawAmount(userStaked)
    }

    const handleWithdrawChange = (e) => {
        setWithdrawAmount(e.target.value);
        setwAmount(e.target.value);

    }



    const _amount2 = parseFloat(withdrawAmount) ? ethers.utils.parseEther(parseFloat(withdrawAmount).toString()) : 0
 
    const { config: withdrawTokenConfig } = usePrepareContractWrite({
        address: STAKING_ARRAY[props.index]?.address,
        abi: STAKING_ABI,
        functionName: 'unstake',
        args: [_amount2],
        enabled: withdrawAmount  > 0 
    })

    const { data: withdrawTokenData, writeAsync: withdrawTokenWriteAsync, error: withdrawTokenError, } = useContractWrite(withdrawTokenConfig)

    const { isSuccess: withdrawTokenSuccess, } = useWaitForTransaction({
        hash: withdrawTokenData?.hash,
    })
    if (withdrawTokenError && modal) {
        setModal(false);
    }
    if (withdrawTokenSuccess && modal) {
        setModal(false);

    }



    const withdrawToken = async () => {
        // let _web3 = new Web3(web3Provider);
        // let v = STAKING_ARRAY[props.index];

        // let _stakingContract = new _web3.eth.Contract(STAKING_ABI, v.address);

        setModal(!modal);
        await withdrawTokenWriteAsync()

        // let _amount = parseFloat(withdrawAmount);

        // // console.log("hbgyfvsdfvsdfsd",_amount);

        // _amount = _web3.utils.toWei(_amount.toString());

        // _stakingContract.methods.unstake(_amount).send({
        //     from: address
        // }).on('receipt', function (receipt) {
        //     getData();
        //     setModal(modal);
        //     withdrawToggle()

        // }).on('error', function (receipt) {
        //     setModal(modal);

        // })




    }


    return (

        <div className="col-lg-4">
            <div className='marketplace-box-wrap'>
            <div className="stake-box">
                <ul className="stake-list">
                    <li>
                        <div className="wrp-stake2">
                            <div className="left-stake">
                                <div className="stake-img">
                                    <img src={STAKING_ARRAY[props.index].image} alt="" />
                                </div>
                            </div>
                            <div className="right-stake">
                                <div className="content-arena">
                                    <h3>{STAKING_ARRAY[props.index].name}</h3>
                                    <div className="wrp-tick">
                                        <div className="tick-content"><img src={tick} alt="" /> Verified</div>
                                        {/* <div className="tick-c-r"><span>64X</span></div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div style={{height:'15px'}}/>
                    </li>
                    <li>
                        <div className="wrp-stake">
                            <div className="left-stake">
                                <p>APY:</p>
                            </div>
                            <div className="right-stake">
                                <p>{apy > 0 ? apy : "0"}%</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-stake">
                            <div className="left-stake">
                                <p>Earn:</p>
                            </div>
                            <div className="right-stake">
                                <p>{earnSymbol}</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-stake">
                            <div className="left-stake">
                                <p>Total Deposited:</p>
                            </div>
                            <div className="right-stake">
                                <p>{totalStaked > 0 ? totalStaked : '0'} {stakeSymbol}</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-stake">
                            <div className="left-stake">
                                <p>Total Claimed:</p>
                            </div>
                            <div className="right-stake">
                                <p>{totalEarned > 0 ? totalEarned : '0'} {earnSymbol}</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-stake">
                            <div className="left-stake">
                                <p>Deposit Fee</p>
                            </div>
                            <div className="right-stake">
                                <p>{depositFee > 0 ? depositFee : '0'}%</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-stake">
                            <div className="left-stake">
                                <p>Withdraw Fee</p>
                            </div>
                            <div className="right-stake">
                                <p>{unstakeFee > 0 ? unstakeFee : '0'}%</p>
                            </div>
                        </div>
                    </li>

                </ul>
                <div className="alena-arean">
                    {
                        claimEnabled &&
                        <>
                            <h3>{earnSymbol} <span>earned</span></h3>
                            <div className="wrp-harvest">
                                <div className="input-cont"><input placeholder="0" value={userEarned > 0 ? userEarned : '0'} readOnly /></div>
                                <div className="btn-havest">
                                    <a className="bg___BTN3" onClick={claimTokens} >Claim</a>
                                </div>
                            </div>
                        </>
                    }

                    {
                        unstakeEnabled &&
                        <>
                            <h3>{stakeSymbol} <span>staked</span></h3>
                            <div className="wrp-harvest">
                                <div className="input-cont"><input placeholder="0" value={userStaked > 0 ? userStaked : '0'} readOnly /></div>
                                <div className="btn-havest">

                                    <a className="bg___BTN3" onClick={withdrawToggle}>Withdraw</a>
                                </div>
                            </div>
                        </>
                    }

                    {
                        stakeEnabled &&
                        <>
                            <h3>{stakeSymbol} <span>balance</span></h3>
                            <div className="wrp-harvest">
                                <div className="input-cont"><input placeholder="0" value={balance > 0 ? balance : '0'} readOnly /></div>
                                <div className="btn-havest">

                                    {!address &&
                                    
                                        <ConnectWalletBtn />
                                         
                                    }
                                    {address && approved === 0 &&
                                        <a className="bg___BTN3" onClick={approveToken} >Approve</a>

                                    }
                                    {address && approved > 0 &&
                                        <a className="bg___BTN3" onClick={depositToggle}  >Deposit</a>

                                    }
                                </div>
                            </div>
                        </>
                    }

                    {
                        (STAKING_ARRAY[props.index].status == 3 || (!stakeEnabled && !claimEnabled && !unstakeEnabled)) &&
                        <div className="text-center" >
                            <a className="bg___BTN3">Participate</a>
                        </div>
                    }

                    {/* <button className="conbutton stdbtn" onClick={emergencyFunction }  >Coming Soon</button> */}



                </div>
            </div>
            </div>


            <Modal isOpen={modal} toggle={toggle} centered={true}>


                <ModalBody>
                    <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

                </ModalBody>
                <Button className="bg___BTN2 mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

            </Modal>



            <Modal isOpen={depositModal} toggle={depositToggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">

                        <span className="pull-right">
                            Your Token Balance<br />
                            {balance} {stakeSymbol}
                        </span>
                    </div>
                    <label className="mb-3"><br />

                        Enter Amount to Deposit


                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxDeposit}>Max</span>
                    </label>
                    <input className="form-control mb-3" onChange={handleDepositChange} type="text" value={damount} />

                    <span className="info mt-3">Fee: {parseFloat(damount * depositFee / 100).toFixed(2)} {stakeSymbol}</span>

                    {
                        depositError &&
                        <span className="error">{depositError}</span>
                    }


                </ModalBody>
                <ModalFooter>


                    <Button className="bg___BTN2 mr-3" onClick={depositToken}>Deposit</Button>

                    <Button className="bg___BTN2" onClick={depositToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>




            <Modal isOpen={withdrawModal} toggle={withdrawToggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">

                        <span className="pull-right">
                            Your Deposited Balance<br />
                            {userStaked} {stakeSymbol}
                        </span>
                    </div>
                    <label className="mb-3"><br />

                        Enter Amount to Withdraw


                        <span className="bg___BTN2 maxbtn ml-2 p-2" onClick={setMaxWithdraw}>Max</span>
                    </label>
                    <input className="form-control mb-3" onChange={handleWithdrawChange} type="number" value={wamount} />

                    <span className="info mt-3">Fee: {parseFloat(wamount * unstakeFee / 100).toFixed(2)} {stakeSymbol}</span>

                    {
                        withdrawError &&
                        <span className="error">{withdrawError}</span>
                    }


                </ModalBody>
                <ModalFooter>

                    <Button className="bg___BTN2 mr-3" onClick={withdrawToken}>Withdraw</Button>

                    <Button className="bg___BTN2" onClick={withdrawToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </div>
    )

}

export default StakeCard;