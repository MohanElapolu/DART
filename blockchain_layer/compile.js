//Built in modules come with the system
///Required module to generate the path
const path = require('path');
///Required module to read content of the file
const fs   = require('fs');
///Required module for compiling (solidity)
const solc = require('solc');


//save the path of the contract file 
const ReqDataPath =  path.resolve(__dirname, 'contracts', 'ReqData.sol');
//read the content of the file
const source    =  fs.readFileSync(ReqDataPath, 'utf8');

//Needed script for copilation
const input = {
    language: 'Solidity',
    sources: {
        'ReqData.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
    
//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['ReqChain.sol']);
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['ReqData.sol'].ReqData;