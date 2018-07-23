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
        renderChannels();
    });

    socket.on('newChannelAdded', response => {
        localStorage.setItem('channelList', JSON.stringify(response.channels.channels));
        console.log("render new channels");
        renderChannels();
    });
}

function socketAddChannel(socket) {
    var channels = addChannel();
    socket.emit("addChannel", { 'channels': channels }); 
}