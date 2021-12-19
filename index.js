import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './router/router.js'
import path from 'path';

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use('/api/articles', router)
app.use(express.static('client/static'))

app.get("/*", (req, res) =>{
    res.sendFile(path.resolve("client", "index.html"))
})

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('connected to db'))
    .catch((err) => console.log(err))
})