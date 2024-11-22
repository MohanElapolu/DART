import "./App.css";
import React from "react";
import web3 from './web3';
import { keccak256 } from 'js-sha3';
import * as XLSX from 'xlsx';
import blockchain from './blockchain';
import {JSEncrypt} from "jsencrypt";

//const RSAKey = require('react-native-rsa');
//import NodeRSA from 'node-rsa';
//import { RSA } from 'react-native-rsa-native';
//import * as NodeRSA from 'node-rsa';

//const NodeRSA = require('node-rsa');

//const crypto1 = require('crypto');

//const proxy = require('http-proxy-middleware');

//const keccak256 = require('keccak256');

/****************************************************
 * **************************************************
******React-native-rsa-native Package****************

import { RSA } from 'react-native-rsa-native'; 
async function generate_keys() {
  const message = "Hello World";
  const keys = await RSA.generateKeys(1024) // set key size
  console.log('1024 private:', keys.private); 
  console.log('1024 public:', keys.public); // the public key
  const encodedMessage = RSA.encrypt(message, keys.public);
  console.log(`the encoded message is ${encodedMessage}`);
  const decryptedMessage =  RSA.decrypt(encodedMessage, keys.private);
  console.log(`The original message was ${decryptedMessage}`);
}
*/

//await generate_keys();

let req_trace2;
let object_trace;
let stakeholders;
let artifact_name;
let artifact_trace;
let obj_security;
let accounts;
let result;
let manager;
let return_trace;
let public_keys;
let PublicKey;
let PrivateKey;
let encrypt;
let decrypt;

encrypt = new JSEncrypt();
decrypt = new JSEncrypt();

//await generate_keys();
//console.log(keys);
const message = "Hello World";
//checking on encryption
PublicKey = "-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI0vrvYen2ZEvqPUmgk1QBXcPS6kD2q1WLCDg9YyG3MPmxbe4j7v3Jrvrbf+UNqhvS6weddCbdgWhIj3O9cbK28CAwEAAQ==-----END PUBLIC KEY-----";
//PublicKey = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI0vrvYen2ZEvqPUmgk1QBXcPS6kD2q1WLCDg9YyG3MPmxbe4j7v3Jrvrbf+UNqhvS6weddCbdgWhIj3O9cbK28CAwEAAQ";
encrypt.setPublicKey(PublicKey);
const message_enc = encrypt.encrypt(message);

console.log(message_enc);
//checking on decryption

const PK1 = "-----BEGIN RSA PRIVATE KEY-----";
const PK2 = "MIIBOgIBAAJBAI0vrvYen2ZEvqPUmgk1QBXcPS6kD2q1WLCDg9YyG3MPmxbe4j7v";
const PK3 = "3Jrvrbf+UNqhvS6weddCbdgWhIj3O9cbK28CAwEAAQJAI6STFf1bHnVib3e/v21b";
const PK4 = "FWm5ZGn0nmrTzhQVl2Ck/2Hg8oaa0j9GRUNnXQGP8BJaQhh+sGArKHoQxICExGr0";
const PK5 = "SQIhAPaX7AYy/aEX3g7brCocTQ990XfsvMbqIKrBKT840peDAiEAkpJrqsCLh80A";
const PK6 = "7la+enUze+BkcxZX+64taQkocABHLKUCIAnQIeRdQxqWCJAuzbsfRTHIn/1Vvm1s";
const PK7 = "A8DHzwxlBnxhAiAQOlXhWeAY8QGhYclFFaTVmkqE03x6SRaOAo2PmPhIYQIhALEx";
const PK8 = "mbN0s0P6QtfpL/yjPpWtklMGCxvNPdV3qGRjKajd-----END RSA PRIVATE KEY-----";
PrivateKey = PK1 + PK2 + PK3 + PK4 + PK5 + PK6 + PK7 + PK8;


decrypt.setPrivateKey(PrivateKey)
const message_dec = decrypt.decrypt(message_enc);
console.log(message_dec);



accounts = await web3.eth.getAccounts();
console.log(accounts[0]);
console.log(accounts);
contract_call();
//console.log(accounts[2]);
//console.log(await web3.eth.getChainId());
//console.log(window.ethereum.isConnected());
//await window.ethereum.enable();
//const accounts2 = await window.ethereum.request({method: "eth_requestAccounts"});
//console.log(accounts2[0]);
//contract_call();

function create_object_id(object) {
  //console.log(keccak256(object).toString('hex'));
  return keccak256(object).toString('hex');
}

async function update_req_trace() {
  let k = 0;
  let kp = 0;
  for (let j = 0; j < object_trace.length; j = j+4) {
      //req_trace2[k]   = object_trace[j];
      req_trace2[k+1] = create_object_id(object_trace[j]);
      req_trace2[k+4] = object_trace[j+2];
      //req_trace2[k+5] = object_trace[j+4];
      console.log(object_trace[j]);
      //console.log(create_object_id(object_trace[j]));
      //req_trace2[k+1] = create_object_id(object_trace[j]);
      console.log(object_trace[j+1]);
      //console.log(create_object_id(object_trace[j]));
      if (obj_security[kp]=="YES") {
        encrypt.setPublicKey(PublicKey);
        req_trace2[k] = encrypt.encrypt(object_trace[j]);
        req_trace2[k+2] = encrypt.encrypt(object_trace[j+1]);
        console.log(req_trace2[k+1]);
        console.log(decrypt.decrypt(req_trace2[k+1]));
        console.log(req_trace2[k+2]);
        console.log(decrypt.decrypt(req_trace2[k+2]));
        //for (let st=0; st < public_keys.length; st= st+1){
        //  encrypt.setPublicKey(public_keys[st]);
          //const message_enc = encrypt.encrypt(message);
          //const publicKeyForEncryption = new NodeRSA(public_keys[st]);
          //req_trace2[k+2] = publicKeyForEncryption.encrypt(object_trace[j+1], 'base64');
          //req_trace2[k+4] = publicKeyForEncryption.encrypt(object_trace[j+2], 'base64');
          //rsa.setPublicString(public_keys[st]);
          //req_trace2[k+1]   = rsa.encrypt(object_trace[j]);
          //req_trace2[k+3]   = rsa.encrypt(object_trace[j+2]);
        //}
      }
      else {
        req_trace2[k] = object_trace[j];
        req_trace2[k+2] = object_trace[j+1];
        req_trace2[k+3] = create_object_id(object_trace[j+1]);
      }
      k = k+6;
      kp = kp+1; 
}
}

async function artifact_data(file_content) {
  let keys_art = Object.keys(file_content[0]);
  for (let j = 0; j < Object.keys(file_content).length; j=j+1 ){
    if (Object.keys(file_content[j]).includes(keys_art[0])){
      stakeholders.push(file_content[j][keys_art[0]]);
      //console.log(file_content[j][keys_art[0]]);
    }
         
    if (Object.keys(file_content[j]).includes(keys_art[1])){
      artifact_name.push(file_content[j][keys_art[1]]);
    }
    //if (Object.keys(file_content[j]).includes(keys_art[2])){
    //  public_keys.push(file_content[j][keys_art[2]]);
    //}

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

async function contract_send(){
  //console.log(accounts[0].length)
  //const temp_accounts = await window.ethereum.request("eth_requestAccounts");
  console.log(accounts[3]);
  const result = await blockchain.methods.recordReqData(accounts[3],
    artifact_trace,
    req_trace2,
    stakeholders,
    artifact_name,
    obj_security
  ).send( {from: accounts[3], gas: 2000000, gasLimit: 5000000 });
  console.log("Here is the result", result)
}

async function contract_call(){
  //const temp_accounts = await window.ethereum.request("eth_requestAccounts");
  //console.log(temp_accounts);
  //await window.ethereum.request({method: "eth_requestAccounts"});
  //await window.ethereum.on();
  //manager = await blockchain.methods.manager().call({ from: accounts[0] });
  return_trace = await blockchain.methods.getreq_trace().call({ from: accounts[0] });
  //console.log("I am here");
  console.log(return_trace);
}
 
class App extends React.Component {
  state = {
      filePath: '',
      fileContent: '',
      fileBlob: '',
      fileBuffer: '',
      workbook: ''
  };

  handleFilePathChange = (event) => {
    this.setState({ filePath: event.target.value });
  };

  handleButtonClick = async () => {
    const filePath = this.state.filePath;

    if (filePath) {
      try {
        req_trace2 = [];
        object_trace = [];
        stakeholders = [];
        artifact_name = [];
        artifact_trace = [];
        public_keys = [];
        obj_security = [];
        const response = await fetch(filePath);
        const fileBlob = await response.blob();
        const fileBuffer = await fileBlob.arrayBuffer();

        const workbook = XLSX.read(new Uint8Array(fileBuffer), {type: "array"});
        
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const fileContent = XLSX.utils.sheet_to_json(worksheet);
        this.setState({ fileContent });
        //console.log(fileContent);
                
        await artifact_data(fileContent);
        console.log(object_trace);
        console.log(artifact_trace);
        console.log(artifact_name);
        console.log(stakeholders);
        await update_req_trace();
        console.log(req_trace2);
        console.log(obj_security);
        contract_call();
        //console.log(manager);
        contract_send();

      } catch (error) {
        console.error('Error reading the file:', error);
        this.setState({ fileContent: 'Error reading the file' });
      }
    } else {
      this.setState({ fileContent: 'Please enter a file path' });
    }
};

//  async componentDidMount() {
//      const manager = await blockchain.methods.manager().call();
//      const req_trace = await blockchain.methods.getreq_trace().call();

//      this.setState({req_trace, manager})
//  }

  render() {
    //web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <textarea
          value={this.state.filePath}
          onChange={this.handleFilePathChange}
          placeholder="Enter file path here..."
          rows={3}
          cols={50}
        />
        <button onClick={this.handleButtonClick}>Read File</button>
        <textarea
          value={this.state.fileContent}
          onChange={(event) => this.setState({ fileContent: event.target.value })}
          rows={10}
          cols={50}
        />
      </div>
      );
    }
  }

export default App;
//module.exports = function (App) {
//  App.use(proxy('/api', {
//      target: 'http://www.api.com',
//      logLevel: 'debug',
//      changeOrigin: true
//  }));
//};