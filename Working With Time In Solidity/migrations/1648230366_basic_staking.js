// Basic Staking contract deployment process
const StakeForRewards = artifacts.require("StakeForRewards");

const minStakePeriod = 7; // days
const tokenToWeiRate = 10000000000;

module.exports = function(deployer, network, accounts) {
    deployer.deploy(StakeForRewards, minStakePeriod, tokenToWeiRate, { from: accounts[0] });
};