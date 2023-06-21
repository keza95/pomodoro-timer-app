from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    user_name = data['user_name']
    email = data['email']
    password = data['password']

    # TODO: Once completed create new error_handling.py file and refactor code
    error = {
        'error_id': "PDA-001",  # PDA = Pomodoro Timer Application
        'error_message': "Invalid input for username, username should be a string"
    }

    error_username = {
        'error_id': "PDA-002",  # PDA = Pomodoro Timer Application
        'error_message': "Invalid input for username, username should be a string between 5 - 20 characters"
    }

    # Checks the length of the password
    if len(user_name) < 5 or len(user_name) > 20:
        return jsonify({'error': error}), error['error_id']

    # Validates email being registered
    if '@' not in email or '.' not in email:
        return jsonify({'message': 'Your email must include a \'.\' and an \'@\' symbol'})

    # Validate password length
    if password < 8:
        return jsonify({'message': 'Pass word must be at least 8 characters long to be valid'}), 400

    return jsonify({'message': 'User registered successfully'}), 201
