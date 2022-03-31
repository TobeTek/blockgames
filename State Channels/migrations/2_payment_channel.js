const PayWithSig = artifacts.require("PayWithSig");
const Web3 = require("web3");

module.exports = async function (_deployer, network, accounts) {
  console.log(`Networks ${network} Accounts ${accounts}`);
  if (network == "geth42") {
    console.log("It's geth guys");
    const web3 = new Web3 (new Web3.providers.HttpProvider ('http://127.0.0.1:8545'));
    console.log ('>>>>> Attempting to unlock account');
    console.log ('>>>>> Using password ' + "abcde");
    await web3.eth.personal.unlockAccount ('0x1234567890abcdef1234567890abcdef12345678', 'abcde', 36000).then (console.log ('Account unlocked!'));

    console.log ('>>>>> Deploying migration');
    _deployer.deploy(PayWithSig);
  } else {
    _deployer.deploy(PayWithSig);
  }
};
