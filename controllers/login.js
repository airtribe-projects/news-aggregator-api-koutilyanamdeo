const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { saltRounds, secretKey,expiresIn} = require('../constant');
const jwt = require('jsonwebtoken');

function validateEmail(email) {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }else if(!validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    } else if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).send('Password must be a string with at least 6 characters');
    } else if (typeof email !== 'string' || email.length < 5) {
        return res.status(400).send('Email must be a string with at least 5 characters');
    }
    const user = userModel.user.find(u => u.email === email);
    bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }else {
           // Generate JWT token
            const token = jwt.sign(user, secretKey, { expiresIn });
            return res.status(200).send({ message: 'Login successfull', token });
        }
        
    }).catch((err) => {
        console.error('Error comparing password:', err);
        return res.status(500).send('Internal server error');
    })
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    
}

module.exports = { loginUser };