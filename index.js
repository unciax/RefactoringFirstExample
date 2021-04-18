function statement (invoice, plays) {
    // === 目標 7 : 將計算與格式化拆開 === Start
    let result = `Statement for ${invoice.customer}\n`; 
    for (let perf of invoice.performances) {
        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
    // ===
    // 前面的重構重點在於幫函式加上充足的結構
    // 從這個目標開始會將注意力放在功能變更的部分 => 提供 statement 的 HTML 版本
    // 把計算程式都抽離了，只剩下一個工作：寫出最上面七行程式的 HTML 版本 (但作者不想要將他們複製並貼到新的函式內)
    // === 目標 7 : 將計算與格式化拆開 === End

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
        let result = 0;
        for (let perf of invoice.performances) {
            result += volumeCreditsFor(perf);
        }
        return result; 
    }

    function totalAmount() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += amountFor(perf);
        }
        return result;
    }
}

module.exports = statement;
