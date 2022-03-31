const StakeForRewards = artifacts.require("StakeForRewards");

contract("StakeForRewards", function( /* accounts */ ) {
    it("should assert true", async function() {
        await StakeForRewards.deployed();
        return assert.isTrue(true);
    });
});