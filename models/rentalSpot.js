const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const rentalSpotSchema = new mongoose.Schema({
  num: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 20,
    required: true
  },
  bikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike"
    }
  ]
});

// new mongoose.Schema({
//   counter: {
//     type: Number,
//     required: true
//   },
//   bike: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Bike"
//   }
// })

// type: mongoose.Schema.Types.ObjectId, ref: 'Bike'

const RentalSpot = mongoose.model("RentalSpot", rentalSpotSchema);

function validate(rentalSpot) {
  const rentalSpotSchemaJoi = {
    _id: Joi.objectId(),
    num: Joi.number().required(),
    name: Joi.string()
      .min(2)
      .max(20)
      .required(),
    bikes: Joi.array()
      .items(Joi.objectId().allow(null))
      .length(10)
      .required()
  };

  return Joi.validate(rentalSpot, rentalSpotSchemaJoi);
}

module.exports = exports = {
  RentalSpot: RentalSpot,
  validateRentalSpot: validate
};
