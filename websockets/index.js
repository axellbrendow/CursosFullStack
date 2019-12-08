// https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm

const userAdministration = require('./services/userAdministration');

const express = require('express');
const socket = require('socket.io'); // https://cdnjs.com/libraries/socket.io

// Create an express application. An express application can handle web
// requests and responses.
const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => console.log(`Listening on port:${PORT}`));

// Create a function to serve the files inside 'public' folder
app.use(express.static('public'));

// Setup socket management for the express server in the port we specified
const io = socket(server);

io.on('connection',
    // Receive the socket that is being used between the client and the server
    (socket) => {
        console.log(`Made socket connection: ${socket.id}`);

        // Create an event listener for this socket
        socket.on('chat',
            (data) => {
                const userColor = userAdministration.getUserColorAndSaveIt(data.username);

                io.sockets.emit('chat', {...data, userColor});
            }
        );

        socket.on('typing',
            (data) => {
                socket.broadcast.emit('typing', data);
            }
        );
    }
);
