const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')

function sendMessage(e) {
    e.preventDefault()
    if (msgInput.value) {
        socket.emit('message', msgInput.value)
        msgInput.value = ''
    }
    msgInput.focus()
}

document.querySelector('form').addEventListener('submit', sendMessage)

socket.on("message", (data) => {
    activity.textContent = ''
    const li = document.createElement('li')
    li.innerHTML = data;
    document.querySelector('ul').appendChild(li)
})

msgInput.addEventListener('keypress', () => {
    socket.emit('typing', `${socket.id} is typing...`)
}) 

let activityTimer;
socket.on('typing', (data) => {
    activity.textContent = data

    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ''
    }, 3000)
})