const express = require("express");
const _ = require("lodash");
const { RentalSpot, validateRentalSpot } = require("../models/rentalSpot");
const { Bike, validateBike } = require("../models/bike");
const validateId = require("../models/id");

const router = express.Router();

router.get("/", async (req, res) => {
  const rentalSpots = await RentalSpot.find().populate({
    path: "bikes",
    options: {
      retainNullValues: true
    }
  }).sort('num');

  return res.send(rentalSpots);
});

router.get("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const rentalSpot = await RentalSpot.findById(req.params.id).populate({
    path: "bikes",
    options: {
      retainNullValues: true
    }
  });
  if (!rentalSpot)
    return res.status(400).send("RentalSpot with given id does not exist.");

  return res.send(rentalSpot);
});

router.post("/", async (req, res) => {
  let rentalSpot = _.pick(req.body, ["num", "name", "bikes"]);
  const { error } = validateRentalSpot(rentalSpot);
  if (error) return res.status(400).send(error.details[0].message);

  rentalSpot = await new RentalSpot(rentalSpot).save();
  console.log("saved rentalSpot:", rentalSpot);
  res.send(rentalSpot);
});

router.post("/:id/:index", async (req, res) => {
  let { error: isInvalidId } = validateId(req.params.id);
  if (isInvalidId) return res.status(400).send(isInvalidId.details[0].message);

  const rentalSpot = await RentalSpot.findById(req.params.id).select("bikes");
  if (!rentalSpot)
    return res.status(400).send("RentalSpot with given id does not exist.");

  const existingBike = await Bike.findById(req.body.id);
  if (!existingBike) res.status(400).send("Bike with given id does not exist");

  const bike = rentalSpot.bikes[req.params.index];
  console.log(rentalSpot.bikes);
  if (bike)
    return res
      .status(400)
      .send(`There is already a bike at holder-${req.params.index}`);

  rentalSpot.bikes[req.params.index] = req.body.id;
  const updatedRentalSpot = await RentalSpot.update(
    { _id: rentalSpot._id },
    rentalSpot
  );
  if (!updatedRentalSpot)
    return res.status(400).send("RentalSpot with given id does not exist.");

  res.send(updatedRentalSpot);
});

router.delete("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const rentalSpot = await RentalSpot.findByIdAndDelete(req.params.id);
  if (!rentalSpot)
    return res.status(400).send("RentalSpot with given id does not exist.");

  res.send(rentalSpot);
});

router.delete("/:id/:index", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const rentalSpot = await RentalSpot.findById(req.params.id);
  if (!rentalSpot)
    return res.status(400).send("RentalSpot with given id does not exist.");

  const bike = rentalSpot.bikes[req.params.index];
  if(!bike) return res.status(400).send('There is no bike to be deleted');

  rentalSpot.bikes[req.params.index] = null;
  const updatedRentalSpot = await RentalSpot.update(
    { _id: rentalSpot._id },
    rentalSpot
  );

  res.send(bike);
});

module.exports = exports = router;
