# Soul Bound Tokens (SBT's)

An experiment in Soul Bound Tokens (SBT's) following Vitalik's co-authored whitepaper at:
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763

On a side-note I propose a rename to Non-Transferable Tokens NTT's

Soul bound tokens (aka soulbound tokens) have been proposed as a method of allocating non-transferable data to an ethereum address.

Where as an ERC20 or NFT token can be transferred between users SBT's are static and cannot be moved between accounts.

This opens up a wide range of applications because it lets developers map data to their users in much the same way we use user databases today.

There is no current ERC standard for SBT's so this is my interpretation.

It allows the contract to associate an address with a structured data set. It also allows 3rd parties to use the contract to create profile data sets with the same structure. Users have the ability to delete their data.

Unit tests are in tests/

