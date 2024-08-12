const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
    res.writeHead(200, {

    });
    fs.readFile("./index.html", (err, fileContent) => {
        res.end(fileContent);
    });

})

const io = socketIo(server);

io.on('connection', (socket) => {
    socket.on('chat_message', (msg) => {        
        io.emit('server_data', msg);
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
