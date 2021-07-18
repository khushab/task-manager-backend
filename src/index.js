const express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3200

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        response.status(500).send()
    }
})

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const item = req.body

    const updates = Object.keys(item)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({ error: 'Invalid Updates' })
    }

    try {
        const user = await User.findByIdAndUpdate(_id, item, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.send(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(400).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const item = req.body

    const updates = Object.keys(item)
    const validUpdates = ['description', 'completed']
    const isValid = updates.every((update) => validUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({ error: 'Invalid Update' })
    }

    try {
        const user = await Task.findByIdAndUpdate(_id, item, { new: true, runValidators: true })
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)

    } catch (error) {
        res.status(400).send()

    }

})

app.listen(port, () => {
    console.log('server is running on ' + port)
})