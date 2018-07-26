// import shipdata from './shipdata.json'; // ES6 .jsonじゃないとダメ
// import itemdata from './itemdata.json'; // ES6 .jsonじゃないとダメ
// mate-ui

// 実は、ComponentはプレーンなJavascript関数でもOKです。
// Reactコンポーネントクラス「Timer」を宣言
export default class Calc {
  // 砲撃戦（通常）
  kihon_kougekiryoku(fire,equip_fire){
    let kihon_kougekiryoku =  fire + equip_fire + 5;
    return kihon_kougekiryoku;
  }
  // 砲撃戦（空母系）
  kihon_kougekiryoku_kuubo(fire,torpedo,bomb){
    let kihon_kougekiryoku =  (fire + torpedo + (bomb * 1.3))*1.5 + 55;
    kihon_kougekiryoku  = Math.floor(kihon_kougekiryoku);
    return kihon_kougekiryoku;
  }
  // 雷撃戦威力
  raigeki_kihon_kougekiryoku(max_torpedo,equip_torpedo){
    //for(let key2 in equips) {
    //  torpedo = torpedo + equips[key2].torpedo;
    //  kaisyuu_kyoukati = kaisyuu_kyoukati + Math.sqrt(equips[key2].mas)*1.2;
    //}

    let kihon_kougekiryoku = max_torpedo + equip_torpedo + 5;
    return kihon_kougekiryoku;
  }

  expert_hosei(equips){
    let hosei = 0;
    let surottosuu = 0;
    let ichisuromesoubi = 0;
    for(let key2 in equips) {
      // 艦爆か艦攻を搭載している場合
      if (equips[key2].bomb || equips[key2].torpedo){
        if (equips[key2].mas >= 7 ) {
          // 1スロ目装備時は+0.1
          if (key2 == 1) {
            ichisuromesoubi = 0.1;
          }
          surottosuu = surottosuu + 1;
        }
      }
    }
    hosei = 1 + surottosuu*0.1 + ichisuromesoubi; 
    hosei  = Math.floor(hosei * 10) / 10;
    return hosei;
  }

  koukuusen_kougekiryoku(equips){
    for(let equip of equips) {
     console.log(equip);
     let kihonkougekiryoku = (equip.torpedo + equip.bomb ) * Math.sqrt(equip.carry) + 25;
    }
  }
}
