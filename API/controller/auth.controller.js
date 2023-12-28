const { Validator} = require('node-input-validator');
exports.register=async(req,res) => {
    const v = new Validator(req.body, {
        first_name:'required|minLength:2|maxLength:100',
        last_name :'required|minLength:2|maxLength:100',
        gender: 'required|male|female|Other',
        email:'required|email',
        phoneNumber:'required|minLength:10',
        password:'required',
        cpassword:'required'
    });
    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }
try{
    const newUser = new userInfo({
        first_name:req.body.first_name,
        last_name: req.body.last_name,
        gender:req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        cpassword: req.body.cpassword
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
