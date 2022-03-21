# blockgames
Blockgames Program



# Build an ERC-20 Token with Truffle and Solidity
What we'll cover:
 - What is an ERC20 Token
 - What is Truffle
 - Setting up your Development Environment
 - Build an ERC20 Token from scratch
 - Deployment on Ganache
 - Deployment on Ethereum Testnet

## What is an ERC20 Token
[ERC (Ethereum Request for Comments) token standards](https://ethereum.org/en/developers/docs/standards/tokens/#:~:text=Here%20are%20some%20of%20the,for%20artwork%20or%20a%20song.) explain certain rules for all the ERC tokens built on the Ethereum blockchain. ERC standards are designed to allow ERC tokens to interact seamlessly.
**ERC-20** introduces the token standard for creating fungible tokens on the Ethereum blockchain.  Examples are Wrapped Bitcoin (WBTC), Shiba Inu (SHIB), Chainlink (LINK).

## What is Truffle
[Truffle](https://trufflesuite.com/docs/truffle/) is a development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a blockchain developer easier.

## Setting up your Development Environment
Install Truffle:

    $ npm install -g truffle

Create a project folder:

    $ mkdir erc20-project
    $ cd erc20-project
Create a new Truffle Project

    $ truffle init

Create a new `npm` project in the same directory:

    $ npm init -y    

 Install HD Wallet Provider
`@truffle/hdwallet-provider`can be used to sign transactions for addresses.

    $ npm install -E @truffle/hdwallet-provider
    
Install `dotenv` to use environment variables to store tokens and Private Keys:

    $ npm install dotenv

## Build an ERC20 Token
All ERC-20 Tokens must define the following attributes and methods:

 - **totalSupply**: Displays the total number of tokens that are currently in circulation.
 - **balanceOf**: It takes an Ethereum address as a parameter and returns the tokens allocated to that address.
 - **transfer**: Transfers tokens from one address to another at the request of respective token holders.
 - **transferFrom** : Used for a withdraw workflow, allowing contracts to transfer tokens on your behalf. This can be used for example to allow a contract to transfer tokens on your behalf and/or to charge fees in sub-currencies.
 - **approve** : Approve an amount for a spender address to withdraw from your account.
 - **allowance** : Returns the amount which a spender address is still allowed to withdraw from owner.
 

## Deployment on Ganache

  Add the following to `truffle-config.js` under `networks`:
```
development: {

host: "127.0.0.1", // Localhost (default: none)

port: 8545, // Standard Ethereum port (default: none)

network_id: "*", // Any network (default: none)

},
```
After setting up `truffle.config.js`, deploy using:

    $ truffle migrate --network development
  

## Deployment on Ethereum Testnet
You can go [here](https://iancoleman.io/bip39/) to generate a mnemonic. **This site should only be used for generating mnemonics for testing purposes!** 
Create a new file `.env`, and save your mnemonic there.
Create a new Project on [Infura](https://infura.io) and copy your endpoint/URI. Add this to your environment variables.
Modify `truffle-config.js` to access `.env`

Finally run:

    $ truffle migrate --network rinkeby                                                                                                              

to deploy to a Rinkeby testnet.

For Node v.17.x. if you get `Error: error:0308010C:digital envelope routines::unsupported` ,  use: 

    $ export NODE_OPTIONS=--openssl-legacy-provider

For slow connections:

    $ export UV_THREADPOOL_SIZE=128



Deployed Contract address:
https://rinkeby.etherscan.io/address/0x27f4fe43cc808c9dff301df8f2a94404ed4a350b#code
