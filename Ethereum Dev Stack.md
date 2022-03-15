
# Ethereum Development Stack and Quick Start

Ethereum Development Frameworks are SDKs that make Smart Contract development, testing, deployment, and management easier for blockchain developers. 

A brief comparison of three smart contract development frameworks.
### Truffle
[![Truffle](https://res.cloudinary.com/practicaldev/image/fetch/s--6c327WAV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z0ejoluacb2it0o368x2.PNG)](https://trufflesuite.com/)
Truffle is based on JavaScript, and has been around for a while.
1.  Truffle with 12k Github stars has a built-in smart contract compilation, linking, deployment and binary management(managing binary files).
2.  The framework supports scripting and is scalable.
3.  It also provides Network management for deploying to any number of public & private networks.
4.  It has the features of Package management with EthPM & NPM, using the ERC190 standard.
5.  Interactive console for direct contract communication.
6.  It supports migrations and tracks state on networks.
7. Extensive tutorials and resources for learning.

### Hardhat
[![Hardhat](https://res.cloudinary.com/practicaldev/image/fetch/s--sLJrLCOR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6pfx2hzn5eub8ne7biv2.png)](https://nomiclabs.io/)
1.  Hardhat with 2.1k stars on Github has the same features of building, compiling, and testing smart contracts as that of Truffle.
2.  It focuses on Solidity debugging, featuring stack traces, and explicit error messages when transactions fail.
4.  Workflows and plugins are customizable in Hardhat.

### Brownie
 -  For Python lovers Brownie which has 1.3k stars on github is a great option of development and testing framework.
 -  It supports Solidity and Vyper.
 -  Contract testing is done via pytest.
 -  The debugging tools are similar to that of truffle but with python-style tracebacks and custom error strings.
 -  It also has a Built-in console for quick project interaction and support for ethPM packages
### Others
 - Remix 
 - Embark.js 
 - OpenZeppelin SDK

## Creating a Complete DApp with Solidity, Truffle, and web3.js

### Project Idea
Let's create a to-do list, with a twist. This will be a to-do list on the blockchain, where you get others to do your work for you. Of course, you have to pay them with a token, for their work.
We will create this app as the owner of the contract, and the individuals performing tasks will be referred to as doers.
As an owner, you must be able to:

 - Create a task with a title, description, and token reward amount
 - Accept a completed task 
 - Reject a completed task 
 - Reward a doer for successful review of a completed task.

As a doer you must be able to:
 - Start a task
 - Finish a task
 - Withdraw owed rewards for successful reviews of completed task.

## Let's Build!
Install truffle globally

    $ npm install -g truffle 

Create a new project folder 

    $ mkdir todocoin-dapp
    $ cd todocoin-dapp
Create a new NPM project

    $ npm init -y

    $ npm install -E @openzeppelin/contracts

   
After setting up `truffle.config.js`, deploy using:

    $ truffle migrate --network development

