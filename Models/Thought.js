const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// const ReactionSchema = require('./Reaction');

const ReactionsSchema = new Schema({
    // Set Id
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLenghth: 280
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
    {
        toJSON: {
            getters: true
        }
    }

);


// thought schema

const ThoughtSchema = new Schema(
    {
        thoughtBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280

        },

       

        createdAt: {
            type: Date,
            dafault: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

        },

        username: {
            type: String,
            require: true
        },

        //   Use Reaction schema to validate data

        reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },

        id: false

    }
)



ThoughtSchema.virtual('reactionCount').get(function () {
     return this.reaction.length;
 });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

