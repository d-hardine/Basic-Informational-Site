import { createServer } from 'node:http';
import { readFile } from 'node:fs';

const hostname = 'localhost';
const port = 8080;

const server = createServer((req, res) => {
    let filePath = ''
    let statusCode = 200
    let contentType = 'text/html'

    if (req.url === "/")
        filePath = "index.html";
    else if (req.url === "/about")
        filePath = "about.html";
    else if (req.url === "/contact-me")
        filePath = "contact-me.html";
    else {
        filePath = "404.html";
        statusCode = 404;
    }
    console.log(filePath)

    readFile(filePath, (err, data) => {
        if(err) {
            res.statusCode = 500
            res.setHeader('content-type', 'text/plain')
            res.end('Internal Server Error\n')
            return
        }

        res.statusCode = statusCode
        res.setHeader('content-type', contentType)
        res.end(data)
    })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});