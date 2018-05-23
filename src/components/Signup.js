// @flow

import React from "react";
import { Redirect } from "react-router-dom";
import { Header, Input, Button, Form, Segment, Message } from 'semantic-ui-react'
import { signup } from "../api";

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (
    login: string,
    password: string,
    callback: (error: ?Error) => void
  ) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {
      from: string
    }
  }
};

class Signup extends React.Component<{}, *> {
  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
  passwordAuthentification:"",
    error: null,
    redirectToReferrer: false
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value });
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handlePasswordAuthentificationChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ passwordAuthentification: event.target.value });
    }
  };

  errorForCredentials = (property, translated) => {
    const value = this.state[property];
    if(value.length <= 3) {
      return `Bitte wählen Sie ein gültiges ${translated} welches mindestens 4 Zeichen lang ist!`;
    }
    return null;
  };

  errorForInfo = (property, translated) => {
    const value = this.state[property];
    if(value.length <= 3) {
      return `Bitte wählen Sie ein gültiger ${translated} welches mindestens 4 Zeichen lang ist!`;
    }
    return null;
  };

  errorForLogin = () => {
    return this.errorForCredentials('login', 'Login');
  };

  errorForFirstName = () => {
    return this.errorForInfo('firstname', 'Vorname');
  };

  errorForLastName = () => {
    return this.errorForInfo('lastname', 'Nachname');
  };

  errorForPassword = () => {
    return this.errorForCredentials('password', 'Passwort');
  };

  errorForPasswordAuthentification = () => {
    const passwordAuthentification = this.state.passwordAuthentification;
    if(passwordAuthentification !== this.state.password){
      return "Passwörter stimmen nicht überein!"
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, firstname, lastname, password } = this.state;
    signup(login, firstname, lastname, password)
      .then(result => {
        this.props.authenticate(login, password, error => {
          if(error) {
            this.setState({ error });
          } else {
            this.setState({ redirectToReferrer: true, error: null });
          }
        });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    };
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Header as="h1">Bank of Rapperswil</Header>
        <Form onSubmit={this.handleSubmit}>
      <Segment stacked id="compact-form">
        <Header as="h2">Wilkommen auf dem Finanzportal</Header>
        <Form.Field>
          <Input onChange={this.handleFirstNameChanged}
          icon='user'  iconPosition='left'
          placeholder="Vorname"
          value={this.state.firstname} />
        </Form.Field>
        <p>{this.errorForFirstName()}</p>
        <Form.Field>
          <Input onChange={this.handleLastNameChanged}
          icon='user'  iconPosition='left'
          placeholder="Nachname"
          value={this.state.lastname} />
        </Form.Field>
        <p>{this.errorForLastName()} </p>
        <Form.Field>
          <Input onChange={this.handleLoginChanged}
            icon='user'  iconPosition='left'
            placeholder="Login"
            value={this.state.login} />
        </Form.Field>
        <p>{this.errorForLogin()}</p>
        <Form.Field>
          <Input onChange={this.handlePasswordChanged}
          icon='lock'  iconPosition='left'
          placeholder="Passwort"
          type="password"
          value={this.state.password} />
        </Form.Field>
        <p>{this.errorForPassword()}</p>
        <Form.Field>
          <Input onChange={this.handlePasswordAuthentificationChanged}
          icon='lock'  iconPosition='left'
          placeholder="Passwort"  type="password"
          value={this.state.passwordAuthentification} />
        </Form.Field>
        <p>{this.errorForPasswordAuthentification()}</p>
        {error && <Message negative>Es ist ein Fehler aufgetreten!</Message>}
        <Button fluid size='Large' content='Account eröffnen' color='teal' />
      </Segment>
        </Form>
     </div>
    );
  }
}

export default Signup;
