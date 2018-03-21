import React from "react";
import { Form, Input, Button, Message } from 'semantic-ui-react';
import * as api from "../api";

export type Props = {};

class TransactionForm extends React.Component<Props, *> {
  state = {
    from: '',
    to: '',
    amount: '',
    success: null,
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

  errorForCredentials = (property, translated) => {
    const value = this.state[property];
    if(value <= 0.05) {
      return `Bitte wählen Sie ein gültiges ${translated} welches grösser als 0.05 ist!`;
    }
    return null;
  };

  getErrorForAmount  = () => {
    return this.errorForCredentials('amount', 'Betrag');
  };

  createTransaction = () => {
    api
      .transfer(this.state.to, this.state.amount, localStorage.token)
      .then((result) => this.setState({success: true, to: '', amount: ''}))
      .catch((e) => this.setState({success: false}));
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
		<p> {this.getErrorForAmount()}</p>
        {this.state.success == false && <Message negative>Es konnte nicht bezahlt werden! Bitte prüfen Sie Ihre Angaben.</Message>}
        {this.state.success == true && <Message positive>Erfolgreich bezahlt.</Message>}
        <Button fluid size='large' content='Bezahlen' color='teal' />
      </Form>
    );
  };

  componentDidMount() {
    this.setState({from: JSON.parse(localStorage.user).accountNr});
  }
}

export default TransactionForm;
