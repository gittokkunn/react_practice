import React, { Component } from 'react'
import ioClient from 'socket.io-client'
import PropTypes from 'prop-types'
import logo from './logo.svg'
import './App.css'



class TimeLine extends Component {
  constructor() {
    super()
  }

  render() {
    const {messages} = this.props
    const timeLine = messages.map((item, idx) => {
      return (
        <div className="TimeLine-List-Item">
          <div key={idx}>
            <p>name : { item.name }</p>
            <p>message : { item.message }</p>
            <hr />
          </div>
        </div>
      )
    })
    return (
      <div className="TimeLine">
        タイムライン
        <div className="TImeLine-List">
          {timeLine}
        </div>
      </div>
    );
  }
}
class RealTimeApp extends Component {
  constructor() {
    super()
    this.state = ({
      messages: [
        {name: 'tokumaru', message: 'サンプルテキスト'},
        {name: 'tokumaru', message: 'サンプルテキスト'},
        {name: 'tokumaru', message: 'サンプルテキスト'}
      ],
      post_user: "",
      new_message: ""
    })
    this.socket_client2 = ioClient('http://localhost:3002')
    this.socket_client = ioClient('http://localhost:3001')
    this.socket_client.on('send_message_res', function(data) {
      addMessage(data)
    });
    this.socket_client2.on('send_message_res2', function(data) {
      addMessage(data)
    });

    const addMessage = data => {
      let newMessages = this.state.messages.slice();
      newMessages.push(data);
      this.setState({
        messages: newMessages
      })
    };

    this.changeUser = this.changeUser.bind(this)
    this.changeMessage = this.changeMessage.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.postMessage_2 = this.postMessage_2.bind(this)
  }

  changeUser(e) {
    this.setState({post_user: e.target.value})
  }
  changeMessage(e) {
    this.setState({new_message: e.target.value})
  }

  postMessage() {
    this.socket_client.json.emit('send_message_req', {
      name: this.state.post_user,
      message: this.state.new_message
    });
    this.setState({
      post_user: '',
      new_message: ''
    })
  }

  postMessage_2() {
    console.log('a');
    this.socket_client2.json.emit('send_message_req2', {
      name: this.state.post_user,
      message: this.state.new_message
    });
    this.setState({
      post_user: '',
      new_message: ''
    })
  }

  render() {
    const {messages, post_user, new_message} = this.state
    const changeUser = this.changeUser
    const changeMessage = this.changeMessage
    const postMessage = this.postMessage
    const postMessage_2 = this.postMessage_2

    return (
      <div className="App">
        <div>
          <div>
            <input type="text" onChange={changeUser} value={post_user} placeHolder="ユーザ名を入力"/>
          </div>
          <div>
            <input type="text" onChange={changeMessage} value={new_message} placeHolder="メッセージを入力"/>
          </div>
          <button type="button" onClick={postMessage}>送信</button>
          <button type="button" onClick={postMessage_2}>送信2</button>
        </div>
        <TimeLine messages={messages} />
      </div>
    );
  }
}

export default RealTimeApp;
