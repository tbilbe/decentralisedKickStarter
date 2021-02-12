import React, { Component } from 'react'
import Layout from '../../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Link, Router } from '../../../routes';

export default class RequestNew extends Component {

  state = {
    description: '',
    requestAmount: '',
    recipient: '',
    errorMessage: '',
    loading: false
  }

  static async getInitialProps(props) {
    const { address } = props.query;


    return { address };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(this.props.address);
    const { description, requestAmount, recipient } = this.state;
    try {
      this.setState({ loading: true, errorMessage: '' });
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(requestAmount, 'ether'),
          recipient
        )
        .send({
          from: accounts[0]
        });
      Router.Route(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });

    }
    this.setState({ loading: false, description: '', requestAmount: '', recipient: '' })
  }

  render() {
    return (
      <Layout>
        <h3>Create a new request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <Input
              label='Description'
              labelPosition='left'
              placeholder='Buy batteries for initial concept'
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              label='Amount in Ether'
              labelPosition='left'
              value={this.state.requestAmount}
              onChange={event =>
                this.setState({ requestAmount: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              label='Recipient'
              labelPosition='left'
              value={this.state.recipient}
              onChange={event =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message 
            error
            header='Oops! Something went wrong!'
            content={this.state.errorMessage}
          />
          <Button loading={this.state.loading} type='submit' color='pink'>
            Create
          </Button>
        </Form>
      </Layout>
    )
  }
}
