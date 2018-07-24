//Welcome to my Chat App!!!

//About the structure
I made this app using the visual studio flask app template which handled all of the structure and set up and also inserted a boatload of javascript utilities that the editor uses.I hope 
this is okay and won't count agains structure. Flask Run will execute when set to runserver.py

This is a one page app that uses Javascript to dynamically change an update content, actullay found this easier to work with then normal HTML. Maybe I should look into react moving forward 

//How it works
Simple design that uses websockets to transfer data back and forth between server and client. When an update occurs, event is sent to server which broadcasts out to all 
clients, this way all clients local storage data is kept in sync 

//Personal Touch
* Users can have site "speak" messages using text to speechh 
* Users can delete messages 
* Users can play outkast using ctrl alt y 

//some difficulty getting this to run outside of visual studio, you'll need to isnatll eventlet to run outside, but uninstall to run within visual studio
FLASK_APP should be sent to runserver.py

