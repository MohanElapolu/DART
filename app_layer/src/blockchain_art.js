import web3 from './web3';
//var Contract = require('web3-eth-contract');

const address =  '0x43a1FA59BaD17d9Fdd4ff9eeD9a792B8de3e50EB';

const abi  =   [{"inputs":[],"stateMutability":"payable","type":"constructor"},{"inputs":[{"internalType":"string","name":"art_add","type":"string"}],"name":"Add_Art","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string[]","name":"art_par","type":"string[]"}],"name":"Check_Art","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"art_list","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalanceSmartContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"view_art_list","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"}];

//Contract.setProvider('ws://localhost:8546');
//var blockchain = new eth.Contract(abi, address);
var blockchain_art = new web3.eth.Contract(abi, address);
export default blockchain_art;
//export default blockchain;