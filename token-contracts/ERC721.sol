// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 public tokenCounter;
    mapping(uint256 => uint256) public powerLevels;

    constructor() ERC721("MyNFT", "MNF") {
        tokenCounter = 0;
    }

    function mintMonster(address player, string memory tokenURI, uint256 power) external onlyOwner {
        _safeMint(player, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        powerLevels[tokenCounter] = power;
        tokenCounter++;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }
}
