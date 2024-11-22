const NodeRSA = require('node-rsa');
const fs = require('fs');

const ba  = require('binascii');

// Generate an RSA key pair
const key = new NodeRSA({ b: 512 }); // Adjust the key size as needed

path1 = "C:/Users/mohan/Desktop/Post-Doc/VIPR-GS_Project/";
path2 =  "multi_org_block/blockchain_app_2/blockchain-react/src";

path = path1 + path2; 
path_public = path + "/public_team3.pem"
// Generate and save the public key to a file
const publicKey = key.exportKey('public');
fs.writeFileSync(path_public, publicKey, 'utf8');
console.log('Public Key:\n', publicKey);

path_private = path + "/private_team3.pem"
// Generate and save the private key to a file
const privateKey = key.exportKey('private');
fs.writeFileSync(path_private, privateKey, 'utf8');
console.log('Private Key:\n', privateKey);