// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// Library that manages signature resolving
library SigManager {
    function getSigner(bytes32 _msgHsh, bytes memory _signature)
        internal
        pure
        returns (address _addr)
    {
        _addr = recoverSigner(_msgHsh, _signature);
        return _addr;
    }

    // signature methods.
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            uint8 v,
            bytes32 r,
            bytes32 s
        ) 
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }
        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, message));
        return ecrecover(prefixedHash, v, r, s);
    }
}

contract SimpleElection {
    // Election details will be stored in these variables
    string public name;
    string public description;

    // The current state of the election can be tracked from these variables
    bool public isActive = false;
    bool public isEnded = false;

    // Admin addresses
    mapping(uint256 => address) public admins;

    // Storing address of those voters who already voted
    mapping(address => bool) public voters;

    // Number of candidates in standing in the election
    uint256 public candidatesCount = 0;
    uint256 public adminCount = 0;

    // Structure of candidate standing in the election
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Storing candidates in a map
    mapping(uint256 => Candidate) public candidates;

    // Variables that store final election results
    uint256 public winnerVoteCount;

    ///@notice winnerId is an array to handle ties. In such cases, multiple Candidates would be "winners"
    uint256[] public winnerIds;

    
    
    /*
     *********************   PUBLIC FUNCTIONS   **************************
     */

    ///@param _nda : An array that contains the name and description of the election.
    constructor(string[] memory _nda, string[] memory _candidates) {
        _addAdmin(msg.sender);
        _setUpElection(_nda, _candidates);
    }

    // Add a new admin to contract
    function addAdmin(address _newAdmin) public onlyAdmin {
        _addAdmin(_newAdmin);
    }

    // Start the election and begin accepting votes
    function startElection() public onlyAdmin {
        isActive = true;
    }

    // Stop the election and stop receiving votes
    function endElection() public onlyAdmin {
        isEnded = true;
        _calcElectionWinner();
        emit ElectionEnded(winnerIds, winnerVoteCount);
    }

    // Cast vote for a candidate
    function vote(uint256 _candidateId)
        public
        electionIsStillOn
        electionIsActive
    {
        _vote(_candidateId, msg.sender);
    }

    // Allows voters to "vote" for a candidate off-chain using signatures. These signatures can then be verified on chain by a trusted 3rd Party
    function voteWithSig(
        uint256 _candidateId,
        bytes memory signature,
        address _voter
    ) public electionIsStillOn electionIsActive {
        // recover address from signature and candidate choice
        bytes32 msgHsh = keccak256(abi.encodePacked(_candidateId, _voter));
        require(
            SigManager.getSigner(msgHsh, signature) == _voter,
            "Signature is invalid for voter address!"
        );
        // effect vote
        _vote(_candidateId, _voter);
    }



    /*
     *********************   INTERNAL FUNCTIONS   **************************
     */

    // Calculate election winner
    function _calcElectionWinner()
        internal
        returns (uint256, uint256[] memory)
    {
        for (uint256 i; i < candidatesCount; i++) {
            ///@notice If we have a larger value, update winnerVoteCount, and reset winnerId
            if (candidates[i].voteCount > winnerVoteCount) {
                winnerVoteCount = candidates[i].voteCount;
                delete winnerIds;
                winnerIds.push(candidates[i].id);
            }
            ///@notice If we encounter another candidate that has the maximum number of votes, we have a tie, and update winnerIds
            else if (candidates[i].voteCount == winnerVoteCount) {
                winnerIds.push(candidates[i].id);
            }
        }

        return (winnerVoteCount, winnerIds);
    }

    // Setting of variables and data, during the creation of election contract
    function _setUpElection(string[] memory _nda, string[] memory _candidates)
        internal
    {
        require(
            _candidates.length > 0,
            "There should be at least 1 candidate."
        );
        name = _nda[0];
        description = _nda[1];
        for (uint256 i = 0; i < _candidates.length; i++) {
            _addCandidate(_candidates[i]);
        }
    }

    // Private function that effects voting on state variables
    function _vote(uint256 _candidateId, address _voter)
        internal
        onlyValidCandidate(_candidateId)
    {
        require(!voters[_voter], "Voter has already Voted!");
        voters[_voter] = true;
        candidates[_candidateId].voteCount++;

        emit VoteForCandidate(_candidateId, candidates[_candidateId].voteCount);
    }

    // Private function to add an admin
    function _addAdmin(address _newAdmin) internal {
        admins[adminCount] = _newAdmin;
        adminCount++;
    }

    //Private function to add a candidate
    function _addCandidate(string memory _name) internal {
        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            voteCount: 0
        });
        emit CandidateCreated(candidatesCount, _name);
        candidatesCount++;
    }



    /*
     *********************   MODIFIERS   **************************
     */
    modifier onlyAdmin() {
        bool isAdmin = false;
        for (uint256 i; i < adminCount; i++) {
            if (msg.sender == admins[i]) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin, "Only an admin can invoke this function.");
        _;
    }

    modifier onlyValidCandidate(uint256 _candidateId) {
        require(
            _candidateId < candidatesCount && _candidateId >= 0,
            "Invalid candidate to Vote!"
        );
        _;
    }

    modifier electionIsStillOn() {
        require(!isEnded, "Election has ended!");
        _;
    }

    modifier electionIsActive() {
        require(isActive, "Election has not begun!");
        _;
    }



    /*
     *********************   EVENTS & ERRORS  **************************
     */
    event ElectionEnded(uint256[] _winnerIds, uint256 _winnerVoteCount);
    event CandidateCreated(uint256 _candidateId, string _candidateName);
    event VoteForCandidate(uint256 _candidateId, uint256 _candidateVoteCount);

    error ElectionNotStarted();
    error ElectionHasEnded();
}
