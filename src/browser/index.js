require("babel-polyfill")
const React = require("react")
const ReactDOM = require("react-dom")
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'




// Reactコンポーネントクラス「Timer」を宣言
class Timer extends React.Component {
  constructor(props) {                                  // （4）
    super(props);             
    this.state = {remaining : this.props.seconds};      // （2）
  }

  // state.remainingが正の数なら1秒減じる関数
  countDown() {
      if(this.state.remaining > 0) {
            this.setState((prevState) => ({
                  remaining : prevState.remaining - 1       // （3）
            }));      
       }
  }

  // 初期化時に、countDownメソッドを1秒ごとに呼び出すタイマーを設定
  componentDidMount() {                                  // （5）
    this.interval = setInterval(() => this.countDown(), 1000);
  }

  // 終了処理として、タイマーをクリアする
  componentWillUnmount() {                              // （6）
    clearInterval(this.interval);
  }

  // Timerコンポーネントが描画する要素を記述
  render() {
    const { count, onIncrement, onDecrement } = this.props
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <h2>{this.state.remaining} seconds remaining.</h2>
        <button onClick={onIncrement}>プラス</button>
        <button onClick={onDecrement}>マイナス</button>
        カウント: {count} 回
      </div>
    );
  }
}

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
