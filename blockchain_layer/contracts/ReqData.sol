// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;

//interface for stakeholder checker contract
interface Shchecker {
    function Add_Par(address) external payable;
    function Check_Par(address) external payable returns(bool);
}

//interface for artifact checker contract
interface Artchecker {
    function Add_Art(string memory) external payable;
    function Check_Art(string[] memory) external payable returns(bool);
}

//interface for object checker contract
interface Objchecker {
    function Add_Obj(string[] memory) external payable;
    function Check_Obj(string[] memory) external payable returns(bool);
}

//Reqdata contract starts here
contract ReqData {
    event Log(string message);
    // Several state variables to store the metadata and data of the artifact
    address public manager;
    address public par_con_address;
    address public art_con_address;
    address public obj_con_address;
    string[] public artifact_trace;
    string[] public requirement_trace;
    string[] public req_trace;
    //string[] public req_trace2;
    string[] public artifact_creators;
    string[] public artifact_name;
    //string public tx_hash;
    //string public temp_string;
    uint public artifact_counter;
    address public tx_creator;
    string[] public obj_security;
    bool public obj_checker;
    bool public art_checker;
    bool public sh_checker;

    // constructor records the address of the deployer
    constructor() payable {
        manager = msg.sender;
        artifact_counter = 0;
        //artifact_trace = ['no parent artifact', 'not-applicable'];
    }

    // Setting stakeholder Contract Address
    function set_par_con_address(address par_con_address1) public {
        if (manager == address(msg.sender)){
            par_con_address = par_con_address1;
        }
        else{
            revert("Only admin can make changes!");
        }
        //artifact_trace = ['no parent artifact', 'not-applicable'];
    }

    //declaring another event
    event Log1(uint par1);

    // Setting Parent Contract Addresss
    function set_art_con_address(address art_con_address1) public {
        if (manager == address(msg.sender)){
            art_con_address = art_con_address1;
        }
        else{
            revert("Only admin can make changes!");
        }
        //artifact_trace = ['no parent artifact', 'not-applicable'];
    }

    // Setting Object Contract Addresss
    function set_obj_con_address(address obj_con_address1) public {
        if (manager == address(msg.sender)){
            obj_con_address = obj_con_address1;
        }
        else{
            revert("Only admin can make changes!");
        }
        //artifact_trace = ['no parent artifact', 'not-applicable'];
    }


    function checker_art(string[] memory art_trace) public {
        art_checker = Artchecker(art_con_address).Check_Art{value: 5000000}(art_trace);
    }

    function adder_art(string memory art_trace) public {
        checker_sh(msg.sender);
        if (sh_checker) {
            Artchecker(art_con_address).Add_Art{value: 5000000}(art_trace);
        //art_checker = true;
        }
    }

    function checker_obj(string[] memory obj_trace) public {
        obj_checker = Objchecker(obj_con_address).Check_Obj{value: 5000000}(obj_trace);
    }

    function checker_sh(address par_address) public {
        sh_checker = Shchecker(par_con_address).Check_Par{value: 5000000}(par_address);
    }

    //function checker_sh(address par_address) public {
    //    try Shchecker(par_con_address).Check_Par{value: 300000}(par_address) {
    //        emit Log("The stakeholder check is successfull, hooray!");
    //    }
    //    catch {
    //        emit Log("I am failing to do stakeholder check, help me!");
    //    }
        //art_checker = true;
    //}

    function adder_obj(string[] memory obj_trace) public {
        Objchecker(obj_con_address).Add_Obj{value: 5000000}(obj_trace);
        //art_checker = true;
    }

    function getBalanceSmartContract() external view returns(uint) {
        return address(this).balance;
    }

    // This method reads the metadata and data of the artifact
    function recordReqData(address tx_creator1, 
                            string[] memory artifact_trace1, 
                            string[] memory req_trace1, 
                            string[] memory artifact_creators1, 
                            string[] memory artifact_name1,
                            string[] memory obj_security1) public{
        
        checker_sh(tx_creator1);
        //require(checker_sh, "Stakeholders are not matching");
        //sh_checker = true;
        if (sh_checker){
            if (artifact_trace1.length == 0 || req_trace1.length == 0 || artifact_name1.length == 0 || obj_security1.length == 0) {
                revert("Some of the artifact fields are empty! To make successful transactions no fields should be empty.");
            }
            else {
                checker_art(artifact_trace1);
                //art_checker = true;
                if (art_checker || (artifact_counter == 0) ) {
                    checker_obj(req_trace1);
                    //obj_checker = true;
                    if (obj_checker || (artifact_counter == 0)) {
                        tx_creator = tx_creator1;
                        artifact_trace = artifact_trace1;
                        req_trace = req_trace1;
                        artifact_creators = artifact_creators1;
                        artifact_name = artifact_name1;
                        obj_security = obj_security1;
                        //update_req_trace();
                        adder_obj(req_trace1);
                        artifact_counter = artifact_counter+1;
                        sh_checker = false;
                        obj_checker = false;
                        art_checker = false;
                    }
                    else {
                        revert("Invalid parent object! To make successful transactions, you should use existing objects as parents.");
                    }
                }
                else {
                    revert("Invalid parent artifact! To make successful transactions, you should use existing artifacts as parents.");
                }
                }
            }
            else {
                revert("Invalid participant! You should be part of orgnaization to make transactions.");
            }
        }

    // This method shows the artifact trace
    function getArtifact_trace() view public returns(string[] memory) {
        //tx_creator = address(msg.sender);
        return artifact_trace;
    }

    // This method shows the artifact trace
    function getreq_trace() view public returns(string[] memory) {
        //tx_creator = address(msg.sender);
        return req_trace;
    }

    // This method shows the artifact creators
    function getArtifact_creators() view public returns(string[] memory) {
        //tx_creator = address(msg.sender);
        return artifact_creators;
    }
    
    // This method shows the artifact name
    function getArtifact_name() view public returns(string[] memory) {
        //tx_creator = address(msg.sender);
        return artifact_name;
    }

    // This method shows the stakeholder checker
    function getshcheckers() view public returns(bool ) {
        //tx_creator = address(msg.sender); 
        return sh_checker;
    }

    // This method shows the artifact checker
    function getartcheckers() view public returns(bool ) {
        //tx_creator = address(msg.sender); 
        return art_checker;
    }

    // This method shows the object checker
    function getobjcheckers() view public returns(bool ) {
        //tx_creator = address(msg.sender); 
        return obj_checker;
    }

    // This method shows the artifact counter
    function getartcounter() view public returns(uint ) {
        //tx_creator = address(msg.sender); 
        return artifact_counter;
    }
}