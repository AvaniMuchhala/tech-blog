const signupFormHandler = async (event) => {
    event.preventDefault();

    // Grab username and password values inputted in form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // If both username and password provided
    if (username && password) {
        // Send username and password to /api/users/signup
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // what is response.ok? status of 200
        if (response.ok) {
            // render dashboard page
            console.log('Signed up successfully!');
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);