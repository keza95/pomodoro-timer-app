import secrets
import sqlite3

# from email_validator import validate_email, EmailNotValidError
from flask import Flask, render_template, request, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

#create error id's for each API and test within postman?

app = Flask(__name__)
app.secret_key = "your_secret_key"

#start
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pomodoro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)


#end

# Function to create the users table if it doesn't exist
def create_users_table():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    email TEXT NOT NULL,
                    password TEXT NOT NULL,
                    session_id TEXT NOT NULL
                )''')
    conn.commit()
    conn.close()




# Create the users table before the first request is handled
@app.before_request
def before_request():
    create_users_table()

# Routes
@app.route('/')
def index():
    if 'username' in session:
        username = session['username']
        session_id = session['session_id']

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT id FROM users WHERE session_id=?", (session_id,))
        user_id = c.fetchone()[0]  # Fetch the user's ID
        conn.close()

        return render_template('index.html', user_id=user_id)
    else:
        return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        user = c.fetchone()
        conn.close()


        if user:
            session['username'] = username
            session['session_id'] = user[4]  # Store session ID in session
            return redirect(url_for('index'))
        else:
            error = 'Invalid credentials. Please try again.'
            return render_template('login.html', error=error)
    else:
        return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()
        if user:
            error = 'Username already exists. Please choose a different username.'
            return render_template('register.html', error=error)

        # Check if email already exists in the database
        user = User.query.filter_by(email=email).first()
        if user:
            error = 'Email address already exists. Please use a different email.'
            return render_template('register.html', error=error)

        try:
            # Validate the email address
            validate_email(email)
        except EmailNotValidError:
            error = 'Invalid email address. Please enter a valid email.'
            return render_template('register.html', error=error)

        #if password != confirm_password:
           # error = 'Passwords do not match. Please re-enter your password.'
            #return render_template('register.html', error=error)

        if len(password) < 8:
            error = 'Password must have at least 8 characters.'
            return render_template('register.html', error=error)

        session_id = secrets.token_hex(16)  # Generate a random session ID


        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (username, email, password, session_id) VALUES (?, ?, ?, ?)",
                  (username, email, password, session_id))
        conn.commit()
        conn.close()
        return redirect(url_for('login'))
    else:
        return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('session_id', None)  # Remove session ID from session
    return redirect(url_for('login'))

@app.route('/api/users', methods=['GET'])
def get_users():
    # Retrieve all users from the database
    all_users = User.query.all()

    # Create a list to store user data
    users_data = []
    for user in all_users:
        user_data = {
            'id': user.id,
            'username': user.username
        }
        users_data.append(user_data)

    return jsonify(users_data)


@app.route('/account', methods=[ 'GET', 'POST'])
def account():
    if 'username' in session:
        username = session['username']
        session_id = session['session_id']

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE session_id=?", (session_id,))
        user = c.fetchone()
        conn.close()

        if request.method == 'POST':
            new_username = request.form['username']
            new_email = request.form['email']
            new_password = request.form['password']

            # Update the user's information in the database
            conn = sqlite3.connect('database.db')
            c = conn.cursor()
            c.execute("UPDATE users SET username=?, email=?, password=? WHERE session_id=?",
                      (new_username, new_email, new_password, session_id))
            conn.commit()
            conn.close()

            # Redirect the user back to the account page
            return redirect(url_for('account'))
        else:
            return render_template('account.html', user=user)
    else:
        return redirect(url_for('login'))



if __name__ == '__main__':
    app.run(debug=True)
