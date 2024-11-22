// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;

contract ReqChain {
    // Several state variables to store the metadata and data of the artifact
    address public manager;
    string[] public artifact_trace;
    string[] public requirement_trace;
    string[] public req_trace;
    string[] public artifact_creators;
    string[] public artifact_name;
    string public temp_string;
    address public tx_creator;

     // constructor records the address of the deployer
    constructor() {
        manager = address(msg.sender);
        //artifact_trace = ['no parent artifact', 'not-applicable'];
    }

     
     // This method reads the metadata and data of the artifact
    function recordReqData(address tx_creator1, 
                            string[] memory artifact_trace1, 
                            string[] memory req_trace1, 
                            string[] memory artifact_creators1, 
                            string[] memory artifact_name1) public{
        tx_creator = tx_creator1;
        artifact_trace = artifact_trace1;
        req_trace = req_trace1;
        artifact_creators = artifact_creators1;
        artifact_name = artifact_name1;
     }

          // This method reads the metadata and data of the artifact
    function check(string memory temp_string2) public{
        temp_string = temp_string2;
     }

    // This method creates the artifact trace
    //function createobjectID()


    // This method shows the artifact trace
    function getArtifact_trace() view public returns(string[] memory) {
        //tx_creator = address(msg.sender);
        return artifact_trace;
    }

    //This method shows artifact trace;
    //function get

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
}
