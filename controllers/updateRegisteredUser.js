const userModel = require('../models/userModel');


const UpdateRegisteredUser = (req, res) => {
    const { email } = req.user;
    // console.log('Updating user preferences for:', email);
    const user = userModel.user.find(u => u.email === email);
    const { preferences } = req.body;

    if (!user) {
        return res.status(404).send('User not found');
    }
    if (!preferences || typeof preferences !== 'object') {
        return res.status(400).send('Preferences must be an object');
    }
    if( typeof preferences.searchPhrases !== 'string' ||
        typeof preferences.domains !== 'string' ||
        typeof preferences.startDate !== 'string' ||
        typeof preferences.endDate !== 'string' ||
        typeof preferences.topics !== 'string') {
        return res.status(400).send('Invalid preferences format');
    }   
    // Update user preferences
    user.preferences = {
        searchPhrases: preferences.searchPhrases || user.preferences.searchPhrases,
        domains: preferences.domains || user.preferences.domains,
        startDate: preferences.startDate || user.preferences.startDate,
        endDate: preferences.endDate || user.preferences.endDate,
        pageSize: preferences.topics || user.preferences.topics
    };  
    
    // Save the updated user back to the model
   return res.status(200).send({
        message: 'User preferences updated successfully',
        user: {
            preferences: user.preferences
        }
    }); 
    

}

module.exports = { UpdateRegisteredUser };