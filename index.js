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
    // 1. 抽離程式 
    //    將 statement 中的 switch 語句被抽離成一個新的函式，且函式以其功能命名
    // 2. 找出離開作用域的變數 
    //    => perf, play, thisAmount 
    //    pref, play 在這段程式中並不會被修改 => 可作為參數傳遞
    //    thisAmount 會被修改，因此要小心應對 => 不過這例子只有一個，就直接把他當回傳值吧
    // 上述行為稱之為 Extra Function
    // ===
    function amountFor(perf, play) {
        let thisAmount = 0;
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
        return thisAmount;
    }
}

module.exports = statement;