// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    
    uint totalWaves;
    uint private seed;

    struct Wave{
        address waver;
        string message;
        uint timestamp;
    }

    // Array of structs to store all the waves sent to this SmartContract
    Wave[] waves;

    event NewWave(address indexed from, uint timestamp, string message);

    mapping(address => uint) public lastWavedAt;

    
    constructor() payable {
        console.log("Heylo, I am a Smart-Contract written by Vitalik Nakomoto!");
        
    }

    function wave(string memory _message) public {
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s, did you wave at me with %s?", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        uint randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50){
            console.log("%s won", msg.sender);
            uint prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Contract does not have sufficient money");
            (bool success,) = (msg.sender).call{value:prizeAmount}("");
            require(success, "Failed to send money");
  
        }

    }

    function getAllWaves() view public returns(Wave[] memory){
        return waves;
    }

    function getTotalWaves() view public returns (uint) {
        console.log("We have %d no of waves", totalWaves);
        return totalWaves;
    }


}






