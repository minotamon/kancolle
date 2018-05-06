const React = require("react")

// 実は、ComponentはプレーンなJavascript関数でもOKです。
// Reactコンポーネントクラス「Timer」を宣言
class DeckBuilder extends React.Component {

  send(e){
    this.props.onDeckBuild(this.refs.deckinput.value);
  }

  render() {
    
    // propsのなかで必要なものだけ取得 
    const { deck, onDeckBuild } = this.props;

    return (
      <div>
        <input defaultValue={deck} ref='deckinput'/ >
        <button onClick={this.send.bind(this)}>計算</button>
      </div>
    );
  }
}

export default DeckBuilder
