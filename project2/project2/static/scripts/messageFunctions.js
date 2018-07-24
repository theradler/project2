//message builder for json message objects, usefull to encapsulate 
function messageJsonBuilder(channel, user, message) {
    var messageObject = {};
    messageObject.channel = channel;
    messageObject.user = user;
    messageObject.timestamp = new Date().getTime();
    messageObject.message = message;
    messageObject.guid = guid();
    return messageObject;

}
//handler function that gathers neccessary info for socket functions 
function getNewMessage() {
    var newMessageText = document.getElementById("messagePostField").value;
    var currentUser = localStorage.getItem("username");
    var currentChannel = localStorage.getItem("currentChannel");
    return messageSender(currentChannel, currentUser, newMessageText);
}

function deleteMessage(object) {
    var messages = JSON.parse(localStorage.getItem('messageList'));
    messages = findAndRemove(messages, 'guid', object.id);
    socketRemoveMessage(socket, messages);
}

//gathers list of current messages from local memory, handles the no message potential, adds new message to object that gets sent to server 
function messageSender(channel, user, message) {
    //builds message json 
    var newMessage = messageJsonBuilder(channel = channel, user = user, message = message);
    //init message list 
    var messageList = localStorage.getItem("messageList");
    //if we have messages get them, if not assume they are blank
    if (messageList != null) {
        messageList = JSON.parse(localStorage.getItem("messageList"));
    } else {
        messageList = [];
    }
    messageList = apply100Limit(messageList, newMessage.channel);
    messageList.push(newMessage);
    //return message list 
    return messageList;

}
//ensures that we can have no more that 100 messages per channel 
function apply100Limit(messageList, channel) {
    console.log(messageList)
        ;    return messageList;
}

//function I created early to just throw messages into system so I could debug and style, still may be useful to you so leaving it 
//function InsertTestMessage() {
//    for (i = 0; i < 10; i++) {
//        messageSender("General", "Admin", "Cool Beans Message Man");
//    }
//}


//bit of a beast and given more time would probably have tried to encapsulate more 
function renderMessages(message) {
    //declaring elements of the message box
    const post = document.createElement('div');
    const innerMessage = document.createElement('div');
    const username = document.createElement('H5');
    const speaker = document.createElement('img');
    const messagetext = document.createElement('p');
    const deleteButton = document.createElement('img');
    //create unique id that will allow us to reference messasge 
    var id = message.guid;
    //create speaker link and add onclick and id 
    speaker.setAttribute("src", "../static/content/speaker.png");
    speaker.setAttribute('alt', 'speakerbox');
    speaker.setAttribute('class', 'speakerLink');
    speaker.setAttribute('onclick', 'speakText(this)')
    speaker.id = id;
    //create delete message button /link 
    deleteButton.setAttribute("src", "../static/content/xIcon.png")
    deleteButton.setAttribute('alt', 'x icon');
    deleteButton.setAttribute('class', 'speakerLink');
    deleteButton.setAttribute('onclick', 'deleteMessage(this)')
    deleteButton.id = id;
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
    if (message.user == localStorage.getItem('username')) {
        post.appendChild(deleteButton);
    }
    post.appendChild(speaker);
    document.querySelector('#messages').append(post);
}

//for every message in memory on the current channel, this sucker will call the render function for them 
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

//following slacks lead, added a page for "new messages" tumbleweeds are cool 
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

//Date time parser to get human readable dates 
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

//utility for disabling the post message button and setting a tool tip 
function disablePostMessageButton(tooltip) {
    document.getElementById("messagePostButton").disabled = true;
    document.getElementById("messagePostButton").setAttribute("title", tooltip);
}

//utlity for undoing everything the previous function does 
function enablePostMessageButton() {
    document.getElementById("messagePostButton").disabled = false;
    document.getElementById("messagePostButton").removeAttribute('title');

}

//message validator, makes sure you can't post an empty string, fires off an onclick event procedurally created 
function validateMessage() {
    var messagePostField = document.getElementById('messagePostField');
    if (messagePostField.value.length > 0 && (localStorage.getItem('username'))) {
        enablePostMessageButton();
    }
    else {
        disablePostMessageButton("Please enter text in order to send message");
    }
}
//usefull function for just returning messages from a specific channels 
function filterByChannel(channel, messageList) {
    return messageList.filter(message => message.channel == channel);
}
//utilitys for making guides that enabled my text to speech functionality 
function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function findAndRemove(array, property, value) {
    array.forEach(function (result, index) {
        if (result[property] === value) {
            //Remove from array
            array.splice(index, 1);
        }
    });
    return array;  
}

