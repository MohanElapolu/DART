const HDWalletProvider  = require('@truffle/hdwallet-provider');
const keccak256 = require('keccak256');
const ganache    = require('ganache-cli');
const  Web3    = require('web3');
const {abi, evm} = require('./compile');
const XLSX = require('xlsx');

const web3  = new Web3('http://127.0.0.1:7545');
//const web3  = new Web3('https://bonds-tex-representing-cord.trycloudflare.com');

const contract_address = "0x7A497A42c147CE37F1b34658a720f5c7bBD66300";

const ReqData    = new web3.eth.Contract(abi, contract_address);

const con_art_address = "0x43a1FA59BaD17d9Fdd4ff9eeD9a792B8de3e50EB";
const con_obj_address = "0x1955a9908aebf9343d1d580ff9b75a6825a4e60f";
const con_net_address = "0x1041a17dCB8B62cBceF257d3Cc2d06781dB6690D";

//console.log(jsonData);
const add_contracts =  async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await ReqData.methods.set_art_con_address(con_art_address
    ).send( {from: accounts[0], gas: 1000000, gasLimit: 1000000 } );
      console.log("Hello I am transaction hash for artifact contract address", result.transactionHash);

    const result1 = await ReqData.methods.set_obj_con_address(con_obj_address
      ).send( {from: accounts[0], gas: 1000000, gasLimit: 1000000 } );
      console.log("Hello I am transaction hash for object contract address", result1.transactionHash);

    const result2 = await ReqData.methods.set_par_con_address(con_net_address
      ).send( {from: accounts[0], gas: 1000000, gasLimit: 1000000 } );
      console.log("Hello I am transaction hash for network participant contract address", result2.transactionHash);
};

add_contracts();