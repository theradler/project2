function textToSpeech(text) {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

function speakText(object) {
    var messageId = "message" + object.id;
    var message = document.getElementById(messageId);
    textToSpeech(message.textContent);
}