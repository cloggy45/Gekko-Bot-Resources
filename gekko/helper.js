exports.trailingStopLoss = function() {
    
    let percentage = null;
    let prevPrice = null;
    let stopLoss = null;
    let isActive = false;

    function initSettings(percent, currentPrice) {
        percentage = (((100 - percent)) / 100);
        prevPrice = currentPrice;
        stopLoss = calculateStopLoss(currentPrice);
        isActive = true;
    };

    function isTriggered(currentPrice) {
        if(isActive)
            return (stopLoss > currentPrice);
    }

    function calculateStopLoss(currentPrice) {
        return percentage * currentPrice;
    };

    function resetSettings() {
        percentage, prevPrice, percentage, stopLoss = null;
        isActive = false;
    };
    
    function printVariables() {
        return {
            "percentage" : percentage,
            "stoploss" : stopLoss,
            "active" : isActive
        }
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
    let limit = null;
    let candles = [];

    function initialise (someLimit) {
        limit = someLimit - 1;
    };

    function canAppend() {
        return (candles.length <= limit);
    };

    function appendCandleToHistory(someCandle) {
        if (canAppend())
            candles.push(someCandle);
        else {
            candles.shift();
            candles.push(someCandle);
        }
        return this;
    };

    function checkIfCandleHistoryFull() {
        return (candles.length > limit);
    };

    function getCandleHistory() {
        return candles;
    };

    function getCurrentSize () {
        return candles.length;
    };

    return {
        init: initialise,
        add: appendCandleToHistory,
        get: getCandleHistory,
        isFull: checkIfCandleHistoryFull,
        size: getCurrentSize
    }
};
