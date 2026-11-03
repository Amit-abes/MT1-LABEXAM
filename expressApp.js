import express from "express";

const app = express();

app.use(express.json());

// Sample books
let books = [
  { id: 1, title: "Java", author: "James", price: 400 },
  { id: 2, title: "Python", author: "Guido", price: 500 },
  { id: 3, title: "C++", author: "Bjarne", price: 600 },
];

// 1. GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// 2. GET book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id == req.params.id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  res.json(book);
});

// 3. POST - Add book
app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);

  res.status(201).send("Book added successfully");
});

// 4. PUT - Update book
app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id == req.params.id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  Object.assign(book, req.body);
  res.send("Book updated successfully");
});

// 5. DELETE - Delete book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id == req.params.id);

  if (index == -1) {
    return res.status(404).send("Book not found");
  }

  books.splice(index, 1);
  res.send("Book deleted successfully");
});

// Start server
app.listen(4000, () => {
  console.log("Express server running at http://localhost:4000");
});
