import Calc from '../src/containers/calc';
// https://www.webprofessional.jp/test-react-components-jest-1/
describe('Calc', () => {
  describe('when given an incomplete todo', () => {
    it('marks the todo as completed', () => {
      console.log(Calc);
      let calc = new Calc();
      const finState = calc.kihon_kougekiryoku_kuubo(29,44,0);
      expect(finState).toEqual(164);
    });

    // {"id":143,"name":"九七式艦攻(村田隊)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":12,"bomb":0,"aac":1,"ass":5,"hit":2,"evasion":0,"seek":4,"range":0,"rarity":4,"dismantle":"[1,1,0,2]"}
    it('jyukurenhosei', () => {
      let calc = new Calc();
      let equips = [
      {"torpedo":12,"bomb":0,"mas":7},
      {"torpedo":12,"bomb":0,"mas":7},
      {"torpedo":0,"bomb":12,"mas":7}
      ];
      const finState = calc.jyukurendo_hosei(equips);
      expect(finState).toEqual(1.4);
    });
  });
});
