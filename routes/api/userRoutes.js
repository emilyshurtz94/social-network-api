const router = require('express').Router();
const {
    getAllUser,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUser).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;