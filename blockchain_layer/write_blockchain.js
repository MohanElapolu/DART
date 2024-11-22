const HDWalletProvider  = require('@truffle/hdwallet-provider');
const ganache    = require('ganache-cli');
const  Web3    = require('web3');
const {abi, evm} = require('./compile');
const abiDecoder = require('abi-decoder');
const fs         = require('fs');

//const web3  = new Web3('http://127.0.0.1:7545');
const web3  = new Web3('https://bonds-tex-representing-cord.trycloudflare.com');

const contract_address = "0x7a497a42c147ce37f1b34658a720f5c7bbd66300";

const ReqChain    = new web3.eth.Contract(abi, contract_address);

abiDecoder.addABI(abi);

(async () => {
    let start_point = 2;
    let i = start_point;
    let endblock = true;
    full_dict = [];
    while (endblock) {
      try {
        const block = await web3.eth.getBlock(i, true);
        //console.log(block);
        const block2 = await web3.eth.getBlock(i+1, true);
        //console.log(block2);
        if (block && block2) {
          dict2 = [];
          for (let k = 0; k < block.transactions.length; k = k+1) {

            // Read transactions from block
            dict3 = {};
            const transaction_value_inputhex = block.transactions[k].input;
            const decodedInput = abiDecoder.decodeMethod(transaction_value_inputhex);
            //console.log("Here is the human readable transaction data", decodedInput);
            //read data into the 
            if (decodedInput ) {              
              if (decodedInput["name"] == "recordReqData") {
                const transaction_value_inputhex_temp = block2.transactions[0].input;
                const decodedInput_temp = abiDecoder.decodeMethod(transaction_value_inputhex_temp);
                if (decodedInput_temp["name"] == 'adder_art') {
                  dict3["transaction_hash"] = block.transactions[k].hash;
                  dict3["transaction_data"] = decodedInput;
                  dict2.push(dict3); 
                }
              }
            }
          }
          //console.log(dict2.length)
          if (dict2.length >0) {
            dict = {};
            //block_number = JSON.stringify(block.number)

            //dict["block_number"] = block_number.slice(0,block_number.length-1);
            dict["block_number"] = i;
            dict["block_hash"]   = block.hash;
            dict["previous_hash"] = block.parentHash;
            dict["transactions"] = dict2;
        
            // Write decodedValue to the file
            // console.log("I am dict", dict);
            full_dict.push(dict);
          }
        } else {
          endblock = false;
        }
      } catch (error) {
        console.error(error);
        endblock = false;
      }
      i++;
    }
    const string_input  = JSON.stringify(full_dict);
    fs.writeFileSync('Requirementchain.txt', string_input + '\n');
  })();
  
  
  
  
  