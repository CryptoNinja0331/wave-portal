async function main() {
    const [owner, randoPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});
    await waveContract.deployed();
    console.log("Contract Address:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));
    
    let waveCount;
    //waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave("Who is Satoshi?");
    await waveTxn.wait();
    
    // contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    // console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

    waveTxn = await waveContract.wave("Wave2 Alert");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
    
    //waveCount = await waveContract.getTotalWaves();


}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

