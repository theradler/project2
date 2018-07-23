
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

    //declaring elements of the message box
    const post = document.createElement('div');
    const innerMessage = document.createElement('div');
    const username = document.createElement('H5');
    const speaker = document.createElement('img');
    const messagetext = document.createElement('p');

    //create unique id that will allow us to reference messasge 
    var id = guid();
    //create speaker link and add onclick and id 
    speaker.setAttribute("src", "../static/content/speaker.png");
    speaker.setAttribute('alt', 'speakerbox');
    speaker.setAttribute('class', 'speakerLink');
    speaker.setAttribute('onclick', 'speakText(this)')
    speaker.id = id;
    //process timestamp
    var formattedTime = returnFormattedDateTime(message.timestamp);
    //format message & append to inner Message 
    messagetext.appendChild(document.createTextNode(message.message));
    messagetext.id = ("message" + id);
    innerMessage.appendChild(messagetext);
    
    //format username and append to inner Message
    username.setAttribute("class", "mt-0");
    username.appendChild(document.createTextNode(("From: " + message.user + " @ " + formattedTime)));
    innerMessage.appendChild(username);

   
    //format inner message 
    innerMessage.setAttribute("class", "media-body");
    //format and add to post 
    post.setAttribute("class", "media");
    post.appendChild(innerMessage);
    post.appendChild(speaker);
    document.querySelector('#messages').append(post);
}

function displayMessages() {
    var messages = JSON.parse(localStorage.getItem("messageList"));
    var currentChannel = localStorage.getItem("currentChannel");
    document.getElementById("messages").innerHTML = '';
    if (messages == null) {
        renderEmptyMessage();
    }
    else {
        messages = messages.filter(messages => {
            return messages.channel == currentChannel;
        })
        if (messages.length == 0) {
            renderEmptyMessage();
        }
        else {
            for (i = 0; i < messages.length; i++) {
                renderMessages(messages[i]);
            }
        }

    }
}


function renderEmptyMessage() {
    var emptyMessages = document.createElement('h1');
    var emptyMessageImage = document.createElement('img');
    emptyMessageImage.setAttribute('src', "https://i.gifer.com/7TPK.gif");
    emptyMessageImage.id = "emptyMessageImage";
    emptyMessageImage.setAttribute('align', 'middle');
    emptyMessages.id = "emptyMessagesMessage";
    emptyMessages.appendChild(document.createTextNode("Looks like no one is home, be the first and get the conversation started"));
    document.querySelector('#messages').append(emptyMessageImage);
    document.querySelector('#messages').append(emptyMessages);
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

function validateMessage() {
    var messagePostField = document.getElementById('messagePostField');
    if (messagePostField.value.length > 0 && (localStorage.getItem('username'))) {
        enablePostMessageButton();
    }
    else {
        disablePostMessageButton("Please enter text in order to send message");
    }
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}