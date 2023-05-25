import React from 'react';
import Header from '../../pages/header.js';
import StakeCard from './StakeCard.js';

import arrow from '../../images/round_arrow.svg';
import { Link } from 'react-router-dom';

const stake = () => {
 
	const numbers = [0,1,2] ;
  
		return(
			<div>
             <Header />
                <div className="bgmarketplace_staking">
                    <section id="stake-sec">
                        <div className="container">
                        <div className='moon___mark'>
                            <h1>STAKING</h1>
                        </div>
                            <div className="row">
                            {numbers?.map((number) =>        
                                    <StakeCard index={number} />

                                 )}
                                 
                            </div>
                            <div className='btm___arrow2'>
                    <Link onClick={()=>window.history.back()}><img src={arrow} alt='arrow image here' /></Link>
                </div>
                        </div>
                    </section>
                </div>
                    {/* <div className="stokes">
                        <img src={stoke} alt=""/>
                    </div> */}
                {/* <Footer/> */}
            </div>
		);
 

}
export default stake;