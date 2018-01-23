var helper = require('../helper.js');
var isMatch = require('lodash.ismatch');
var log = require('../core/log.js');

//npm install lodash.ismatch

var strat = {};


strat.results = {
    stoch: {
        condition : null
    },
    movingAverage : null
};


strat.market = {
    stoch : {
        condition : null
    }
};

strat.init = function () {

    this.stopLoss = helper.trailingStopLoss();

    this.candleHistory = helper.candleHistory();
    this.candleHistory.init(10);

    this.addTulipIndicator('myStoch', 'stoch', this.settings.myStoch);

    this.trend = {
        condition: 'none',
        strength: 'none',
        duration: 0,
        persisted: false,
        adviced: false
    };

};

function getAverage(total, numElements) {
    return total / numElements;
}


strat.update = function (candle) {

    this.candleHistory.add(candle);

    // Get the total, of the closing prices from set.
    if(this.candleHistory.full()) {
        var total = this.candleHistory.get().reduce(function(accu, candle) {
            return accu + candle.close
        },0);
    }

    this.results.movingAverage = getAverage(total, this.candleHistory.size());
    this.results.stoch = this.tulipIndicators.myStoch.result;
    this.market.stoch.condition = helper.getStochCondition(this.results.stoch.stochK, this.results.stoch.stochD, this.settings.myStoch.lowThreshold, this.settings.myStoch.highThreshold);
};

strat.check = function (candle) {

    var currentPrice = candle.close;

    if(this.stopLoss.triggered()) {
        this.advice('short');
        this.advised = false
    }

    if (this.market.stoch.condition === 'oversold') {
        if (this.trend.condition !== 'oversold')
            this.trend = {
                duration: 0,
                persisted: false,
                condition: 'oversold',
                advised: false
            };

        this.trend.duration++;

        // TODO change hardcoded value
        if (this.trend.duration >= 2)
            this.trend.persisted = true;

        if (this.trend.persisted && !this.trend.advised) {
            this.trend.advised = true;
            this.advice('long');
            this.stopLoss.create(this.results.movingAverage, currentPrice);
            this.stopLoss.print();

        } else
            this.advice();


    } else if (this.market.stoch.condition === 'overbought') {

        if (this.trend.condition !== 'overbought')
            this.trend = {
                duration: 0,
                persisted: false,
                condition: 'overbought',
                advised: false
            };

        this.trend.duration++;

        // TODO change hardcoded value
        if (this.trend.duration >= 1)
            this.trend.persisted = true;

        if (this.trend.persisted && !this.trend.advised) {
            this.trend.advised = true;

            this.advice('short');
            this.stopLoss.reset();

        } else
            this.advice();

    } else {
        this.trend.duration = 0;
        this.advice();
    }
};



module.exports = strat;