import { connect } from 'react-redux'
import DeckBuilder from '../components/deckbuilder.js'
import {BUILD_DECK} from '../actions/deckbuilder.js';

function mapStateToProps(state) {
  return {
    deck: state.deck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDeckBuild: (deck) => dispatch(BUILD_DECK(deck))
  };
}

// ReactとReduxをつなぐ
// 別ファイルの場合はexport default こっちのほうが一般的かも
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckBuilder)
