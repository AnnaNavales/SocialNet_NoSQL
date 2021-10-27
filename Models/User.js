const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }

        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'

            }
        ]
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const User = model('User', userSchema);

userSchema.virtual('friendCount').get(function() {
return this.friend.length;

});



module.exports = User;