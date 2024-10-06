// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a simple model (e.g., User model)
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', UserSchema);

// Serve the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

// Handle form submission
app.post('/add-user', async (req, res) => {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });

    try {
        await user.save();
        res.redirect('/users');
    } catch (err) {
        res.status(500).send('Error saving user to the database.');
    }
});

// Display users in a table
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        let html = `
            <h1>Users</h1>
            <table border="1">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                </tr>`;
        users.forEach(user => {
            html += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                </tr>`;
        });
        html += `</table><br><a href="/">Add another user</a>`;
        res.send(html);
    } catch (err) {
        res.status(500).send('Error fetching users from the database.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
