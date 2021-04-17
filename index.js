function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    const format = new Intl.NumberFormat("en-US", 
                          { style: "currency", currency: "USD", 
                            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) { 
        const play = plays[perf.playID];
        let thisAmount = 0;
    
        // === 目標 1 : Switch === Start
        switch (play.type) { 
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30); 
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20); 
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`); 
        }
        // ====
        // 透過觀察，可以發現這是一個計算表演費用的程式
        // 這是大腦理解的結果，但腦容量有限，應該將理解的結果轉換成程式碼加以保存 (程式碼即文件)
        // === 目標 1 : Switch === End
        
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
}

module.exports = statement;