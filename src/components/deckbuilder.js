const React = require("react")
import shipdata from './shipdata.json'; // ES6 .jsonじゃないとダメ
import itemdata from './itemdata.json'; // ES6 .jsonじゃないとダメ
// mate-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';

// 実は、ComponentはプレーンなJavascript関数でもOKです。
// Reactコンポーネントクラス「Timer」を宣言
class Timer extends React.Component {
  // propsをそのまま渡すだけなら、constructorを定義しなくとも構いません。
  constructor(props) {                                  // （4）
    super(props);
    let equips = ['name': 'aaa','name': 'bbb','name': 'ccc','name': 'ddd','name': 'eee','name': 'fff'];
    let ship = {'name':'aaa','equips': equips};
    let org = [ship,ship,ship,ship,ship,ship];
    // React.Componentではここでstateの初期設定
    this.state = {remaining : this.props.seconds, org : org};      // （2）
    this.changeText = this.changeText.bind(this);
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

  changeText(e) {
    //this.setState({textValue: 'bbb' });
    this.setState({textValue: this.refs.inputText.value });
    console.log(this.state.textValue);
   const deckValue = '{"version":4,"f1":{"s1":{"id":"281","lv":58,"luck":-1,"items":{"i1":{"id":144,"rf":0,"mas":7},"i2":{"id":144,"rf":0,"mas":7},"i3":{"id":94,"rf":0,"mas":7},"i4":{"id":54,"rf":0,"mas":7}}},"s2":{"id":"487","lv":91,"luck":-1,"items":{"i1":{"id":5,"rf":0},"i2":{"id":5,"rf":0},"i3":{"id":47,"rf":0}}},"s3":{"id":"434","lv":79,"luck":-1,"items":{"i1":{"id":193,"rf":0},"i2":{"id":68,"rf":0},"i3":{"id":68,"rf":0}}},"s4":{"id":"435","lv":79,"luck":-1,"items":{"i1":{"id":68,"rf":0},"i2":{"id":68,"rf":0},"i3":{"id":68,"rf":0}}},"s5":{"id":"418","lv":83,"luck":-1,"items":{"i1":{"id":45,"rf":0},"i2":{"id":149,"rf":0},"i3":{"id":149,"rf":0}}},"s6":{"id":"468","lv":85,"luck":-1,"items":{"i1":{"id":68,"rf":0},"i2":{"id":45,"rf":0},"i3":{"id":47,"rf":0}}}}}';
    //const deckValue = this.state.textValue;
    let org=[];
    try {
      const deck = JSON.parse(deckValue);
      for(let key in deck.f1) {
        //console.log(deck.f1[key]);
        let items = deck.f1[key].items;
        let equips=[];
        for(let key2 in items) {
          let item = itemdata.find(item => item.id === items[key2].id);
          equips.push({name: item.name});
        }
        console.log(equips.length);
        for (let i = equips.length; i < 6 ; i++) {
          equips.push({name: ''});
        }
        // 艦娘idから名前を割り出す
        console.log(equips);
        let ship = shipdata.find(ship => ship.id === deck.f1[key].id);
        org.push({name: ship.name, equips: equips});
      }
      console.log(org);
      this.setState({org: org });
    } catch (e) {
      //  return defaultVal;
    }
  }

  render() {
    
    const items = [];

    for (let i = 0; i < 6; i++) {
      // Row にkeyを設定しないと警告される
      const equips = [];
      for (let equip in this.state.org[i].equips) {
        equips.push(
            <TableRowColumn>{this.state.org[i].equips[equip].name}</TableRowColumn>
            )
      }
      items.push(
          <TableRow key={i}>
          <TableRowColumn>{this.state.org[i].name}</TableRowColumn>
          {equips}
          </TableRow>
          )
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
        <input defaultValue={this.props.deck} ref='inputText'/ >
        <RaisedButton onClick={this.changeText}>keisan</RaisedButton>
        <Table>
        <TableHeader displaySelectAll={false}>
        <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {items}
        </TableBody>

        </Table>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Timer
