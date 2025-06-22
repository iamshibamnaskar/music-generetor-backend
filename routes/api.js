const express = require('express');
const router = express.Router();
const getMusicByMoodGenre = require('../utils/fetchSongs')

router.post('/fetchmusic', async (req, res) => {
    const { mood, genre } = req.body;

    console.log(mood, genre)

    
    if (!mood || !genre) {
        return res.status(400).json({
            error: true,
            message: "Both 'mood' and 'genre' are required in the request body.",
            data:[]
        });
    }

    try {
        const data = await getMusicByMoodGenre(mood,genre)
        res.status(200).json({
            error:false,
            message:"fetching succesfull",
            data:data
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message || 'Something went wrong',
            data:[]
        })
    }

});


module.exports = router;
