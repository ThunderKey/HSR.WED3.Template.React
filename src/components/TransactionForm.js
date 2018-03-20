import React from "react";
import { Form, Input, Button } from 'semantic-ui-react';
import * as api from "../api";

export type Props = {};

class TransactionForm extends React.Component<Props, *> {
  state = {
    from: '',
    to: '',
    amount: '',
  };

  handleToChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ to: event.target.value });
    }
  };

  handleAmountChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ amount: event.target.value });
    }
  };

  createTransaction = () => {
    api
      .transfer(this.state.to, this.state.amount, localStorage.token)
      .then((result) => { console.log('success'); })
      .catch((e) => console.error(e));
  };

  render() {
    return (
      <Form onSubmit={this.createTransaction}>
        <Form.Field>
          <label>Von</label>
          <Input disabled
            placeholder = 'Von'
            value={this.state.from} />
        </Form.Field>
        <Form.Field>
          <label>An</label>
          <Input onChange={this.handleToChanged}
            placeholder = 'An'
            value={this.state.to} />
        </Form.Field>
        <Form.Field>
          <label>Betrag</label>
          <Input onChange={this.handleAmountChanged}
            placeholder = 'Betrag'
            value={this.state.amount} />
        </Form.Field>
        <Button fluid size='large' content='Speichern' color='teal' />
      </Form>
    );
  };

  componentDidMount() {
    this.setState({from: JSON.parse(localStorage.user).accountNr});
  }
}

export default TransactionForm;
