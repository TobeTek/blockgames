// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TaskMaster.sol";
import "../contracts/TodoCoin.sol";

/// @title Test For TodoCoin.sol and TaskMaster.sol
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract TestTaskMasterContract{
    address taskMasterAddress = DeployedAddresses.TaskMaster();
    address todoCoinAddress = DeployedAddresses.TodoCoin();
    function testInitialBalance() public{
        
        // TaskMaster taskMaster = TaskMaster(taskMasterAddress);
        TodoCoin todoCoin = TodoCoin(todoCoinAddress);

        uint expectedBalance = 10 ** 9 * 10 ** 18;
        uint actualBalance = todoCoin.balanceOf(taskMasterAddress);
        Assert.equal(actualBalance, expectedBalance, "Owner should have a billion (10**9) tokens");

    }

    function testTotalSupply() public{
        address accounts0 = 0x2c2D8882c9dBECE87b4829ccAc8691B15B098efF;
        TodoCoin todoCoin = new TodoCoin(accounts0);
        uint expectedBalance = 10 ** 9 * 10 ** 18;
        uint actualBalance = todoCoin.totalSupply();
        Assert.equal(actualBalance, expectedBalance, "Total Supply should be a billion tokens");

    }


    function testTransferTodoCoin() public{ 
        // address accounts0 = 0x2c2D8882c9dBECE87b4829ccAc8691B15B098efF;
        TodoCoin todoCoin = new TodoCoin(address(this));
        uint expectedBalance = 50 * 10 ** 18;
        
        address recipientAddress = 0xE0f5206BBD039e7b0592d8918820024e2a7437b9;
        todoCoin.transfer(recipientAddress, expectedBalance);
        uint actualBalance = todoCoin.balanceOf(recipientAddress);

        Assert.equal(actualBalance, expectedBalance, "50.00000000000 tokens should be transferred to 0xE0f5206BBD039e7b0592d8918820024e2a7437b9");

    }

    function testPingEndpoint() public{
        TaskMaster taskMaster = TaskMaster(taskMasterAddress);
        uint variable = 10;
        Assert.equal(taskMaster.ping(variable), variable, "Ensure the ping endpoint returns the same value that was passed to it");
    }

    // function testReward() public{
    //     TaskMaster taskMaster = new TaskMaster();
    //     address recipientAddress = 0xE0f5206BBD039e7b0592d8918820024e2a7437b9;
    //     uint rewardAmount = 50;
    //     taskMaster.rewardDoer(recipientAddress, rewardAmount);
    //     Assert.equal(10,10,"10 is right");
    // }

}
