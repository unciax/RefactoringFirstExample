function statement (invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`; 
    for (let perf of invoice.performances) {
        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(appleSauce())}\n`; // 替換成函式了
    result += `You earned ${totalVolumeCredits()} credits\n`;
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

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", 
                            { style: "currency", currency: "USD", 
                              minimumFractionDigits: 2 }).format(aNumber/100);
    }

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of invoice.performances) {
            volumeCredits += volumeCreditsFor(perf);
        }
        return volumeCredits; 
    }

    // ===
    // Extract Function
    // 這隻功能最好的名稱應該是 totalAmount ，但卡在目前有變數叫做 totalAmount ，故先隨便命名
    // ===
    function appleSauce() {
        let totalAmount = 0;
        for (let perf of invoice.performances) {
            totalAmount += amountFor(perf);
        }
        return totalAmount;
    }
}

module.exports = statement;
