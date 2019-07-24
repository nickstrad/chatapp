import React from 'react';
//import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import './App.css';


let ctr = 0;
const id = () => ctr++;
class App extends React.Component {
  state = {
    msg: "",
    msgs: []
  }

  componentWillMount(){
    this.client = new W3CWebSocket("ws://localhost:3001/room");

    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    this.client.onmessage = (data) => {
      const { data:msg } = data;
      const newMsgs = [...this.state.msgs];
      newMsgs.push(msg)
      this.setState({ msgs: newMsgs })
    };
  }

  sendMsg = ev => {
    ev.preventDefault();
    if(this.state.msg) {
      this.client.send(this.state.msg)
      this.setState({ msg: "" })
    }
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;
    console.log(name, value)
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="App">
        <div className="content-outer">
          <div className="msgs-list">
            {this.state.msgs.map((msg) => <div key={id()}>{msg}</div>)}
          </div>
          <div className="send-box">
            <div className="msg-area">
              <label htmlFor="msg">
                <input size={78} onChange={this.handleChange} type="text" name="msg" value={this.state.msg} />
              </label>
            </div>
            <div>
              <button type="submit" onClick={this.sendMsg}>></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
