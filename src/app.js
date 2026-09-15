const express = require('express');

const {adminAuth} = require('./middleware/auth');

const app = express();


app.use('/admin', adminAuth);


app.get('/admin/getAllUsers', (req, res) => {
  // Logic to retrieve all users from the database
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more user objects as needed
  ];

  res.json(users);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});