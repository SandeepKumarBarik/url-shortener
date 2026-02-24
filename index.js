const express = require("express")
const { connectToMongoDB } = require("./connect")
const URL = require("./models/url")

const urlRoute = require('./routes/url')
const app = express();
const port = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=> console.log("MongoDB connected"))

app.use(express.json())

app.use("/url", urlRoute)
app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;

    //await URL.findOneAndUpdate this line stops the execution temp and wait for mongoDB to finish
    //searching shortID + updating visited history
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, { $push:  { visitHistory: {
                timestamp: Date.now(),
            },}
    });
    res.redirect(entry.redirectUrl);
    // by the end of this entry.redirectUrl contain www.google.com
})

app.listen(port, ()=> console.log(`Server started at port: ${port}`));