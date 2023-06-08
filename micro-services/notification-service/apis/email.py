# TODO: Update with Actual Server Information

from flask import Flask
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

app = Flask(__name__)
mail = Mail(app)

load_dotenv()

# Set configurations
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'kieran.yoobee@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route('/')
def email():
    msg = Message('Welcome to Flask Email',
                  sender='kieran.yoobee@gmail.com',
                  recipients=['kieran.gamer@gmail.com'])

    msg.body = "Hello its yo mama!"
    mail.send(msg)

    return 'You were successful'


if __name__ == '__main__':
    app.run(debug=True)



