const HDWalletProvider  = require('@truffle/hdwallet-provider');
const keccak256 = require('keccak256');
const ganache    = require('ganache-cli');
const { Web3 }   = require('web3');
const {abi, evm} = require('./compile');
const XLSX = require('xlsx');


const web3  = new Web3('http://127.0.0.1:7545');

const contract_address = "0x7a497a42c147ce37f1b34658a720f5c7bbd66300";

const ReqData    = new web3.eth.Contract(abi, contract_address);

//const req_trace2 = [];

let req_trace2 = [];
let object_trace = [];
let stakeholders = [];
let artifact_name = [];
let artifact_trace = [];
let obj_security = [];
//let result;
//let manager;

function create_object_id(object) {
  console.log(keccak256(object).toString('hex'));
  return keccak256(object).toString('hex');
}

async function update_req_trace() {
  let k = 0;
  for (let j = 0; j < object_trace.length; j = j+3) {
      req_trace2[k]   = object_trace[j];
      req_trace2[k+1] = create_object_id(object_trace[j]);
      req_trace2[k+2] = object_trace[j+1];
      req_trace2[k+3] = create_object_id(object_trace[j+1]);
      req_trace2[k+4] = object_trace[j+2];
      k = k+5;
}
}

async function artifact_data(file_content) {
  let keys_art = Object.keys(file_content[0]);
  console.log(keys_art);
  for (let j = 0; j < Object.keys(file_content).length; j=j+1 ){
    if (Object.keys(file_content[j]).includes(keys_art[0])){
      stakeholders.push(file_content[j][keys_art[0]]);
      console.log(file_content[j][keys_art[0]]);
    }
         
     if (Object.keys(file_content[j]).includes(keys_art[1])){
      artifact_name.push(file_content[j][keys_art[1]]);
     }

     if (Object.keys(file_content[j]).includes(keys_art[2])){
      artifact_trace.push(file_content[j][keys_art[2]]);
      artifact_trace.push(file_content[j][keys_art[3]]);
     }

     if (Object.keys(file_content[j]).includes(keys_art[4])){
      object_trace.push(file_content[j][keys_art[4]]);
      object_trace.push(file_content[j][keys_art[5]]);
      object_trace.push(file_content[j][keys_art[6]]);
     }

     if (Object.keys(file_content[j]).includes(keys_art[7])){
      obj_security.push(file_content[j][keys_art[7]]);
     }

  }

}

// Load the Excel file
const workbook = XLSX.readFile('artifact_1.xlsx'); // Replace 'example.xlsx' with your file's path

// Select the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet data to a JSON object
const fileContent = XLSX.utils.sheet_to_json(sheet);

artifact_data(fileContent);
//console.log(object_trace);
console.log(artifact_trace);
console.log(artifact_name);
console.log(stakeholders);
update_req_trace();
console.log(object_trace);

//console.log(jsonData);

const add_artifact =  async () => {


    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[2]);
    
    update_req_trace();

    const result = await ReqData.methods.recordReqData(accounts[2],
      artifact_trace,
      req_trace2,
      stakeholders,
      artifact_name,
      obj_security
    ).send( {from: accounts[1], gas: 2000000, gasLimit: 5000000 } );

    //const result = await ReqData.methods.recordReqData(accounts[0],
    //  ['not-applicable', 'DEPENDS_ON'],
    //  req_trace2,
    //  ['Stake Holder 1', 'Stake Holder 2'],
    //  ['System Objective']
    //).send( {from: accounts[1], gas: 2000000, gasLimit: 5000000 } );
    
    console.log("Hello I am first transaction hash", result.transactionHash);
    //const block_details = await provider.getTransactionReceipt(result.transactionHash)
    //console.log("get the code", block_details)

    //Read req trace with ids included
    //const artifact_trace_id =   await  ReqData.methods.getreq_traceid().call();

    //string2 = JSON.stringify(result.transactionHash);
    //const result2 =  await   ReqData.methods.recordReqTrace(string2, artifact_trace_id 
    //).send({from: accounts[1], gas: 2000000, gasLimit: 5000000 });

    //console.log("Hello I am second transaction hash", result2)
};

add_artifact();