
var Helper = require('../gekko/helper.js');
var assert = require('assert');

describe('Display Strings', function() {
  var display = Helper.display();
  
  describe('EMA goes above price', function() {
    it('should return string "uptrend" when the ema is greater than the current price', function(){
      let currentEma = 10;
      let currentPrice = 5;
      let result = display.ema(currentEma,currentPrice);
      
      assert.equal(result,"uptrend");
    });
  });
});