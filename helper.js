// Color Candle
// Trailing Stop Loss

var TrailingStopLoss = (function () {
    var _percent = 0.0;
    var _longPrice = 0;
    var _stopLoss = 0;

    var _setStopLoss = function () {
        _stopLoss = _longPrice * _percent;
    };

    var setPercent = function (percent) {
        _percent = percent;
    };

    var setLongPrice = function (longPrice) {
        _longPrice = longPrice;
    };

    var triggered = function () {
        return (_longPrice )
    };

    return {
        setBuyPrice : setBuyPrice,
        setPercent : setPercent,
        triggered : triggered
    }
})();

var test = [10, 23, 24, 56, 70];

var buyPrice = 24

for (var i = 0; i < test.size; i++) {
    Helper.trailing_stop_loss.triggered();
}
Helper.trailing_stop_loss.triggered();

// indicator history