
function loadUsername() {
    if (localStorage.getItem("username") != null) {
        document.getElementById("username").innerHTML = localStorage.getItem("username")
    }
}

function saveUserName() {
    localStorage.setItem("username", document.getElementById("username_field").value)
    document.getElementById("localMem").innerHTML = localStorage.getItem("username")

}