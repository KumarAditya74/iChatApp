const socket = io('http://localhost:8000');

const form = document.getElementById('form')
const msgInput = document.getElementById('msg-inp')
const msgContainer = document.querySelector(".container")
var audio = new Audio('whistle.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if (position == 'left'){
        audio.play();
    }
    

}
form.addEventListener('submit', (e) => {
    e.preventDefault();//it helps to stop the refresh regularly
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';

})
const nam = prompt("Enter your name to join");
socket.emit('new-user-joined', nam);

socket.on('user-joined', nam => {
    append(`${nam} joined the chat`, 'right')
})
socket.on('receive', data => {
    append(`${data.nam}: ${data.message}`, 'left')
})
socket.on('left', nam => {
    append(`${data.nam} left the chat`, 'right')
})
