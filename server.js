const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const testRouter = require('./routes/testRouter.js')
const connectDB = require('./config/db.js')
const user=require('./routes/userRoute.js')
const todo=require('./routes/todoRoute.js')

dotenv.config()

connectDB()

const app = express()
const port = process.env.PORT || 4000


app.use(express.json())
app.use(cors());

app.use('/api/v1/todo',todo)
app.use('/api/v1/test',testRouter)
app.use('/api/v1/user',user)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
