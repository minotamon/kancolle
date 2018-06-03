// import shipdata from './shipdata.json'; // ES6 .jsonじゃないとダメ
// import itemdata from './itemdata.json'; // ES6 .jsonじゃないとダメ
// mate-ui

// 実は、ComponentはプレーンなJavascript関数でもOKです。
// Reactコンポーネントクラス「Timer」を宣言
export default class Calc {
  // 砲撃戦（空母系）
  kihon_kougekiryoku_kuubo(fire,torpedo,bomb){
    console.log(fire);
    let kihon_kougekiryoku =  (fire + torpedo + (bomb * 1.3))*1.5 + 55;
    console.log(kihon_kougekiryoku);
    kihon_kougekiryoku  = Math.floor(kihon_kougekiryoku);
    return kihon_kougekiryoku;
  }

  jyukurendo_hosei(equips){
    let hosei = 0;
    let surottosuu = 0;
    let ichisuromesoubi = 0;
    for(let key2 in equips) {
      // 艦爆か艦攻を搭載している場合
      console.log(equips[key2]);
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
    console.log(surottosuu*0.1);
    hosei = 1 + surottosuu*0.1 + ichisuromesoubi; 
    hosei  = Math.floor(hosei * 10) / 10;
    return hosei;
  }
}
