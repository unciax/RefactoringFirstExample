function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    const format = new Intl.NumberFormat("en-US", 
                          { style: "currency", currency: "USD", 
                            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) { 
        // === 目標 2 : 移除 play 變數 === Start
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);
        // ===
        // 考慮 amountFor 的變數時
        //   aPerformance 來自迴圈變數，每次迭代時會改變
        //   play 來自於 performance (aPerformance 的型態)，其實不需要用參數來傳遞
        // === 目標 2 : 移除變數 === End
        
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