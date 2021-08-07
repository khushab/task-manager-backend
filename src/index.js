const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


//middleware for maintanance
// app.use((req, res) => {
//     res.status(503).send("Server in maintainance. We'll be back soon!")
// })

const app = express();
const port = process.env.PORT || 3200

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is running on ' + port)
})