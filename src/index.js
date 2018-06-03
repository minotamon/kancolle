require("babel-polyfill")
const React = require("react")
const ReactDOM = require("react-dom")
//import DeckBuilder from './containers/deckbuilder.js'
import DeckBuilder from './components/deckbuilder.js'

// Store


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <div>
        <DeckBuilder />
      </div>,
      document.getElementById("root")
    )
})
