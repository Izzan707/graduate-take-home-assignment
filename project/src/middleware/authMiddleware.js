const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  // Check if the token is valid (in this case, check if it matches 'fake-jwt-token')
  if (token === 'fake-jwt-token') {
    next(); // Token is valid, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
