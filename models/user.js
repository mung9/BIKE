const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required."],
    validate: {
      validator: v => {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: props => `${props.value} is invalid email form.`
    }
  },
  password: {
    type: String,
    min: [5, "Too short password."],
    max: [255, "Too long to type in, isn't it?"]
  },
  regDate: {
    type: Date,
    default: Date.now()
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    default: null
  }
});

userSchema.methods.createToken = function() {
  return jwt.sign(
    _.pick(this, ["_id", "username", "isAdmin"]),
    config.get("jwtKey")
  );
};

const User = mongoose.model("User", userSchema);

const schema = {
  username: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(255),
  regDate: Joi.date().default(new Date()),
  isAdmin: Joi.bool().default(false),
  bike: Joi.objectId().default(null)
};
function validate(user) {
  return Joi.validate(user, schema);
}

module.exports = exports = { User, validate };
