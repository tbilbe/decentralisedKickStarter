import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x19BC26C318bF79D41d81B7A8c245BAF13d50cAD9'
);

export default instance;