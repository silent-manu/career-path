const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const isJson = contentType === "application/json";
    const data = isJson ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(isJson ? JSON.stringify(data) : data);
  } catch (err) {
    console.error(err);
    myEmitter.emit("log", `${req.url}\t${req.method}`, 'errLog.txt');
    response.statusCode = 500;
    response.end();
  }
};

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}

//Initialize object
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const server = http.createServer((req, res) => {
  myEmitter.emit("log", `${req.url}\t${req.method}`, 'reqLoq.txt');

  const extension = path.extname(req.url);

  const contentTypeMap = {
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".txt": "text/plain",
  };

  const contentType = contentTypeMap[extension] || "text/html";
  let filePath;

  if (contentType === "text/html") {
    if (req.url === "/") {
      filePath = path.join(__dirname, "views", "index.html");
    } else if (req.url.slice(-1) === "/") {
      filePath = path.join(__dirname, "views", req.url, "index.html");
    } else {
      filePath = path.join(__dirname, "views", req.url);
    }
  } else {
    filePath = path.join(__dirname, req.url);
  }

  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //Serve the file
    serveFile(filePath, contentType, res);
  } else {
    //301 redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        //Serve a 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
        break;
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
