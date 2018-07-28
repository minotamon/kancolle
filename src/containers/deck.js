import shipdata from '../shipdata.json'; // ES6 .jsonじゃないとダメ
import itemdata from '../itemdata.json'; // ES6 .jsonじゃないとダメ

// 実は、ComponentはプレーンなJavascript関数でもOKです。
// Reactコンポーネントクラス「Timer」を宣言
export default class Deck {

  constructor() {                                  // （4）
    this.jyukuren = ['','|','||','|||','/','//','///','>>'];
  }

  parse(deckValue){
    // 艦娘データ
    let org=[];
    let results=[];
    const deck = JSON.parse(deckValue);
    for(let key in deck.f1) {
      // 艦娘idから名前を割り出す
      let ship = shipdata.find(ship => ship.id === deck.f1[key].id);
      //console.log(deck.f1[key]);
      let items = deck.f1[key].items;
      let equips=[];
      let slot = 0;
      for(let key2 in items) {
        let equip = {};
        let item = itemdata.find(item => item.id === items[key2].id);
        equip.name = item.name;
        equip.bomb = item.bomb;
        equip.fire = item.fire;
        equip.torpedo = item.torpedo;
        equip.mas = items[key2].mas;
        // 熟練度文字列
        equip.jyukuren = this.jyukuren[equip.mas];
        console.log(equip.jyukuren);
        equip.carry = ship.carry[slot];
        //console.log(items[key2].rf);
        equip.kaisyuu = items[key2].rf;
        //console.log(item);
        equips.push(equip);
        slot++;
      }
      ship.equips = equips;
      org.push(ship);
    }
    return org;
  }
}
