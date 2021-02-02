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
          <link async rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.0/dist/semantic.min.css"
          />
          <h3>Open Campaigns</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                {this.renderCampaigns()}
              </Grid.Column>
              <Grid.Column width={4}>
                <Button
                  content='Create Campaign'
                  icon='add'
                  primary
                  labelPosition='left'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex;