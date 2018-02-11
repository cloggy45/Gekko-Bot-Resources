# Gekko Trading Strategies

## Installation

```
$ git clone https://github.com/cloggy45/Gekko-Bot-Resources.git
$ cp Gekko-Bot-Resources/gekko/* gekko -R
$ cd gekko
$ npm install convnetjs zero-fill stats-lite numbro mathjs cluster lodash.ismatch gauss 
```

# helper.js Guide

The ```helper.js``` includes a collection of functions or modules that I find myself creating each time I make a strategy.

## Installation

You need to add the ```helper.js``` file to the root of your Gekko folder, then add ``var helper = require('../helper.js');`` to the top of your strategy.


### Trailing Stop Loss

>"A trailing stop order sets the stop price at a fixed amount below the market price with an attached "trailing" amount. As the market price rises, the stop price rises by the trail amount, but if the stock price falls, the stop loss price doesn't change, and a market order is submitted when the stop price is hit."

#### Instructions

We initialize our trailing stop loss in our init function in our strategy like so:
```javascript
strat.init = function() {
    this.stopLoss = helper.trailingStopLoss();
    .....
```  
We create a trailing stop anytime we make a purchase according to the various indicators we set up in our strategy.

```javascript
this.stopLoss.create(somePercentage, currentPrice);
```

We destroy our trailing stop after any time we call ```this.advice('short')``` 

```javascript
this.stopLoss.destroy();
```
We must also check on each candle to see if our trailing stop loss has triggered, we can do it like so: 
```javascript
 if(this.stopLoss.active()) {
    if (this.stopLoss.triggered(currentPrice) ) {
        this.advice('short');
        this.advised = false
        this.stopLoss.destroy();
    } else {
        this.stopLoss.update(currentPrice);
    }
}
```
We would place the above code in our check function in our strategy.

