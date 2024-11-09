// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameKey is ERC1155 {
    constructor() ERC1155("TODO: provide a url that resolves to game id") {}

    function mint(address to, uint256 tokenId, uint256 amount) external {
        _mint(to, tokenId, amount, "");
    }
}
