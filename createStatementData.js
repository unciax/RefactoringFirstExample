function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance) 
    statementData.totalAmount = totalAmount(statementData); 
    statementData.totalVolumeCredits = totalVolumeCredits(statementData); 
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance)); // Replace Constructor with Factory Function
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }
    
    function playFor(aPerformance) { 
        return plays[aPerformance.playID];
    }
    
    function totalVolumeCredits(data) {
        return data.performances
            .reduce((total, p) => total + p.volumeCredits, 0);
    }
    
    function totalAmount(data) {
        return data.performances
            .reduce((total, p) => total + p.amount, 0);
    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay); 
        case "comedy" : return new ComedyCalculator(aPerformance, aPlay); 
        default:
            throw new Error(`unknown type: ${aPlay.type}`);
    }
}

class PerformanceCalculator { 
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    // ===
    // 可以選擇移除，畢竟不會有機會呼叫到 (不過作者覺得留下一個墓碑對未來比較好)
    get amount() {
        throw new Error('subclass responsibility');
    }

    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience -30, 0);
        if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
        return result;
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30); 
        }
        return result;
    }
}
class ComedyCalculator extends PerformanceCalculator {
    // ===
    // Replace Conditional with Polymorphism
    // ===
    get amount() {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20); 
        }
        result += 300 * this.performance.audience;
        return result;
    }
}
module.exports = createStatementData;
