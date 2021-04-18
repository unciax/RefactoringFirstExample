function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance) 
    statementData.totalAmount = totalAmount(statementData); 
    statementData.totalVolumeCredits = totalVolumeCredits(statementData); 
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result); 
        return result;
    }
    
    function playFor(aPerformance) { 
        return plays[aPerformance.playID];
    }
    
    function amountFor(aPerformance) {
        return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    }
    
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience  - 30, 0);
        if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
        return result;
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

class PerformanceCalculator { 
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    // ===
    // Move Function : 將 amountFor 改寫為 calculator amount getter
    // ===
    get amount() {
        let result = 0;
        switch (this.play.type) {
            case "tragedy":
                result = 40000;
                if (this.performance.audience > 30) { // 改抓 calculator 內的 performance
                    result += 1000 * (this.performance.audience - 30); // 改抓 calculator 內的 performance
                }
                break;
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) { // 改抓 calculator 內的 performance
                    result += 10000 + 500 * (this.performance.audience - 20); // 改抓 calculator 內的 performance
                }
                result += 300 * this.performance.audience; // 改抓 calculator 內的 performance
                break; 
            default:
                throw new Error(`unknown type: ${this.play.type}`); // 改抓 calculator 內的 play
        }
        return result;
    }
}
module.exports = createStatementData;
