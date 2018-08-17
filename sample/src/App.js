import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

import ActionCreator from './ActionCreator';

import ListItemStore from './store/ListItem';
import CartItemStore from './store/CartItem';

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
    this.make_cart_list = this.make_cart_list.bind(this)
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
    if (list.length) {
      const item_list = list.map((item, idx) => {
        return(
          <div key={idx} className="Cart-ItemList-Item">
            <h1>{ item.name }</h1>
            <p className="Cart-ItemList-Price">{ item.price }円</p>
            <button type="button" onClick={(idx) => {this.props.removeFromCart(idx)}}>カートから出す</button>
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
    return (
      <div className="Cart">
        カート
        <hr />
        <div className="Cart-ItemList">
          {item_list}
        </div>
        <div className="Cart-Amount">
          {`計 ${cartItems.length} 点 : ${amount_price} 円`}
        </div>
      </div>
    );
  }
}



class App extends Component {

  componentDidMount() {
    ActionCreator.loadListItem()
  }

  render() {
    const { items, cartItems } = this.state;
    const { addInCart, removeFromCart } = ActionCreator;
    return (
      <div className="App">
        <Header title="Tokkunn Store" />
        <ItemList items={items} addInCart={addInCart} />
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </div>
    );
  }
}

App.getStores = () => {
  return [ ListItemStore, CartItemStore ];
};

App.calculateState = (_prevState) => {
  return {
    items: ListItemStore.getItems(),
    cartItems: CartItemStore.getItems(),
  };
};

const app = Container.create(App);

export default app;
