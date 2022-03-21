// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TodoCoin is ERC20{
  constructor(address _taskMasterAddress)  ERC20("TodoCoin", "TCN"){
      _mint(_taskMasterAddress, 10 ** 9 * 10 ** 18);
  }
}
