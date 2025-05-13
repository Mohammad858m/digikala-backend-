const user = require("../models/user");
const {createUserSchema} = require('../validations/uservalidator');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const {error} = createUserSchema.validate(req.body);
    if(error) {
        return res.status(400).json({message :"invalid data",error:error.details[0].message})
    }

    const userr= await user.findOne({ email:req.body.email});
    if(userr) {
        return res.status(409).json({message: "user already exists"})

    }
    const password = await bcrypt.hash(req.body.password, 10);

    
    await user.create({
        email:req.body.email,
        passwordHash:password,
    })
    return res.status(201).json({message :"user created successfully"});
  } catch (error) {
    res.status(500).json({message: "server error",error:error.message})
  }
};
