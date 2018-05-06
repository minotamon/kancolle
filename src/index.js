require("babel-polyfill")
const React = require("react")
import { Provider } from 'react-redux'
import { createStore } from 'redux'
const ReactDOM = require("react-dom")
import counterReducer from './reducers/counter.js'
import TimerApp from './containers/timerapp.js'

// Store
const store = createStore(counterReducer);


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <Provider store={store}>
      <TimerApp name="Filange" seconds={180} />
      </Provider>,
      document.getElementById("root")
    )
})
