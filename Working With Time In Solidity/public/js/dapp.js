// Declare toplevel variables
const toBN = Web3.utils.toBN;

let accounts = [],
  tokenDecimals;

// Login/Connect to MetaMask
const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
};

// Connect to User Wallet (MetaMask, Walleth etc.)
async function connectWallet() {
  accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log("Successfully connected to MetaMask wallet");
  refreshAccountBalance();
}

async function setDefaultAddress() {
  accounts = await window.web3.eth.requestAccounts();
  document.getElementById("user-address").innerHTML = accounts[0];
  console.log(accounts);
}

async function getDecimals() {
  let decimals = await window.contractInstance.methods
    .decimals()
    .call({ from: accounts[0] });
  console.log(decimals);
  return decimals;
}

async function getMinStakePeriod() {
  let minStakePeriod = await window.contractInstance.methods
    .minStakePeriod()
    .call({ from: accounts[0] });
  console.log("minStakePeriod: " + minStakePeriod);
  return minStakePeriod;
}

async function getTokenToWeiRate() {
  let tokenToWeiRate = await window.contractInstance.methods
    .tokenToWeiRate()
    .call({ from: accounts[0] });
  console.log("tokenToWeiRate: " + tokenToWeiRate);
  return tokenToWeiRate;
}

async function getContractOwner() {
  let owner = await window.contractInstance.methods
    .owner()
    .call({ from: accounts[0] });
  console.log("Owner: " + owner);
  return owner;
}

async function getTokenBalance() {
  let tokenBalance;
  await setDefaultAddress();
  if (accounts[0] != null) {
    console.log("Account:  " + accounts[0]);
    try {
      console.log("Calling");
      tokenBalance = await window.contractInstance.methods
        .balanceOf(accounts[0])
        .call({
          from: accounts[0],
        });
      tokenBalance /= 10 ** tokenDecimals; // Divide token by number of decimal places
    } catch (e) {
      console.log(
        "Unable to retrieve balance. Seems Web3 isn't supported on this browser."
      );
    }
  } else {
    console.log(
      "Unable to retrieve balance. Seems Web3 isn't supported on this browser."
    );
  }

  return tokenBalance;
}

async function refreshAccountBalance() {
  await setDefaultAddress();
  console.log("Account:  " + accounts[0]);
  let tokenBalance = await getTokenBalance();
  console.log("Updating");
  document.getElementById("token-balance").innerHTML =
    tokenBalance.toFixed(tokenDecimals);
}

async function getContractStats() {
  document.getElementById("min-stake-period").innerHTML =
    await getMinStakePeriod();
  document.getElementById("token-to-wei-rate").innerHTML =
    await getTokenToWeiRate();

  document.getElementById("owner-address").innerHTML = await getContractOwner();
}

async function stakeTokens() {
  try {
    let amtTokensToStake = toBN(
      document.getElementById("amt-of-tokens-to-stake").value
    );
    let rawAmtTokensToStake = amtTokensToStake * 10 ** tokenDecimals;
    let transaction = await window.contractInstance.methods
      .stakeToken(rawAmtTokensToStake)
      .send({
        from: accounts[0],
      });
    console.log(amtTokensToStake);
    updateStatusMessage(
      `Transaction Successful. ${amtTokensToStake} BBS was staked`
    );
  } catch (e) {
    updateStatusMessage(e["message"].slice(0, 55));
  }
  refreshAccountBalance();
}

async function buyTokens() {
  try {
    let amtWeiToSend = _getRawTxValue(
      document.getElementById("amt-of-eth-to-swap").value
    );
    let amtEtherToSend = Number(web3.utils.fromWei(amtWeiToSend, "ether"));
    let tokenToWeiRate = await getTokenToWeiRate();
    let tokenToEthRate = tokenToWeiRate * 10 ** 18;
    let rawExpectedAmountOfTokens = amtWeiToSend / tokenToWeiRate; // Amount also includes decimal places
    let expectedAmountOfTokens = rawExpectedAmountOfTokens / 10 ** tokenDecimals;
    console.log("amtEtherToSend " + amtEtherToSend);
    console.log(expectedAmountOfTokens);
    
    updateStatusMessage(
      `Expected Amount of Purchased Tokens: ${expectedAmountOfTokens.toFixed(
        tokenDecimals
      )}`
    );

    let transaction = await window.contractInstance.methods.buyToken().send({
      from: accounts[0],
      value: amtWeiToSend,
    });
    updateStatusMessage(
      `Transaction Successful. ${amtEtherToSend} ETH worth of tokens was purchased`
    );
  } catch (e) {
    console.log(e);
    updateStatusMessage(e["message"].slice(0, 55));
  }
  refreshAccountBalance();
}

async function claimRewards() {
  try {
    let transaction = await window.contractInstance.methods.claimReward().send({
      from: accounts[0],
    });
    console.log(transaction);
    updateStatusMessage("Successfully claimed Rewards");
  } catch (e) {
    console.log(e);
    updateStatusMessage(e["message"].slice(0, 55));
  }
  refreshAccountBalance();
}

async function modifyTokenBuyPrice(){
  try {
    let newTokenBuyPrice = toBN(
      document.getElementById("modify-token-buy-price").value
    );
    
    updateStatusMessage(
      `Expected Token To Wei Price : ${newTokenBuyPrice}`
    );
    
    let transaction = await window.contractInstance.methods
      .modifyTokenBuyPrice(newTokenBuyPrice)
      .send({
        from: accounts[0],
      });
    
    updateStatusMessage(
      `Transaction Successful. New Token To Wei Price : ${newTokenBuyPrice}`
    );
  } catch (e) {
    updateStatusMessage(e["message"].slice(0, 55));
  }
  getContractStats();
}

async function bigRedButton(){
  try {
    updateStatusMessage(
      `Are you sure you want to delete your Smart Contract? This action is irreversible`
    );
    
    let transaction = await window.contractInstance.methods
      .bigRedButton()
      .send({
        from: accounts[0],
      });
    
    updateStatusMessage(
      `Transaction Successful. Contract has been deleted.`
    );
  } catch (e) {
    updateStatusMessage(e["message"].slice(0, 55));
  }
  getContractStats();
}

function _getRawTxValue(prm) {
  return new web3.utils.BN(web3.utils.toWei(prm, "ether"));
}

function updateStatusMessage(statusMessage) {
  document.getElementById("status-message").innerText = statusMessage;
}
