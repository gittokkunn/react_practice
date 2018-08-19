import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './PlayGround.css';


// Home
class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        Homeページ
      </div>
    )
  }
}
// About
class About extends Component {
  render() {
    return (
      <div className="About">
        <h1>About</h1>
        著者: とっくん
      </div>
    )
  }
}
// Users
class Users extends Component {

  render() {
    const {user_list, addPoint, resetPoint} = this.props

    return (
      <div className="Users">
        <h1>ユーザ</h1>
        <button type="button" onClick={resetPoint}>ポイントリセット</button>
        <div>
          <Route exact path='/users' render={props=><UserList user_list={user_list} addPoint={addPoint}/>} />
          <Route path='/users/:id' render={props=><User user_list={user_list} match={props.match} />} />
        </div>
      </div>

    )
  }
}

// UserList
class UserList extends Component {

  render() {
    const {user_list, addPoint} = this.props
    const user_list_jsx = user_list.map((user, idx) => {
      return(
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name} </Link>
          {`: ${user.point} `}
          <button type="button" onClick={() => {addPoint(user)}}>投票する</button>
        </div>
      )
    })
    return (
      <div className="UserList">
        {user_list_jsx}
      </div>
    )
  }
}

// User
class User extends Component {
  constructor() {
    super()
    this.get_page_by_id = this.get_page_by_id.bind(this)
  }

  get_page_by_id(user_list, id) {
    return user_list.find(user => user.id === id)
  }

  render() {
    const {user_list} = this.props
    const {id} = this.props.match.params
    const user = this.get_page_by_id(user_list, id)
    return (
      <div className="User">
        <p>
          {`${user.name} : ${user.point} `}
        </p>
        <Link to={`/users`}>ユーザ一覧に戻る</Link>
      </div>
    )
  }
}



class PlayGround_2 extends Component {
  constructor() {
    super()
    this.state = {
      user_list: [
        {id: "tokkunn", name: "とっくん", point: 0},
        {id: "tokumaru", name: "とくまる", point: 0},
        {id: "tokutoku", name: "とくとく", point: 0}
      ]
    }
    this.addPoint = this.addPoint.bind(this)
    this.resetPoint = this.resetPoint.bind(this)
  }

  addPoint(user) {
    let newUserList = this.state.user_list.slice()
    newUserList.map((item, idx) => {
      if(item.id === user.id) {
        user.point++
      }
    })
    this.setState({user_list: newUserList})
  }

  resetPoint() {
    let newUserList = this.state.user_list.slice()
    newUserList.map((item, idx) => {
      item.point = 0
    })
    this.setState({user_list: newUserList})
  }

  render() {
    const {user_list} = this.state
    const addPoint = this.addPoint
    const resetPoint = this.resetPoint
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <p><Link to='/'>Home</Link></p>
            <p><Link to='/about'>About</Link></p>
            <p><Link to='/users'>Users</Link></p>
            <hr />
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/users' render={props => <Users user_list={user_list} addPoint={addPoint} resetPoint={resetPoint}/>} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default PlayGround_2;
