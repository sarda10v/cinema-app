const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  speciality: {
    // !! нужен или нет?
    type: String,
  },
});

const Actor = mongoose.model("Actor", actorSchema);
module.exports = Actor;
