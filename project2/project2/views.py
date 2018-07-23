"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, jsonify
from project2 import app, socketio, channel_list
from project2.forms import localUserName
from flask_socketio import emit, send
import sys

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@socketio.on('client_connected')
def handle_client_connect_event(json):
     print("client connected",file=sys.stderr)
     emit('load_channels', {'channels': channel_list})

@socketio.on('loadFromPython')
def loadFromPython():
    emit('load_channels', {'channels': channel_list})

@socketio.on('addChannel')
def addChannel(channels):
    print("Client has made channel update request")
    emit('newChannelAdded', {'channels': channels }, broadcast=True)

@socketio.on('addMessage')
def addMessage():
    emit("loadMessages","loading messages from server")