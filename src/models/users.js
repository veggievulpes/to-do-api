const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('user', {
            name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                validate(value) {
                    if (!validator.isEmail(value)) {
                        throw new error('invalid e-mail')

                    }
                }


            },
            password: {
                type: String,
                required: true,
                trim: true,
                minLenght: 7,
                validate(value) {
                    if (value.toLowerCase().includes('password')) {
                        throw new error('password cannot be "password"')

                    }
                }
            },
            age:{
                type: Number,
                default: 0,
                validate(value){
if(value<0){
    throw new error('Age must be a positive value')
}
                }
            }})

            module.exports = User