
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware'); 

// const router = express.Router();


// router.post('/register', async (req, res) => {
//   try {
//     const { username, password, role } = req.body;
//     const user = new User({ username, password, role });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(400).json({ error: 'Error registering user' });
//   }
// });


// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token, user: { username: user.username, role: user.role } });
// });


// router.get('/me', authMiddleware, (req, res) => {
//   res.json(req.user);
// });

// module.exports = router;

const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
