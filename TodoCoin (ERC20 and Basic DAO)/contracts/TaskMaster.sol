// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TodoCoin.sol";

contract TaskMaster {

  TodoCoin todoCoinInterface;

  address public owner;

  modifier onlyOwner(){
    require(msg.sender == owner, "Only Owner can call this function");
    _;
  }

  constructor() {
    owner = msg.sender;
  } 

  function rewardDoer(address doer, uint amount) public onlyOwner{
      todoCoinInterface.transfer(doer, amount);
  }

  function ping(uint randomNo) public pure returns(uint){
    return randomNo;
  }

  function setTodoCoinAddress(address _todoCoinAddress) public {
    todoCoinInterface = TodoCoin(_todoCoinAddress);
  }

  function getBalanceOf(address _address) public returns(uint256){
    return todoCoinInterface.balanceOf(_address);
  }
}
