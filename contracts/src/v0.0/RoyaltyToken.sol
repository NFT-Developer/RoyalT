pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoyaltyToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public originToken;
    mapping(uint256 => uint256) public originId;
    mapping(uint256 => bool) public forSale;
    mapping(uint256 => uint256) public price;

    constructor() ERC721("Royalty Token", "RYLT") {}

    function setOriginToken(address _originToken) public onlyOwner {
        originToken = _originToken;
    }

    function mint(string memory _tokenURI, uint256 _originId)
        public
        returns (bool)
    {
        require(msg.sender == originToken, "Not authorized to mint");
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        originId[tokenId] = _originId;
        //TODO: set to owner of origin token
        _mint(originToken, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return true;
    }

    function setForSale(bool _forSale, uint256 _tokenId) public {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "Not approved or owner"
        );
        forSale[_tokenId] = _forSale;
    }

    function setPrice(uint256 _price, uint256 _tokenId) public {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "Not approved or owner"
        );
        price[_tokenId] = _price;
    }

    function purchase(uint256 _tokenId) public payable {
        require(_exists(_tokenId), "Token does not exist");
        require(forSale[_tokenId], "Token not for sale");
        require(msg.value >= price[_tokenId], "Token price not met");
        // TODO Register sale with Royalty manager
        forSale[_tokenId] = false;
        _transfer(ownerOf(_tokenId), msg.sender, _tokenId);
    }
}
