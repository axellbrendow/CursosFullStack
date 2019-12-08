// Make connection
const socket = io.connect('http://localhost:4000');

// Query DOM
const marioChat = document.getElementById('mario-chat'),
        chatWindow = document.getElementById('chat-window'),
        message = document.getElementById('message'),
        username = document.getElementById('username'),
        btn = document.getElementById('send'),
        output = document.getElementById('output'),
        feedback = document.getElementById('feedback');

// Emit events
marioChat.onkeypress = (event) => event.key === 'Enter' ? btn.click() : null;

btn.addEventListener('click',
    () => {
        socket.emit('chat', {
            message: message.value,
            username: username.value
        });
        
        message.value = "";
        message.focus();
    }
);

message.addEventListener('keypress',
    () => {
        if (message.value && message.value.length > 0)
            socket.emit('typing', username.value);
    }
);

// Listen for events
socket.on('chat',
    (data) => {
        feedback.innerHTML = "";

        output.innerHTML +=
            `<p><strong style="color: ${data.userColor};">${data.username}</strong>: ` +
            `${data.message}</p>`;

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
);

socket.on('typing',
    (data) => {
        feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
    }
);
