const router = require('express').Router();
const {
  addThought,
  removeThought,
  updateThought,
  getAllThought,
  findThoughtById,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/:usersId').post(addThought);

router.route('/:usersId/:thoughtId').delete(removeThought);

router.route('/').get(getAllThought);

router
  .route('/:thoughtId')
  .put(updateThought)
  .get(findThoughtById);

router.route('/:thoughtId/reaction').post(addReaction)
router.route('/:thoughtId/remove/:reactionId').delete(removeReaction); 



module.exports = router;