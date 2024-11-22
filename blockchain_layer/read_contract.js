const HDWalletProvider  = require('@truffle/hdwallet-provider');
const ganache    = require('ganache-cli');
const  Web3    = require('web3');
const {abi, evm} = require('./compile');
const abiDecoder = require('abi-decoder');

const web3  = new Web3('http://127.0.0.1:7545');
//const web3  = new Web3('https://bonds-tex-representing-cord.trycloudflare.com');

//const contract_address = "0x7A497A42c147CE37F1b34658a720f5c7bBD66300";
//const contract_address = "0x1041a17dCB8B62cBceF257d3Cc2d06781dB6690D";

//const ReqData    = new web3.eth.Contract(abi, contract_address);


//abiDecoder.addABI(abi);
console.log(JSON.stringify(abi));
//console.log(evm["bytecode"].object);