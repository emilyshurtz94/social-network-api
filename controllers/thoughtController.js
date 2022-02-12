const { Thought, User, Reaction } = require('../models');

module.exports = {

    // get routes
    getAllThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    // get single user route
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reaction')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // post route
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate({ _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }).then((dbUpdate) => {
                        res.json(dbUpdate)
                    })

            })

            .catch((err) => res.status(500).json(err));
    },
    // put 
    updateSingleThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // delete 
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'no thought with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'Thoughts created but no user with this id!' })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // add reactions
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No reactions with this id!' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete reactions
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No reactions with this id!' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
}

