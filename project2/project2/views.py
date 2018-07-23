"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, jsonify
from project2 import app, socketio, channel_list
from project2.forms import localUserName
from flask_socketio import emit, send, SocketIO

@app.route('/', methods=['GET', 'POST'])
def index():
    form = localUserName()
    return render_template('index.html',form=form)

@socketio.on('connect')
def test_connect():
    print(channel_list);
    emit('load_channels', {'channels': channel_list})
    emit('default_channel', {'default_channel': channel_list[0]})


@socketio.on('addChannel')
def addChannel(data):
    print("We got a message")
    emit('loadChannel',"loading channel from server")

@socketio.on('addMessage')
def addMessage():
    emit("loadMessages","loading messages from server")