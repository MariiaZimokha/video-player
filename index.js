const http = require('http');
const {routes} = require('./routes');

const server = http.createServer((req, res) => {
    routes(req, res);
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Server is running on 5000 port');
});
