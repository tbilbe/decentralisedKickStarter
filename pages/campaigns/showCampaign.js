import React, { Component } from 'react'
import Layout from '../../components/Layout';
import { Card, Grid, Input, Button } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';  // bit of weird syntax but to shw it creates an instance.
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';


export default class CampaignShow extends Component {

  static async getInitialProps(props) {
    // have access to the query string on the url through a special props and the :address set up with routes.js

    // console.log('🚀 ~ file: showCampaign.js ~ line 9 ~ CampaignShow ~ getInitialProps ~ address', props.query.address)
    const campaign = Campaign(props.query.address);
    const campaignDetails = await campaign.methods.getSummary().call();
    console.log(campaignDetails)
    return {
      address: props.query.address,
      minimumContribution: campaignDetails[0].toString(),
      contractBalance: campaignDetails[1].toString(),
      requests: campaignDetails[2].toString(),
      approvers: campaignDetails[3].toString(),
      manager: campaignDetails[4]
    };
  }

  renderCards() {

    const { minimumContribution,
      contractBalance,
      requests,
      approvers,
      manager } = this.props;
    const items = [
      {
        style: { overflowWrap: 'break-word' },
        header: manager,
        meta: 'Address of manager',
        description: 'The manager created this campaign and can create requests to withdraw money to execute the campaign successfully.'
      },
      {
        header: web3.utils.fromWei(contractBalance, 'ether'),
        meta: 'Campaign balance (ether)',
        description: 'The balance is how much this contract has left to spend.',
      },
      {
        header: `${minimumContribution}`,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to the project to become an approver',
      },
      {
        header: requests,
        meta: 'Number of live requests',
        description: 'A request tries to withdraw money from the contract. Requests have to be approved and voted on by approvers',
      },
      {
        header: approvers,
        meta: 'Number of approvers',
        description: 'The number of people who have donated to this campaign',
      }
    ];
    return <Card.Group items={items} itemsPerRow={2} />
  }
  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column floated='left' width={10}>
            <h3>Campaign Details</h3>
            {this.renderCards()}
            <br></br>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button color='violet'>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>

      </Layout>
    )
  }
}