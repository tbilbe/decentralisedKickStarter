import React, { Component } from 'react'
import Layout from '../../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Link, Router } from '../../../routes';

export default class CampaignNew extends Component {

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

  render() {
    return (
      <Layout>
        <h3>Create a new request</h3>
        <Form>
          <Form.Field>
            <Input 
              label='Description'
              labelPosition='left'
              placeholder='Buy batteries for initial concept'
              value={this.state.description}
              onChange={event => 
                this.setState({ description: event.target.value})
              }
            />
          </Form.Field>
          <Form.Field>
            <Input 
              label='Amount in Ether'
              labelPosition='left'
              value={this.state.requestAmount}
              onChange={event => 
                this.setState({ requestAmount: event.target.value})
              }
            />
          </Form.Field>
          <Form.Field>
            <Input 
              label='Recipient'
              labelPosition='left'
              value={this.state.recipient}
              onChange={event => 
                this.setState({ recipient: event.target.value})
              }
            />
          </Form.Field>
          <Button type='submit' color='teal'>
            Create
          </Button>
        </Form>
      </Layout>
    )
  }
}
