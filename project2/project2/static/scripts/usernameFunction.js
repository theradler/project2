
function saveUsername() {
    //gets value from username entery field
    var username = document.getElementById("usernameEnterField").value;
    //sets local storage equal to that value
    localStorage.setItem("username", username);
    //calls the function that sets up the section that will replace the login screen 
    renderKnownUser();
    //updates the tool tip on the message post to a more accurate instruction
    disablePostMessageButton("Please enter text in order to send message");
}

function logoutUsername() {
    //removes the username from local storage, will lock user sensitive features
    localStorage.removeItem("username");
    //renders the username login button so user can reaccess site 
    renderNewUserNameButton();
    //updates the tool tip on the message post to a more accurate instruction
    disablePostMessageButton("Please login in order to send messages");

}

function renderNewUserNameButton() {
    //creates local constant of input & sets important properties
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'usernameEnterField');
    //creates local constant of button & sets important properties
    const button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-outline-light");
    button.setAttribute("onclick", "saveUsername()");
    button.appendChild(document.createTextNode("Submit Username"))
    //cleatrs out div out puts new content in
    document.getElementById("username").innerHTML = '';
    document.getElementById("username").appendChild(input);
    document.getElementById("username").appendChild(button);

}

function renderKnownUser() {
    //gets and sets some strings and info we will need 
    var username = localStorage.getItem("username");
    var Message = "Hello " + username + " Welcome to Chat";
    //creates constants for html elements & sets attributes
    const usernameMessage = document.createElement('h1');
    const button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-outline-light");
    button.setAttribute("onclick", "logoutUsername()");
    button.appendChild(document.createTextNode("Logout"))
    usernameMessage.appendChild(document.createTextNode(Message));
    usernameMessage.id = "usernameMessage";
    //clears out div and puts new content in
    document.getElementById("username").innerHTML = '';
    document.getElementById("username").appendChild(usernameMessage);
    document.getElementById("username").appendChild(button);

}

