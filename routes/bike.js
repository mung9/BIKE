const express = require("express");
const _ = require("lodash");
const { Bike, validateBike } = require("../models/bike");
const validateId = require("../models/id");

const router = express.Router();

router.get("/", async (req, res) => {
  const bikes = await Bike.find();
  return res.send(bikes);
});

router.get("/:id", async (req, res) => {
  const { err: error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const bike = await Bike.findById(req.params.id);
  if (!bike) return res.status(400).send("Bike with given id does not exist.");

  return res.send(bike);
});

router.post("/", async (req, res) => {
  let bike = _.pick(req.body, [ /* 현재 정의된 필드 없음 */  ]);
  const { error } = validateBike(bike);
  if (error) return res.status(400).send(error.details[0].message);

  bike = await new Bike(bike).save();
  console.log('saved bike:',bike);
  res.send(bike);
});

// Bike에 대한 PUT은 제공하지 않음
router.put("/:id", async (req, res) => {
  let { error: isInvalidId } = validateId(req.params.id);
  if (isInvalidId) return res.status(400).send(isInvalidId.details[0].message);

  let bike = _.pick(req.body, []);
  const { error: isInvalidBike } = validateBike(bike);
  if (isInvalidBike) {
    return res.status(400).send(isInvalidBike.details[0].message);
  }

  bike = await Bike.findByIdAndUpdate(req.params.id, bike);
  if (!bike) return res.status(400).send("Bike with given id does not exist.");

  res.send(bike);
});

router.delete("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const bike = await Bike.findByIdAndDelete(req.params.id);
  if (!bike) return res.status(400).send("Bike with given id does not exist.");

  res.send(bike);
});

module.exports = exports = router;
