import { ethers, run, network } from "hardhat";

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deploymentTransaction();
  const contractAddress = await simpleStorage.getAddress();
  console.log(`deployed contract to: ${contractAddress}`);
  console.log(network.config);
  // check network
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.waitForDeployment();
    console.log("contractAddress: " + contractAddress);
    if (contractAddress) {
      await verify(contractAddress, []);
    }
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`${currentValue}`);
  // update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`updated value is: ${updatedValue}`);
}

async function verify(contractAddress: string, args: string[]) {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      contractAddress: contractAddress,
      arguments: args,
    });
  } catch (err) {
    console.error(err);
    // if(err.message.toLowerCase().includes("already verified") ){
    //   console.log("already verified!")
    // }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
