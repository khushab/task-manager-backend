const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})



// const me = new User({
//     name: "    Khushab  ",
//     email: "KHUshabalam7@GMAIl.com      ",
//     age: 22
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('error', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

// const newTask = new Task({
//     description: "First Task",
//     completed: false,
// })

// newTask.save().then(() => {
//     console.log(newTask);
// }).catch((error) => {
//     console.log('error', error)
// })