const React = require("react")
// mate-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';
import Calc from '../../src/containers/calc'; // ES6 .jsonじゃないとダメ
import Deck from '../../src/containers/deck'; // ES6 .jsonじゃないとダメ

// 実は、ComponentはプレーンなJavascript関数でもOKです。
export default class DeckBuilder extends React.Component {
  // propsをそのまま渡すだけなら、constructorを定義しなくとも構いません。
  constructor(props) {                                  // （4）
    super(props);
    let equips = [];
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
    // clearInterval(this.interval);
  }

  changeText(e) {
    //this.setState({textValue: 'bbb' });
    this.setState({textValue: this.refs.inputText.value });
   const deckValue = '{"version":4,"f1":{"s1":{"id":"281","lv":58,"luck":-1,"items":{"i1":{"id":144,"rf":"5","mas":4},"i2":{"id":144,"rf":8,"mas":7},"i3":{"id":94,"rf":0,"mas":7},"i4":{"id":54,"rf":0,"mas":7}}},"s2":{"id":"487","lv":91,"luck":-1,"items":{"i1":{"id":5,"rf":0},"i2":{"id":5,"rf":0},"i3":{"id":47,"rf":0}}},"s3":{"id":"434","lv":79,"luck":-1,"items":{"i1":{"id":193,"rf":"5"},"i2":{"id":68,"rf":"7"},"i3":{"id":68,"rf":"9"}}},"s4":{"id":"435","lv":79,"luck":-1,"items":{"i1":{"id":68,"rf":0},"i2":{"id":68,"rf":0},"i3":{"id":68,"rf":0}}},"s5":{"id":"418","lv":83,"luck":-1,"items":{"i1":{"id":45,"rf":0},"i2":{"id":149,"rf":0},"i3":{"id":149,"rf":0}}},"s6":{"id":"468","lv":85,"luck":-1,"items":{"i1":{"id":68,"rf":0},"i2":{"id":45,"rf":0},"i3":{"id":47,"rf":0}}}}}';
    //const deckValue = this.state.textValue;
    try {
      let calc = new Calc();
      let deckb = new Deck();
      let org=[];
      org = deckb.parse(deckValue);

      let results=[];
      // const deck = JSON.parse(deckValue);

      for(let ship of org) {
      // for(let key in deck.f1) {
        
        // 攻撃力
        // let doukou = ship.fire;
        let equips = ship.equips;
        let equip_fire = 0;
        let torpedo = 0;
        let bomb = 0;
        let kihon_kougekiryoku = 0;
        // 空母系
        if (ship.type.match(/空母/)){
          for(let key2 in equips) {
            // equip_fireは計算してるけど使ってない
            equip_fire = equip_fire + equips[key2].fire;
            torpedo = torpedo + equips[key2].torpedo;
            bomb = bomb + equips[key2].bomb;
          }
          // kihon_kougekiryoku =  (ship.max_fire + torpedo + (bomb * 1.3))*1.5 + 55;
          kihon_kougekiryoku =  calc.kihon_kougekiryoku_kuubo(ship.max_fire,torpedo,bomb);
          // calc.koukuusen_kougekiryoku(equips);
        } else {
          // 空母以外
          for(let key2 in equips) {
            equip_fire = equip_fire + equips[key2].fire;
          }
          //kihon_kougekiryoku =  ship.max_fire + equip_fire + 5;
          kihon_kougekiryoku =  calc.kihon_kougekiryoku(ship.max_fire,equip_fire);
        }
        let doukou = kihon_kougekiryoku*
          this.kousenkeitai_bairitsu[this.kousenkeitai]*
          this.jinkei_bairitsu.hougeki[this.jinkei]*
          this.sonsyou_bairitsu.hougeki[this.sonsyou];
        // 雷撃
        let equip_torpedo = 0;
        for(let key2 in equips) {
          equip_torpedo = equip_torpedo + equips[key2].torpedo;
        }
        //kihon_kougekiryoku =  ship.max_fire + equip_fire + 5;
        kihon_kougekiryoku =  calc.raigeki_kihon_kougekiryoku(ship.max_torpedo,equip_torpedo);
        let raigeki_doukou = kihon_kougekiryoku*
          this.kousenkeitai_bairitsu[this.kousenkeitai]*
          this.jinkei_bairitsu.hougeki[this.jinkei]*
          this.sonsyou_bairitsu.hougeki[this.sonsyou];

        // 計算
        results.push({doukou: doukou, hankou: raigeki_doukou});
      }
      this.setState({org: org,results: results});

    } catch (e) {
      //  return defaultVal;
    }
  }

  render() {
    
    const items = [];
    const results = [];

    // 艦隊分回す
    //for (let i = 0; i < 6; i++) {
    for (let i in this.state.org) {
      // Row にkeyを設定しないと警告される
      const equips = [];
      // 装備
      for (let equip in this.state.org[i].equips) {
        equips.push(
            <TableRowColumn key='ddd'>{this.state.org[i].equips[equip].carry} {this.state.org[i].equips[equip].name} {this.state.org[i].equips[equip].jyukuren} {this.state.org[i].equips[equip].kaisyuu}</TableRowColumn>
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

        {/* 
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
        */}

        <TableBody displayRowCheckbox={false}>
          {items}
        </TableBody>

        </Table>

        <Table>
        <TableHeader displaySelectAll={false}>
        <TableRow>
        <TableHeaderColumn>雷撃戦威力</TableHeaderColumn>
        <TableHeaderColumn>砲撃戦威力</TableHeaderColumn>
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
