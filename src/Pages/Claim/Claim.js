import React from 'react';
import Header from '../../components/Header/Header';
import './Claim.css';

const Claim = ({ setRoute, route, claimValue, onClcikClaim }) => {
    return (
        <div className='claim-container' >
            <div className='header--wrap' > 
                <Header 
                    setRoute={setRoute}
                    route={route}
                />
            </div>
            <div className='body-container' >
            
                <div className='body-wrapper' >
                    <div className='value-container' >
                        <div className='number-wrapper' >
                            {claimValue}
                        </div>
                        <div className='rnm-wrapper' >
                            RNM
                        </div>
                    </div>
                    <div className='btn-wrapper' >
                        <button className='claim--btn' onClick={onClcikClaim} >
                            CLAIM
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Claim;