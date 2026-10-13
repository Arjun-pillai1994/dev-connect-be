const express = require('express');

const requestsRouter = express.Router();

requestsRouter.post('/requests', async (req, res) => {
  try {
    res.status(201).send('Request created successfully');
  } catch (error) {
    res.status(500).send('Error creating request: ' + error.message);
  }
});

module.exports = requestsRouter;