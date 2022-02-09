const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    thoughtsReactions,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtsId').get(getSingleThoughts).put(updateThoughts).delete(deleteThoughts);

router.route('/:thoughtsId/reactions').post(thoughtsReactions).delete(thoughtsReactions);

module.exports = router;