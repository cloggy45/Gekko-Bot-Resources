var helper = require('../helper.js');
var isMatch = require('lodash.ismatch');
var log = require('../core/log.js');


var strat = {};

strat.results = {
    stoch: null,
    adx: null
};

strat.states = {
    indicators: {}
};

strat.init = function () {
    this.stopLoss = helper.trailingStopLoss();
    this.addTulipIndicator('myStoch', 'stoch', this.settings.myStoch);
    this.addTulipIndicator('myAdx', 'adx', this.settings.myAdx);

    this.trend = {
        condition: 'none',
        strength: 'none',
        duration: 0,
        persisted: false,
        adviced: false
    };

};

strat.update = function (candle) {
    this.results.stoch = this.tulipIndicators.myStoch.result;
    this.results.adx = this.tulipIndicators.myAdx.result;

    var currentStochCondition = helper.getStochCondition(this.results.stoch.stochK, this.results.stoch.stochD, this.settings.myStoch.lowThreshold, this.settings.myStoch.highThreshold);
    var currentAdxStrength = helper.printAdxStrength(this.results.adx.result);

    log.debug(currentAdxStrength);
    this.market.stoch.condition = currentStochCondition;
};

strat.log = function () {
    // your code!
};

strat.check = function (candle) {
    var currentPrice = candle.close;


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
            this.stopLoss.create(this.settings.stopLoss.percent, currentPrice)
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
            log.debug('PLACING A SHORT ORDER');
            this.advice('short');
            this.stopLoss.reset();
        } else
            this.advice();

    } else if (this.stopLoss.triggered(currentPrice)) {
        this.advice('short');
        this.stopLoss.reset();
    }
    else {
        if (this.stopLoss.active)
            this.stopLoss.update(currentPrice);

        this.trend.duration = 0;
        this.advice();
    }
};

module.exports = strat;