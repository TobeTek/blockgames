const TaskMaster = artifacts.require("TaskMaster");
const TodoCoin = artifacts.require("TodoCoin");

contract('TaskMaster', async function(accounts) {
    let owner, recipient;
    before("should set owner", () => {
        assert.isAtLeast(accounts.length, 2, 'There should be at least 2 accounts ');
        owner = accounts[0];
        recipient = accounts[1];
    });

    it("should set owner balance", async function() {
        const expectedOwnerBalance = web3.utils.toBN("1000000000000000000000000000");
        let instanceTM, instanceTC;
        instanceTM = await TaskMaster.deployed();
        instanceTC = await TodoCoin.deployed(instanceTM.address);

        var actualOwnerBalance = await instanceTC.balanceOf(instanceTM.address, { from: owner });
        assert.equal(expectedOwnerBalance.toNumber(), actualOwnerBalance.toNumber(), `Owner should have ${expectedOwnerBalance} but has ${actualOwnerBalance}`);
        return;

    });
});