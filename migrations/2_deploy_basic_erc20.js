const BasicERC20 = artifacts.require("BasicERC20");

const totalSupply = 10 ** 6 * 10 ** 5;
const decimals = 5;
const name = "Blockgames Inu";
const symbol = "$BGI";

module.exports = function (deployer, network, accounts) {
  deployer.deploy(BasicERC20, totalSupply, decimals, name, symbol ,{from: accounts[0]});
};
