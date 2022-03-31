const PaymentChannel = artifacts.require("PaymentChannel");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PaymentChannel", function (/* accounts */) {
  it("should assert true", async function () {
    await PaymentChannel.deployed();
    return assert.isTrue(true);
  });
});
