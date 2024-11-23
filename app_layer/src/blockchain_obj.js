import web3 from './web3';
//var Contract = require('web3-eth-contract');

const address =  '0x1955a9908aEBF9343d1d580FF9B75A6825a4E60f';

const abi  =   [
  { inputs: [], stateMutability: 'payable', type: 'constructor' },
  {
    inputs: [ [Object] ],
    name: 'Add_Obj',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'Check_Obj',
    outputs: [ [Object] ],
    stateMutability: 'payable',
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
    inputs: [ [Object] ],
    name: 'obj_list',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'view_obj_list',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  }
];

//Contract.setProvider('ws://localhost:8546');
//var blockchain = new eth.Contract(abi, address);
var blockchain_obj = new web3.eth.Contract(abi, address);
export default blockchain_obj;
//export default blockchain;