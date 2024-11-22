// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;


contract ParArt {
    // Several state variables to store the metadata and data of the artifact
    address public admin;
    string[] public art_list;

    // This method adds participants to the network
    // function network_participant() 
    // This method reads the metadata and data of the artifact

    // constructor records the address of the deployer
    constructor() payable {
        admin = address(msg.sender);
    }

    function view_art_list() view public returns(string[] memory){
        return art_list;
    }

    function getBalanceSmartContract() external view returns(uint) {
        return address(this).balance;
    }


    function Check_Art(string[] memory art_par) external payable returns(bool){
        //if (artifact_trace1) {
        //    revert("artifact_trace is empty");
        //}
        bool checker = false;
        for (uint j=0; j<art_par.length; j=j+2){
            for (uint i=0; i<art_list.length; i++) {
                if (keccak256(abi.encodePacked(art_list[i])) == keccak256(abi.encodePacked(art_par[j]))) {
                    checker = true;
                    return checker;
                }
            }
        }
        return checker;
    }

     
     // This method reads the metadata and data of the artifact
    function Add_Art(string memory art_add) external payable{
        //if (artifact_trace1) {
        //    revert("artifact_trace is empty");
        //}
        //art_list.push() = art_add;
        art_list.push(art_add);
        }
}