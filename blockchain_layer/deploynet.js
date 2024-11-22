const HDWalletProvider  = require('@truffle/hdwallet-provider');
const ganache    = require('ganache-cli');
const  Web3    = require('web3');
const {abi, evm} = require('./compilenet');

const web3  = new Web3('http://127.0.0.1:7545');
//const web3  = new Web3('https://bonds-tex-representing-cord.trycloudflare.com');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    //console.log(abi)
    const result = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object})
    .send({ from: accounts[0], gas: 500000000, value: '1000000000000' });

    console.log("Contract deployed to", result.options.address);
    //console.log("Contract deployed to", result);
};

deploy();