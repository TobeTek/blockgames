function createSignatureVote(
  candidateId,
  voterAddress = "0x0000000000000000000000000000000000000000"
) {
  console.log(candidateId, voterAddress);
  return web3.utils.soliditySha3(candidateId, voterAddress);
}

module.exports = { createSignatureVote };
