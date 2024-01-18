const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }
      req.user = user;
      next();
    });
  };

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const user = users.find(user => user.username === username && user.password === password);
    return !!user;
//write code to check if username and password match the one we have in records.

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if the username is valid
  if (!isValid(username)) {
    return res.status(400).json({ error: 'Invalid username' });
  }

  // Check if the username and password match
  if (authenticatedUser(username, password)) {
    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
  return res.status(300).json({message: "Invalid credentials"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const user = req.user;

  // Your code to add a book review goes here
  const isbn = req.params.isbn;
  const review = req.body.review;

  // Find the book by ISBN
  const book = books.find(book => book.isbn === isbn);

  if (book) {
    // Add the review to the book
    book.reviews.push({ username: user.username, review });

    res.status(200).json({ message: 'Review added successfully' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
  return res.status(300).json({message: "Not found"});
});

regd_users.delete('/auth/review/:isbn', verifyToken, (req, res) => {
    // Check if the user is authenticated using the token
    const user = req.user;
  
    // Your code to delete a book review goes here
    const isbn = req.params.isbn;
  
    // Find the book by ISBN
    const book = books.find(book => book.isbn === isbn);
  
    if (book) {
      // Find the index of the user's review in the book's reviews array
      const reviewIndex = book.reviews.findIndex(review => review.username === user.username);
  
      if (reviewIndex !== -1) {
        // Remove the user's review
        book.reviews.splice(reviewIndex, 1);
        res.status(200).json({ message: 'Review deleted successfully' });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
