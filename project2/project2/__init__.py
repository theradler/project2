"""
The flask application package.
"""

import os

from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

app.config.update(dict(
    SECRET_KEY="powerful secretkey",
    WTF_CSRF_SECRET_KEY="a csrf secret key"
))


# list of all channels
channel_list = ['general']


import project2.views 

if __name__ == '__main__':
    socketio.run(app)
