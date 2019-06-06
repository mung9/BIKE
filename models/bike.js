const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const bikeSchema = new mongoose.Schema({
});

const Bike = mongoose.model('Bike', bikeSchema);

function validate(bike) {
  const schema = {
    _id: Joi.objectId()
  };

  return Joi.validate(bike, schema);
}

module.exports = exports = {
  Bike,
  validateBike: validate
};