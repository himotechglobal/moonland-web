import React from 'react';
import Header from '../../pages/header.js';
import cb1 from '../../images/cb1.png';
import cb2 from '../../images/cb2.png';
import cb3 from '../../images/cb3.png';
import cb4 from '../../images/cb4.png';
import cb5 from '../../images/cb5.png';
import cb6 from '../../images/cb6.png';
import cb7 from '../../images/cb7.png';
import arrow from '../../images/round_arrow.svg';
import MarketplaceCard from './marketplaceCard.js';
import { Link } from 'react-router-dom';
const ELEMENTS = [
    {
        'slug': 'solar',
        'name': 'SOLAR CELL',
        'price': '10',
        'image': cb1,
        'address': '0x57f450240b7a9eAEDfb6FE8DfA83087b4f312109'
    },
    {
        'slug': 'solarCell',
        'name': 'SOLAR CELL',
        'price': '0.12',
        'image': cb5,
        'address': '0xD5DF9651c2731dA0d47978A79f4F6594034038eC'
    },
    {
        'slug': 'fluid',
        'name': 'FLUID',
        'price': '1',
        'image': cb2,
        'address': '0xb4e0f6aEfb68449917879068E9C32703268F9C89'
    },
    {
        'slug': 'thermix',
        'name': 'THERMIX',
        'price': '100',
        'image': cb3,
        'address': '0x12F32f5FC8C87b053DfBc8F56C159094B42730d1'
    },
    {
        'slug': 'metlux',
        'name': 'METLUX',
        'price': '100',
        'image': cb4,
        'address': '0x8D1502d8Acc70b861F58186270Bc81F671e0B2d8'
    },
    {
        'slug': 'eule',
        'name': 'EULE',
        'price': '10',
        'image': cb6,
        'address': '0xd63E96e180661e094383e66AA838863A87FDeB9F'
    },
    {
        'slug': 'positron',
        'name': 'POSITRON',
        'price': '5',
        'image': cb7,
        'address': '0x19Aca1DB633622ADA2cc722991db21989f6F4F9B'
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
                    <Link to='/choosemarketplace'><img src={arrow} alt='arrow image here' /></Link>
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