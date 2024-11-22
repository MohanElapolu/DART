// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;


contract ParObj {
    // Several state variables to store the metadata and data of the artifact
    address public admin;
    string[] public obj_list;

    // This method adds participants to the network
    // function network_participant() 
    // This method reads the metadata and data of the artifact

    // constructor records the address of the deployer
    constructor() payable {
        admin = address(msg.sender);
    }

    function view_obj_list() view public returns(string[] memory){
        return obj_list;
    }

    function getBalanceSmartContract() external view returns(uint) {
        return address(this).balance;
    }

    function Check_Obj(string[] memory obj_par) external payable returns(bool){
        bool checker = true;
        for (uint j=3; j < obj_par.length; j= j+5){
            uint i;
            for (i=0; i<obj_list.length; i++) {
                if (keccak256(abi.encodePacked(obj_list[i])) == keccak256(abi.encodePacked(obj_par[j]))){
                    break;
                }
            }
            if (i == obj_list.length) {
                checker = false;
                return checker;
            }
        }
        return checker;
    }

    // This method reads the metadata and data of the artifact
    function Add_Obj(string[] memory obj_add) external payable {
        //uint init_length = obj_list.length;
        for (uint j=1; j < obj_add.length; j= j+5){
            obj_list.push(obj_add[j]);
            }
        //for (uint j=1; j < obj_add.length; j= j+5){
        //    for (uint i=0; i<obj_list.length; i++) {
        //        if (keccak256(abi.encodePacked(obj_list[i])) != keccak256(abi.encodePacked(obj_add[j]))) {
        //            obj_list.push(obj_add[j]);
        //        }
        //    }
        //}
        //uint final_length = obj_list.length;
        //if (final_length > init_length) return true;
        //else return false;
        //return true;
    }
}