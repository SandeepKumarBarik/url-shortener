const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    // body contains the data that user sends to the backend like "url": "www.google.com"

    if(!body.url) return res.status(400).json({error: 'URL is required'})

    const shortID = shortid(8); // generates 8 random letter
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({id: shortID})
}

module.exports = {
    handleGenerateNewShortURL,
}