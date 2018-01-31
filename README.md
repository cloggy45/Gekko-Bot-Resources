# Gekko Trading Strategies

## Installation

```
$ git clone https://github.com/cloggy45/Gekko_Trading_Resources.git
$ cp Gekko_Trading_Resources/gekko/* gekko -R
$ cd gekko
$ npm install convnetjs zero-fill stats-lite numbro mathjs cluster lodash.ismatch
```

# helper.js Guide

The ```helper.js``` includes a collection of functions or modules that I find myself creating each time I make a strategy.

## Installation

You need to add the ```helper.js``` file to the root of your Gekko folder, then add ``var helper = require('../helper.js');`` to the top of your strategy.

-### Trailing Stop Loss
 -
 ->"A trailing stop order sets the stop price at a fixed amount below the market price with an attached "trailing" amount. As the market price rises, the stop price rises by the trail amount, but if the stock price falls, the stop loss price doesn't change, and a market order is submitted when the stop price is hit."
 -
 -## Instructions
 -
 -To use the trailing stop loss, initialize the trailing stop loss in your strategy with the following:
 -```
 -var myTrailingStopLoss = helper.trailingStopLoss();
 -```
 -Anytime you call ```this.advice('long')``` (which places a buy order) you create a trailing stop loss by using ```myTrailingStopLoss.create(percent, currentPrice)```
 -
 -The ```currentPrice``` will be the price at which you placed your buy order, 
 -
 -When you first create a trailing stop loss, the ```percent``` is the percentage of the buy price, but that will change to be the price of each subsequent candle, provided it does not trigger the stop loss. 
 -
 -```myTrailingStopLoss.create(0.95, 100)```
 -
 -The above will set a stop loss at $95.
 -
 -Our stop loss moves up when the current price goes above the previous price. And will trigger once the current price drops from our current previous price. I implement it like so
 -
 -````javascript
 -if(myTrailingStopLoss.triggered(currentPrice)) {
 -    this.advice('short')
 -    this.stopLoss.reset();
 -} else if (this.stopLoss.active) {
 -    this.stopLoss.update(currentPrice);
 -}
 -````
 -Anytime you call ```this.advice('short')``` (which places a sell order) you should always call ```myTrailingStopLoss.reset()``` Otherwise the stop loss will still be active and the previous price.
 -
 -**Need to add further documentation for other functions.** 