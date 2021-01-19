const assert = require('assert');
const genache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(genache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');
let factory, campaignAddress, campaign, accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('100').send({
    from: accounts[0], // account[0] is manager!
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call(); // destructure the array and assign to the variable!

  campaign = await new web3.eth.Contract(
    Json.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe();