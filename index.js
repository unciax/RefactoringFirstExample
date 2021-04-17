function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
        
        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    function amountFor(aPerformance) {
        let result = 0;
        switch (playFor(aPerformance).type) {
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
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }

    function playFor(aPerformance) { 
        return plays[aPerformance.playID];
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience  - 30, 0);
        if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5); 
        return result;
    }

    // ===
    // 作者認為 format 無法充分表達它的用途
    // formatAsUSD 有點累贅 (因為這個使用的範圍小)
    // 應該要強調「他格式化的東西是貨幣金額」這個事實
    // 
    // 命名很重要，好的命名可以讓你不需閱讀函式內文就可以瞭解其作用
    // ===
    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", 
                            { style: "currency", currency: "USD", 
                              minimumFractionDigits: 2 }).format(aNumber/100);
    }
}

module.exports = statement;
