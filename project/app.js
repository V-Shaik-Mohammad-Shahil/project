const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-mysql-database',
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// RESTful API endpoints for blog posts
app.get('/api/posts', (req, res) => {
  // Retrieve all blog posts from the database
  db.query('SELECT * FROM posts', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/api/posts', (req, res) => {
  // Create a new blog post in the database
  const { title, content } = req.body;
  db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Blog post created successfully', postId: result.insertId });
  });
});

// Other CRUD operations for updating and deleting posts can be added similarly.

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
