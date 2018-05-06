import { connect } from 'react-redux'
import Timer from '../components/timer.js'
import {INCREMENT_COUNTER, DECREMENT_COUNTER, BUILD_DECK, COUNT_DOWN} from '../actions/counter.js';

function mapStateToProps(state) {
  return {
    count: state.count,
    remaining: state.remaining,
    deck: state.deck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(INCREMENT_COUNTER),
    onDecrement: () => dispatch(DECREMENT_COUNTER),
    countDown: () => dispatch(COUNT_DOWN),
    onDeck: () => dispatch(BUILD_DECK)
  };
}

// ReactとReduxをつなぐ
// 別ファイルの場合はexport default こっちのほうが一般的かも
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
