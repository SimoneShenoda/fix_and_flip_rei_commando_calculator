// Script for Fix and Flip Calculator

document.getElementById("calculate-button").addEventListener("click", function () {
    // Retrieve input values
    const propertyAddress = document.getElementById("property-address").value || "N/A";
    const purchasePrice = parseFloat(document.getElementById("purchase-price").value) || 0;
    const rehabCosts = parseFloat(document.getElementById("rehab-costs").value) || 0;
    const purchaseQuietCosts = parseFloat(document.getElementById("purchase-quiet-costs").value) || 0;
    const hardMoneyLTV = parseFloat(document.getElementById("hard-money-ltv").value) || 0;
    const constructionLoanLTV = parseFloat(document.getElementById("construction-loan-ltv").value) || 0;
    const hardMoneyRate = parseFloat(document.getElementById("hard-money-rate").value) || 0;
    const hardMoneyPoints = parseFloat(document.getElementById("hard-money-points").value) || 0;
    const hardMoneyFees = parseFloat(document.getElementById("hard-money-fees").value) || 0;
    const miscExpenses = parseFloat(document.getElementById("misc-expenses").value) || 0;
    const projectDuration = parseFloat(document.getElementById("project-duration").value) || 0;
    const arv = parseFloat(document.getElementById("arv").value) || 0;
    const closingQuietCosts = parseFloat(document.getElementById("closing-quiet-costs").value) || 0;
    const sellerAgentCommission = parseFloat(document.getElementById("seller-agent-commission").value) || 0;
    const buyerAgentCommission = parseFloat(document.getElementById("buyer-agent-commission").value) || 0;
    const taxRate = parseFloat(document.getElementById("tax-rate").value) || 0;

    // Acquisition Costs Calculations
    const downPayment = purchasePrice * (1 - hardMoneyLTV / 100);
    const loanAmount = purchasePrice * (hardMoneyLTV / 100);
    const constructionLoanAmount = rehabCosts * (constructionLoanLTV / 100);
    const totalLoanAmount = loanAmount + constructionLoanAmount;
    const hardMoneyTotalLoanInterest = totalLoanAmount * (hardMoneyRate / 100) * (projectDuration / 12);
    const hardMoneyPointsFees = totalLoanAmount * (hardMoneyPoints / 100) + hardMoneyFees;
    const totalCostOfHardMoney = hardMoneyTotalLoanInterest + hardMoneyPointsFees;
    const totalCashOutOfPocket = downPayment + totalCostOfHardMoney + (rehabCosts - constructionLoanAmount) + purchaseQuietCosts + miscExpenses;

    // Closing Costs Calculations
    const sellerAgentCommissionCost = (sellerAgentCommission / 100) * arv;
    const buyerAgentCommissionCost = (buyerAgentCommission / 100) * arv;
    const propertyTax = purchasePrice * (taxRate / 100) * (projectDuration / 12);
    const totalClosingCosts = sellerAgentCommissionCost + buyerAgentCommissionCost + propertyTax + closingQuietCosts;

    // Summary Calculations
    const finalSalesPrice = arv;
    const renovationCosts = rehabCosts;
    const financingCosts = totalCostOfHardMoney;
    const miscCosts = purchaseQuietCosts + miscExpenses;
    const netProfit = finalSalesPrice - (purchasePrice + renovationCosts + totalClosingCosts + financingCosts + miscCosts);
    const roi = (netProfit / totalCashOutOfPocket) * 100;

    // Display Results
    const output = document.getElementById("output");
    output.innerHTML = `
        <p><strong>Property Address:</strong> ${propertyAddress}</p>
        <p><strong>Acquisition Costs:</strong></p>
        <p>Down Payment: $${downPayment.toFixed(2)}</p>
        <p>Loan Amount: $${loanAmount.toFixed(2)}</p>
        <p>Construction Loan Amount: $${constructionLoanAmount.toFixed(2)}</p>
        <p>Total Loan Amount: $${totalLoanAmount.toFixed(2)}</p>
        <p>Hard Money Total Loan Interest: $${hardMoneyTotalLoanInterest.toFixed(2)}</p>
        <p>Hard Money Points and Processing Fees: $${hardMoneyPointsFees.toFixed(2)}</p>
        <p>Total Cost of Hard Money: $${totalCostOfHardMoney.toFixed(2)}</p>
        <p>Total Cash Out of Pocket: $${totalCashOutOfPocket.toFixed(2)}</p>

        <p><strong>Closing Costs:</strong></p>
        <p>Seller Agent Commission: $${sellerAgentCommissionCost.toFixed(2)}</p>
        <p>Buyer Agent Commission: $${buyerAgentCommissionCost.toFixed(2)}</p>
        <p>Property Tax: $${propertyTax.toFixed(2)}</p>
        <p>Misc Closing Costs: $${closingQuietCosts.toFixed(2)}</p>
        <p>Total Closing Costs: $${totalClosingCosts.toFixed(2)}</p>

        <p><strong>Summary:</strong></p>
        <p>Final Sales Price: $${finalSalesPrice.toFixed(2)}</p>
        <p>Purchase Price: $${purchasePrice.toFixed(2)}</p>
        <p>Renovation Costs: $${renovationCosts.toFixed(2)}</p>
        <p>Closing Costs: $${totalClosingCosts.toFixed(2)}</p>
        <p>Financing Costs: $${financingCosts.toFixed(2)}</p>
        <p>Misc Costs: $${miscCosts.toFixed(2)}</p>
        <p>Net Profit: $${netProfit.toFixed(2)}</p>
        <p>ROI: ${roi.toFixed(2)}%</p>
    `;
});
