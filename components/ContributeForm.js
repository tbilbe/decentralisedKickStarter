import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';


export default class ContributeForm extends Component {

  state = {
    contribution: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.contribution, 'ether')});

      Router.replaceRoute(`/campaigns/${this.props.address}`);

    } catch (error) {
      this.setState({errorMessage: error.message});
    }
    this.setState({ loading: false, contribute: '' });

  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label='ether'
            labelPosition='right'
            value={this.state.contribution}
            onChange={event =>
              this.setState({ contribution: event.target.value })
            }
          />
          <hr />
          <Message
            error
            header="Oops! Something went wrong."
            content={this.state.errorMessage}
          />
          <Button loading={this.state.loading} type='submit' color='pink' floated='right'>Join the cause!</Button>
        </Form.Field>
      </Form>

    )
  }
}