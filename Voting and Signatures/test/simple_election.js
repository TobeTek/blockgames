// Import 3rd-Party utilities and Test libraries
const { expect } = require("chai");
const {
  BN,
  ether,
  expectEvent,
  expectRevert,
  constants,
} = require("@openzeppelin/test-helpers");

// Import utilities
const testUtils = require("./test-utils.js");

// Import Smart Contract
const TimedSavings = artifacts.require("TimedSavings");

// Start test block
contract("TimedSavings", function (accounts) {
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
  const msgHsh = testUtils.createSignatureVote(1);
  console.log(msgHsh);
  
  beforeEach(async function () {
    this.piggyBank = await TimedSavings.new(zeroStakePeriod, { from: Owner });
    currentBlock = await web3.eth.getBlock("latest");
  });

  it("should make sure owner and withdrawalDate is correct", async function () {
    expect(await this.piggyBank.owner()).to.be.equal(Owner);
    console.log(currentBlock.timestamp);
    expect(await this.piggyBank.withdrawalDate()).not.to.be.equal(
      new BN(currentBlock.timestamp)
    );
  });

  it("should accept payments and update balance", async function () {
    const depositAmount = ether("1");
    await this.piggyBank.depositAmount({ value: depositAmount, from: Owner });
    expect(await this.piggyBank.balance()).to.be.bignumber.equal(depositAmount);
  });
});

// truffle(develop)> web3.utils.soliditySha3(1,"0x94e42b433866202a41de307645f76db888c7526a")
// '0x47058a705098bba106d33ae89843f253a732370b854cf6a89a7938a42f1feb28'
// truffle(develop)> let msg = web3.utils.soliditySha3(1,"0x94e42b433866202a41de307645f76db888c7526a")
// undefined
// truffle(develop)> web3.eth.sign(msg,"0x94e42b433866202a41de307645f76db888c7526a", "")

// // Start test block
// contract('SimpleCrowdsale', function([creator, investor, wallet]) {

//     const NAME = 'SimpleToken';
//     const SYMBOL = 'SIM';
//     const TOTAL_SUPPLY = new BN('10000000000000000000000');
//     const RATE = new BN(10);

//     beforeEach(async function() {
//         this.token = await SimpleToken.new(NAME, SYMBOL, TOTAL_SUPPLY, { from: creator });
//         this.crowdsale = await SimpleCrowdsale.new(RATE, wallet, this.token.address);
//         this.token.transfer(this.crowdsale.address, await this.token.totalSupply());
//     });

//     it('should create crowdsale with correct parameters', async function() {
//         expect(await this.crowdsale.rate()).to.be.bignumber.equal(RATE);
//         expect(await this.crowdsale.wallet()).to.be.equal(wallet);
//         expect(await this.crowdsale.token()).to.be.equal(this.token.address);
//     });

//     it('should accept payments', async function() {
//         const investmentAmount = ether('1');
//         const expectedTokenAmount = RATE.mul(investmentAmount);

//         await this.crowdsale.buyTokens(investor, { value: investmentAmount, from: investor });

//         expect(await this.token.balanceOf(investor)).to.be.bignumber.equal(expectedTokenAmount);
//     });
// });
