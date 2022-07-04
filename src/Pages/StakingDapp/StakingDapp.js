import React, { useEffect, useState } from "react";
import CardComponent from "../../components/Card/CardComponent";
import Header from "../../components/Header/Header";
import "./StakingDapp.css";

const StakingDapp = ({
  setRoute,
  route,
  selectedId,
  setSelectedId,
  data,
  onClickCardBtn,
}) => {
  const [cards, setCards] = useState([{ image: "", id: "0" }]);

  useEffect(() => {
    setCards(data);
  }, [data]);

  console.log("dataaaaaaaaaaaaaaaaaa=====>", data);

  return (
    <div className="container">
      <div className="header--wrap">
        <Header setRoute={setRoute} route={route} />
      </div>
      <div className="grid-container">
        {data.map((card, i) => {
          console.log(card);
          return (
            <div className="grid-item" key={i}>
              <CardComponent
                image={`https://bafybeigrpdmlzlzy7etwkjxkq5wvbpuhmlk4aoszt57s3vvtanvyc2avwm.ipfs.dweb.link/${card.token_id ?card.token_id : card.edition}.png`}
                id={card.edition}
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
