
//thought it would be cool if users could play messages 
function textToSpeech(text) {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}
//so made a simple text to speech 
function speakText(object) {
    var messageId = "message" + object.id;
    var message = document.getElementById(messageId);
    textToSpeech(message.textContent);
}

//this play outcast on the right key stroke combos 
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