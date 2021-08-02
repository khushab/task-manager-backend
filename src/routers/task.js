const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.send(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const item = req.body

    const updates = Object.keys(item)
    const validUpdates = ['description', 'completed']
    const isValid = updates.every((update) => validUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({ error: 'Invalid Update' })
    }

    try {
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = item[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, item, { new: true, runValidators: true })
        if (!task) {
            return res.status(400).send()
        }
        res.send(task)

    } catch (error) {
        res.status(400).send()

    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)

    } catch (error) {
        res.status(500).send()
    }

})

module.exports = router