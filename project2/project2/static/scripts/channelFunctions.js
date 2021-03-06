function addChannel() {
    var newChannel = document.getElementById("channel_input_field").value;
    newChannel = newChannel.toLowerCase();
    document.getElementById("channel_input_field").value = '';
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
        channel.push(newChannel)
        //return channel list for socket io to send to server 
    }
    return channel
}
//alert message handler for channel, allows user to pass in message and creates generic danger boostrap alert in channel columns 
function channelAlert(errorMessage) {
    const span = document.createElement('span');
    const button = document.createElement('button');
    //set up close button 
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'close');
    button.setAttribute('data-dismiss', 'alert');
    button.setAttribute('onclick','dismissAlert()')
    //set up span
    span.setAttribute('aria-hidden', 'true');
    document.getElementById('alertSection').innerHTML = '';
    button.innerHTML = "&times;";
    //create div
    var alert = document.createElement('div');
    alert.setAttribute('class', "alert alert-danger alert-dismissible");
    alert.setAttribute('role', 'alert');
    alert.setAttribute.id = "channelALert";
    //alert.append(span);
    alert.append(button);
    alert.appendChild(document.createTextNode(errorMessage));
    document.getElementById('alertSection').appendChild(alert);
}

function dismiessAlert() {
    document.getElementById('alertSection').innerHTML = '';
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