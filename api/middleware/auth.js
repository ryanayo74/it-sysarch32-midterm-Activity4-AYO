// Function to check if the user is logged in
function checkLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
    }
}

// Function to log out
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

// Call checkLoggedIn() function wherever necessary
checkLoggedIn();
