const User = require('../models/User');

// get routes
module.exports ={
    getUser(req,res){
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    
    // get single user route
    getSingleUser(req,res){
        User.findOne({_id:req.params.userId})
        .select('-__v')
        .then((user) =>
        !user
        ? res.status(404).json({message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    //post
    createUser(req,res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    // put
    updateSingleUser(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set: req.body},
            {runValidators: true, new:true}
            )
        .then((user) =>
        !user
        ? res.status(404).json({message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    // delete
    deleteUser(req,res){
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => 
        !user? res.status(404).json({message: 'No user with this id'})
        : User.findOneAndUpdate(
            {user: req.params.userId},
            {$pull: {user: req.params.userId}},
            {new: true}
        )
        ). then((user) =>
        !user? res.status(404).json({message: 'user created but no user with this id!'})
        : res.json({message: 'user successfully deleted'})
        )
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req,res){
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friend: req.body } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $pull: { reactions: { friendId: req.params.friendId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No friend with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}


