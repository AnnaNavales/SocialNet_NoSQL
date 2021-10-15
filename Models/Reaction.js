const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({

    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        require: true,
        minlength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        require: true

    },
     createdAt: {
         type: Date,
         default: Date.now,
         get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
     }
    },
    {
        toJSON: {
            getters: false
        },
        id: false
        });

        module.exports = reactionSchema;
    