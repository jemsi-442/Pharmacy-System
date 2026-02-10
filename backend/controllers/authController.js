const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      success: true,
      data: {
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      data: {
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { registerUser, loginUser };
