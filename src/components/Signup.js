// @flow

import React from "react";
import { Redirect } from "react-router-dom";

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
		  return "PasswordAuthentification is failed!"
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
        <h1>Bank of Rapperswil</h1>
        <form>
          <h2>Registrieren</h2>
          <input
            onChange={this.handleLoginChanged}
            placeholder="Login"
            value={this.state.login}
          />
          <p>{this.errorForLogin()}</p>
          <input
            onChange={this.handleFirstNameChanged}
            placeholder="Vorname"
            value={this.state.firstname}
          />
          <p>{this.errorForFirstName()}</p>
          <input
            onChange={this.handleLastNameChanged}
            placeholder="Nachname"
            value={this.state.lastname}
          />
          <p>{this.errorForLastName()} </p>
          <input
            onChange={this.handlePasswordChanged}
            placeholder="Passwort"
            type="password"
            value={this.state.password}
          />
          <p>{this.errorForPassword()}</p>
		  
		  <input
            onChange={this.handlePasswordAuthentificationChanged}
            placeholder="Passwort"
            type="password"
            value={this.state.passwordAuthentification}
          />
		  
		  <p>{this.errorForPasswordAuthentification()}</p>
          <button onClick={this.handleSubmit}>Account eröffnen</button>
        </form>
        {error && <p>Es ist ein Fehler aufgetreten!</p>}
      </div>
    );
  }
}

export default Signup;
