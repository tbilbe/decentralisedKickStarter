import React, { Component } from 'react';
import Layout from '../../../components/Layout'
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
export default class RequestIndex extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button color='instagram'>
              Add Request
            </Button>
          </a>
        </Link>
      </Layout>
    )
  }
}