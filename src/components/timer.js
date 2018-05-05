const React = require("react")

// 実は、ComponentはプレーンなJavascript関数でもOKです。
// Reactコンポーネントクラス「Timer」を宣言
class Timer extends React.Component {
  // propsをそのまま渡すだけなら、constructorを定義しなくとも構いません。
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
   // ここでなんかライブラリ的な？
  }

  // 終了処理として、タイマーをクリアする
  componentWillUnmount() {                              // （6）
    clearInterval(this.interval);
  }

  // Timerコンポーネントが描画する要素を記述
  render() {
    
    // propsのなかで必要なものだけ取得 
    const { count, deck, remaining, onIncrement, onDecrement, onDeck } = this.props
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <h2>{this.state.remaining} seconds remaining.</h2>
        <h2>{remaining} seconds remaining.</h2>
        <button onClick={onIncrement}>プラス</button>
        <button onClick={onDecrement}>マイナス</button>
        <input placeholder="デッキを入れてください" value={deck}/ >
        <button onClick={onDeck}>計算</button>
        カウント: {count} 回
      </div>
    );
  }
}

export default Timer
