import shipdata from './shipdata.json'; // ES6 .jsonじゃないとダメ
import itemdata from './itemdata.json'; // ES6 .jsonじゃないとダメ

const initialState = {
  count: 0,
  remaining: 0,
  deck: ''
}

// Reducer
// 現在の状態を示すstateが入ってくる
export default function deckbuild(state = initialState, action) {
  console.log(action.deck);
  //console.log(state.deck);
  // const deck ={"version":4,"f1":{"s1":{"id":"22","lv":3,"luck":-1,"items":{"i1":{"id":2,"rf":"3"},"i2":{"id":11,"rf":0}}},"s2":{"id":"45","lv":0,"luck":-1,"items":{}}}}
  try {
  const deck = JSON.parse(action.deck);
    for(let key in deck.f1) {
      //console.log(deck.f1[key]);
      let ship = shipdata.find(ship => ship.id === deck.f1[key].id);
      console.log(ship);
      let items = deck.f1[key].items;
      for(let key2 in items) {
        let item = itemdata.find(item => item.id === items[key2].id);
        console.log(item);
      }
    }
  } catch (e) {
  //  return defaultVal;
  }

  switch (action.type) {
    case 'BUILD_DECK':
      return {deck: state.deck + 1};
    default:
      return state
  }
}
