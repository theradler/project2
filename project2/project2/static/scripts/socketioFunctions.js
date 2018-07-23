function socketInit() {
    //establish socket io connection
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    //send connection emit to server in order to kick off load from server
    socket.on('connect', () => {
        socket.emit('client_connected', { data: 'new client connection' });
    })
    //this was just for kicks 
    supersecret();
    //return socket so that it can be used throught the chat app 
    return socket;
}


function socketListen(socket) {
    //initial load channels 
    socket.on('load_channels', response => {
        //set localstorage channel storage objects 
        localStorage.setItem('channelList', JSON.stringify(response.channels));
        //if current channel is not set in local memory, which should only be possibel on the initial load of the page, then we set it the first value in the inital default channel load, a little lazy but not ineffective 
        if (!localStorage.getItem('currentChannel')) {
            localStorage.setItem('currentChannel', response.channels[0]);
        }
        //call the load channels functions 
        renderChannels();
        //extra function to replicate the interaction and visual ques users will have once app is loaded, currently slected channel will be bolded
        boldDefaultChannel();
    });
    //socket handler for new channel event, when user add channel server get updated and then broadcasts out to all connected clients 
    socket.on('newChannelAdded', response => {
        localStorage.setItem('channelList', JSON.stringify(response.channels.channels));
        //call the load channels functions 
        renderChannels();
    });
    //socket handler for new messages, has the same logic as client handler
    socket.on('newMessagePosted', response => {
        localStorage.setItem("messageList", JSON.stringify(response.messages.messages));
        //calls the load messages button 
        displayMessages();
    })
}
//add channel emit event, sends new channels to server for distribution
function socketAddChannel(socket) {
    var channels = addChannel();
    socket.emit("addChannel", { 'channels': channels }); 
}
//add messages emit event, sends new messages to server for distribution 
function socketSendMessage(socket) {
    var messages = getNewMessage();
    socket.emit("addMessage", { 'messages': messages });
}