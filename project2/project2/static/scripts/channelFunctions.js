function addChannel() {
    console.log("Adding Channel Button pressed");
    var newChannel = document.getElementById("channel_input_field").value
    //do some validation here
    //get current channels
    var channel = JSON.parse(localStorage.getItem("channelList"));
    //add new channel to list of channels
    channel.push(document.getElementById("channel_input_field").value)
    //set local storage variable to channel list
    localStorage.setItem("channelList", JSON.stringify(channel))
    //reload channels via AJAX call
    getChannelsAjax();

}

function selectCurrentChannel(attribute) {
    var channelLink = document.getElementsByClassName("channelLink");

    for (var i = 0; i < channelLink.length; i++) {
        document.getElementById(channelLink[i].style.fontWeight = "normal");
    }
    document.getElementById(attribute.id).style.fontWeight = "bold";
    localStorage.setItem("currentChannel", attribute.dataset.value);
};


function filterByChannel(channel, messageList) {
    return messageList.filter(message => message.channel == channel);
}