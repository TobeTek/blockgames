


# Voting and Signatures


## Creating and Verifying Signatures
Signatures in cryptography are some kind of proof of ownership, validity, integrity, etc. They could be used to prove identities, authorize transactions, and more.
Signatures are created using mathematical formulas. We take an input message, a private key and a (usually) random secret, and we get a number as output, which is the signature.
Ethereum (and Bitcoin) use the Elliptic Curve Digital Signature Algorithm, or ECDSA for generating signatures. Note that ECDSA is _only_ a signature algorithm. Unlike RSA and AES, it cannot be used for encryption.
In order to verify a message, we need the original message, the address of the private key it was signed with, and the signature `{r, s, v}` itself.

Start `geth` to be able to sign messages:

    geth --dev --http --networkid 42 --http.api "personal,eth,net,web3,accounts" console 2>test.log --allow-insecure-unlock

## Creating an Election Smart Contract
If you've not yet setup your development environment, refer to [this guide](https://trufflesuite.com/docs/truffle/quickstart.html).
Create a project folder:

    ❯ mkdir voting-contract
    ❯ cd voting-contract

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
    
    ❯ truffle create all SimpleElection

## SimpleElection
A simple contract that allows you to create an election,  add candidates, and start/stop the election. 

### Contract Structure
 - **addAdmin**: Allows admin to distribute admin permissions to other addresses.
 - **startElection**: Only callable by admins. Used to start the election and begin accepting votes.
- **endElection**: Also only callable by admins. Used to end the election, stop accepting votes, and announce election winner(s).
- **vote**: Public function that allows the public to cast votes for a particular candidate.
- **voteWithSig**: Public function that allows a third-party to shoulder gas fees for a voter, using the voter's signature to verify the vote.

## Deployment on Ethereum Testnet
Follow the deployment process outlined [here](https://medium.com/coinmonks/5-minute-guide-to-deploying-smart-contracts-with-truffle-and-ropsten-b3e30d5ee1e).
You can go [here](https://iancoleman.io/bip39/) to generate a mnemonic. **This site should only be used for generating mnemonics for testing purposes!** 
For Node v.17.x. if you get `Error: error:0308010C:digital envelope routines::unsupported` ,  use: 

    $ export NODE_OPTIONS=--openssl-legacy-provider

For slow connections:

    $ export UV_THREADPOOL_SIZE=128

