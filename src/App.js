import "./App.css";
import Home from "./Pages/Home/Home";
import { useState, useEffect } from "react";
import StakingDapp from "./Pages/StakingDapp/StakingDapp";
import Claim from "./Pages/Claim/Claim";

// img
import img_01 from "./assets/images/img-1.png";

//blockchain
import Web3 from "web3";
import axios from "axios";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

import RunningMan from "./abi/Collection.sol/RunningMan.json";
import RewardToken from "./abi/RewardToken.sol/Reward.json";
import StakeContract from "./abi/Stake.sol/NFTStaking.json";

//wallet
const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "b96f71ee9b5b4ffca551daff9cb658a3",
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "NFT-staking",
      infuraId: "b96f71ee9b5b4ffca551daff9cb658a3",
      rpc: "",
      chainId: 4,
      appLogoUrl: null,
      darkMode: true,
    },
  },
};

//contract config
const tokenAbi = RewardToken.abi;
const collectionAbi = RunningMan.abi;
const stakingAbi = StakeContract.abi;
const stakingContractad = "0x017ad80f2F4B0CA1D83f143D9a4e80a0AA0aE6aD";
const collectionContractad = "0xA21F7a2b092fe1f31Dcd9224fb1EFaD18736d834";
const rewardTokenContractad = "0x6F2F99f3C2C02AB774f3C2e7B3745C31e19Bd42C";

const openseaapi = "https://testnets-api.opensea.io/api/v1/assets";
const etherScanApiKey = "UTGVN4WFF74Q2RWW1SF4MQV87HQD9Q6QZH";
const endpoint = "https://api-rinkeby.etherscan.io/api";

const web3Modal = new Web3Modal({
  network: "rinkeby",
  theme: "dark",
  cacheProvider: true,
  providerOptions,
});

export const Routes = {
  HOME: "HOME",
  STAKE: "STAKE",
  UNSTAKE: "UNSTAKE",
  CLAIM: "CLAIM",
};

function App() {
  const [route, setRoute] = useState(Routes.HOME);

  const [claimValue, setClaimValue] = useState(10000);
  const [stakeId, setStakeId] = useState(null);
  const [unstakeId, setUnstakeId] = useState(null);
  const [stakes, setStake] = useState([
    // { image: img_01, id: "3" },
  ]);
  const [unstakes, setUnstake] = useState([]);

  //blockchain

  const [account, setAccount] = useState("");
  const [tokenContract, setTokenContract] = useState(null);
  const [collectionContract, setcollectionContract] = useState(null);
  const [stakingContract, setstakingContract] = useState(null);
  const [earnings, setEarnings] = useState(0);
  const [balance, setBalance] = useState(0);
  const [nftData, setNftData] = useState([]);
  const [state, setState] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [nftAssets, setNftAssets] = useState([]);
  const [stakedIds, setStakedTokenIds] = useState([]);
  const [stakedNftsData, setStakedNftsData] = useState([]);

  async function connectwallet() {
    var provider = await web3Modal.connect();
    var web3 = new Web3(provider);
    await provider.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const tokenContract = new web3.eth.Contract(
      tokenAbi,
      rewardTokenContractad
    );
    const collectionContract = new web3.eth.Contract(
      collectionAbi,
      collectionContractad
    );
    const stakingContract = new web3.eth.Contract(
      stakingAbi,
      stakingContractad
    );
    setTokenContract(tokenContract);
    setcollectionContract(collectionContract);
    setstakingContract(stakingContract);
    // await getTotalSupply();
    const totalSup = Number(
      await collectionContract.methods.totalSupply().call()
    );
  }

  async function setApprove() {
    account && collectionContract.methods.setApprovalForAll(account, true);
  }
  async function stake() {
    await setApprove();
    stakingContract.methods.stake([stakeId]).send({ from: account });
  }

  async function unstake() {
    stakingContract.methods.unstake([unstakeId]).send({ from: account });
  }

  async function getStakedNfts() {
    const stakedTokenIds = await stakingContract.methods
      .tokensOfOwner(account)
      .call();
    console.log("stakedTokenIds==>", stakedTokenIds);
    setStakedTokenIds(stakedTokenIds);
  }
  const onClcikClaim = () => {
    console.log("on click claim");
  };
  async function claim() {
    stakingContract.methods.claim(stakedIds).send({ from: account });
  }
  async function verify() {
    var getbalance = Number(
      await stakingContract.methods.balanceOf(account).call()
    );
    setBalance(getbalance);
  }

  const getassets = async () => {
    await axios
      .get(
        openseaapi +
          `?asset_contract_addresses=${collectionContractad}&format=json&order_direction=asc&offset=0&limit=20`
      )
      .then((outputb) => {
        setNftData(outputb.data);
        console.log("nft data======>", outputb.data);
      });
  };
  useEffect(() => {
    getassets();
    stakingContract && getStakedNfts();
  }, [account]);

  useEffect(() => {
    if (nftData) {
      setStake(
        nftData.assets?.filter(
          (el) => el.owner.address === account.toLowerCase()
        )
      );
    }
  }, [nftData]);

  console.log("nft data for stake section===>", stakes);

  useEffect(() => {
    if (stakedIds && stakes) {
      stakedIds.forEach((element) => {
        collectionContract &&
          axios
            .get(
              // `https://bafybeihkjkso5uohmem7ndin33vjhlc7qve33lehqeuerfkpidqwmlb3aa.ipfs.dweb.link/${element}.json`
              `https://opensea.mypinata.cloud/ipfs/QmR11V6A393w3srLCcF7qFgFphtymgBFuT73NMgjTWRPPM/${element}.json`
            )
            .then((response) => {
              console.log("response,,,,===>", response);
              setUnstake((pre) => {
                return [...pre, response.data];
              });
            });
      });
    }
  }, [stakedIds, account]);

  console.log("staked nfts data for unstake section===>", unstakes); //stakedNftsData

  // useEffect(() => {
  //   account && stakingContract && earningInfo();
  // }, [account]);

  return (
    <div className="App">
      {route === Routes.HOME ? (
        <Home
          setRoute={setRoute}
          route={route}
          connectwallet={connectwallet}
          account={account}
        />
      ) : route === Routes.STAKE && account ? (
        <StakingDapp
          //   getNftIdHandler={getNftIdHandler}
          setRoute={setRoute}
          route={route}
          selectedId={stakeId}
          setSelectedId={setStakeId}
          onClickCardBtn={stake}
          data={stakes}
        />
      ) : route === Routes.UNSTAKE && account ? (
        <StakingDapp
          //  unStakeIdHandler={unStakeIdHandler}
          setRoute={setRoute}
          route={route}
          selectedId={unstakeId}
          setSelectedId={setUnstakeId}
          data={unstakes}
          onClickCardBtn={unstake}
        />
      ) : route === Routes.CLAIM && account ? (
        <Claim
          setRoute={setRoute}
          route={route}
          onClcikClaim={onClcikClaim}
          claimValue={claimValue}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
