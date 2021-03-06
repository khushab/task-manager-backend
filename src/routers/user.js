const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }

})

router.post('/users/logout', auth, async (req, res) => {
    try {
        const user = req.user

        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await user.save()
        res.send()

    } catch (error) {
        res.status(500).send()

    }
})

//Logout from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        const user = req.user

        user.tokens = []

        await user.save()
        res.send()

    } catch (error) {
        res.status(500).send()

    }
})

// router.get('/users', auth, async (req, res) => {

//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (error) {
//         res.status(500).send()
//     }
// })
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const _id = req.user._id
    const item = req.body

    const updates = Object.keys(item)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({ error: 'Invalid Updates' })
    }

    try {
        // const user = await User.findById(_id)
        const user = req.user
        updates.forEach((update) => user[update] = item[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(_id, item, { new: true, runValidators: true })
        // if (!user) {
        //     return res.status(404).send()
        // }
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    const _id = req.user._id

    try {
        // const user = await User.findByIdAndDelete(_id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router