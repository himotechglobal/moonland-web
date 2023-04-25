import React from 'react';
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import cb1 from '../../images/cb1.png';
import cb2 from '../../images/cb2.png';
import cb3 from '../../images/cb3.png';
import cb4 from '../../images/cb4.png';
import cb5 from '../../images/cb5.png';
import cb6 from '../../images/cb6.png';
import cb7 from '../../images/cb7.png';
import arrow from '../../images/round_arrow.svg';
import MarketplaceCard from './marketplaceCard.js';
const ELEMENTS = [
    {
        'slug': 'chicken',
        'name': 'CHICKEN',
        'price': '10',
        'image': cb1,
        'address': '0x0a92bc06443E7D4cd38735ED01B5C5C3C74F6773'
    },
    {
        'slug': 'chickenegg',
        'name': 'CHICKEN EGG',
        'price': '0.12',
        'image': cb5,
        'address': '0x78AC3A5bC58455B41601189FDCF028F63e8c9ced'
    },
    {
        'slug': 'chickenfood',
        'name': 'CHICKEN FOOD',
        'price': '1',
        'image': cb2,
        'address': '0x50C0268e1D368420Ce99766BF89AbecEfCFC7644'
    },
    {
        'slug': 'boar',
        'name': 'BOAR',
        'price': '100',
        'image': cb3,
        'address': '0x486bfd5AE6bf094E403bCF8dae14b708b15B143E'
    },
    {
        'slug': 'sow',
        'name': 'SOW',
        'price': '100',
        'image': cb4,
        'address': '0x26B00Fb006Cb64c1f5D4ed407c6aBdF902F1c595'
    },
    {
        'slug': 'piglet',
        'name': 'PIGLET',
        'price': '10',
        'image': cb6,
        'address': '0x7f7936Bf782F327bF549809bC6469dbE52280867'
    },
    {
        'slug': 'pigfood',
        'name': 'PIG FOOD',
        'price': '5',
        'image': cb7,
        'address': '0xea049FB6D789deEb85630c16576cC0CEB75555F7'
    }
];
const marketplace2 = () => {

    return (
        <>
            <Header />
            <div className="bgmarketplace">

                <section id="marketplace-sec2">

                    <div className="container">
                        <div className='moon___mark'>
                            <h1>MOON MARKETPLACE</h1>
                        </div>
                        <div className="row">

                            {
                                ELEMENTS.map((value, index) => {
                                    return <MarketplaceCard index={index} slug={value.slug} />
                                })
                            }
                        </div>
                    </div>
                </section>
                <div className='bottom-arrow'>
                    <img src={arrow} alt='arrow image here' />
                </div>
            </div>

            {/* <div className="stokes">
                        <img src={stoke} alt=''/>
                    </div> */}
            {/* <Footer/> */}
        </>
    );
}
export default marketplace2;