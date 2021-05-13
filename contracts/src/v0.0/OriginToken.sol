pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OriginToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public royaltyToken;
    address public releaseToken;
    mapping(uint256 => uint256[]) public releases;
    mapping(uint256 => uint256[]) public royalties;
    uint256 public mintFee;

    constructor(address _royaltyToken, address _releaseToken)
        ERC721("OriginToken", "OGT")
    {
        royaltyToken = _royaltyToken;
        releaseToken = _releaseToken;
        mintFee = 0;
    }

    function mint(string memory _tokenURI) public payable returns (bool) {
        require(msg.value >= mintFee, "Mint fee required");
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return true;
    }

    function setMintFee(uint256 _fee) public onlyOwner {
        mintFee = _fee;
    }

    function addRelease(uint256 _tokenId, address _release) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "Must be token holder to add release"
        );

        //TODO add release token to releases array
    }
}
