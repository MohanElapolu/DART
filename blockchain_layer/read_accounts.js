const HDWalletProvider  = require('@truffle/hdwallet-provider');
const keccak256 = require('keccak256');
const ganache    = require('ganache-cli');
const { Web3 }   = require('web3');
const {abi, evm} = require('./compilenet');


const web3  = new Web3('http://127.0.0.1:7545');

const contract_address = "0x1041a17dCB8B62cBceF257d3Cc2d06781dB6690D";

const NetPar    = new web3.eth.Contract(abi, contract_address);

//const accounts = 

//console.log(jsonData);
const view_contracts =  async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    
    const accounts2 = await NetPar.methods.view_par_list().call( {from: accounts[0]} );
        
    console.log("List of accounts: ", accounts2);
};

view_contracts();