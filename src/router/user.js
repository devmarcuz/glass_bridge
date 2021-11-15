const express = require("express");
const User = require("../model/User");

const router = express.Router();

router.post("/add-user", async (req, res) => {
  const { username } = req.body;
  try {
    const users = await User.findOne({ username });
    if (users) return res.status(500).json({ err: "User already exists" });

    const user = await User.create({ username });
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Server error" });
  }
});

router.put("/update-user/:id", async (req, res) => {
  const { ended } = req.body;
  try {
    const user = await User.findById(req.params.id);

    console.log(ended, user.ended);

    if (ended > user.ended || !user.ended) {
      console.log(ended, user.ended);

      console.log(ended > user.ended);
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { ended });
      return res.status(200).json({ updatedUser });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}).sort({ ended: -1 }).where("ended").gt(0).limit(20);
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Server error" });
  }
});

module.exports = router;
