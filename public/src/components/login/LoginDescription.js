import React from 'react';
import autobind from 'autobind-decorator';
import LoginImage from './LoginImage';

@autobind
export default class LoginDescription extends React.Component {
  render() {
    return (
      <section className="loginDescription">
        <h1>Login</h1>
      </section>
    );
  }
};
