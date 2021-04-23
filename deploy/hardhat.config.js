require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const walletMnemonic = process.env.MNEMONIC;
const rinkebyUrl = process.env.RPC_URL_RINKEBY;
const etherscanAPIKey = process.env.ETHERSCAN_API_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: rinkebyUrl,
      accounts: {
        mnemonic: walletMnemonic,
        initialIndex: 4,
      },
    },
  },
  etherscan: {
    apiKey: etherscanAPIKey,
  },
};
