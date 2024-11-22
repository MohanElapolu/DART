// Import all necessary libraries

import "./App.css";
import React from "react";
import web3 from './web3';
import { keccak256 } from 'js-sha3';
import * as XLSX from 'xlsx';
import blockchain from './blockchain';
import blockchain_net from './blockchain_net';

const crypto = require('crypto-js');


let req_trace2;
let object_trace;
let stakeholders;
let artifact_name;
let artifact_trace;
let obj_security;
let accounts;
let return_trace;
let key_encrypt;
let keyHex;


// Function to convert a string to an ArrayBuffer
function stringToArrayBuffer(str) {
  var encoder = new TextEncoder('utf-8');
  return encoder.encode(str);
}


// Function to perform AES encryption
async function encryptText(text, key) {
  const encodedText = stringToArrayBuffer(text);
  const iv = new Uint8Array(12);
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encodedText
  );

  const encryptedArray = new Uint8Array(encryptedBuffer);
  const ivAndEncrypted = new Uint8Array([...iv, ...encryptedArray]);

  return arrayBufferToBase64(ivAndEncrypted);
}

// Function to perform AES decryption
async function decryptText(encryptedBase64, key) {
  const ivAndEncrypted = base64ToArrayBuffer(encryptedBase64);

  const iv = ivAndEncrypted.slice(0, 12);
  const encryptedArray = ivAndEncrypted.slice(12);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encryptedArray
  );

  return new TextDecoder().decode(decryptedBuffer);
}

// Function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const binary = Array.from(new Uint8Array(buffer));
  return btoa(binary.map(byte => String.fromCharCode(byte)).join(''));
}

// Function to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Function to convert ArrayBuffer to hex string
function arrayBufferToHex(buffer) {
  const hexArray = Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0'));
  return hexArray.join('');
}

// Function to convert hex string to ArrayBuffer
function hexToArrayBuffer(hex) {
  if (!hex) return null; // Check if hex is undefined or null
  const hexWithoutSpaces = hex.replace(/\s/g, ''); // Remove spaces if any
  const bytes = new Uint8Array(hexWithoutSpaces.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  return bytes.buffer;
}

// Function to convert key to hex string
async function keyToHex(key) {
  const keyBuffer = await window.crypto.subtle.exportKey('raw', key);
  return arrayBufferToHex(keyBuffer);
}

// Function to convert hex string to key
async function hexToKey(hex) {
  const keyBuffer = hexToArrayBuffer(hex);
  //console.log("key Buffer:",keyBuffer);
  const keyArray = new Uint8Array(keyBuffer);
  //console.log("key Array:",keyArray);
  return window.crypto.subtle.importKey(
    'raw',
    keyArray,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  );
}


accounts = await web3.eth.getAccounts();
console.log(accounts);

function create_object_id(object) {
  return keccak256(object).toString('hex');
}

async function update_req_trace() {
  let k = 0;
  let kp = 0;
  for (let j = 0; j < object_trace.length; j = j+3) {
      req_trace2[k+1] = String(create_object_id(object_trace[j]));
      req_trace2[k+3] = String(create_object_id(object_trace[j+1]));
      req_trace2[k+4] = object_trace[j+2];

      if (obj_security[kp]=="BOTH") {
        keyHex = key_encrypt[kp];
        const convertedKeyPromise = hexToKey(keyHex);
        const convertedKey = await convertedKeyPromise;  // Awaiting the promise

        // Encryption
        req_trace2[k] = await encryptText(object_trace[j], convertedKey);
        console.log('Encrypted Child:', req_trace2[k]);
        // Decryption
        //const decryptedchild = await decryptText(req_trace2[k], convertedKey);
        //console.log('Decrypted Child:', decryptedchild);

        // Encryption
        req_trace2[k+2] = await encryptText(object_trace[j+1], convertedKey);
        console.log('Encrypted Parent:', req_trace2[k]);
        // Decryption
        // const decryptedparent = await decryptText(req_trace2[k+2], convertedKey);
        //console.log('Decrypted Parent:', decryptedparent);
      }
      
      else if (obj_security[kp]=="PARENT") {

        keyHex = key_encrypt[kp];
        const convertedKeyPromise = hexToKey(keyHex);
        const convertedKey = await convertedKeyPromise;  // Awaiting the promise
        console.log('Converted Key:', convertedKey);

        // Encryption
        req_trace2[k+2] = await encryptText(object_trace[j+1], convertedKey);
        console.log('Encrypted Parent:', req_trace2[k]);
        // Decryption
        const decryptedparent = await decryptText(req_trace2[k+2], convertedKey);
        console.log('Decrypted Parent:', decryptedparent);

      }

      else if (obj_security[kp]=="CHILD") {
        
        keyHex = key_encrypt[kp];
        const convertedKeyPromise = hexToKey(keyHex);
        const convertedKey = await convertedKeyPromise;  // Awaiting the promise
        console.log('Converted Key:', convertedKey);

        // Encryption
        req_trace2[k] = await encryptText(object_trace[j], convertedKey);
        console.log('Encrypted Child:', req_trace2[k]);
        // Decryption
        const decryptedchild = await decryptText(req_trace2[k], convertedKey);
        console.log('Decrypted Child:', decryptedchild);
      }

      if (obj_security[kp]=="CHILD") {
            req_trace2[k+2] = object_trace[j+1];  
          }
      if (obj_security[kp]=="PARENT") {
            req_trace2[k] = object_trace[j];  
          }
      if (obj_security[kp]=="NO") {
            req_trace2[k] = object_trace[j];
            req_trace2[k+2] = object_trace[j+1];
          }
      k = k+5;
      kp = kp+1; 
}
}

async function artifact_data(file_content) {
  let keys_art = Object.keys(file_content[0]);
  for (let j = 0; j < Object.keys(file_content).length; j=j+1 ){
    if (Object.keys(file_content[j]).includes(keys_art[0])){
      stakeholders.push(String(file_content[j][keys_art[0]]));
    }
         
    if (Object.keys(file_content[j]).includes(keys_art[1])){
      artifact_name.push(String(file_content[j][keys_art[1]]));
    }

    if (Object.keys(file_content[j]).includes(keys_art[2])){
      artifact_trace.push(String(file_content[j][keys_art[2]]));
      artifact_trace.push(String(file_content[j][keys_art[3]]));
    }

    if (Object.keys(file_content[j]).includes(keys_art[4])){
      object_trace.push(file_content[j][keys_art[4]]);
      object_trace.push(file_content[j][keys_art[5]]);
      object_trace.push(String(file_content[j][keys_art[6]]));
    }

    if (Object.keys(file_content[j]).includes(keys_art[7])){
      obj_security.push(String(file_content[j][keys_art[7]]));
    }

    if (Object.keys(file_content[j]).includes(keys_art[8])){
      key_encrypt.push(file_content[j][keys_art[8]]);
    }
  }
}

async function contract_send(){
  //console.log(accounts[0]);
  //console.log(artifact_trace);
  //console.log(req_trace2);
  //console.log(stakeholders);
  //console.log(artifact_name);
  //console.log(obj_security);
  //const nonce = web3.eth.getTransactionCount(accounts[2])
  const result = await blockchain.methods.recordReqData(accounts[0],
    artifact_trace,
    req_trace2,
    stakeholders,
    artifact_name,
    obj_security
  ).send( {from: accounts[0], gas: 10000000, gasLimit: 10000000});
  console.log("Here is the result", result);
  //console.log("Here are the events",result.events);
  const par_hash = String(result.transactionHash);
  const result2 = await blockchain.methods.adder_art(par_hash).send({from: accounts[0], gas: 10000000, gaLimit: 10000000});
  console.log("Here is the result for Tx 1", result2);
  return par_hash;
  }

async function contract_call(){
  return_trace = await blockchain.methods.getreq_trace().call({ from: accounts[0] });
  console.log(return_trace);
}
 
class App extends React.Component {
  state = {
      filePath: '',
      fileContent: '',
      fileBlob: '',
      fileBuffer: '',
      workbook: '',
      par_hash: ''
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
        obj_security = [];
        key_encrypt = [];
        const response = await fetch(filePath);
        const fileBlob = await response.blob();
        const fileBuffer = await fileBlob.arrayBuffer();

        const workbook = XLSX.read(new Uint8Array(fileBuffer), {type: "array"});
        
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const fileContent = XLSX.utils.sheet_to_json(worksheet);
        //this.setState({ fileContent });
        //console.log(fileContent);
                
        await artifact_data(fileContent);
    
        //console.log(artifact_trace);
        //console.log(object_trace);
        //console.log(stakeholders);
        //console.log(artifact_name);
        //console.log(obj_security);

        await update_req_trace();
        console.log(req_trace2);
        //console.log(obj_security);
        //contract_call();
        //console.log(manager);

        //await contract_send();
        this.setState({ par_hash: await contract_send() });

      } catch (error) {
        console.error('Error reading the file:', error);
        this.setState({ fileContent: 'Error reading the file' });
      }
    } else {
      this.setState({ fileContent: 'Please enter a file path' });
    }
};

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <h3>Blockchain dApp</h3>
        <div>
        <h4>Enter File Path:</h4>
        <textarea
          value={this.state.filePath}
          onChange={this.handleFilePathChange}
          placeholder="Enter file path here..."
          rows={3}
          cols={50}
        />
        </div>
      <div>
        <button onClick={this.handleButtonClick}>Read File</button>
      </div>
      <div>
        <h4>Artifact Id (Transaction hash):</h4>
        <textarea
          //value={this.state.fileContent}
          value={this.state.par_hash}
          onChange={(event) => this.setState({ par_hash: event.target.value })}
          rows={3}
          cols={50}
        />
      </div>
      </div>
      );
    }
  }

export default App;