// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface SBT {
  struct Soul {
    string identity;
    string url;
    uint256 score;
    uint256 timestamp;
  }
  function burn(address _soul) external;
  function getSoul(address _soul) external view returns (Soul memory);
  function hasSoul(address _soul) external view returns (bool);
  function mint(address _soul, Soul memory _soulData) external;
  function name() external view returns (string memory);
  function operator() external view returns (address);
  function ticker() external view returns (string memory);
  function update(address _soul, Soul memory _soulData) external;
}