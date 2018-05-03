require("babel-polyfill")
const React = require("react")
const ReactDOM = require("react-dom")
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'



// Action
const myAction = { type: 'ACTION_INCREMENT'};

// Reducer
// reducerは、actionを受けてstateを変更するの為のメソッドです
const myReducer = (currentState = 0, action) => {
  switch(action.type) {
    case 'ACTION_INCREMENT':
      return currentState + 1;
    default:
      return currentState;
  };
};

const store = createStore(myReducer);


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <Provider store={store}>
      <Timer name="Filange" seconds={180} />
      </Provider>,
      document.getElementById("root")
    )
})

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
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <h2>{this.state.remaining} seconds remaining.</h2>
      </div>
    );
  }
}

// このへんにロジックをぶちこんでいく
function select(state) {
  return {
  }
}

export default connect(select)(Timer)
