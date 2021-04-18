var expect = require('chai').expect;
const index = require('../index.js');
const invoiceInData = require('../invoice.js');
const playsInData = require('../play.js');
const expectString = `<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
 <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
 <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>47</em> credits</p>
`;

describe('測試 htmlStatement 函數', () => {
    it('使用測試資料預期得到書本結果', () => {
      expect(index.htmlStatement(invoiceInData, playsInData)).to.be.equal(expectString);
    });
  });