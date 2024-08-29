const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/signup', async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password, user_type, agreed_to_terms) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, userType, true]
        );

        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error inserting user:', error);
        if (error.code === '23505') {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Error inserting user' });
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

                res.status(200).json({ token, user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

app.post('/brand-settings', authenticateToken, async (req, res) => {
    let { firstName, lastName, about, companyName, companyDescription, targetAudience, influencerCategories, marketingBudget } = req.body;
    const userId = req.user.id;

    try {
        marketingBudget = parseFloat(marketingBudget); // Ensure numeric field is correctly formatted

        await pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, about = $3, company_name = $4, company_description = $5, target_audience = $6, influencer_categories = $7, marketing_budget = $8 WHERE id = $9',
            [firstName, lastName, about, companyName, companyDescription, targetAudience, influencerCategories, marketingBudget, userId]
        );

        res.status(201).json({ message: 'Settings saved successfully' });
    } catch (error) {
        console.error('Error saving brand settings:', error);
        res.status(500).json({ message: 'Error saving settings' });
    }
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
