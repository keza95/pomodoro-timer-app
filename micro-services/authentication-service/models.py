from models import db
#from flask import Flask, render_template, request, redirect, session, jsonify
#from flask_sqlalchemy import SQLAlchemy
#from datetime import datetime, timedelta
#import secrets

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Task {self.description}>'


class Metric(db.Model):
    metric_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    date = db.Column(db.Date, default=datetime.today().date())
    tasks_completed = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Metric {self.user_id} - {self.date}>'


class Badge(db.Model):
    badge_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    badge_name = db.Column(db.String(50), nullable=False)
    badge_description = db.Column(db.String(200))
    badge_image = db.Column(db.String(100))

    def __repr__(self):
        return f'<Badge {self.badge_id}>'


@app.before_first_request
def create_tables():
    db.create_all()


