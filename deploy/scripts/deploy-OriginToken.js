const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const OriginToken = await hre.ethers.getContractFactory("OriginToken");
  const originToken = await OriginToken.deploy("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000");

  await royalT.deployed();

  console.log("OriginToken deployed to:", originToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
