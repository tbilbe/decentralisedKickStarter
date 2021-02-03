import React, { Component } from 'react';
import instance from '../ethereum/factory';
import { Button, Card, Grid } from 'semantic-ui-react';
import Layout from '../components/Layout';

class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await instance.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const campaignList = this.props.campaigns;
    const items = campaignList.map(i => {
      return {
        header: i,
        description: <a>I am a dummy link</a>,
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
          <Button
            floated='right'
            content='Create Campaign'
            icon='add'
            primary
            labelPosition='left'
          />
          {this.renderCampaigns()}

        </div>
      </Layout>
    )
  }
}

export default CampaignIndex;