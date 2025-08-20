const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/register');
const {loginUser} = require('../controllers/login');
const { preferences } = require('../controllers/preferences');
const {UpdateRegisteredUser} = require('../controllers/updateRegisteredUser');
const { authenticateToken } = require('../middleware/JWTMiddleware');
const { news } = require('../controllers/news');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/preferences', authenticateToken, preferences);
router.put('/preferences', authenticateToken, UpdateRegisteredUser );
router.get('/news', authenticateToken, news);

module.exports = router;