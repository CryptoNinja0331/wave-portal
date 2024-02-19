const { ethers } = require("hardhat");

async function main() {
    
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.001")});
    await waveContract.deployed();
    console.log("WavePortal Address: ", waveContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 