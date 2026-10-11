# Currency Converter

## 1. Project Overview

The Currency Converter is a web-based application developed using HTML, CSS, JavaScript, Python, and Flask. It converts an amount from one currency to another using exchange-rate data obtained from the Frankfurter public API.

The application provides a simple and responsive user interface, validates user input, calculates the converted amount, and displays the exchange rate and conversion result.

## 2. Project Objectives

- To develop a user-friendly currency conversion application.
- To retrieve exchange-rate information from a public API.
- To calculate the converted amount accurately using the exchange rate returned by the API.
- To validate user input and handle errors.
- To display conversion results without reloading the webpage.

## 3. Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **HTTP Requests:** Python Requests library
- **Exchange Rate API:** Frankfurter API
- **Data Format:** JSON

## 4. Main Features

- Conversion between nine supported currencies: USD, INR, EUR, GBP, JPY, AUD, CAD, CHF, and CNY.
- Exchange-rate retrieval through the Frankfurter API.
- Input validation for empty, zero, and negative amounts.
- Prevention of selecting the same source and target currency.
- Currency symbols and formatted conversion results.
- Display of the exchange rate used for the conversion.
- Loading indicators and error messages.
- Responsive interface for desktop and mobile screens.

## 5. Project Folder Structure

```text
Currency-Converter/
│
├── app.py
├── README.md
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    ├── script.js
    └── currency_converter_favicon.png
```

Note: The favicon file should be included if it is used by the HTML page.

## 6. Installation Requirements

The following software and resources are required:

- Python 3
- pip (Python package installer)
- A web browser
- Internet connection for retrieving exchange rates

## 7. Installation and Execution

### Step 1: Open the Project Folder

Open a terminal or command prompt in the main project directory.

### Step 2: Install Dependencies

Run the following command:

```bash
pip install -r requirements.txt
```

### Step 3: Start the Application

Run the following command:

```bash
python app.py
```

### Step 4: Open the Application

Open a web browser and visit:

```text
http://127.0.0.1:5000/
```

Enter an amount, select the source and target currencies, and click the Convert button.

## 8. Dependencies

The application uses the following Python libraries:

- Flask
- Requests

The `requirements.txt` file should contain:

```text
Flask
requests
```

## 9. Working Methodology

1. The user enters an amount and selects the source and target currencies.
2. JavaScript validates the input and sends the conversion request to the Flask backend.
3. Flask validates the data and requests the exchange rate from the Frankfurter API.
4. Python calculates the converted amount by multiplying the input amount by the exchange rate.
5. The backend returns the result as JSON.
6. JavaScript displays the converted amount, exchange rate, and currency symbols on the webpage.

**Formula:**

Converted Amount = Input Amount × Exchange Rate

## 10. Testing

The following test cases should be checked before final submission:

| Test Case | Expected Result |
|---|---|
| Enter a valid positive amount | Display the converted amount |
| Leave the amount empty | Display a validation message |
| Enter zero or a negative amount | Reject the amount |
| Select the same source and target currency | Display a validation message |
| Disconnect the internet or make the API unavailable | Display an appropriate error message |
| Complete a successful conversion | Display the exchange rate and converted amount |

Actual test results and screenshots should be recorded after testing the application.

## 11. Limitations

- An internet connection is required to retrieve exchange rates.
- Conversion depends on the availability of the external API.
- The application is intended for informational currency conversion and does not execute financial transactions.
- The displayed conversion rate may differ from rates offered by banks or money-exchange providers.

## 12. Future Enhancements

- Add more supported currencies.
- Add a currency-swap button.
- Maintain a history of previous conversions.
- Improve error handling and testing.
- Add additional display and accessibility improvements.

## 13. Conclusion

The Currency Converter demonstrates the integration of a web frontend, a Python Flask backend, and an external API. It provides currency conversion, input validation, error handling, and formatted output through a responsive user interface.

The project helps demonstrate practical skills in Python programming, web development, HTTP requests, API integration, and JSON data handling.
