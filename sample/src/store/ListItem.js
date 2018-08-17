import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';

class ListItem extends ReduceStore {
  getInitialState() {
    return {
      items: []
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'LOAD_LIST_ITEM':
      return Object.assign({}, state, {
        items: action.items.slice()
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

export default (new ListItem(Dispatcher));
