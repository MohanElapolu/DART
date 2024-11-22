const HDWalletProvider  = require('@truffle/hdwallet-provider');
const keccak256 = require('keccak256');
const ganache    = require('ganache-cli');
const { Web3 }   = require('web3');
const {abi, evm} = require('./compile');


const web3  = new Web3('http://127.0.0.1:7545');

const contract_address = "0x7A497A42c147CE37F1b34658a720f5c7bBD66300";

const ReqData    = new web3.eth.Contract(abi, contract_address);

//const accounts = 

//console.log(jsonData);
const view_contracts =  async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    
    const accounts2 = await ReqData.methods.getshcheckers().call( {from: accounts[0]} );
        
    console.log("List of accounts: ", accounts2);
};

view_contracts();