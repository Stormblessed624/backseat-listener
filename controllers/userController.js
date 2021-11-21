const { Users } = require('../models');

const usersController = {
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .select('-__v')
      .then(dbSocialData => res.json(dbSocialData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .select('-__v')
      .then(dbSocialData => res.json(dbSocialData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUsers({ body }, res) {
    Users.create(body)
      .then(dbSocialData => res.json(dbSocialData))
      .catch(err => res.json(err));
  },

  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({ message: 'No user with specified id!' });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => res.json(err));
  },

  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then(dbSocialData => res.json(dbSocialData))
      .catch(err => res.json(err));
  },

  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $push: { friends: params.friendsId } },
      { new: true }
    )
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => res.json(err));
  },

  removeFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => res.json(err));
  }
}

module.exports = usersController;