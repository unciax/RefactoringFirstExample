function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    const format = new Intl.NumberFormat("en-US", 
                          { style: "currency", currency: "USD", 
                            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) { 
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play); // 被替換成函式了
        
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees (?)
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    // ===
    // 修改變數的名稱
    // 透過修改名稱，讓程式碼能夠更清楚的表達他的意思
    // 作者習慣將回傳值命名為 result ，參數名稱則使用不定冠詞 (a, an) + 型態名稱
    // ===
    function amountFor(aPerformance, play) {
        let result = 0;
        switch (play.type) { 
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30); 
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20); 
            }
            result += 300 * aPerformance.audience;
            break; 
        default:
            throw new Error(`unknown type: ${play.type}`); 
        }
        return result;
    }
}

module.exports = statement;