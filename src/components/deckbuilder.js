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
    const deck2 = '{"version":4,"f1":{"s1":{"id":"281","lv":58,"luck":-1,"items":{"i1":{"id":144,"rf":0,"mas":7},"i2":{"id":144,"rf":0,"mas":7},"i3":{"id":94,"rf":0,"mas":7},"i4":{"id":54,"rf":0,"mas":7}}},"s2":{"id":"487","lv":91,"luck":-1,"items":{"i1":{"id":5,"rf":0},"i2":{"id":5,"rf":0},"i3":{"id":47,"rf":0}}},"s3":{"id":"434","lv":79,"luck":-1,"items":{"i1":{"id":193,"rf":0},"i2":{"id":68,"rf":0},"i3":{"id":68,"rf":0}}},"s4":{"id":"435","lv":79,"luck":-1,"items":{"i1":{"id":68,"rf":0},"i2":{"id":68,"rf":0},"i3":{"id":68,"rf":0}}},"s5":{"id":"418","lv":83,"luck":-1,"items":{"i1":{"id":45,"rf":0},"i2":{"id":149,"rf":0},"i3":{"id":149,"rf":0}}},"s6":{"id":"468","lv":85,"luck":-1,"items":{"i1":{"id":68,"rf":0},"i2":{"id":45,"rf":0},"i3":{"id":47,"rf":0}}}}}';

    return (
      <div>
        <input defaultValue={deck2} ref='deckinput'/ >
        <button onClick={this.send.bind(this)}>計算</button>
      </div>
    );
  }
}

export default DeckBuilder
