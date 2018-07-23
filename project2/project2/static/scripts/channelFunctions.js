function addChannel() {
    console.log("Adding Channel Button pressed");
    var newChannel = document.getElementById("channel_input_field").value
    //get current channels
    var channel = JSON.parse(localStorage.getItem("channelList"));
    //add new channel to list of channels
    channel.push(document.getElementById("channel_input_field").value)
    //return channel list for socket io to send to server 
    return channel
}

function selectCurrentChannel(attribute) {
    var channelLink = document.getElementsByClassName("channelLink");

    for (var i = 0; i < channelLink.length; i++) {
        document.getElementById(channelLink[i].style.fontWeight = "normal");
    }
    document.getElementById(attribute.id).style.fontWeight = "bold";
    localStorage.setItem("currentChannel", attribute.dataset.value);
    displayMessages();
};


function filterByChannel(channel, messageList) {
    return messageList.filter(message => message.channel == channel);
}

function renderChannels() {
    var channels = JSON.parse(localStorage.getItem("channelList"));
    document.getElementById('channelList').innerHTML = '';
        for (i = 0; i < channels.length; i++) {
            var li = document.createElement('li');
            var p = document.createElement('p');
            var linkText = document.createTextNode(channels[i]);
            p.appendChild(linkText);
            p.id = ("channel-selector" + i);
            p.setAttribute("class", "channelLink")
            p.setAttribute("data-value", channels[i])
            p.setAttribute("onclick", "selectCurrentChannel(this)");
            li.appendChild(p);
            document.getElementById("channelList").appendChild(li);
    }
}
function boldDefaultChannel() {
    var channelLink = document.getElementsByClassName("channelLink");
    for (var i = 0; i < channelLink.length; i++) {
        if (channelLink[i].dataset.value == localStorage.getItem('currentChannel')) {
            document.getElementById(channelLink[i].id).style.fontWeight = "bold";
        }
    }
  
};