// middleware/check-auth.js
const jwt = require('jsonwebtoken');

// auth.js

// Function to check if the user is logged in
function checkLoggedIn() {
    // Check if a token is stored in local storage
    const token = localStorage.getItem('token');

    // If token is not present, redirect to login page
    if (!token) {
        window.location.href = '/login.html';
    }
}

// Function to log out
function logout() {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Redirect to login page
    window.location.href = '/login.html';
}


module.exports = (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization.split(" ")[1];
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // Attach the decoded user data to the request
        req.userData = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If verification fails, return an error response
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
