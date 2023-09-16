const express = require('express');
const router = express.Router();
const User = require('../modules/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Iamgood$boy'

//ROTER:1 Create a User using POST "api/auth/createuser".no Login required 
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  // If there are errors return bad requsat and errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check the user weather with this email exists already
  try {
   let success= false
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      success= false
      return res.status(400).json({success, error: "A user with this email already exits" })
    }
    const salt = await bcrypt.genSalt(10);
    const seccPass = await bcrypt.hash(req.body.password, salt)

    user = await User.create({
      name: req.body.name,
      password: seccPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success= true
    // res.json(user)
    res.json({success,authToken })

  } catch (error) {
    console.log(error)
    res.status(500).send('some error ochared')
  }
});

//ROTER:2 Authenticate a User using POST "api/auth/login".no Login required 
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password can not be blank').exists()
], async (req, res) => {

  // If there are errors return bad requsat and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {email ,password} =req.body;

  try{
    let success =false
    let user =await User.findOne({email})
   if(!user){
    success=false
    return res.status(400).json({success, error: "Please try to login with correct credentials" })
   }

   const passwordCompare = await bcrypt.compare(password, user.password)
   if(!passwordCompare){
    success=false
    return res.status(400).json({success, error: "Please try to login with correct credentials" })
   } 

   const data = {
    user: {
      id: user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET)
  success= true
  res.json({success,authToken })

  }catch(error){
    console.log(error)
    res.status(500).send('Enteral server error')
  }
});
//ROTER:3 Get a Logdin user using POST "api/auth/getuser". Login required 
router.post('/getuser',fetchuser, async (req, res) => {
  try{
      userId= req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)
  
  }catch(error){
   console.log(error)
   res.status(500).send('Enteral server error')
  }
});

module.exports = router