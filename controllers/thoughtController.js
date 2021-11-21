const {
  Thought,
  Users
} = require('../models');

const thoughtController = {
  addThought({
    params,
    body
  }, res) {
    Thought.create(body)
      .then(({
        _id
      }) => {
        return Users.findOneAndUpdate({
          _id: params.usersId
        }, {
          $push: {
            thought: _id
          }
        }, {
          new: true
        });
      })
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({
            message: 'No thought found with this id!'
          });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => res.json(err));
  },

  removeThought({
    params
  }, res) {
    Thought.findOneAndDelete({
        _id: params.thoughtId
      })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({
            message: 'No thought with this id!'
          });
        }
        return Users.findOneAndUpdate({
          _id: params.usersId
        }, {
          $pull: {
            thought: params.thoughtId
          }
        }, {
          new: true
        });
      })
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({
            message: 'No users found with this id!'
          });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => res.json(err));
  },

  updateThought({
    params,
    body
  }, res) {
    Thought.findOneAndUpdate({
        _id: params.thoughtId
      }, body, {
        new: true,
        runValidators: true
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: 'No thought with this id!'
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbSocialData => res.json(dbSocialData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  findThoughtById({
    params
  }, res) {
    Thought.findOne({
        _id: params.thoughtId
      })
      .populate({
        path: 'reaction',
        select: '-__v'
      })
      .select('-__v')
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({
            message: 'No thought found with this id!'
          });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  addReaction({
    params,
    body
  }, res) {
    Thought.findOneAndUpdate({
        _id: params.thoughtId
      }, {
        $push: {
          reactions: body
        }
      }, {
        new: true,
        runValidators: true
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: "No reaction added!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeReaction({
    params
  }, res) {
    Thought.findOneAndUpdate({
        _id: params.thoughtId
      }, {
        $pull: {
          reactions: {
            reactionId: params.reactionId
          }
        }
      }, {
        new: true
      })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;