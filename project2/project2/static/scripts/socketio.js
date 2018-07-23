//function socketIOLoad(socket) {
//    socket.on('load_channels', response => {
//        if (!(localStorage.getItem("channelList"))) {
//            localStorage.setItem("channelList", JSON.stringify(response.channels))
//        }
//    });
//    socket.on('default_channel', response => {
//        if (!(localStorage.getItem("currentChannel"))) {
//            localStorage.setItem("currentChannel", response.default_channel)
//        }
//    });
//}

//function socketInit() {
//    return io.connect('http://' + document.domain + ':' + location.port);
//}

//function sockketAddChannel(socket) {
//    console.log("hello World");
//    //socket.emit("addChannel", { 'data': 'stuff from client' })
//}

//function socketLoadChannel(socket) {
//    socket.on('loadChannel', response => {
//        console.log("Recieved Ping From Server that will load messages")
//    })
//}

//function socketAddChannel(socket) {
//    document.getElementById("addChannelButton").addEventListener('click', function () {
//        console.log("socket fire")
//        socket.emit('addChannel', { 'data': 'data' })
//    });

//}
