import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xCf2f7B8908aE71a21a6429a53A7ceb93899EdEc8'
);

export default instance;