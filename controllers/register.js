const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { saltRounds} = require('../constant');

function validateEmail(email) {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

const registerUser = (req, res) => {
    const {email, password } = req.body;
    // check if email is already there 
    const existingUser = userModel.user.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).send('Email already exists');
    }
    else if ( !email || !password) {
        return res.status(400).send('Email, and password are required');
    }
    else if(!validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    }
    else if(typeof password !== 'string' || password.length < 6) {
        return res.status(400).send('Password must be a string with at least 6 characters');

    }else if (typeof email !== 'string' || email.length < 5) {
        return res.status(400).send('Email must be a string with at least 5 characters');
    }   
    bcrypt.hash(password, saltRounds).then((hashedValue) => {
    const newUser = {
        id: userModel.user.length + 1,
        email,
        preferences: req.body.preferences || {
        searchPhrases:"" ,
        domains:"" ,
        startDate:"" ,
        endDate:"" ,
        pageSize:"" 
        },
        password:hashedValue// In a real application, ensure to hash the password before storing
    };

    userModel.user.push(newUser);
    res.status(200).send(newUser);
        }).catch((err) => {  
            console.error('Error hashing password:', err);
            res.status(500).send('Internal server error');
        }
    );
   
}

module.exports = { registerUser };