import shipdata from './shipdata.json'; // ES6 .jsonじゃないとダメ
import itemdata from './itemdata.json'; // ES6 .jsonじゃないとダメ

const initialState = {
  count: 0,
  remaining: 0,
  deck: ''
}

// Reducer
// 現在の状態を示すstateが入ってくる
export default function counterReducer(state = initialState, action) {
  //const deck ={"version":4,"f1":{"s1":{"id":"22","lv":0,"luck":-1,"items":{}},"s2":{"id":"45","lv":0,"luck":-1,"items":{}}}}
  //const deck ={"version":4,"f1":{"s1":{"id":"22","lv":3,"luck":-1,"items":{"i1":{"id":2,"rf":"3"}}},"s2":{"id":"45","lv":0,"luck":-1,"items":{}}}}
  const deck ={"version":4,"f1":{"s1":{"id":"22","lv":3,"luck":-1,"items":{"i1":{"id":2,"rf":"3"},"i2":{"id":11,"rf":0}}},"s2":{"id":"45","lv":0,"luck":-1,"items":{}}}}
  //console.log(shipdata);
  //console.log(deck.f1.s1);
  //deck.f1.map(x => console.log(x));
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
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return {count: state.count + 1,deck: ''};
    case 'DECREMENT_COUNTER':
      return {count: state.count - 1,deck: ''};
    case 'COUNT_DOWN':
      return {count: state.count,remaining: state.remaining - 1,deck: ''};
    default:
      return state
  }
}
