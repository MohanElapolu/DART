const NodeRSA = require('node-rsa');
const fs = require('fs');
//const RSA =require('react-native-rsa-native');
const JSencrypt = require('jsencrypt');

//const ba  = require('binascii');

// Generate an RSA key pair
const key = new NodeRSA({ b: 512 }); // Adjust the key size as needed


path1 = "C:/Users/mohan/Desktop/Post-Doc/VIPR-GS_Project/";
path2 =  "multi_org_block/blockchain_app_2/blockchain-react/src";

path = path1 + path2; 
path_public = path + "/public_team3.pem";
path_private = path + "/private_team3.pem";

// Message to encrypt
const message = 'Hello, World!';

//Reading Public Key and Private Key
const publicKeyText = fs.readFileSync(path_public, 'utf8');
const privateKeyText = fs.readFileSync(path_private, 'utf8');


//********************************************************/
//********************************************************/
//*********************MODULE NODE-RSA********************/
//********************************************************/

console.log("Results of NODE-RSA module");
// Encrypt the message with the public key
//console.log(publicKeyForEncryption);
const publicKeyForEncryption = new NodeRSA(publicKeyText);
const encryptedMessage = publicKeyForEncryption.encrypt(message, 'base64');
console.log('Encrypted Message:', encryptedMessage);

// Decrypt the message with the private key
//console.log(privateKeyForDecryption);
const privateKeyForDecryption = new NodeRSA(privateKeyText);
const decryptedMessage = privateKeyForDecryption.decrypt(encryptedMessage, 'utf8');
console.log('Decrypted Message:', decryptedMessage);

//********************************************************/
//********************************************************/
//**************MODULE JSEncrypt************/
//********************************************************/

encrypt = new JSencrypt();
decrypt = new JSencrypt();

//await generate_keys();
//console.log(keys);
//const message = "Hello World";
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

//********************************************************/
//********************************************************/
//*********************MODULE React-native-rsa************/
//********************************************************/

console.log("Results of REACT-NATIVE-RSA module");

const RSAKey = require('react-native-rsa');

async function rsa_generate(bits, exponent) {
    const rsa = new RSAKey();
    console.log(rsa); 
    rsa.generate(bits,exponent);
    console.log(rsa);
    return rsa;
  }
  
async function main(bits, exponent) {
    try {
      console.log("I am  here");
      const rsa = await rsa_generate(bits, exponent);
      console.log("I am here as well"); 
      console.log(rsa);
      console.log(typeof rsa.RSAGetPublicString);
      //console.log(rsaKey.exportKey('public'));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  const bits = 1024;
  const exponent = '10001'; // must be a string
  main(bits, exponent);
// Encrypt the message with the public key
//rsa.setPublicString(publicKeyText);
//const encryptedMessage2 = rsa.encrypt(publicKeyText);
//console.log('Encrypted Message:', encryptedMessage2);


// Decrypt the message with the private key
//rsa.setPrivateString(privateKeyText);
//const decryptedMessage2 = privateKeyForDecryption.decrypt(encryptedMessage, 'utf8');
//console.log('Decrypted Message:', decryptedMessage2);