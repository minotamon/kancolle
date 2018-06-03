const React = require("react")
import shipdata from './shipdata.json'; // ES6 .jsonじゃないとダメ
import itemdata from './itemdata.json'; // ES6 .jsonじゃないとダメ
// mate-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';
import Calc from '../../src/containers/calc'; // ES6 .jsonじゃないとダメ

// 実は、ComponentはプレーンなJavascript関数でもOKです。
export default class DeckBuilder extends React.Component {
  // propsをそのまま渡すだけなら、constructorを定義しなくとも構いません。
  constructor(props) {                                  // （4）
    super(props);
    let equips = ['name': 'aaa','name': 'bbb','name': 'ccc','name': 'ddd','name': 'eee','name': 'fff'];
    let ship = {'name':'aaa','equips': equips};
    let org = [ship,ship,ship,ship,ship,ship];
    let result = {doukou: 100, hankou: 200};
    let results = [result,result,result,result,result,result];
    this.kousenkeitai = 'doukou';
    this.jinkei = 'tantate';
    this.sonsyou = 'syouhaika';
    this.kousenkeitai_bairitsu = {doukou:1.0, hankou:0.8, tjiyuuri:1.2, tjifuri:0.6};
    this.jinkei_bairitsu = {
        hougeki: {tantate:1.0, fukutate:0.8, rinkei:0.7, teikei:0.6, tanyoko:0.6},
        taisen: {tantate:0.6, fukutate:0.8, rinkei:1.2, teikei:1.0, tanyoko:1.3}
    };
    this.sonsyou_bairitsu = {
      hougeki:{syouhaika:1.0,tyuuha:0.7,taiha:0.4},
      raigeki:{syouhaika:1.0,tyuuha:0.8,taiha:0}
    };
    // React.Componentではここでstateの初期設定
    this.state = {remaining : this.props.seconds, org : org, results : results};      // （2）
    this.changeText = this.changeText.bind(this);
  }

  // state.remainingが正の数なら1秒減じる関数

  // 初期化時に、countDownメソッドを1秒ごとに呼び出すタイマーを設定
  componentDidMount() {                                  // （5）
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
    try {
      let calc = new Calc();
      // 艦娘データ
      let org=[];
      let results=[];
      const deck = JSON.parse(deckValue);
      for(let key in deck.f1) {
        //console.log(deck.f1[key]);
        let items = deck.f1[key].items;
        let equips=[];
        for(let key2 in items) {
          let item = itemdata.find(item => item.id === items[key2].id);
          item.mas = items[key2].mas;
          equips.push(item);
        }
        for (let i = equips.length; i < 6 ; i++) {
          equips.push({name: '', fire: 0, torpedo: 0, bomb: 0});
        }
        // 艦娘idから名前を割り出す
        let ship = shipdata.find(ship => ship.id === deck.f1[key].id);
        org.push({name: ship.name, equips: equips});

        // キャップ前補正
        
        // 攻撃力
        // let doukou = ship.fire;
        let equip_fire = 0;
        let torpedo = 0;
        let bomb = 0;
        let kihon_kougekiryoku = 0;
        // 空母系
        //if (ship.type == '軽空母'){
        if (ship.type.match(/空母/)){
          console.log('####################');
          console.log(equips);
          for(let key2 in equips) {
            console.log(equips[key2].torpedo);
            equip_fire = equip_fire + equips[key2].fire;
            torpedo = torpedo + equips[key2].torpedo;
            bomb = bomb + equips[key2].bomb;
          }
          // kihon_kougekiryoku =  (ship.max_fire + torpedo + (bomb * 1.3))*1.5 + 55;
          console.log(ship.max_fire);
          console.log(torpedo);
          console.log(bomb);
          kihon_kougekiryoku =  calc.kihon_kougekiryoku_kuubo(ship.max_fire,torpedo,bomb);
        } else {
          // 空母以外
          for(let key2 in equips) {
            equip_fire = equip_fire + equips[key2].fire;
          }
          kihon_kougekiryoku =  ship.max_fire + equip_fire + 5;
        }
        let doukou = kihon_kougekiryoku*
          this.kousenkeitai_bairitsu[this.kousenkeitai]*
          this.jinkei_bairitsu.hougeki[this.jinkei]*
          this.sonsyou_bairitsu.hougeki[this.sonsyou];
        // 計算
        results.push({doukou: doukou, hankou: 200});
      }
      console.log(org);
      this.setState({org: org,results: results});

    } catch (e) {
      //  return defaultVal;
    }
  }

  render() {
    
    const items = [];
    const results = [];

    // 艦隊分回す
    for (let i = 0; i < 6; i++) {
      // Row にkeyを設定しないと警告される
      const equips = [];
      // 装備
      for (let equip in this.state.org[i].equips) {
        equips.push(
            <TableRowColumn key='ddd'>{this.state.org[i].equips[equip].name}</TableRowColumn>
            )
      }
      // 艦娘
      items.push(
          <TableRow key={i}>
          <TableRowColumn key='aaa'>{this.state.org[i].name}</TableRowColumn>
          {equips}
          </TableRow>
          )
      // 計算結果
      results.push(
          <TableRow key={i}>
          <TableRowColumn key='bbb'>{this.state.results[i].doukou}</TableRowColumn>
          <TableRowColumn key='ccc'>{this.state.results[i].hankou}</TableRowColumn>
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

        <Table>
        <TableHeader displaySelectAll={false}>
        <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>同航戦</TableHeaderColumn>
        <TableHeaderColumn>反航戦</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {results}
        </TableBody>

        </Table>
        </div>
      </MuiThemeProvider>
    );
  }
}

// export default DeckBuilder
