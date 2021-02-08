const routes = require('next-routes')();
routes
  .add('/campaigns/new', 'campaigns/new')
  .add('/campaigns/:address', 'campaigns/showCampaign')
  .add('/campaigns/:address/requests', 'campaigns/requests/index');


module.exports = routes;