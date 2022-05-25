// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * An experiment in Soul Bound Tokens (SBT's) following Vitalik's
 * co-authored whitepaper at:
 * https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763
 *
 * I propose for a rename to Non-Transferable Tokens NTT's
 */

contract SBT {

    struct Soul {
        string identity;
        // add issuer specific fields below
        string url;
        uint256 score;
        uint256 timestamp;
    }

    mapping (address => Soul) private souls;
    string public name;
    string public ticker;
    address public operator;
    bytes32 private zeroHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
    
    constructor(string memory _name, string memory _ticker) {
      name = _name;
      ticker = _ticker;
      operator = msg.sender;
    }

    function mint(address _soul, Soul memory _soulData) external {
        require(keccak256(bytes(souls[_soul].identity)) == zeroHash, "Soul already exists");
        require(msg.sender == operator, "Only operator can mint new souls");
        souls[_soul] = _soulData;
    }

    function burn(address _soul) external {
        require(msg.sender == _soul, "Only users have rights to delete their data");
        delete souls[_soul];
    }

    function update(address _soul, Soul memory _soulData) external {
        require(msg.sender == operator, "Only operator can update soul data");
        souls[_soul] = _soulData;
    }

    function hasSoul(address _soul) external view returns (bool) {
        if (keccak256(bytes(souls[_soul].identity)) == zeroHash) {
            return false;
        } else {
            return true;
        }
    }

    function getSoul(address _soul) external view returns (Soul memory) {
        return souls[_soul];
    }
}