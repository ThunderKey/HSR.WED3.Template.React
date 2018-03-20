import React from "react";
import { Table } from 'semantic-ui-react';
import moment from '../moment_and_overrides';

export type Props = {
  transactions: Array,
};

class TransactionTable extends React.Component<Props, *> {
  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Von</Table.HeaderCell>
            <Table.HeaderCell>An</Table.HeaderCell>
            <Table.HeaderCell>Betrag</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.transactions.map((o, i) =>
            <Table.Row>
              <Table.Cell>{o.from}</Table.Cell>
              <Table.Cell>{o.target}</Table.Cell>
              <Table.Cell>{o.amount}</Table.Cell>
              <Table.Cell>{o.total}</Table.Cell>
              <Table.Cell>{moment(o.date).format('L')}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  };
}

export default TransactionTable;
