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
const crypto = require('crypto-js');

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
let key_encrypt;
let keyHex;
let key;

/** 
// Function to perform AES encryption
function encryptText(text, key) {
  const iv = crypto.randomBytes(12); // Initialization Vector
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encryptedBuffer = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const encryptedData = Buffer.concat([iv, encryptedBuffer, tag]);
  return encryptedData;
}

// Function to perform AES decryption
function decryptText(encryptedData, key) {
  const iv = encryptedData.slice(0, 12);
  const tag = encryptedData.slice(-16);
  const ciphertext = encryptedData.slice(12, -16);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  const decryptedBuffer = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const decryptedText = decryptedBuffer.toString('utf-8');
  return decryptedText;
}
*/

// Function to generate a random 256-bit (32-byte) key
function generateKey() {
  return window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

// Function to convert a string to an ArrayBuffer
function stringToArrayBuffer(str) {
  var encoder = new TextEncoder('utf-8');
  return encoder.encode(str);
}


// Function to convert an ArrayBuffer to a string
function arrayBufferToString(buffer) {
  var decoder = new TextDecoder('utf-8');
  return decoder.decode(buffer);
}


// Function to perform AES encryption
async function encryptText(text, key) {
  const encodedText = stringToArrayBuffer(text);
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector

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
  console.log("key Buffer:",keyBuffer);
  const keyArray = new Uint8Array(keyBuffer);
  console.log("key Array:",keyArray);
  return window.crypto.subtle.importKey(
    'raw',
    keyArray,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  );
}

async function tempExample() {
      // Message and key
      const textToEncrypt = 'Hello World!hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world';
      const key = await generateKey();
      console.log(key);

      // Convert key to hex string
      const keyHex1 = await keyToHex(key);
      console.log('Key in Hex:', keyHex1);

      // Convert hex string back to key
      const convertedKeyPromise = hexToKey(keyHex1);
      const convertedKey = await convertedKeyPromise;  // Awaiting the promise
      console.log('Converted Key:', convertedKey);

      //console.log(key == convertedKey);

      // Encryption
      const encryptedData = await encryptText(textToEncrypt, convertedKey);
      console.log('Encrypted Data:', encryptedData);

      // Decryption
      const decryptedText = await decryptText(encryptedData, key);
      console.log('Decrypted Text:', decryptedText);
    }

// Example function
tempExample();

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
      if (obj_security[kp]=="BOTH") {
        keyHex = key_encrypt[kp];
        //key = Buffer.from(keyHex, 'hex');
        req_trace2[k] = encryptText(object_trace[j], key);
        req_trace2[k+2] = encryptText(object_trace[j+1], key);
        //console.log(req_trace2[k+1]);
        //console.log(decryptText(req_trace2[k+1], keyHex));
        //console.log(req_trace2[k+2]);
        //console.log(decryptText(req_trace2[k+2], keyHex));
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

    if (Object.keys(file_content[j]).includes(keys_art[8])){
      key_encrypt.push(file_content[j][keys_art[8]]);
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
        obj_security = [];
        key_encrypt = [];
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