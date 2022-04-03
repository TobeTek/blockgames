// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
/*
    Which function is called, fallback() or receive()?

           send Ether
               |
         msg.data is empty?
              / \
            yes  no
            /     \
receive() exists?  fallback()
         /   \
        yes   no
        /      \
    receive()   fallback()
    */

/// @title Timed Saving Contract
/// @author Tobe:) 
/// @notice Store some money/ETH, and be able to withdraw it only after a specific date
contract TimedSavings {
    event Deposit(uint indexed _timestamp, uint _amount);
    event Withdrawal(uint indexed _timestamp, uint _amount);

    /// @notice Stores the address of the owner of the contract
    /// @dev The address owner has admin privileges
    /// @return address of the owner
    address public owner;

    /// @notice The earliest date owner/depositor can withdraw funds
    /// @dev withdrawalDate is set in the constructor, and can not be modified 
    /// @return Returns uint the earliest withdrawal date in epoch format
    uint public withdrawalDate;


    modifier onlyOwner(){
        require(msg.sender == owner, "Only Owner can call this function");
        _;
    }
    modifier hasSufficientBalance(uint _amount){
        require(_amount <= address(this).balance, "Insufficient Contract Balance");
        _;
    }

    modifier afterDate(uint _targetDate){
        require(block.timestamp >= _targetDate, "Required date has not been reached");
        _;
    }


    constructor(uint noDays) payable{
        withdrawalDate = block.timestamp + (noDays * 1 days);
        owner = msg.sender;
    }

    // Fallback function is called when msg.data is not empty/if contract does not have a receieve function
    fallback() external payable {
        require(msg.sender == owner);
        emit Deposit(block.timestamp, msg.value);
    }

    function depositAmount() public onlyOwner payable returns(bool){
        emit Deposit(block.timestamp, msg.value);
        return true;
    }
    
    function withdrawAmount(uint256 amount) 
        public 
        hasSufficientBalance(amount) 
        afterDate(withdrawalDate)
        returns(bool sent, bytes memory data)
    {
        (sent, data) = payable(owner).call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function closeAccount() 
        public 
        onlyOwner
        afterDate(withdrawalDate)
    {
        selfdestruct(payable(owner));
    }

    function balance() public view returns(uint _balance){
        _balance = address(this).balance;
    }
}