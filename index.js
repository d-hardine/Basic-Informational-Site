//pure node.js, without express. uncomment if necessary
/*
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
*/

//using express, comment the whole codes below and uncomment codes above to use the pure node.js version
import express from 'express'
import path from 'path'
const __dirname = import.meta.dirname; //ESM is not recognize __dirname variable, this is the solution

const app = express()
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")))
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "about.html")))
app.get("/contact-me", (req, res) => res.sendFile(path.join(__dirname, "contact-me.html")))
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, '404.html')))

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})