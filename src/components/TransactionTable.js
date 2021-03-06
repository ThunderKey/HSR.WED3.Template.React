// @flow

import React from "react";
import { Table } from 'semantic-ui-react';
import moment from '../moment_and_overrides';

export type Transaction = {
  from:   String,
  target: String,
  amount: number,
  total:  number,
  date:   String,
};

export type Props = {
  transactions: Array<Transaction>,
};

class TransactionTable extends React.Component<Props, *> {
  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Datum</Table.HeaderCell>
            <Table.HeaderCell>Von</Table.HeaderCell>
            <Table.HeaderCell>An</Table.HeaderCell>
            <Table.HeaderCell>Betrag</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.transactions.map((o, i) =>
            <Table.Row>
              <Table.Cell>{moment(o.date).format('L')}</Table.Cell>
              <Table.Cell>{o.from}</Table.Cell>
              <Table.Cell>{o.target}</Table.Cell>
              <Table.Cell>{o.amount}</Table.Cell>
              <Table.Cell>{o.total}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  };
}

export default TransactionTable;
