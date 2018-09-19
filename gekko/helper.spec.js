const Helper = require('../gekko/helper.js');

describe('Helper', () => {
    describe('Trailing Stoploss', () => {
        let trailingStopLoss = null;

        beforeEach(() => {
            trailingStopLoss = Helper.trailingStopLoss();
            trailingStopLoss.create(10, 100);
        });

        afterEach(() => {
            trailingStopLoss.destroy();
        });

        it('Should return trailingStopLoss object', () => {
            expect(typeof trailingStopLoss).toEqual('object');
        });

        it('isTriggered() should return true when stoploss is greater than current price', () => {
            expect(trailingStopLoss.isTriggered(89)).toEqual(true);
        });

        it('isTriggered() should return false when stoploss is equal to current price', () => {
            expect(trailingStopLoss.isTriggered(90)).toEqual(false);
        });
        it('isTriggered() should return false when stoploss is less than current price', () => {
            expect(trailingStopLoss.isTriggered(95)).toEqual(false);
        });
        it('currentState() should return object showing internal state', () => {
            const mockState = {
              percentage : 0.9,
              stoploss : 90,
              active : true
            };
            expect(trailingStopLoss.log()).toEqual(mockState);
        });
    });

    describe("CandleHistory", () => {
        let candleHistory;
        beforeEach(() => {
            candleHistory = Helper.candleHistory();
        });

        afterEach(() => {
            candleHistory = null;
        });

        it('add() should append a new candle to history', () => {
            const limit = 3
            candleHistory.init(limit);
            candleHistory.add('alpha').add('bravo');
            expect(candleHistory.get()).toEqual(['alpha', 'bravo']);
            candleHistory.add('charlie');
            expect(candleHistory.get()).toEqual(['alpha', 'bravo', 'charlie'])
        });

        it('isFull() should return "true" if full', () => {
           const limit = 2;
            candleHistory.init(limit);
            candleHistory.add('alpha').add('bravo');
            expect(candleHistory.isFull()).toEqual(true);
        });

        it('init() should set the size limit of the history', () => {
            const limit = 10;
            candleHistory.init(limit);
            for(let i=0;i<limit;i++) {
                candleHistory.add([]);
            }
            expect(candleHistory.size()).toBe(limit);

        });
    });
});
