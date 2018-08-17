import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

const Header = (props) => {
  return(
    <div className="Header">
      <h1>{props.title}</h1>
    </div>
  )
}



class ItemList extends Component {
  constructor() {
    super()
  }
  render() {
    const {items, addInCart} = this.props
    const item_list = items.map((item, idx) => {
      return(
        <div key={idx} className="ItemList-Item">
          <h1>{ item.name }</h1>
          <p>{ item.comment }</p>
          <p className="ItemList-Price">{ item.price }円</p>
          <button type="button" onClick={() => {addInCart(item)}}>カートに入れる</button>
        </div>
      )
    })
    return (
      <div className="ItemList">
        { item_list }
      </div>
    );
  }
}

class Cart extends Component {
  constructor() {
    super()
  }

  get_amount(list) {
    if (list) {
      let result = 0
      list.forEach(function (item) {
        result += item.price
      })
      return result
    }else{
      return 0
    }
  }

  make_cart_list(list) {
    if (list) {
      const item_list = list.map((item, idx) => {
        return(
          <div key={idx} className="Cart-ItemList-Item">
            <h1>{ item.name }</h1>
            <p className="Cart-ItemList-Price">{ item.price }円</p>
            <button type="button">カートから出す</button>
          </div>
        )
      })
      return item_list
    }else {
      const not_exist_message =
        <div className="Cart-ItemList-Item">
          カートに商品がありません
        </div>
      return not_exist_message
    }
  }

  render() {
    const {cartItems} = this.props
    const item_list = this.make_cart_list(cartItems)
    const amount_price = this.get_amount(cartItems)
    const amount_text = `計 ${cartItems.length} 点 : ${amount_price} 円`
    return (
      <div className="Cart">
        カート
        <hr />
        <div className="Cart-ItemList">
          {item_list}
        </div>
        <div className="Cart-Amount">
          {(amount_price) ? amount_text : ''}
        </div>
      </div>
    );
  }
}



class App extends Component {
  constructor() {
    super()
    this.state = ({
      items: [
        {name: '本', price: 500, comment: "コメントが入ります"},
        {name: '参考書', price: 2000, comment: "コメントが入ります"},
        {name: '写真集', price: 4000, comment: "コメントが入ります"},
        {name: 'パソコン', price: 50000, comment: "コメントが入ります"},
        {name: 'ケータイ', price: 10000, comment: "コメントが入ります"}
      ],
      cartItems: [
        {name: '本', price: 500, comment: "コメントが入ります"},
        {name: '参考書', price: 2000, comment: "コメントが入ります"}
      ]
    })
    this.addInCart = this.addInCart.bind(this)
  }

  addInCart (item) {
    let newCartItems = this.state.cartItems.slice();
    newCartItems.push(item);
    this.setState({ cartItems: newCartItems });
  }

  render() {
    const {items, cartItems} = this.state
    const addInCart = this.addInCart
    return (
      <div className="App">
        <Header title="Tokkunn Store" />
        <ItemList items={items} addInCart={addInCart} />
        <Cart cartItems={cartItems} />
      </div>
    );
  }
}

export default App;
