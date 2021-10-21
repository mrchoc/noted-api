const express = require("express");
const router = express.Router();
const moment = require("moment");
const auth = require("../middleware/auth");
const { Note, validate } = require("../models/note");
const { User } = require("../models/user");

//get all user's notes
router.get("/user/:userId", auth, async (req, res) => {
  const notes = await Note.find({
    userId: req.params.userId,
  }).select("-__v");
  if (!notes)
    return res
      .status(404)
      .send("The notes with the given userid were not found");

  res.send(notes);
});

router.get("/:id", auth, async (req, res) => {
  const note = await Note.findById(req.params.id).select("-__v");

  if (!note)
    return res.status(404).send("The note with the given ID was not found");

  res.send(note);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const note = new Note({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body,
    publishDate: moment().toJSON(),
  });

  await note.save();

  const body = note.toObject();
  delete body.__v;
  res.send(body);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    },
    { new: true }
  );

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");

  const body = note.toObject();
  delete body.__v;
  res.send(body);
});

router.delete("/:id", auth, async (req, res) => {
  const note = await Note.findByIdAndRemove(req.params.id);

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");

  res.send(note);
});

module.exports = router;
