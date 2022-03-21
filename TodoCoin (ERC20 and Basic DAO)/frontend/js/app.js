 const tokenABI = [{
     "inputs": [{
         "internalType": "uint256",
         "name": "_totalSupply",
         "type": "uint256"
     }, {
         "internalType": "uint256",
         "name": "_decimals",
         "type": "uint256"
     }, {
         "internalType": "string",
         "name": "_name",
         "type": "string"
     }, {
         "internalType": "string",
         "name": "_symbol",
         "type": "string"
     }],
     "stateMutability": "nonpayable",
     "type": "constructor"
 }, {
     "anonymous": false,
     "inputs": [{
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
     }, {
         "indexed": true,
         "internalType": "address",
         "name": "spender",
         "type": "address"
     }, {
         "indexed": false,
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
     }],
     "name": "Approval",
     "type": "event"
 }, {
     "anonymous": false,
     "inputs": [{
         "indexed": true,
         "internalType": "address",
         "name": "from",
         "type": "address"
     }, {
         "indexed": true,
         "internalType": "address",
         "name": "to",
         "type": "address"
     }, {
         "indexed": false,
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
     }],
     "name": "Transfer",
     "type": "event"
 }, {
     "inputs": [],
     "name": "decimals",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function",
     "constant": true
 }, {
     "inputs": [],
     "name": "name",
     "outputs": [{
         "internalType": "string",
         "name": "",
         "type": "string"
     }],
     "stateMutability": "view",
     "type": "function",
     "constant": true
 }, {
     "inputs": [],
     "name": "symbol",
     "outputs": [{
         "internalType": "string",
         "name": "",
         "type": "string"
     }],
     "stateMutability": "view",
     "type": "function",
     "constant": true
 }, {
     "inputs": [],
     "name": "totalSupply_",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function",
     "constant": true
 }, {
     "inputs": [],
     "name": "totalSupply",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function",
     "constant": true
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_user",
         "type": "address"
     }],
     "name": "balanceOf",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function",
     "constant": true
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "to",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
     }],
     "name": "transfer",
     "outputs": [{
         "internalType": "bool",
         "name": "",
         "type": "bool"
     }],
     "stateMutability": "nonpayable",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_from",
         "type": "address"
     }, {
         "internalType": "address",
         "name": "_spender",
         "type": "address"
     }],
     "name": "allowance",
     "outputs": [{
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
     }],
     "stateMutability": "view",
     "type": "function",
     "constant": true
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_from",
         "type": "address"
     }, {
         "internalType": "address",
         "name": "_to",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "_value",
         "type": "uint256"
     }],
     "name": "transferFrom",
     "outputs": [{
         "internalType": "bool",
         "name": "",
         "type": "bool"
     }],
     "stateMutability": "nonpayable",
     "type": "function"
 }, {
     "inputs": [{
         "internalType": "address",
         "name": "_spender",
         "type": "address"
     }, {
         "internalType": "uint256",
         "name": "_value",
         "type": "uint256"
     }],
     "name": "approve",
     "outputs": [{
         "internalType": "bool",
         "name": "",
         "type": "bool"
     }],
     "stateMutability": "nonpayable",
     "type": "function"
 }];

 const deployedAddress = "";