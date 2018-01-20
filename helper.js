exports.trailingStopLoss = function () {
    var _percent = 0.0;
    var _buyPrice = 0;
    var _stopLoss = 0;
    var _active = false

    var init = function (percent, buyPrice) {
      _percent = percent;
      _buyPrice = buyPrice;
      _active = true;
      _stopLoss = _buyPrice * _percent;
    };

    var updateStopLoss = function (currentPrice) {
        _stopLoss = currentPrice * _percent;
    };

    var triggered = function (currentPrice) {
        return (_stopLoss > currentPrice)
    };

    var getStopLoss = function () {
        return _stopLoss;
    };
    
    var resetValues = function () {
      _percent = 0.0;
      _buyPrice = 0;
      _stopLoss = 0;
      _active = false;
    };
  
    var isActive = function () {
      return _active;
    }
  
    return {
        reset : resetValues,
        get : getStopLoss,
        create : init,
        triggered : triggered,
        update : updateStopLoss,
        active : isActive
    }
};

exports.getStochCondition = function getCurrentCondition(stochk, stochd, lowThreshold, highThreshold) {
  if (stochk > highThreshold && stochd > highThreshold)
      return 'overbought';
    else if (stochk < lowThreshold && stochd < lowThreshold)
      return 'oversold';
    else
      return 'middle';
  };

exports.getTrend = function getCurrentTrendDirection(ema, price) {
    if (ema > price)
      return 'uptrend';
    else if (ema < price)
      return 'downtrend';
    else
      return 'no trend'
  };

exports.crossover = function hasCrossedOver (shortEma, longEma) {
  if(shortEma > longEma)
    return 'short crossover'
  else if(longEma > shortEma)
    return 'long crossover'
  else
    return 'no crossover'
}

 exports.trending = function isTrending(previousTrend, currentTrend) {
    return (previousTrend === currentTrend);
  };
