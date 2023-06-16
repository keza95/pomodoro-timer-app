from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    user_name = data['user_name']
    email = data['email']
    password = data['password']

    # Checks the length of the password
    if len(user_name) < 5 or len(user_name) > 20:
        return jsonify({'message': 'Username must be at between 5 and 20 characters to be valid'}), 400

    # Validates email being registered
    if '@' not in email or '.' not in email:
        return jsonify({'message': 'Your email must include a \'.\' and an \'@\' symbol'})

    # Validate password length
    if password < 8:
        return jsonify({'message': 'Pass word must be at least 8 characters long to be valid'}), 400

    return jsonify({'message': 'User registered successfully'}), 201

