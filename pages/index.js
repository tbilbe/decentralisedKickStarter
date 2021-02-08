import React, { Component } from 'react';
import instance from '../ethereum/factory';
import { Button, Card, Grid } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await instance.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const campaignList = this.props.campaigns;
    const items = campaignList.map(address => {
      return {
        header: address,
        description: (
        <Link route={`/campaigns/${address}`}>
        <a className='item'>View Campaign</a>
        </Link>
        ),
        fluid: true
      }
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          
          <h3>Open Campaigns</h3>
          <Link route='campaigns/new'>
          <a className='item'>
          <Button
            floated='right'
            content='Create Campaign'
            icon='add'
            primary
            labelPosition='left'
          />
          </a>
          </Link>
          {this.renderCampaigns()}

        </div>
      </Layout>
    )
  }
}

export default CampaignIndex;