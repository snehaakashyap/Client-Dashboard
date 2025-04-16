function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Store remember me preference
    if (remember) {
        localStorage.setItem('rememberedUser', username);
    } else {
        localStorage.removeItem('rememberedUser');
    }
    
    // Add your login logic here
    console.log('Login attempt:', {
        username,
        password,
        remember
    });
    
    // For demo purposes - you should replace this with actual authentication
    if (username && password) {
        alert('Login successful!');
        // Redirect to dashboard or home page
        // window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields');
    }
}

// Check for remembered user on page load
document.addEventListener('DOMContentLoaded', () => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
}); 