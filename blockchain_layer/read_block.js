const HDWalletProvider  = require('@truffle/hdwallet-provider');
const ganache    = require('ganache-cli');
const  Web3    = require('web3');
const {abi, evm} = require('./compile');
const abiDecoder = require('abi-decoder');

const web3  = new Web3('http://127.0.0.1:7545');
//const web3  = new Web3('https://34f5-2600-1004-a031-7c0d-bc29-6ecf-f4d8-2f3b.ngrok-free.app');

const contract_address = "0x7A497A42c147CE37F1b34658a720f5c7bBD66300";

const ReqChain    = new web3.eth.Contract(abi, contract_address);

abiDecoder.addABI(abi);

let transactions;
let transaction1;

block = web3.eth.getBlock(11, true).then(block => {
    console.log("Here is the block status", block);
    transaction_value_inputhex = block.transactions[0].input;
    const decodedInput = abiDecoder.decodeMethod(transaction_value_inputhex);
    console.log("Here is the human readable transaction data", decodedInput);
    //console.log(JSON.stringify(abi));
}).catch(error => {
    console.error(error);
});