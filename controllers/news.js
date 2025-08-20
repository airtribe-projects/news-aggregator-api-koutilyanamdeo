const userModal = require('../models/userModel');
const { API_KEY } = require('../constant');

const news = async (req, res) => {
    try {
    const { email } = req.user;
    const user = userModal.user.find(val => val.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const pref = user.preferences || {};

    if (!pref.searchPhrases && !pref.domains && !pref.startDate && !pref.endDate && !pref.pageSize) {
      return res.status(400).json({ message: 'User preferences not set' });
    }

    let searchingParams = "";
    if (pref.searchPhrases) searchingParams += `q=${encodeURIComponent(pref.searchPhrases)}&`;
    if (pref.domains) searchingParams += `domains=${encodeURIComponent(pref.domains)}&`;
    if (pref.startDate) searchingParams += `from=${encodeURIComponent(pref.startDate)}&`;
    if (pref.endDate) searchingParams += `to=${encodeURIComponent(pref.endDate)}&`;
    if (pref.pageSize) searchingParams += `pageSize=${encodeURIComponent(pref.pageSize)}&`;

    const apiUrl = `https://newsapi.org/v2/everything?${searchingParams}apiKey=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
    }
module.exports = { news };
  