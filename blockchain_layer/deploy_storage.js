const HDWalletProvider  = require('@truffle/hdwallet-provider');
//const ganache    = require('ganache-cli');
const  Web3    = require('web3');
const {abi, evm} = require('./compilestorage');

const web3  = new Web3('http://127.0.0.1:8545');
//const web3  = new Web3('https://34f5-2600-1004-a031-7c0d-bc29-6ecf-f4d8-2f3b.ngrok-free.app');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    //valueTosend = web3.utils.toWei('1', 'ether');
    //console.log('Attempting to deploy from account', accounts[0]);
    //console.log(abi)
    const result = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, gas: 500000, estimateGas: 500000})
    .send({ from: accounts[0], gas: 500000});

    console.log("Contract deployed to", result.options.address);
    //console.log("Contract deployed to", result);
};

deploy();