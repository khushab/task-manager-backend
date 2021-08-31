const mongoose = require('mongoose')

//enums
const priorityType = ['high', 'medium', 'low'];

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    priority: {
        type: String,
        required: true,
        validate(value) {
            if (!priorityType.includes(value)) {
                throw new Error('Invalid Priority')
            }
        }
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Task