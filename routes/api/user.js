const router = require('express').Router();
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);

router
  .route('/:id')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

router
  .route('/:usersId/friends/:friendsId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;