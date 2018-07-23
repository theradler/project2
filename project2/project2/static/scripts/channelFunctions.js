function addChannel() {
    console.log("Adding Channel Button pressed");
    var newChannel = document.getElementById("channel_input_field").value
    //get current channels
    var channel = JSON.parse(localStorage.getItem("channelList"));
    //validate that the channel doesn't already exist or is empty
    if (channel.includes(newChannel)) {
        channelAlert("You can't Submit Duplicate Channels");
        return channel;
    }
    else if (isNullOrEmpty(newChannel)) {
        channelAlert("You can't Submit Empty Channels")
        return channel;
    }
    else {
        //add new channel to list of channels
        channel.push(document.getElementById("channel_input_field").value)
        //return channel list for socket io to send to server 
    }
    return channel
}
//alert message handler for channel, allows user to pass in message and creates generic danger boostrap alert in channel columns 
function channelAlert(errorMessage) {
    document.getElementById('alertSection').innerHTML = '';
    var alert = document.createElement('div');
    alert.setAttribute('class', "alert alert-danger alert-dismissible");
    alert.setAttribute('role', 'alert');
    alert.setAttribute.id = "channelALert";
    alert.appendChild(document.createTextNode(errorMessage));
    document.getElementById('alertSection').appendChild(alert);
}

//function that handles channel switching using the channel list, unbolds all channels, bolds new slected one, then updates local storage 
function selectCurrentChannel(attribute) {
    var channelLink = document.getElementsByClassName("channelLink");

    for (var i = 0; i < channelLink.length; i++) {
        document.getElementById(channelLink[i].style.fontWeight = "normal");
    }
    document.getElementById(attribute.id).style.fontWeight = "bold";
    localStorage.setItem("currentChannel", attribute.dataset.value);
    //calls render message to display messages for newly slected channel, since display messages uses local storage no need to pass anything around 
    displayMessages();
};


//bit of a beast since it grows som many html elements, in hindsight I probably should have created a function to handle all these kind of set ups because I ended up writing a ton of 
//them
function renderChannels() {
    //gets local channels
    var channels = JSON.parse(localStorage.getItem("channelList"));
    //clears out div to make room for new stuff 
    document.getElementById('channelList').innerHTML = '';
    //for loop, for each channel create a paragraph in an li, create a on click event (handles channel switching) and place them in my unordered list )
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
//function used on load to bold default channel 
function boldDefaultChannel() {
    var channelLink = document.getElementsByClassName("channelLink");
    for (var i = 0; i < channelLink.length; i++) {
        if (channelLink[i].dataset.value == localStorage.getItem('currentChannel')) {
            document.getElementById(channelLink[i].id).style.fontWeight = "bold";
        }
    }

};

//validator for null or empty inoputs on the channel input 
function isNullOrEmpty(string) {
    var result = true;
    if (string) {
        if (typeof (string) == 'string') {
            if (string.length > 0)
                result = false;
        }
    }
    return result;
}