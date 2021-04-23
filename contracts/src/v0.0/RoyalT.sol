pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoyalT is ERC721, Ownable {

  uint256 currentId;

  struct Item {
    string title;
  }

  struct Royalty {
    address payable holder;
    uint8 permille;
  }

  Item public originItem;

  mapping(uint256 => Royalty) private _royalties;

  constructor(string memory name, string memory symbol) ERC721(name, symbol){
    currentId = 0;
  }

  function mint(address payable holder, uint8 permille) public onlyOwner {
    _royalties[currentId] = Royalty(holder, permille);
    _safeMint(msg.sender, currentId);

    currentId++;
  }

  function setRoyaltyPermille(uint256 tokenId, uint8 permille) public onlyOwner {
    require(permille <= 1000, "Permille cannot be greater than 1000");
    Royalty storage royalty = _royalties[tokenId];
    royalty.permille = permille;
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
    // check that conditions are appropriate
  }
}
