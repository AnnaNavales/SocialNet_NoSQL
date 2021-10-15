const { User, Thought, Reaction } = require('../Models');

const thoughtController = {

    getAllThoughts: (req, res) =>{
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });

    },
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

// create Thought

  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
   },


  // update thought by id

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbthoughtData => {
        if (!dbthoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
      
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },


  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
    } 
};

module.exports = thoughtController;