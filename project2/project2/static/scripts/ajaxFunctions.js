function getChannelsAjax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var channels = JSON.parse(localStorage.getItem("channelList"));
            if (channels != null) {
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
        }
    };

    xhttp.open("GET", "/", true);
    xhttp.send();
}

function getMessagesAjax() {
    var xhttp = new XMLHttpRequest();
    var messages = JSON.parse(localStorage.getItem("messageList"));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var messages = JSON.parse(localStorage.getItem("messageList"));
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
    }
    xhttp.open("GET", "/", true);
    xhttp.send();
};

