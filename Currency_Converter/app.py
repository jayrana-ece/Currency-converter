
from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/convert", methods=["POST"])
def convert():
    data = request.get_json()

    try:
        # Get input data
        amount = float(data["amount"])
        from_currency = data["from_currency"].upper()
        to_currency = data["to_currency"].upper()

        # Validate amount
        if amount <= 0:
            return jsonify({
                "error": "Please enter a valid amount."
            }), 400

        # Same currency check
        if from_currency == to_currency:
            return jsonify({
                "error": "Please select different currencies."
            }), 400

        # Frankfurter v2 API
        api_url = (
            f"https://api.frankfurter.dev/v2/rate/"
            f"{from_currency}/{to_currency}"
        )

        # Request current exchange rate
        response = requests.get(
            api_url,
            timeout=10
        )

        # Check HTTP response
        if response.status_code != 200:
            try:
                api_error = response.json()
                error_message = api_error.get(
                    "message",
                    "Exchange rate is unavailable."
                )
            except ValueError:
                error_message = "Exchange rate is unavailable."

            print("API Error:", response.status_code)
            print("API Response:", response.text)

            return jsonify({
                "error": error_message
            }), 500

        # Read API response
        api_data = response.json()

        # Get exchange rate
        if "rate" not in api_data:
            return jsonify({
                "error": "Exchange rate is unavailable."
            }), 500

        exchange_rate = float(api_data["rate"])

        # Calculate converted amount
        converted_amount = amount * exchange_rate

        # Return data to JavaScript
        return jsonify({
            "amount": amount,
            "from_currency": from_currency,
            "to_currency": to_currency,
            "exchange_rate": exchange_rate,
            "converted_amount": converted_amount
        })

    except (ValueError, KeyError, TypeError):
        return jsonify({
            "error": "Invalid input."
        }), 400

    except requests.RequestException as e:
        print("Connection Error:", e)

        return jsonify({
            "error": "Unable to connect to the exchange rate service."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
