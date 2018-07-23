
function saveUsername() {
    var username = document.getElementById("usernameEnterField").value
    localStorage.setItem("username", username);
    renderKnownUser();
    disablePostMessageButton("Please enter text in order to send message")

}

function logoutUsername() {
    localStorage.removeItem("username");
    renderNewUserNameButton();
    disablePostMessageButton("Please login in order to send messages")

}

function renderNewUserNameButton() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'usernameEnterField');
    const button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-outline-light");
    button.setAttribute("onclick", "saveUsername()");
    button.appendChild(document.createTextNode("Submit Username"))
    document.getElementById("username").innerHTML = '';
    document.getElementById("username").appendChild(input);
    document.getElementById("username").appendChild(button);
    
}

function renderKnownUser() {
    var username = localStorage.getItem("username");
    var Message = "Hello " + username + " Welcome to Chat"; 
    const usernameMessage = document.createElement('h1');
    const button = document.createElement('button'); 
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-outline-light");
    button.setAttribute("onclick", "logoutUsername()");
    button.appendChild(document.createTextNode("Logout"))
    usernameMessage.appendChild(document.createTextNode(Message));
    document.getElementById("username").innerHTML = '';
    document.getElementById("username").appendChild(usernameMessage);
    document.getElementById("username").appendChild(button);
    
}

