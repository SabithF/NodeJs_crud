const mongooseValidationErrorHandler = require('mongoose-validation-error-message-handler');
var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res)=>{
    // validate the request -- When we get a empty request
    if(!req.body){
        res.status(400).send({message:"Content Cannot be empty"});
        return
    }
    
    // new User
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    // save user in the DB
    user
    .save(user)
    .then(data =>{
        // res.send(data)
        res.redirect('/');
    })
    .catch(err => {
        const error = mongooseValidationErrorHandler(err);
        console.log(error);
        res.status(500).send({
            message: err.message || "Some error has occured- On create user operation"
        });
    })
}

// get and return all users & single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id).then(data=> 
            {if(!data){
                res.status(404).send({message: "User not found"})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error retreving user by ID "})
        })
    }else{Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err=> {
            res.status(500).send({message:err.message || "Error on getting all the data"})
        })}


}

// update a new identified user by user ID
exports.update= (req, res)=>{
if(!req.body){
    return res.status(400).send({message: "There is no data to update"})
}
const id= req.params.id;
Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
.then(data=> {
    if(!data){
        res.status(404).send({message: 'Cannot update the user of ${id} Maybe the user not found'});
    }else{
        res.send(data)
    }
})
.catch(err=>{
    res.status(500).send({message: "Error Update user info"})
})
}

// Delete a user with specified user ID in the request
exports.delete = (req, res)=>{
    const id= req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message: 'Cannot dlt the data of id', id});
        }else{
            res.send({message: "User deleted successfully!"})
        }
    }).catch(err =>{
        res.status(500).send({message: "Could not delete User with the id"+id});
    });

}