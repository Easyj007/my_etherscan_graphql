// Import necessary module for creating a RESTDataSource
const { RESTDataSource } = require("apollo-datasource-rest");

// Ethereum address for Vitalik Buterin
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Custom data source class for interacting with Etherscan API
class EtherDataSource extends RESTDataSource {
  // Constructor to set the base URL for the Etherscan API
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  // Fetch the ether balance for a specific Ethereum address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Fetch the total supply of Ether
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Fetch the latest Ethereum price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Fetch the block confirmation time based on a gas price
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Export the EtherDataSource class for use in other files
module.exports = EtherDataSource;
