import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';

class CartItem extends ReduceStore {
  getInitialState() {
    return {
      items: []
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'ADD_CART_ITEM':
      return Object.assign({}, state, {
        items: _addItem(state.items, action.item)
      });
      break;
    case 'REMOVE_CART_ITEM':
      return Object.assign({}, state, {
        items: _removeItem(state.items, action.idx)
      });
      break;
    default:
      return state;
    }
  }

  getItems() {
    return this.getState().items;
  }
}

function _addItem(items, item) {
  items = items.slice();
  items.push(item);

  return items;
}

function _removeItem(items, idx) {
  items = items.slice();
  items.splice(idx, 1);

  return items;
}

export default (new CartItem(Dispatcher));
