const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", noteSchema);

function validateNote(note) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    title: Joi.string().allow("").required(),
    body: Joi.string().allow("").required(),
  });

  return schema.validate(note);
}

exports.Note = Note;
exports.noteSchema = noteSchema;
exports.validate = validateNote;
