const express = require('express')
const postRoute = require('./routes/postRoutes')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoutes')
const cors = require('cors')
require('dotenv').config()

// Connect to MongoDb database
const dbURL = process.env.MONGODB_URL
mongoose.connect(dbURL).then(() => {
    console.log("Connected to MongoDB");
    const app = express(); 
    const port = 5050
    console.log(dbURL);

    app.use(express.json());
    app.use(cors());
    app.use(express.json());

    // connect to MongoDB


    app.use('/api', postRoute);
    app.use('/api', userRoute);


    app.get('/', (req, res) => {
        res.send("Hello Oduneye Bolu")
    });
    

    app.listen(port, () => {
        console.log(`server running at port http://localhost:${port}`)
    });

}).catch((err) => {
    console.log("e no load o!!", err)
})







// app.get('/', (req,res) => {
//     res.send("Hello Oduneye Bolu")
// });

// app.listen(3030, ()=> {
//         console.log(`This server is running on http://localhost:3030`);
// });

