document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showLoginLink = document.getElementById('show-login');
    const showRegisterLink = document.getElementById('show-register');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const authContainer = document.getElementById('auth-container');
    const dashboard = document.getElementById('dashboard');
    const pageHeading = document.getElementById('page-heading');
    const contentSection = document.getElementById('content');
    const username = document.getElementById('username');
    const userLogo = document.getElementById('user-logo');
    const upgradeButton = document.getElementById('upgrade-btn');
    const logoutButton = document.getElementById('logout-btn');

    const users = {
        "user1@test.com": {
            password: "test1",
            username: "user1@test.com",
            theme: "free",
            logo: "placeholder-user.png",
            subscription: "Free"
        },
        "user2@test.com": {
            password: "test2",
            username: "user2@test.com",
            theme: "standard",
            logo: "placeholder-user.png",
            subscription: "Standard"
        },
        "user3@test.com": {
            password: "test3",
            username: "user3@test.com",
            theme: "dark",
            logo: "placeholder-user.png",
            subscription: "Pro"
        },
        "user4@test.com": {
            password: "test4",
            username: "user4@test.com",
            theme: "premium",
            logo: "placeholder-user.png",
            subscription: "Premium"
        }
    };

    let currentUser = null;

    showRegisterLink.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    loginButton.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (users[email] && users[email].password === password) {
            currentUser = users[email];
            authContainer.classList.add('hidden');
            dashboard.classList.remove('hidden');
            loadDashboard(currentUser);
        } else {
            alert('Invalid credentials!');
        }
    });

    registerButton.addEventListener('click', () => {
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const subscription = document.getElementById('register-subscription').value;

        if (users[email]) {
            alert('User already exists!');
        } else {
            users[email] = {
                password: password,
                username: email,
                theme: subscription,
                logo: 'placeholder-user.png',
                subscription: subscription.charAt(0).toUpperCase() + subscription.slice(1)
            };
            alert('Registration successful! Please log in.');
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        }
    });

    logoutButton.addEventListener('click', () => {
        authContainer.classList.remove('hidden');
        dashboard.classList.add('hidden');
        currentUser = null;
    });

    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            pageHeading.textContent = page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            loadPageContent(page);
        });
    });

    function loadDashboard(user) {
        username.textContent = user.username;
        userLogo.src = user.logo;
        document.body.className = user.theme;
        loadPageContent('dashboard');
    }

    function loadPageContent(page) {
        switch (page) {
            case 'dashboard':
                contentSection.innerHTML = 'Welcome to your dashboard!';
                break;
            case 'profile':
                contentSection.innerHTML = `
                    <h2>Profile</h2>
                    <form class="profile-form">
                        <label>Email</label>
                        <input type="email" value="${currentUser.username}" readonly>
                        <label>Name</label>
                        <input type="text" placeholder="Name">
                        <label>Surname</label>
                        <input type="text" placeholder="Surname">
                        <label>Telephone</label>
                        <input type="tel" placeholder="Telephone">
                        <label>Shipping Address</label>
                        <input type="text" placeholder="Shipping Address">
                        <button type="button">Update Profile</button>
                    </form>
                    <h3>Change Password</h3>
                    <form class="profile-form">
                        <label>Current Password</label>
                        <input type="password" placeholder="Current Password">
                        <label>New Password</label>
                        <input type="password" placeholder="New Password">
                        <label>Confirm New Password</label>
                        <input type="password" placeholder="Confirm New Password">
                        <button type="button">Change Password</button>
                    </form>
                `;
                break;
            case 'settings':
                contentSection.innerHTML = `
                    <form class="settings-form">
                        <label>Change Theme</label>
                        <select id="theme-selector">
                            <option value="free">White</option>
                            <option value="standard">Blue</option>
                            <option value="dark">Black/Dark</option>
                            <option value="premium">Purple</option>
                        </select>
                        <button type="button" id="change-theme-button">Change Theme</button>
                    </form>
                `;
                document.getElementById('change-theme-button').addEventListener('click', changeTheme);
                break;
            case 'subscription':
                contentSection.innerHTML = `
                    <h2>Subscription</h2>
                    <div class="subscription-card">
                        <h3>Current Plan: ${currentUser.subscription}</h3>
                    </div>
                `;
                break;
            case 'refer-a-friend':
                contentSection.innerHTML = `
                    <h2>Refer a Friend</h2>
                    <form class="refer-form">
                        <label>Name</label>
                        <input type="text" placeholder="Friend's Name">
                        <label>Email</label>
                        <input type="email" placeholder="Friend's Email">
                        <label>Phone</label>
                        <input type="tel" placeholder="Friend's Phone">
                        <label>Relation to Referee</label>
                        <input type="text" placeholder="Relation to Referee">
                        <button type="button">Send Invite</button>
                    </form>
                `;
                break;
        }
    }

    function changeTheme() {
        const selectedTheme = document.getElementById('theme-selector').value;
        document.body.className = selectedTheme;
        currentUser.theme = selectedTheme; // Update the current user's theme
    }

    const menuHeading = document.getElementById('menu-heading');
    menuHeading.addEventListener('click', (event) => {
        event.preventDefault();
        pageHeading.textContent = 'Dashboard';
        loadPageContent('dashboard');
    });
});
