const Helper = require('../gekko/helper.js');
const assert = require('assert');

describe('Display Strings Module', () => {
  let display = Helper.display();
  
  describe('EMA goes above price', () => {
    it('should return string "uptrend" when the ema is greater than the current price', () => {
      let currentEma = 10;
      let currentPrice = 5;
      let result = display.ema(currentEma,currentPrice);
      assert.equal(result,"uptrend");
    });
  });
});

describe('Percentage Based Trailing Stoploss Module', () => {
  let trailingStopLoss = Helper.trailingStopLoss();
  
  describe('isTriggered', () => {
    it('Should return true when stoploss is greater than current price', () => {
      trailingStopLoss.activate(10, 5000);
      assert.equal(trailingStopLoss.triggered(100), true);
    });
    it('Should return false when stoploss is equal to the current price', () => {
      trailingStopLoss.activate(10, 100);
      assert.equal(trailingStopLoss.triggered(90), false);
    });
    it('Should return false when stoploss is less than current price', () => {
      trailingStopLoss.activate(10, 100);
      assert.equal(trailingStopLoss.triggered(1000), false);
    });
  });
});
    