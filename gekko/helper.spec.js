const Helper = require("../gekko/helper.js");

describe("Helper", () => {
    describe("Trailing Stoploss", () => {
        let trailingStopLoss = 0;

        beforeEach(() => {
            trailingStopLoss = Helper.trailingStopLoss();
            trailingStopLoss.create(10, 100);
        });

        afterEach(() => {
            trailingStopLoss.destroy();
        });

        it("Should return trailingStopLoss", () => {
            expect(typeof trailingStopLoss).toEqual("object");
        });

        it("Should return true when stoploss is greater than current price", () => {
            expect(trailingStopLoss.isTriggered(89)).toEqual(true);
        });

        it("Should return false when stoploss is equal to current price", () => {
            expect(trailingStopLoss.isTriggered(90)).toEqual(false);
        });

        it("Should return false when stoploss is less than current price", () => {
            expect(trailingStopLoss.isTriggered(95)).toEqual(false);
        });

        it("Should return object showing internal state", () => {
            const mockState = {
                percentage: 0.9,
                stoploss: 90,
                active: true
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

        it("Should append a new candle to candle history", () => {
            candleHistory.init(3);

            candleHistory.add("alpha").add("bravo");

            expect(candleHistory.get()).toEqual(["alpha", "bravo"]);
            candleHistory.add("charlie");
            expect(candleHistory.get()).toEqual(["alpha", "bravo", "charlie"]);
        });

        it('Should return trie if candle history is full', () => {
            candleHistory.init(2);

            candleHistory.add("alpha").add("bravo");

            expect(candleHistory.isFull()).toEqual(true);
        });

        it("Should set the size limit of the history", () => {
            candleHistory.init(10);

            for (let i = 0; i < 10; i++) {
                candleHistory.add([]);
            }

            expect(candleHistory.size()).toBe(10);
        });
    });
});
