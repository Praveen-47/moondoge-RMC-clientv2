import React from 'react';
import { Routes } from '../../App';
import './Header.css';

const Header = ({ setRoute, route }) => {

    const onClickStakeButton = () => {
        setRoute(Routes.STAKE);
    };

    const onClickUnStakeButton = () => {
        setRoute(Routes.UNSTAKE);
    };

    const onClcikClaimButton = () => {
        setRoute(Routes.CLAIM);
    };

    return (
        <div className='header-wrapper' >
            <div className='btn-wrapper' >
                <div className='stacke-btn-wrapper' >
                    <button className='stacke-btn btn' onClick={onClickStakeButton} >
                        STAKE
                    </button>
                </div>
                <div className='unstacke-btn-wrapper' >
                    <button className='unstacke-btn btn' onClick={onClickUnStakeButton} >
                        UNSTAKE
                    </button>
                </div>
            </div>
            <div className='claim-btn-wrapper' >
                <button className='claim-btn btn' onClick={onClcikClaimButton} >
                    CLAIM
                </button>
            </div>
        </div>
    );
};

export default Header;