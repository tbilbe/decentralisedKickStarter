// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    constructor() public {
        
    }
    
    function createCampaign(uint minimum) public {
        address factoryInvoker = msg.sender;
        address newCampaign = new Campaign(minimum, factoryInvoker);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
         string description;
         uint value;
         address recipient;
         bool complete;
         uint approvalCount;
         mapping(address => bool) didAlreadyVote;
    }
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor (uint minimum, address campaignCreator) public {
        manager = campaignCreator;
        minimumContribution = minimum;
    }
    
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true; // remember address doesnt get stored in map its a weird hash that equates to true, and defaults false if not there!
    
        approversCount++;
    }
    function createRequest(string description, uint value, address vendor) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: vendor,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.didAlreadyVote[msg.sender]); // falsy to kick out as true would show they are in the struct!
        
        request.didAlreadyVote[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finaliseRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        
        request.complete = true;
        
    }
}