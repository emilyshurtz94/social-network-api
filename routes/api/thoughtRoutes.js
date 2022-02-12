const router = require('express').Router();
const {
    getAllThought,
    getSingleThought,
    createThought,
    updateSingleThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThought).post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateSingleThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;