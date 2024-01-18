const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, email, password } = req.body;

  // Validate the input (you may add more robust validation)
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Incomplete registration data' });
  }

  // Check if the username or email is already taken
  const isUsernameTaken = registeredUsers.some(user => user.username === username);
  const isEmailTaken = registeredUsers.some(user => user.email === email);

  if (isUsernameTaken || isEmailTaken) {
    return res.status(409).json({ error: 'Username or email is already taken' });
  }

  // If not taken, register the new user
  const newUser = {
    username,
    email,
    password, // Note: In a real-world scenario, you should hash the password before storing it
  };

  registeredUsers.push(newUser);

  // Respond with a success message or additional user details
  return res.status(201).json({ message: 'User registered successfully', user: newUser });


});




// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.json({ books });
  return res.status(300).json({message: "Available books"});
});




// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const requestedIsbn = req.params.isbn;

  // Finding the book with the matching ISBN
  const book = books.find(book => book.isbn === requestedIsbn);

  if (book) {
    // Sending the book details as a JSON response
    res.json({ book });
  } else {
    // If the book is not found, sending a 404 response
    res.status(300).json({ error: 'Book not found' });
  }
    
  return res.status(300).json({message: "Book not found"});
 });
  


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const requestedAuthor = req.params.author;

  
  const booksByAuthor = books.filter(book => book.author === requestedAuthor);

  if (booksByAuthor.length > 0) {
    // Sending the book details as a JSON response
    res.json({ books: booksByAuthor });
  } else {
    // If no books are found for the author, sending a 404 response
    res.status(300).json({ error: 'Books not found for the author' });
  }
  return res.status(300).json({message: "Books not found for the author"});
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const requestedTitle = req.params.title;

  // Finding books with the matching title
  const booksByTitle = books.filter(book => book.title === requestedTitle);

  if (booksByTitle.length > 0) {
    // Sending the book details as a JSON response
    res.json({ books: booksByTitle });
  } else {
    // If no books are found for the title, sending a 404 response
    res.status(404).json({ error: 'Books not found for the title' });
  }
  return res.status(300).json({message: "Books not found for the title"});
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const requestedIsbn = req.params.isbn;

  // Finding the book with the matching ISBN
  const bookWithReviews = booksWithReviews.find(book => book.isbn === requestedIsbn);

  if (bookWithReviews) {
    // Sending the book reviews as a JSON response
    res.json({ reviews: bookWithReviews.reviews });
  } else {
    // If the book is not found, sending a 404 response
    res.status(300).json({ error: 'Book not found' });
  }
  return res.status(300).json({message: "Book not found"});
});


const booksEndpoint = 'http://your-api-url/api/books';

// Using Promise callbacks
const getBooksPromiseCallback = () => {
  return new Promise((resolve, reject) => {
    axios.get(booksEndpoint)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

// Using async-await
const getBooksAsyncAwait = async () => {
  try {
    const response = await axios.get(booksEndpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getBooksPromiseCallback,
    getBooksAsyncAwait
  };



  

module.exports.general = public_users;
