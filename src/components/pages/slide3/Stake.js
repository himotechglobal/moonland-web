import React from 'react';
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import StakeCard from './StakeCard.js';



const stake = () => {
 
	const numbers = [0,1,2] ;
  
		return(
			<div>
             <Header />
                <div className="bgmarketplace">
                    <section id="stake-sec">
                        <div className="container">
                            <div className="row">
                            {numbers.map((number) =>        
                                    <StakeCard index={number} />

                                 )}
                                 
                            </div>
                        </div>
                    </section>
                </div>
                    <div className="stokes">
                        <img src={stoke} alt=""/>
                    </div>
                <Footer/>
            </div>
		);
 

}
export default stake;