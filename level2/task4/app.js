const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// In-memory storage for users (for demonstration purposes)
const users = {};

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true
}));

// Middleware to protect routes
function isAuthenticated(req, res, next) {
    if (req.session.username) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/', (req, res) => {
    res.send(`
        <h1>Home</h1>
        <nav>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
            <a href="/secured">Secured Page</a>
            <a href="/logout">Logout</a>
        </nav>
    `);
});

app.get('/register', (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method="post" action="/register">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>
            <br>
            <button type="submit">Register</button>
        </form>
        <a href="/">Back to Home</a>
    `);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.send('Username already exists! <a href="/register">Try again</a>');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;
    res.send('Registration successful! <a href="/login">Login</a>');
});

app.get('/login', (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method="post" action="/login">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
        <a href="/">Back to Home</a>
    `);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && await bcrypt.compare(password, user)) {
        req.session.username = username;
        res.redirect('/secured');
    } else {
        res.send('Invalid username or password! <a href="/login">Try again</a>');
    }
});

app.get('/secured', isAuthenticated, (req, res) => {
    res.send(`Welcome ${req.session.username}! This is a secured page. <a href="/">Home</a>`);
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('You have been logged out! <a href="/">Home</a>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
