import http from "http";
import fs from "fs";

// Books array
let books = [
  { id: 1, title: "Java", author: "James", price: 300 },
  { id: 2, title: "Python", author: "Guido", price: 400 },
];

// Create server
const server = http.createServer((req, res) => {
  // Route 1: Home
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to Library</h1>");
  }

  // Route 2: Get all books
  else if (req.url === "/books" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  }

  // Route 3: About
  else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Library Management Application</h1>");
  }

  // Route 4: Serve HTML using FS
  else if (req.url === "/home" && req.method === "GET") {
    fs.readFile("public/index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  // Route 5: Add book using POST
  else if (req.url === "/add-book" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const book = JSON.parse(body);

        if (!book.id || !book.title || !book.author || book.price == null) {
          res.writeHead(400);
          res.end("All book details are required");
        } else {
          books.push(book);
          res.writeHead(201, { "Content-Type": "text/plain" });
          res.end("Book added successfully");
        }
      } catch (error) {
        res.writeHead(400);
        res.end("Invalid JSON data");
      }
    });
  }

  // Route 6: Invalid route
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page Not Found");
  }
});

// Start server
server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});
