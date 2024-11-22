const HDWalletProvider  = require('@truffle/hdwallet-provider');
const keccak256 = require('keccak256');
const ganache    = require('ganache-cli');
const  Web3    = require('web3');
const {abi, evm} = require('./compilenet');


const web3  = new Web3('http://127.0.0.1:7545');
//const web3  = new Web3('https://bonds-tex-representing-cord.trycloudflare.com');

const contract_address = "0x1041a17dCB8B62cBceF257d3Cc2d06781dB6690D";

const NetPar    = new web3.eth.Contract(abi, contract_address);

//const accounts = 

//console.log(jsonData);
const add_contracts =  async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    for (i = 1; i < 4; i++) {
        const result = await NetPar.methods.Add_Par(accounts[i]
            ).send( {from: accounts[0], gas: 2000000, gasLimit: 5000000 } );
            
        console.log("Hello I am transaction hash: ", result.transactionHash);
        console.log("I added account: ", accounts[i]);
    }
};

add_contracts();