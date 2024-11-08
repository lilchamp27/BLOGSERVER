const express = require('express');
const user = require('../models/user');
const router = express.Router();

// fetch all user endpoint 
router.get('/users', async (req,res) => {
    try {
        const users = await user.find();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        res.json({message: error});
    }
});



module.exports = router;