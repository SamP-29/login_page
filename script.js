// Form Validation
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let usernameError = document.getElementById('usernameError');
    let passwordError = document.getElementById('passwordError');

    let isValid = true;

    // Validate username/email
    if (!username) {
        usernameError.textContent = 'Username/Email is required';
        usernameError.style.display = 'block';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(username)) {
        usernameError.textContent = 'Please enter a valid email';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }

    // Validate password
    if (!password) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (isValid) {
        login(username, password);
    }
});

// Show/Hide Password
function togglePassword() {
    let passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Login with API
function login(username, password) {
    let spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block';

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        spinner.style.display = 'none';
        document.getElementById('apiResponse').textContent = 'Login successful!';
    })
    .catch(error => {
        spinner.style.display = 'none';
        document.getElementById('apiResponse').textContent = 'Login failed. Please try again.';
    });
}
