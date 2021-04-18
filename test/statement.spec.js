var expect = require('chai').expect;
const index = require('../index.js');
const invoiceInData = require('../invoice.js');
const playsInData = require('../play.js');
const expectString = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;

describe('測試 statement 函數', () => {
    it('使用測試資料預期得到書本結果', () => {
      expect(index.statement(invoiceInData, playsInData)).to.be.equal(expectString);
    });
  });