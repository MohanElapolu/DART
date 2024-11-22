import { Web3 } from "web3";
//import { EthProvider } from "./contexts/EthContext";
//import EthContext from "./EthContext";

//const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

await window.ethereum.request({ method: "eth_requestAccounts" });
 
//console.log(accounts_check[0])
const web3 = new Web3(window.ethereum);
//web3(window.ethereum);
//const web3  = new Web3('http://127.0.0.1:7545');

//await window.ethereum.enable();
//web3.setProvider('http://localhost:7545');

export default web3;
