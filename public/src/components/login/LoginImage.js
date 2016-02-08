import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class LoginImage extends React.Component {
  render() {
    return (
      <section className="loginImage">
        <img src="./vectors/ic_send_24px.svg" />
      </section>
    );
  }
}
