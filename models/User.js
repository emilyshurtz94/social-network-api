const { Schema, model} = require('mongoose');
const validator = require('validator');


const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            validator: [validator.isEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref:'User'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)
userSchema.virtual('friendCount').get(function(){
    return `${this.friend.length}`
})

const User = model('User', userSchema);


module.exports = User;
