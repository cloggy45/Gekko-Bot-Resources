exports.trailingStopLoss = function () {

    //WARNING THIS IS NOT FINISHED

    var _stopLoss = null;
    var _buyPrice = null;
    var _movingAverage = null;
    var _active = false;

    var init_values = function (movingAverage, buyPrice) {
        _movingAverage = movingAverage;
        _buyPrice = buyPrice;
        _active = true;
        _stopLoss = movingAverage;
    };

    var update_our_stoploss = function (currentMovingAverage) {
        _stopLoss = currentMovingAverage;
    };

    var calculate = function (currentPrice, currentMovingAverage) {
        if(_active) {
            if (currentPrice < currentMovingAverage )
                return 'Current price is below';
            else
                update_our_stoploss(currentMovingAverage)
        }
    };

    var reset_settings = function () {
        _stopLoss = null;
        _buyPrice = null;
        _movingAverage = null;
        _active = false;
    };

    var log_values = function () {
        console.log("Buy Price: " + _buyPrice);
        console.log("Moving Average " + _movingAverage);
        console.log("Stop Loss " + _stopLoss);
    };

    return {
        create: init_values,
        reset: reset_settings,
        update: update_our_stoploss,
        triggered: calculate,
        print: log_values
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

exports.crossover = function hasCrossedOver(shortEma, longEma) {
    if (shortEma > longEma)
        return 'short crossover'
    else if (longEma > shortEma)
        return 'long crossover'
    else
        return 'no crossover'
};

/**
 * We use this module to keep track of candle history.
 */
exports.candleHistory = function () {
    var _limit = null;
    var _candles = [];


    var initialise = function (limit) {
        _limit = limit - 1;
    };

    var _canAdd = function () {
        return (_candles.length <= _limit);
    };

    var addCandleToarray = function (candle) {
        if (_canAdd())
            _candles.push(candle);
        else {
            _candles.shift();
            _candles.push(candle);
        }
    };

    var isFull = function () {
        return (_candles.length >_limit);
    };

    var getCurrentCandles = function () {
        return _candles;
    };

    var getCurrentSize = function () {
        return _candles.length;
    };

    return {
        init: initialise,
        add: addCandleToarray,
        get: getCurrentCandles,
        full : isFull,
        size : getCurrentSize
    }
};

exports.trending = function isTrending(previousTrend, currentTrend) {
    return (previousTrend === currentTrend);
};
