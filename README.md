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
