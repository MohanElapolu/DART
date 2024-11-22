const crypto = require('crypto');
const fs = require('fs');

// Function to generate a random 256-bit (32-byte) key
function generateKey() {
  return crypto.randomBytes(32); // 32 bytes for a 256-bit key
}

// Function to write the key to a text file
function writeKeyToFile(key, filename) {
  fs.writeFileSync(filename, key.toString('hex'));
  console.log(`Key has been written to ${filename}`);
}

// Function to read the key from a text file
function readKeyFromFile(filename) {
  const keyHex = fs.readFileSync(filename, 'utf-8');
  return Buffer.from(keyHex, 'hex');
}

// Function to perform AES encryption
// Function to perform AES encryption
async function encryptText(text, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector
    const encodedText = new TextEncoder().encode(text);
  
    const cipher = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encodedText
    );
  
    const encryptedData = new Uint8Array([...iv, ...new Uint8Array(cipher)]);
    return encryptedData;
  }


// Example usage
function runExample() {
  const textToEncrypt = 'Hello World! I am at the top of the universe...'; // Your long text
  const keyFilename = 'encryption_key.txt';

  // Check if key file exists
  if (!fs.existsSync(keyFilename)) {
    // If key file doesn't exist, generate a key and write it to a file
    const key = generateKey();
    writeKeyToFile(key, keyFilename);
  }

  // Read the key from the file
  const key = readKeyFromFile(keyFilename);
  //const keyHex = "25095bd30d40ab4a95187e3d74aa3567a02fdaa53cddfe1a37e07796c835fe94";
  key = Buffer.from(keyHex, 'hex');
  console.log(key);
  // Encryption
  const encryptedData = encryptText(textToEncrypt, key);
  console.log('Encrypted Data:', encryptedData.toString('base64'));

  // Decryption
  // const decryptedText = decryptText(encryptedData, key);
  // console.log('Decrypted Text:', decryptedText);
}

// Run the example
runExample();