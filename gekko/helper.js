exports.trailingStopLoss = () => {
    let percentage = 0,
        prevPrice = 0,
        stopLoss = 0,
        isActive = false;

    function initSettings(percent, currentPrice) {
        percentage = (100 - percent) / 100;
        prevPrice = currentPrice;
        stopLoss = calculateStopLoss(currentPrice);
        isActive = true;
    }

    const isTriggered = currentPrice => {
        if (isActive) return stopLoss > currentPrice;
    };

    function calculateStopLoss(currentPrice) {
        return percentage * currentPrice;
    }

    const resetSettings = () => {
        percentage, prevPrice, percentage, (stopLoss = null);
        isActive = false;
    };

    const printVariables = () => ({
        percentage: percentage,
        stoploss: stopLoss,
        active: isActive
    });

    return {
        create: initSettings,
        destroy: resetSettings,
        update: calculateStopLoss,
        log: printVariables,
        isTriggered: isTriggered
    };
};

exports.candleHistory = () => {
    let limit = 0;
    let candles = [];

    const initialise = someLimit => {
        limit = someLimit - 1;
    };

    const canAppend = () => candles.length <= limit;

    function appendCandleToHistory(someCandle) {
        if (canAppend()) candles.push(someCandle);
        else {
            candles.shift();
            candles.push(someCandle);
        }
        return this;
    }

    const checkIfCandleHistoryFull = () => candles.length > limit;

    const getCandleHistory = () => candles;

    const getCurrentSize = () => candles.length;

    return {
        init: initialise,
        add: appendCandleToHistory,
        get: getCandleHistory,
        isFull: checkIfCandleHistoryFull,
        size: getCurrentSize
    };
};
