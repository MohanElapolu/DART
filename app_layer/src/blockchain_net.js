import web3 from './web3';
//var Contract = require('web3-eth-contract');

const address =  '0x1041a17dCB8B62cBceF257d3Cc2d06781dB6690D';

const abi  =   [
  { inputs: [], stateMutability: 'payable', type: 'constructor' },
  {
    inputs: [ [Object] ],
    name: 'Add_Par',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'Check_Par',
    outputs: [ [Object] ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'Par_list',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getBalanceSmartContract',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'view_par_list',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  }
];

//Contract.setProvider('ws://localhost:8546');
//var blockchain = new eth.Contract(abi, address);
var blockchain_net = new web3.eth.Contract(abi, address);
export default blockchain_net;
//export default blockchain;