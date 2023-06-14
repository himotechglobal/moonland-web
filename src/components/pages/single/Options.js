import React from 'react'
import { useContractRead } from 'wagmi'
import {NFT_MARKETPLACE} from "../../../Config"
import NFT_MARKETPLACE_ABI from "../../../Config/NFT_MARKETPLACE_ABI.json"


const Options = ({tokenIndex}) => {


    const { data: approvedToken } = useContractRead({
        address: NFT_MARKETPLACE,
        abi: NFT_MARKETPLACE_ABI,
        functionName: 'getApprovedToken',
        args:[tokenIndex],
        watch: true,
    })
// console.log(approvedToken);

  return (

        <option style={{background:"#ae00c5"}} value={approvedToken?.[2]} >{approvedToken?.[0]} (Fee: {parseFloat(approvedToken?.[1] / 100)}%)</option> 
   

  )
}

export default Options
