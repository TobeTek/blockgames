# Working with Time in Solidity

What we'll cover:

- Solidity Units and Global variables
- Creating a Basic Saving Contract
- Creating a Basic Staking Contract

## Solidity Units and Global Variables

Solidity [units and global variables](https://docs.soliditylang.org/en/v0.8.13/units-and-global-variables.html)

#### Global Variables

These are special variables which exist in global workspace and provide information about the blockchain and transaction properties.

| Name                                              | Returns                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **blockhash(uint blockNumber) returns (bytes32)** | Hash of the given block _(only works for 256 most recent, excluding current, blocks)_ |
| **block.coinbase (address payable)**              | Current block miner's address                                                         |
| **block.difficulty (uint)**                       | Current block difficulty                                                              |
| **block.number (uint)**                           | Current block number                                                                  |
| **block.timestamp (uint)**                        | Current block timestamp as seconds since unix epoch                                   |
| **gasleft() returns (uint256)**                   | Remaining gas                                                                         |
| **msg.data (bytes calldata)**                     | Complete calldata                                                                     |
| **msg.sender (address payable)**                  | Sender of the message (current caller)                                                |
| **msg.sig (bytes4)**                              | First four bytes of the calldata (function identifier)                                |
| **msg.value (uint)**                              | Number of wei sent with the message                                                   |
| **tx.gasprice (uint)**                            | Gas price of the transaction                                                          |
| **tx.origin (address payable)**                   | Sender of the transaction                                                             |

### Units

Suffixes we add to literal values/data types to change/modify their behavior content.

**Ether Units:**

-       1  wei  ==  1
-      1  gwei  ==  1e9
-     1  ether  ==  1e18

**Time Units:**

- `1 == 1 seconds`
- `1 minutes == 60 seconds`
- `1 hours == 60 minutes`
- `1 days == 24 hours`
- `1 weeks == 7 days`

## Working with Time (Code)

If you've not yet setup your development environment, refer to [this guide](https://trufflesuite.com/docs/truffle/quickstart.html).
Create a project folder:

    ❯ mkdir time-events-solidity
    ❯ cd time-events-solidity

Create a new Truffle Project

    ❯ truffle init

Create a new `npm` project in the same directory:

    ❯ npm init -y

Install HD Wallet Provider
`@truffle/hdwallet-provider`can be used to sign transactions for addresses.

    ❯ npm install -E @truffle/hdwallet-provider

Install `dotenv` to use environment variables to store tokens and Private Keys:

    ❯ npm install dotenv

Install Openzeppelin's Contract library

    ❯ npm install -E @openzeppelin/contracts

    ❯ truffle create all TimedSavings
    ❯ truffle create all BasicStaking

## Basic Saving Contract

A simple contract that allows you to deposit an amount of ether, and set a date to withdraw. After the set date has been reached, the money can be withdrawn by calling a public function. Before that time the money/ETH will be unavailable.

### Contract Structure

- **fallback**: gets called whenever an address transfers ether to our contract without calling a specific function.
- **depositAmount**: a payable function that can only be called by the contract owner.
- **withdrawAmount**: allows owner to withdraw a part of his deposit after the set saving time.
- **closeAccount**: closes down/deletes contract and sends all ether balance to owner. Can only be called by owner after set saving time.
- **balance()**: get the amount of ether currently saved in the contract.
  You can use this [tool](https://www.epochconverter.com/) to convert "human time" to epoch format.

## Basic Staking Contract

We're extending an ERC20 token to support staking and rewards. Users can stake some of their tokens. When users stake their tokens, they are effectively locked and can't be transferred or spent. We're also going to have a Reward system, where users can earn 1% of their stake. They will be able to claim rewards weekly, and users who don't claim their rewards effectively lose them for that week.
[More details can be found here](https://blockgames.zuriboard.com/tutor/dashboard/task/7/submissions)  
We'll be using a rate of 1 ETH to a 1000 tokens. i.e

```
1 eth == 1e18 wei;
1000 tokens = 1e18 wei;
1 wei = 1000/1e18 = 1/1e15;
```

So when users call `buyToken`, we are going to divide `msg.value` by `1e15`. _Note we did not account for decimal places_

### Contract Structure

In addition to the standard ERC20 Interface, we have the following functions:

- **buyToken**: allows users to buy tokens by sending ether to the function.
- **stakeToken**: allows users to stake their tokens to receive rewards. Takes a parameter of the amount to stake.
- **claimReward**: allows users to claim rewards for their stakes. Implements checks to ensure the minimum stake period has been met.
- **modifyTokenBuyPrice**: allows admin/owner of the smart contract to change the token exchange/buy rate.
- **bigRedButton**: allows owner to destroy the contract. Useful in cases of an emergencies and hacks.

## Deployment on Ethereum Testnet

Follow the deployment process outlined [here](https://medium.com/coinmonks/5-minute-guide-to-deploying-smart-contracts-with-truffle-and-ropsten-b3e30d5ee1e).
You can go [here](https://iancoleman.io/bip39/) to generate a mnemonic. **This site should only be used for generating mnemonics for testing purposes!**
For Node v.17.x. if you get `Error: error:0308010C:digital envelope routines::unsupported` , use:

    $ export NODE_OPTIONS=--openssl-legacy-provider

For slow connections:

    $ export UV_THREADPOOL_SIZE=128

StakeForRewards
Contract Address: https://rinkeby.etherscan.io/address/0xa6A26C32c6Cec92907e2Dd69B5Fb926CE9627fa0#code
UI: https://dapper-bienenstitch-4563ed.netlify.app/
