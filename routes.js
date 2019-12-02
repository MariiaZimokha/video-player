const fs = require('fs');

function handle(stream, res) {
    stream.on('end', () => {
        res.end();
    });

    stream.on('error', (e) => {
        console.log('error ', e);
        res.end();
    });
}

function index(res) {
    const readableStream = fs.createReadStream('./index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});

    readableStream.pipe(res);
    handle(readableStream, res);
}

function video(req, res) {
    const path = './assets/back-to-the-future.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) { //if the file is not full
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);

        handle(file, res);
    } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        const readableStream = fs.createReadStream(path);
        readableStream.pipe(res);

        handle(readableStream, res);
    }
}

function routes(req, res) {
    switch(req.url) {
        case '/video': {
            video(req, res);
            break;
        }
        default: index(res);
    }
}

module.exports = {
    routes
}
