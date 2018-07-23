function socketInit() {
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', () => {
        socket.emit('client_connected', { data: 'new client connection' });
        console.log("Websocket connected");
    })
    return socket;
}


function socketListen(socket) {
    socket.on('load_channels', response => {
        console.log("setting channel list");
        localStorage.setItem('channelList', JSON.stringify(response.channels));
        if (!localStorage.getItem('currentChannel')) {
            localStorage.setItem('currentChannel', response.channels[0]);
        }
        renderChannels();
        boldDefaultChannel();
    });

    socket.on('newChannelAdded', response => {
        localStorage.setItem('channelList', JSON.stringify(response.channels.channels));
        console.log("render new channels");
        renderChannels();
    });

    socket.on('newMessagePosted', response => {
        localStorage.setItem("messageList", JSON.stringify(response.messages.messages));
        displayMessages();
    })
}

function socketAddChannel(socket) {
    var channels = addChannel();
    socket.emit("addChannel", { 'channels': channels }); 
}

function socketSendMessage(socket) {
    var messages = getNewMessage();
    socket.emit("addMessage", { 'messages': messages });
}