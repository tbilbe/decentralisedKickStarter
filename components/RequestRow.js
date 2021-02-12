import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign'

export default class RequestRow extends Component {


  onApprove = async () => {
    console.log('fire');
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });

  }



  render() {

    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    // console.log('approversCount ', approversCount);
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value.toString(), 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount.toString()} / {approversCount.toString()}</Cell>
        <Cell>
          <Button color='green' basic onClick={this.onApprove}>
            Approve
            </Button>
        </Cell>
        <Cell><Button color='red' basic>Finalize</Button></Cell>
      </Row>
    )
  }
}