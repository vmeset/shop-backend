require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const PORT = process.env.PORT
const DB = process.env.DB_URL

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(fileUpload({}))

app.use(errorHandler)

async function startApp() {
    try {
        await mongoose.connect(DB, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()