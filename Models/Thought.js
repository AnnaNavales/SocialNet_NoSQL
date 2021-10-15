const { Schema, model } = require('mongoose');
const moment = require('moment');
const ReactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
      type: String,
      require: true,
      minLength: 1,
      maxLenghth: 280
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
  reactions: [ReactionSchema]
},
{
    toJSON: {
        virtual: true,
        getters: true
    },
    id: false


});

thoughtSchema.virtual('reactionCount').get(function() {
   return this.reaction.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

