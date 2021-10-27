const { Thought, User } = require('../Models');

const thoughtController = {

  // Get all thought

  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: 'thought', select: '-__v' })
      .populate({ path: 'reaction', select: '-__v' })
      .select('-__v')
      .sort({ id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      // if (!dbThoughtData) {
      // res.status(500).json({ message: 'Cannot find this ID!' });
      // return;
      // }
      // res.json(dbThoughtData)
      .catch(err => {
        console.log(err);
        res.sendStatus(400);

      });

  },
  // Get thought by ID

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'thought ', select: '-__v'
      })
      .select('-__v')


      .then(dbThoughtData => res.json(dbThoughtData))
      //   if  (!dbThoughtData) {
      //     res.status(404).json({ message: 'No thought with this ID!' });
      //     return;
      //   }
      //   res.json(dbThoughtData)
      // })

      .catch(err => {
        console.log(err);
        res.sendStatus(400);

      });
  },

  // Create Thought

  createThought({ params, body }, res) {
    console.log(body)
    Thought.create(body)
      .then(({dbThoughtData_id}) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: dbThoughtData_id } },
          { new: true, runValidators: true }
      )
      .select('-__v');
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: -'No user found with this id!' });
          return;
        }
        console.log(dbUserData)
        res.json(dbUserData);

      })

      .catch(err => res.json(err));

  },
  // update thought by id

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, body, { new: true })
      // .populate({ path: 'thought', select: '-__v' })
      // .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          t
          res.status(404).json({ message: 'Cannot find thought with this id!' });
          return;

        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },




  // add reaction

  addReaction({ params, body }, res) {
    console.log(body)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      // .populate({ path: 'reaction', select: ('-__v') })
      // .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this ID!' });
          return;
        }

        res.json(dbThoughtData)
      })
      .catch(err => res.json(err));

  },

  // Delete reaction

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId })
      .then(deleteReaction => {
        if (!deleteReaction) {
          return res.status(404).json({ message: 'No reaction found with this Id!' });

        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reaction: params.reactionId } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID!' });
          return;
        }
        res.json(dbThoughtData);
      })

      .catch(err => res.json(err))

  },


  // Delete Thought

  deleteThought({ params, body }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found with this Id!' })


        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { thought: params.thoughtId } },
          { new: true, runValidators: true }

        );
      })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found with this Id!' })
        }
        res.json(deletedThought);
      })
      .catch(err => res.json(err));
  }
};


module.exports = thoughtController;