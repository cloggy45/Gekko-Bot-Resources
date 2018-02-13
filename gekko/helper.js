exports.trailingStopLoss = function() {
    
    let _percentage = null;
    let _prevPrice = null;
    let _stopLoss = null;
    let _isActive = false;

    function initSettings(percentage, currentPrice) {
        _percentage = (((100 - percentage)) / 100);
        _prevPrice = currentPrice;
        _stopLoss = calculateStopLoss(currentPrice);
        _isActive = true;
    };

    function isTriggered(currentPrice) {
        if(_isActive)
            return (_stopLoss > currentPrice);
    }

    function calculateStopLoss(currentPrice) {
        return _percentage * currentPrice;
    };

    function resetSettings() {
        _percentage, _prevPrice, _percentage, _stopLoss = null;
        _isActive = false;
    };
    
    function printVariables() {
        console.log(`
        -----------------------------
        Percent: ${_percentage}
        Previous Price: ${_prevPrice}
        Stop Loss: ${_stopLoss}
        Active : ${_isActive}
        ----------------------------;
        `)
    };

    return {
        create: initSettings,
        destroy: resetSettings,
        update: calculateStopLoss,
        log : printVariables,
        isTriggered : isTriggered,
    }
};
/**
 * We use this module to keep track of candle history.
 */
exports.candleHistory = function() {
    var _limit = null;
    var _candles = [];

    var initialise = function(limit) {
        _limit = limit - 1;
    };

    var _canAdd = function() {
        return (_candles.length <= _limit);
    };

    var addCandleToarray = function(candle) {
        if (_canAdd())
            _candles.push(candle);
        else {
            _candles.shift();
            _candles.push(candle);
        }
    };

    var isFull = function() {
        return (_candles.length > _limit);
    };

    var getCurrentCandles = function() {
        return _candles;
    };

    var getCurrentSize = function() {
        return _candles.length;
    };

    return {
        init: initialise,
        add: addCandleToarray,
        get: getCurrentCandles,
        full: isFull,
        size: getCurrentSize
    }
};
