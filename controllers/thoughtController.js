const { Thoughts, User, } = require('../models');

module.exports= {

    // get routes
    getThought(req,res){
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    // get single user route
    getSingleThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thoughts with that id'})
            : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // post route
    createThought(req,res){
        Thought.create(req.body)
        .then((thought) =>{
            return Thought.findONeAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
                );
            })
            .then((thought) =>
            !thought? res.status(404).json({
                message: 'Thought created, but found no user with that ID'
            })
            : res.json('Created the thought')
            )
            .catch((err) =>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    // put 
    updateThought(req,res){
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({message: 'No thought with this id!'})
        : res.json(thoughts)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    // delete 
    deleteThought(req,res){
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thoughts) =>
        !thought
        ? res.status(404).json({message: 'no thought with this id!'})
        : Thought.findOneAndUpdate(
            { thoughts: req.params.thoughtId},
            {$pull: {thoughts: req.params.thoughtId}},
            {new: true}
        )
        )
        .then((thought)=>
        !thought
        ? res 
        .status(404)
        .json({ message: 'Thoughts created but no user with this id!'})
        : res.json({ message: 'Thought successfully deleted!'})
        )
        .catch((err) => res.status(500).json(err));
    },
    // add reactions
    addReaction(req, res) {
        Reactions.findOneAndUpdate(
          { _id: req.params.reactionId },
          { $addToSet: { thoughts: req.body } },
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
        Reaction.findOneAndUpdate(
          { _id: req.params.reactionId },
          { $pull: { reactions: { thoughtsId: req.params.thoughtId } } },
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

