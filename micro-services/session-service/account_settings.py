from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('account_info.html')


@app.route('/update_email')
def update_email():
    # Logic to update email
    return 'Email updated successfully'


@app.route('/update_username')
def update_username():
    # Logic to update username
    return 'Username updated successfully'


@app.route('/update_contact')
def update_contact():
    # Logic to update contact number
    return 'Contact number updated successfully'


if __name__ == '__main__':
    app.run()
