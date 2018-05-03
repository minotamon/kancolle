require("babel-polyfill")
const React = require("react")
const ReactDOM = require("react-dom")
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'
import Timer from './components/timer.js'



// Actions
const INCREMENT_COUNTER = {
  type: 'INCREMENT_COUNTER'
};
const DECREMENT_COUNTER = {
  type: 'DECREMENT_COUNTER'
};

// Reducer
function counterReducer(state = {count: 0}, action) {
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
