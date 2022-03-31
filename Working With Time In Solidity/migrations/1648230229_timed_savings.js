// Timed Savings contract deployment script
const TimedSavings = artifacts.require("TimedSavings");
const numberOfDaysBeforeWithdrawal = 5;

module.exports = function(deployer, network, accounts) {
    deployer.deploy(TimedSavings, numberOfDaysBeforeWithdrawal, { from: accounts[0] });
};