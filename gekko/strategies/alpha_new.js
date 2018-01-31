var helper = require('../helper.js');
var isMatch = require('lodash.ismatch');
var log = require('../core/log.js');

var strat = {};

strat.results = {
    stoch: {
        condition: null
    },
    movingAverage: null
};

strat.market = {
    stoch: {
        condition: null
    }
};

strat.init = function() {

    this.stopLoss = helper.trailingStopLoss();

    this.display = helper.display();

    this.addTulipIndicator('myStoch', 'stoch', this.settings.myStoch);

    this.trend = {
        condition: 'none',
        strength: 'none',
        duration: 0,
        persisted: false,
        adviced: false
    };
};

strat.update = function(candle) {
    this.results.stoch = this.tulipIndicators.myStoch.result;
    this.market.stoch.condition = this.display.stoch(this.results.stoch.stochK, this.results.stoch.stochD, this.settings.myStoch.lowThreshold, this.settings.myStoch.highThreshold);
};

strat.check = function(candle) {

    var currentPrice = candle.close;

    if(this.stopLoss.active()) {
        if (this.stopLoss.triggered(currentPrice) ) {
            console.log("Shorting position");
            this.stopLoss.log();
            this.advice('short');
            this.advised = false
            this.stopLoss.deactivate();
        } else {
            this.stopLoss.update(currentPrice);
        }
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
            console.log("Going long");
            this.trend.advised = true;
            this.advice('long');
            this.stopLoss.activate(30, currentPrice);
            this.stopLoss.log();
        }
        else
            this.advice();

    }
    else if (this.market.stoch.condition === 'overbought') {

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
            console.log("Shorting our position")
            this.stopLoss.log();
            this.trend.advised = true;
            this.advice('short');
            this.stopLoss.deactivate();
        }
        else
            this.advice();

    }
    else {
        this.trend.duration = 0;
        this.advice();
    }
};

module.exports = strat;
