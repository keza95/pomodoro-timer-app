from flask import Flask, request, render_template, jsonify
from db import init_db, get_db
from models import User

app = Flask(__name__)
app.config.from_pyfile('config.py')

# Initialize the database
init_db(app)


@app.route('/register', methods=['POST'])
def register():
    db = get_db()
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User(username=username, password=password)
    db.add(user)
    db.commit()

    return jsonify(message='User registered successfully'), 201


@app.route('/login', methods=['POST'])
def login():
    db = get_db()
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = db.query(User).filter_by(username=username).first()

    if user and user.password == password:
        return jsonify(message='Login successful'), 200

    return jsonify(message='Invalid username or password'), 401


if __name__ == '__main__':
    app.run(debug=True)
