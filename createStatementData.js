function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance) 
    statementData.totalAmount = totalAmount(statementData); 
    statementData.totalVolumeCredits = totalVolumeCredits(statementData); 
    return statementData;

    function enrichPerformance(aPerformance) {
        // === 目標 2 : 讓 Performance 計算器變為多型 === Start
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        // ===
        // 以子類別取代型別代碼，建構式要換成函式(因為 JavaScript 建構式沒辦法回傳子類別)
        // === 目標 2 : 讓 Performance 計算器變為多型 === End
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits; // 積分也這樣處理
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

class PerformanceCalculator { 
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        let result = 0;
        switch (this.play.type) {
            case "tragedy":
                result = 40000;
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break; 
            default:
                throw new Error(`unknown type: ${this.play.type}`);
        }
        return result;
    }

    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience -30, 0);
        if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
        return result;
    }
}
module.exports = createStatementData;
