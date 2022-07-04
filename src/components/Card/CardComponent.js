import React from "react";
import "./Card.css";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Routes } from "../../App";

const CardComponent = ({
  image,
  id,
  selectedId,
  setSelectedId,
  onClickCardBtn,
  route,
}) => {
  const onClickCard = () => {
    setSelectedId(id);
  };

  return (
    <div className="card-wrapper" onClick={onClickCard}>
      {/* <div className='img' /> */}
      <div className="card-body">
        <img
          src={`https://bafybeigrpdmlzlzy7etwkjxkq5wvbpuhmlk4aoszt57s3vvtanvyc2avwm.ipfs.dweb.link/${1}.png`}
          alt="img"
          className="image"
        />
        <>
          {selectedId ? (
            selectedId === id ? (
              <div className="card-btn-wrapper">
                <button onClick={onClickCardBtn} className="card-btn btn">
                  {route === Routes.STAKE ? `STAKE` : `UNSTAKE`}
                </button>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </>
      </div>

      {selectedId ? (
        selectedId === id ? (
          <div className="select-container">
            <span className="selected-icon-container">
              <IoCheckmarkCircle className="selected-icon" />
            </span>
            <span className="selected-hover">{`Selected: ${selectedId}`}</span>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardComponent;
