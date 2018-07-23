
function messageJsonBuilder(channel, user, message) {
    var messageObject = {};
    messageObject.channel = channel;
    messageObject.user = user;
    messageObject.timestamp = new Date().getTime();
    messageObject.message = message;
    return messageObject;

}

function getNewMessage() {
    console.log("submitting new message");
    var newMessageText = document.getElementById("messagePostField").value
    var currentUser = localStorage.getItem("username");
    var currentChannel = localStorage.getItem("currentChannel");
    return messageSender(currentChannel, currentUser, newMessageText);
 }

function messageSender(channel, user, message) {
    var newMessage = messageJsonBuilder(channel = channel, user = user, message = message);
    var messageList = []
    messageList = localStorage.getItem("messageList");
    if (messageList != null) {
        messageList = JSON.parse(localStorage.getItem("messageList"));
    } else {
        messageList = [];
    }
    messageList = apply100Limit(messageList, newMessage.channel);
    messageList.push(newMessage);
    return messageList; 

}
function apply100Limit(messageList, channel) {
    return messageList;
}

function InsertTestMessage() {
    for (i = 0; i < 10; i++) {
        messageSender("General", "Admin", "Cool Beans Message Man");
    }
}

function getMessages() {
    var channel = localStorage.getItem("currentChanel");
    var messageList = localStorage.getItem("messageList")
    if (messageList != null) {
        messageList = JSON.parse(messageList);
    }
    messageList = filterByChannel(channel, messageList);
    for (messageKey in messageList) {
        console.log(messageList[messageKey].message)
        renderMessages(messageList[messageKey].message)
    }

}

function renderMessages(message) {
    const post = document.createElement('div');
    const innerMessage = document.createElement('div');
    const username = document.createElement('H5');
    var formattedTime = returnFormattedDateTime(message.timestamp);
    console.log(formattedTime);
    username.setAttribute("class", "mt-0");
    post.setAttribute("class", "media");
    innerMessage.setAttribute("class", "media-body");
    innerMessage.innerHTML = message.message;
    innerMessage.id = 'message';
    username.appendChild(document.createTextNode(("From: " + message.user + " @ " + formattedTime)));
    innerMessage.appendChild(username);
    post.appendChild(innerMessage);
    document.querySelector('#messages').append(post);
}

function displayMessages() {
    var messages = JSON.parse(localStorage.getItem("messageList"));
    var currentChannel = localStorage.getItem("currentChannel");
    var messages = messages.filter(messages => {
        return messages.channel == currentChannel; 
    })
    console.log(messages);
    document.getElementById("messages").innerHTML = '';
    if (messages == null) {
        //display no message message
    }
    else {
        for (i = 0; i < messages.length; i++) {
            renderMessages(messages[i]);
        }
    }
}

function returnFormattedDateTime(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function disablePostMessageButton(tooltip) {
    document.getElementById("messagePostButton").disabled = true;
    document.getElementById("messagePostButton").setAttribute("title", tooltip);
}

function enablePostMessageButton() {
    document.getElementById("messagePostButton").disabled = false;
    document.getElementById("messagePostButton").removeAttribute('title');

}