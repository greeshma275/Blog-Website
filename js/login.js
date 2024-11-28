

// login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy check: In real-world, you'd verify these with your back-end or saved data
    if (username === "user" && password === "password") {
        // Store login status and username in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);  // Store the logged-in username

        // Redirect to index.html or create.html
        window.location.href = 'index.html';
    } else {
        alert('Incorrect username or password');
    }
});
