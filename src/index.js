require("babel-polyfill")
const React = require("react")
const ReactDOM = require("react-dom")
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'
import Timer from './components/timer.js'
import shipdata from './shipdata.json'; // ES6 .jsonじゃないとダメ
import itemdata from './itemdata.json'; // ES6 .jsonじゃないとダメ



// Actions
const INCREMENT_COUNTER = {
  type: 'INCREMENT_COUNTER'
};
const DECREMENT_COUNTER = {
  type: 'DECREMENT_COUNTER'
};

// Reducer
function counterReducer(state = {count: 0}, action) {
  //const deck ={"version":4,"f1":{"s1":{"id":"22","lv":0,"luck":-1,"items":{}},"s2":{"id":"45","lv":0,"luck":-1,"items":{}}}}
  //const deck ={"version":4,"f1":{"s1":{"id":"22","lv":3,"luck":-1,"items":{"i1":{"id":2,"rf":"3"}}},"s2":{"id":"45","lv":0,"luck":-1,"items":{}}}}
  const deck ={"version":4,"f1":{"s1":{"id":"22","lv":3,"luck":-1,"items":{"i1":{"id":2,"rf":"3"},"i2":{"id":11,"rf":0}}},"s2":{"id":"45","lv":0,"luck":-1,"items":{}}}}
  //console.log(shipdata);
  //console.log(deck.f1.s1);
  //deck.f1.map(x => console.log(x));
  for(let key in deck.f1) {
    //console.log(deck.f1[key]);
    let ship = shipdata.find(ship => ship.id === deck.f1[key].id);
    console.log(ship);
    let items = deck.f1[key].items;
    for(let key2 in items) {
      let item = itemdata.find(item => item.id === items[key2].id);
      console.log(item);
    }
  }
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return {count: state.count + 1};
    case 'DECREMENT_COUNTER':
      return {count: state.count - 1};
    default:
      return state
  }
}

// Store
const store = createStore(counterReducer);

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(INCREMENT_COUNTER),
    onDecrement: () => dispatch(DECREMENT_COUNTER)
  };
}

// ReactとReduxをつなぐ
// 別ファイルの場合はexport default こっちのほうが一般的かも
let TimerApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <Provider store={store}>
      <TimerApp name="Filange" seconds={180} />
      </Provider>,
      document.getElementById("root")
    )
})
