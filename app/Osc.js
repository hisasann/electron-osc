import React, { Component } from 'react'

var sock = new osc.OSCSocket();
sock.setBroadcast(true);
sock.bind();

class OscSender extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentDidMount() {
    console.log('OscSender');
  }

  oscSend() {
    sock.send(new osc.OSCMessage('/osc/message/ ,is 100 TextValue'), 10000);
  }

  render() {
    return (
      <div>
        <h2>OscSender</h2>
        <button onClick={this.oscSend}>sender</button>
      </div>
    );
  }
}

class OscListening extends Component {
  constructor(props) {
    super(props);
    this.state = { message: undefined };
  }

  componentDidMount() {
    console.log('OscListening');

    this.oscListen()
  }

  oscListen() {
    let socket = new osc.OSCSocket();
    socket.bind({ "port" : 10000 });
    socket.on("/osc/message/", (message) => {
      console.log('/osc/message/');
      console.log(message);

      this.setState({
        message: JSON.stringify(message)
      });
    });
  }

  render() {
    return (
      <div>
        <h2>OscListener</h2>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <OscSender />
        <OscListening />
      </div>
    );
  }
}