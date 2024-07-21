const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const generateToken = (id) => {
  return jwt.sign({ id }, "HelloWorld");
};


router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ err: "Please Enter All Fields!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ err: "User Already Exist with Email & Password" });
    }
    const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(5));

    await new User({
      name,
      email,
      phone,
      password: hashPassword,
    }).save();

    return res.status(200).json({ mes: "SignUp Successfully" });
  } catch (err) {
    return res.status(400).json({ err: `err err err err err ${err}` });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: "Please Enter All Fields!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ err: "Wrong Email & Password" });
    }

    const decodePassword = await bcrypt.compare(password, user.password);

    if (decodePassword) {
      return res.status(200).json({
        id: user.id,
        token: generateToken(user.id),
      });
    }
    return res.status(400).json({ err: "Failed To Login" });
  } catch (err) {
    return res.status(400).json({ err: `err err err err err ${err}` });
  }
});


module.exports = router;
