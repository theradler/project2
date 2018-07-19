function addChannel() {
    var newChannel = document.getElementById("channel_input_field").value
    var channel = JSON.parse(localStorage.getItem("channel_list"));
    channel.push(document.getElementById("channel_input_field").value)
    localStorage.setItem("channel_list", JSON.stringify(channel))
    loadChannels()

}


