// Simple Election contract deployment script
const SimpleElection = artifacts.require("SimpleElection");

const electionName = "When to Have a Meeting?";
const electionDescription =
  "An election to pick a date to hold the company EOY appraisal meetings";

const electionCandidates = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

module.exports = function (deployer, network, accounts) {
  deployer.deploy(
    SimpleElection,
    [electionName, electionDescription],
    electionCandidates,
    { from: accounts[0] }
  );
};
