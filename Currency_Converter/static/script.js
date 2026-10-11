const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥"
};

const convertButton = document.getElementById("convertBtn");
const fromCurrency = document.getElementById("from_currency");
const toCurrency = document.getElementById("to_currency");

let previousFromCurrency = fromCurrency.value;
let previousToCurrency = toCurrency.value;


// When FROM currency changes
fromCurrency.addEventListener("change", function () {

    if (fromCurrency.value === toCurrency.value) {
        toCurrency.value = previousFromCurrency;
    }

    previousFromCurrency = fromCurrency.value;
    previousToCurrency = toCurrency.value;
});


// When TO currency changes
toCurrency.addEventListener("change", function () {

    if (toCurrency.value === fromCurrency.value) {
        fromCurrency.value = previousToCurrency;
    }

    previousFromCurrency = fromCurrency.value;
    previousToCurrency = toCurrency.value;
});


// Convert button
convertButton.addEventListener("click", async function () {

    const amount = document.getElementById("amount").value;
    const selectedFromCurrency = document.getElementById("from_currency").value;
    const selectedToCurrency = document.getElementById("to_currency").value;

    // Validate amount
    if (amount === "" || amount <= 0) {
        document.getElementById("result").innerText =
            "Please enter a valid amount.";
        return;
    }

    // Loading state
    document.getElementById("result").innerText =
        "⏳ Converting...";

    convertButton.innerText = "Converting...";
    convertButton.disabled = true;

    try {

        const response = await fetch("/convert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount,
                from_currency: selectedFromCurrency,
                to_currency: selectedToCurrency
            })
        });

        const data = await response.json();
        console.log("Flask response:", data);

        // Restore button
        convertButton.innerText = "Convert";
        convertButton.disabled = false;

        // Handle server/API error
        if (!response.ok || data.error) {
            document.getElementById("result").innerText =
                data.error || "Unable to convert currency.";
            return;
        }

        // Currency symbols
        const fromSymbol = currencySymbols[data.from_currency];
        const toSymbol = currencySymbols[data.to_currency];

        // Format amounts
        const inputAmount = Number(data.amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const convertedAmount = Number(data.converted_amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const exchangeRate = Number(data.exchange_rate).toLocaleString("en-US", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        });

        // Display result
        document.getElementById("result").innerHTML =
            `<div>${fromSymbol}${inputAmount} ${data.from_currency} = 
            ${toSymbol}${convertedAmount} ${data.to_currency}</div>
            
            <small>
                1 ${data.from_currency} =
                ${toSymbol}${exchangeRate} ${data.to_currency}
            </small>
            <small class="rate-info">
                Rate fetched from live exchange API
            </small>`;

    } catch (error) {

        // Restore button
        convertButton.innerText = "Convert";
        convertButton.disabled = false;

        document.getElementById("result").innerText =
            "Unable to connect to the server.";

        console.error(error);
    }

});