"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from project2 import app
from project2.forms import localUserName

@app.route('/', methods=['GET', 'POST'])
def index():
    form = localUserName()
    return render_template('index.html',form=form)
