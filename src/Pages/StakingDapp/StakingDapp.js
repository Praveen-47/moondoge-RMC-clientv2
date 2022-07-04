import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/Card/CardComponent';
import Header from '../../components/Header/Header';
import './StakingDapp.css';


const StakingDapp = ({ setRoute, route, selectedId, setSelectedId, data, onClickCardBtn }) => {

    const [cards,setCards] = useState([
        {image:'', id:'0'},  
    ]);

    useEffect(() => {
        setCards(data);
    },[data]);

    return (
        <div className='container' >
            <div className='header--wrap' > 
                <Header 
                    setRoute={setRoute}
                    route={route}
                />
            </div>
            <div className='grid-container' >
                { cards.map((card,i) => { 
                    return(
                        <div className='grid-item' key={i} >
                            <CardComponent 
                                image={card.image} 
                                id={card.id} 
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                onClickCardBtn={onClickCardBtn}
                                route={route}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StakingDapp;