const { Validator} = require('node-input-validator');
exports.register=async(req,res) => {
    const v = new Validator(req.body, {
        first_name:'required|minLength:2|maxLength:100',
        last_name :'required|minLength:2|maxLength:100',
        email:'required|email',
        password:'required'
    });
    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }
try{
    const newUser = new userInfo({
        first_name:req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    })

    let userData=await newUser.save();
    return res.status(200).send({
        message:'Registration successfull',
        data:userData
    })
}catch(err){
    return res.status(400).send({
        message:error.message,
        data:err
    });
}
}
