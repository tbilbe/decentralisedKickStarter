import React, { Component } from 'react'
import Layout from '../../components/Layout';
import { Button, Form, Input, Message, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

export default class CampaignNew extends Component {

  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true, errorMessage: '' });
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });  // sending a gas amount can be automated when doing it in the browser
      Router.pushRoute('/');
    } catch (error) {
      switch (error.message) {
        case 'MetaMask Tx Signature: User denied transaction signature.':
          this.setState({ errorMessage: 'Transaction in MetaMask rejected.' })
          break;
        default:
          this.setState({ errorMessage: `Have you used real numbers! ${<Icon name='eye' />}` })
          break;
      }
    }
    this.setState({ loading: false });

  };

  render() {
    return (
      <Layout>
        <h3>Create a new Campaign!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <Input
              label='wei'
              labelPosition='right'
              placeholder='Minimum Contribution'
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header="Oops! Something went wrong."
            content={this.state.errorMessage}
          />
          <Button loading={this.state.loading} type='submit' color='pink' >Submit</Button>

        </Form>

      </Layout>
    )
  };
}
