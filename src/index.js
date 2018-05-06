require("babel-polyfill")
const React = require("react")
import { Provider } from 'react-redux'
import { createStore } from 'redux'
const ReactDOM = require("react-dom")
import counterReducer from './reducers/counter.js'
import DeckBuilderReducer from './reducers/deckbuilder.js'
import TimerApp from './containers/timerapp.js'
import DeckBuilder from './containers/deckbuilder.js'

// Store
const store = createStore(counterReducer);
const store2 = createStore(DeckBuilderReducer);


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <div>
      <Provider store={store}>
        <TimerApp name="Filange" seconds={180} />
      </Provider>
      <Provider store={store2}>
        <DeckBuilder />
      </Provider>
      </div>,
      document.getElementById("root")
    )
})
