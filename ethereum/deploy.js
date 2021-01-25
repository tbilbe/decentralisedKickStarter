const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const mnemonic = 'siren avoid bird opinion choose abandon celery core wolf clap resource strong'; // 12 word mnemonic
let provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/88e5ae6f728b434c99488593a1c638d1');

const web3 = new Web3(provider); // can use this instance to deploy and interface with the rinkeby network

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`attempting to deploy from account: ${accounts[0]}`);
try {
  
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: `${compiledFactory.bytecode}` })
    .send({  gas: '1000000', from: accounts[0] });
  console.log('deployed to: ', result.options.address);
} catch (error) {
  console.log(error);
}
};


deploy();