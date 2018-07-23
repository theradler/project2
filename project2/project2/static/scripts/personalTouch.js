function textToSpeech(text) {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

function speakText(object) {
    var messageId = "message" + object.id;
    var message = document.getElementById(messageId);
    textToSpeech(message.textContent);
}

function supersecret() {
    document.onkeyup = function (e) {
        if (e.ctrlKey && e.altKey && e.which == 89) {
            console.log("secret activated");
            var iframe = document.createElement('iframe');
            iframe.setAttribute('width', '0');
            iframe.setAttribute('height', '0');
            iframe.setAttribute('src', "https://www.youtube.com/embed/lJp-HER1RvI?rel=0&autoplay=1");
            iframe.setAttribute('frameborder', '0');
            document.body.appendChild(iframe);
        }
    }
}