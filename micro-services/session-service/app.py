from flask import Flask, jsonify
import random

app = Flask(__name__)

quotes = [
    "Keep on going! You can do this! ",
    "I’m not telling you it is going to be easy — I’m telling you it’s going to be worth it.",
    "There are no shortcuts to any place worth going.",
    "If you fell down yesterday, stand up today.",
    "You cannot swim for new horizons until you have courage to lose sight of the shore.",
    "Make sure your own worst enemy doesn’t live between your two ears",
]

@app.route('/quotes', methods=['GET'])
def get_quote():
    quote = random.choice(quotes)

    # Create a dictionary with the quote
    quote_data = {
        'Remember': quote
    }

    # Return the quote as JSON response
    return jsonify(quote_data)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()