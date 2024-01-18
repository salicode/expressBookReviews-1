const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
const validUsername = '';
  const validPassword = '';

  const username = req.headers['username'] || req.body.username;
  const password = req.headers['password'] || req.body.password;

  if (username === validUsername && password === validPassword) {
    next();
  } else {
    // Authentication failed, sending a 401 Unauthorized response
    res.status(401).json({ error: 'Authentication failed' });
  }  // Authentication successful, proceed to the next middleware or route handle

});
 
const PORT =5000;

 
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
