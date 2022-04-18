const Web3 = require("web3");
require("dotenv").config({path:"../.env"});

const args = process.argv.slice(2);

// web3 initialization - must point to the HTTP JSON-RPC endpoint
var provider = args[0] || 'http://localhost:8545';
console.log("******************************************");
console.log("Using provider : " + provider);
console.log("******************************************");
var web3 = new Web3(new Web3.providers.HttpProvider(provider));

let myAccount = process.env.myAccount;
let myPrivateKey = process.env.myPrivateKey;
let myPublicKey = process.env.myPublicKey;

console.log(myAccount, myPrivateKey, myPublicKey);

let candidateId = 1;
const signPrefix = "\x19Ethereum Signed Message:\n32";

const main = async () =>{
    try{
        await web3.eth.personal.importRawKey(myPrivateKey,"abcde")
    }
    catch(e){
        console.log("Account already imported");
    }

    let verifyMsgHsh = web3.utils.soliditySha3(candidateId,myAccount);
    console.log(`Message Hash ${verifyMsgHsh}`);

    try{
        let signature = await web3.eth.personal.sign(verifyMsgHsh, myAccount, "abcde");
        console.log(`Signature : ${signature}`);}
    catch(e){
        console.warn(e);
    }

    try{
        await web3.eth.personal.unlockAccount(myAccount, "abcde");
        let signature2 = await web3.eth.sign(verifyMsgHsh,myAccount,"abcde"); // Same signature for Nodes that don't support the personal_sign method
        console.log(`Signature : ${signature2}`);
    }
    catch(e){
        console.warn(e);
    }

    
}

main();







