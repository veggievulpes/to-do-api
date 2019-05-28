const mongoose = require('mongoose')

const Task = mongoose.model('task', {
            name: {
                type: String,
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true

            },
            completed: {
                type: Boolean,
                default: false,
                trim: true
            }
        })
            module.exports = Task