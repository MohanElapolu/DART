// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;


contract NetPar {
    // Several state variables to store the metadata and data of the artifact
    address public admin;
    address[] public Par_list;

    // constructor records the address of the deployer
    constructor() payable {
        admin = address(msg.sender);
        //Par_list.push() = address(msg.sender);
        Par_list.push(address(msg.sender));
    }

    // This method adds participants to the network
    // function network_participant() 
    // This method reads the metadata and data of the artifact

    function view_par_list() external view returns(address[] memory){
        return Par_list;
    }

    function getBalanceSmartContract() external view returns(uint) {
        return address(this).balance;
    }

    function Check_Par(address par_add) external payable returns(bool){
        //if (artifact_trace1) {
        //    revert("artifact_trace is empty");
        //}
        bool checker = false;
        for (uint i=0; i<Par_list.length; i++) {
            if (Par_list[i] == par_add) {
                checker = true;
                return checker;
            }
        }
        return checker;
    }

     
     // This method reads the metadata and data of the artifact
    function Add_Par(address par_add) external payable{
        //if (artifact_trace1) {
        //    revert("artifact_trace is empty");
        //}
        if (address(msg.sender) == admin){
            //Par_list.push() = par_add;
            Par_list.push(par_add);
        }
        else {
            revert("Only admin can add participants");
        }
     }
}