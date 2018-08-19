import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './PlayGround.css';

class Hello extends Component {
  render() {
    const { message } = this.props

    return (
      <div className="Sample">
        hello {message}
      </div>
    );
  }
}

class TextInput extends Component {
  constructor() {
    super()

    this.state = {
      val: 'initState',
      tmp_val: 'initState'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      tmp_val: e.target.value
    })
  }

  handleButtonClick() {
    this.setState({
      val: this.state.tmp_val
    })
  }

  render() {
    let {val} = this.state
    let {tmp_val} = this.state

    return (
      <div className="Sample">
        <input type="text" onChange={this.handleInputChange} value={tmp_val} />
        <button type="button" onClick={this.handleButtonClick}>変更</button>
        <hr />
        {val}
      </div>
    );
  }
}

// class Greeting extends Component {
//
//   render() {
//     const { isBirthday } = this.props;
//
//     return (
//       <div>
//         { (isBirthday) ? `Happy birthday!! ${isBirthday}` : 'Hello, how are you?' }
//       </div>
//     );
//   }
// }

const Greeting = (props) => {
  return (
    <div>
      { (props.isBirthday) ? 'ハピバ' : 'おはよ'}
    </div>
  )
}

Greeting.propTypes = {
  isBirthday: PropTypes.string
}

Greeting.defaultProps = {
  isBirthday: "tokkunn"
}


class TimeLine extends Component {

  render() {
    const { messages } = this.props
    const timeLine = messages.map((val, idx) => {
      return <p key={idx}>{val}</p>
    })

    return (
      <div className="TimeLine">
        以下にメッセージを表示
        <div className="TimeLine-Item">
          {timeLine}
        </div>
      </div>
    );
  }
}

TimeLine.propTypes = {
  messages: PropTypes.array
}

TimeLine.defaultProps = {
  messages: []
}

const Button = (props) => {
  return (
    <div className="Button">
      <button onClick={props.clickFunc}>
        {props.children}
      </button>
    </div>
  )
}

class SearchBox extends Component {

  constructor() {
    super()
  }

  render() {
    const {inputValue, handleSuggestValue, suggestList} = this.props
    const renderedSuggestList = suggestList.map((val, idx) => {
      return(
        <ul key={idx} className="SuggestList">
          <li>{ val }</li>
        </ul>
      )
    })

    return (
      <div className="SearchBox">
        <input value={inputValue} onChange={handleSuggestValue} />
        { renderedSuggestList }
      </div>
    );
  }
}

class PlayGround extends Component {
  constructor() {
    super()
    this.state = {
      inputMessage: "",
      messages: [],
      isBirthday: "hiroki",
      refSuggestList: [
        "ほかん",
        "きのう",
        "じっそう"
      ],
      suggestList: [],
      inputValue: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSuggestValue = this.handleSuggestValue.bind(this)
    this.setSuggestList = this.setSuggestList.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      inputMessage: e.target.value
    })
  }

  handleButtonClick() {
    const messages = this.state.messages
    messages.push(this.state.inputMessage)
    this.setState({
      inputMessage: "",
      messages: messages,
    })
    console.log(this.state.messages)
  }

  handleSuggestValue(e) {
    this.setSuggestList(e.target.value)
    this.setState({
      inputValue: e.target.value
    })
  }

  setSuggestList(val) {
    let newSuggestList = []
    this.state.refSuggestList.forEach((suggest) => {
      if(suggest.match(val) && val !== '') {
        newSuggestList.push(suggest)
      }
    })
    this.setState({
      suggestList: newSuggestList
    })
  }

  render() {
    const {inputMessage, messages, isBirthday} = this.state
    const children =
      <div key={"children"}>
        あいさつ
        <img className="Logo" src={require('./logo.svg')} />
      </div>

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Play Ground</h1>
        </header>
        {/*<Hello message="world"/>*/}
        {/*<TextInput />*/}
        {/*<Greeting isBirthday="hiroki"/>*/}
        {/*<Greeting isBirthday={isBirthday} />*/}
        {/*<input type="text" onChange={this.handleInputChange} value={inputMessage} />*/}
        {/*<button type="button" onClick={this.handleButtonClick}>コメント</button>*/}
        {/*<TimeLine messages={messages}/>*/}
        <Button clickFunc={()=>{alert('Hi')}}>
          {children}
        </Button>
        <SearchBox inputValue={this.state.inputValue} suggestList={this.state.suggestList} handleSuggestValue={this.handleSuggestValue}/>

      </div>
    );
  }
}

export default PlayGround;
