// @flow

import React from "react";
import { Redirect } from "react-router-dom";
import { Header, Input, Button, Form, Segment } from 'semantic-ui-react'
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

//  inputValidation =  (String: input) => {
//    const input = this.input;
//    if(input.length === 0){
//      return "Input is empty!";
//    }
//    if(input.length <= 3){
//      return "Input is too short!";
//    }
//  }

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  errorForLogin = () => {
    const login = this.state.login;
    if(login.length === 0){
      return "Login is empty!";
    }
    if(login.length <= 3){
      return "Login is too short!";
    }
  }

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value });
    }
  };

  errorForFirstName = () => {
    const firstName = this.state.firstname;
    if(firstName.length === 0){
      return "Firstname is empty!";
    }
    if (firstName.length <=3){
      return"Firstname is too short!";
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value });
    }
  };

  errorForLastName = () => {
    const lastName = this.state.lastname;
    if(lastName.length === 0){
      return "Lastname is too empty!";
    }
    if(lastName.length <= 3){
      return "Lastname is too short!";
    }
  }

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  errorForPassword = () => {
    const password = this.state.password;
    if(password.length === 0){
      return "Password is empty!"
    }
    if(password.length <= 3){
      return "Password is too short!"
    }
  };

  handlePasswordAuthentificationChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ passwordAuthentification: event.target.value });
    }
  };
 
  errorForPasswordAuthentification = () => {
	  const passwordAuthentification = this.state.passwordAuthentification;
	  if(passwordAuthentification !== this.state.password){
		  return "Passwordauthentification is failed!"
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
			<Segment stacked>
          		<Header as="h2">Registrieren</Header>
				<Form.Field>
					<Input onChange={this.handleLoginChanged}
						icon='user'	iconPosition='left'
						placeholder="Login"
						value={this.state.login} />
				</Form.Field>
				<p>{this.errorForLogin()}</p>
				<Form.Field>
					<Input onChange={this.handleFirstNameChanged}
					icon='user'	iconPosition='left'
					placeholder="Vorname"
					value={this.state.firstname} />
				</Form.Field>
				<p>{this.errorForFirstName()}</p>
				<Form.Field>
					<Input onChange={this.handleLastNameChanged}
					icon='user'	iconPosition='left'
					placeholder="Nachname"
					value={this.state.lastname} />
				</Form.Field>
				<p>{this.errorForLastName()} </p>
				<Form.Field>
					<Input onChange={this.handlePasswordChanged}
					icon='lock'	iconPosition='left'
					placeholder="Passwort" 
					type="password"
					value={this.state.password} />
				</Form.Field>
				<p>{this.errorForPassword()}</p>
				<Form.Field>
					<Input onChange={this.handlePasswordAuthentificationChanged}
					icon='lock'	iconPosition='left'
					placeholder="Passwort"  type="password"
					value={this.state.passwordAuthentification} />
				</Form.Field>
				<p>{this.errorForPasswordAuthentification()}</p>
				<Button fluid size='Large' content='Account eröffnen' color='teal' />
				{error && <p>Es ist ein Fehler aufgetreten!</p>}
			</Segment>
        </Form>
     </div>
    );
  }
}

export default Signup;
