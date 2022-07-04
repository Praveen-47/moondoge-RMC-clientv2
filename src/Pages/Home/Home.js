import React from "react";
import "./Home.css";
import img_01 from "../../assets/images/img-1.png";
import { Routes } from "../../App";

const Home = ({ setRoute, route, connectwallet, account }) => {
  const onClickConnect = () => {
    connectwallet();
    setRoute(Routes.STAKE);
  };

  return (
    <div className="home-background">
      <div className="topic-and-btn-wrapper">
        <div className="title-wrapper">
          <div className="title-1">Stack NFTs,</div>
          <div className="title-2">Earn $RNM</div>
        </div>
        <div className="connect-btn-wrapper">
          <button className="connect-btn" onClick={onClickConnect}>
            {account ? "" : "CONNECT"}
          </button>
        </div>
      </div>
      <div className="body--container">
        <div className="body-text-wrapper">
          <p className="para-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="para-2">
            <div>Why do we use it?</div>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </div>
        </div>
        <div className="image-wrapper">
          {/* <div className='img' /> */}
          <img src={img_01} alt="img" className="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
