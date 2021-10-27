const { User } = require('../Models');


const userController = {

  // Get all users  

  getAllUsers(req, res) {

    User.find({})

      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({_id: -1})
      .then(dbUserData => res.json(dbUserData))

      // if (!dbUserData) {
      //   res.status(500).json({ message: 'no user with this ID!' });
      //   return;
      // }
      // res.json(dbUserData);

      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },


  //get user by ID

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({
        path: 'friends', select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))

      // res.sendStatus(404).json({ message: 'No user with this ID!' });
      // return;
      // }
      // res.json(dbUserData)
      // })
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err)

      });
  },



  // Create User

  createUser({ body }, res) {
    console.log(body)
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },


  // Update user by id

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;

        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


  // Delete User

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));


  },
  // Add friend

  addFriend({ params }, res) {

    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friend: params.friendId } },
      { new: true, runValidators: true }
    )
      // .populate({ path: 'friends', select: ('-__v' )})
      // .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'no user with this ID!' });
          return;
        }

        res.json(dbUserData);
      })
      .catch(err => res.json(err));

  },

  // Delete friend

  deleteFriend({ params }, res) {
    User.findOneAndDelete(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidator: true}

    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));

  }
};






// Export Module user controller

module.exports = userController;
