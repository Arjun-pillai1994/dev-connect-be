 const adminAuth =  (req,res, next) => {
  const token = 'your-authentication-token'; // Replace with your actual token

  const isAuthenticated = token === 'xyz'; // Replace with your authentication logic
  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' });
  } else{
    next();
  }
}



module.exports = {adminAuth};