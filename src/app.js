const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');




const app = express();


app.use(express.json());
app.use(cookieParser());


const authRouter = require('./routes/auth');
const requestsRouter = require('./routes/requests');
const profileRouter = require('./routes/profile');

app.use('/auth', authRouter);
app.use('/requests', requestsRouter);
app.use('/profile', profileRouter);

connectDB().then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


