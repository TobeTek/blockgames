// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./ERC20.sol";

/// @title Basic Staking and Reward Contract
/// @author Tobe:) 
/// @notice Stake some tokens, and claim a reward weekly
contract StakeForRewards is ERC20{

    event Staked(address indexed _staker, uint indexed _timestamp, uint _amount);
    event Claimed(address indexed _claimer, uint indexed _timestamp, uint _amount);

    /*
    The following variables have been defined OpenZeppelin's Implementation of the ERC20 Standard:
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    */

    mapping (address=>uint) private _staked;
    mapping (address=>uint) private _rewardDueDate;
    
    address public owner;

    uint public minStakePeriod = 0 days;
    uint public tokenToWeiRate; // 1 / 10000000000 

    uint public rewardPct = 1;

    // MODIFIERS
    modifier onlyOwner(){
        require(msg.sender == owner, "Only Owner can call this function");
        _;
    }
    modifier hasSufficientBalance(address _addr,uint _amount){
        require(_amount <= (balanceOf(_addr) - _staked[_addr]), "Insufficient account/token Balance");
        _;
    }

    modifier rewardIsDue(address _addr){
        require(block.timestamp >= _rewardDueDate[_addr], "Required date for claiming a reward has not been reached");
        _;
    }

    // STANDARD FUNCTIONS
    constructor(uint _stakeTime, uint _tokenToWeiRate) ERC20("Blockgames Basic Staking", "BBS") payable{
        owner = msg.sender;
        minStakePeriod = _stakeTime;
        tokenToWeiRate = _tokenToWeiRate ;
        safeMint(owner, 1000 * (10 ** decimals()));
    }

    fallback() external payable {
        uint tokenAmount = _calcTokensBought(msg.value);
        safeMint(msg.sender, tokenAmount);
    }

    // PUBLIC FUNCTIONS
    function buyToken() public payable returns(bool status, uint tokensBought){
        tokensBought = _calcTokensBought(msg.value);
        safeMint(msg.sender, tokensBought);
        return (true, tokensBought);
    }

    function stakeToken(uint _amtToStake) public hasSufficientBalance(msg.sender, _amtToStake) returns(bool, uint rewardTime){
        _rewardDueDate[msg.sender] = block.timestamp + minStakePeriod;
        _staked[msg.sender] += _amtToStake;
        
        rewardTime = _rewardDueDate[msg.sender];
        return (true, rewardTime);
    }

    function claimReward() rewardIsDue(msg.sender) public returns(bool)
    {
        _rewardDueDate[msg.sender] = block.timestamp + minStakePeriod;
        uint reward = _calcReward(msg.sender);
        safeMint(msg.sender, reward);
        return true;
    }

    function modifyTokenBuyPrice(uint _tokenToWeiRate) public onlyOwner returns(bool){
        tokenToWeiRate = _tokenToWeiRate;
        return true;
    }

    // INTERNAL UTILITY FUNCTIONS
    function safeMint(address _receiver, uint _amount) internal returns(bool){
        _mint(_receiver, _amount);
        return true;
    }

    function _calcTokensBought(uint _msgValue) internal view returns(uint tokenAmount){
        require(_msgValue >= tokenToWeiRate, "Insufficient ETH to buy tokens");
        tokenAmount = _msgValue / tokenToWeiRate;
        return tokenAmount;
    }

    function _calcReward(address _addr) internal view returns(uint rewardAmount){
        rewardAmount = (_staked[_addr] * rewardPct)/100;
        return rewardAmount;
    }

    // OPENZEPPELIN OVERRIDES
    function decimals() public override pure returns(uint8 _decimals){
        _decimals = 5;
        return _decimals;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
      ) 
      internal 
      override 
      hasSufficientBalance(from, amount)
    {
        super._transfer(from, to, amount);
    }   

    
    // DESTROY THE SMART CONTRACT
    function bigRedButton() public onlyOwner{
        selfdestruct(payable(owner));
    }
}
