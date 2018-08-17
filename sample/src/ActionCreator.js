import Dispatcher from './Dispatcher';

const DATA = {
  items: [
    {name: '本', price: 500, comment: "コメントが入ります"},
    {name: '参考書', price: 2000, comment: "コメントが入ります"},
    {name: '写真集', price: 4000, comment: "コメントが入ります"},
    {name: 'パソコン', price: 50000, comment: "コメントが入ります"},
    {name: 'ケータイ', price: 10000, comment: "コメントが入ります"},
    {name: 'スマホ', price: 10000, comment: "コメントが入ります"}
  ]
}

function fetchItemModel(callback) {
  callback(DATA.items)
}


class ActionCreator {}

ActionCreator.loadListItem = () => {
  return fetchItemModel(function(data) {
    Dispatcher.dispatch({
      type: 'LOAD_LIST_ITEM',
      items: data
    })
  })
}

ActionCreator.addInCart = (item) => {
  Dispatcher.dispatch({
    type: 'ADD_CART_ITEM',
    item
  });
};

ActionCreator.removeFromCart = (idx) => {
  Dispatcher.dispatch({
    type: 'REMOVE_CART_ITEM',
    idx
  });
};

export default ActionCreator;
