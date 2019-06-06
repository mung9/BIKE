const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const { User, validate: validateUser } = require("../models/user");
const validateId = require("../models/id");

const { RentalSpot, validateRentalSpot } = require("../models/rentalSpot");
const { Bike, validateBike } = require("../models/bike");

const router = express.Router();

router.get("/me", [auth], async (req, res) => {
  const id = req.user._id;
  const { error } = validateId(id);
  if (error)
    return res.status(404).send("The user with the given id does not exists.");

  const user = await User.findById(id).select("-__v -password");
  if (!user)
    return res.status(404).send("The user with the given id does not exists.");

  res.send(user);
});

router.get("/", [auth], async (req, res) => {
  const users = await User.find().select("-password -__v");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = { username, password, isAdmin: false };

  const { error } = validateUser(user);
  if (error) return res.status(400).send(error.details[0].message);

  const userAlreadyExists = await User.findOne({ username });
  if (userAlreadyExists)
    return res
      .status(400)
      .send("The user with the given username already exists.");

  const newUser = new User(user);
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();
  res.send(_.pick(newUser, ["_id", "username", "isAdmin"]));
});

router.post("/rent/:id/:index", [auth], async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  let rentalSpot = await RentalSpot.findById(req.params.id);
  if (!rentalSpot)
    return res.status(400).send("RentalSpot with given id does not exist.");

  const bike = rentalSpot.bikes[req.params.index];
  if (!bike) return res.status(400).send("There is no bike to rent");

  req.user.bike = bike;
  const user = await User.findByIdAndUpdate(req.user._id, req.user, {
    new: true
  }).select("-password");
  if (!user) return res.status(400).send("Invalid User");

  rentalSpot.bikes[req.params.index] = null;
  const updatedRentalSpot = await RentalSpot.findByIdAndUpdate(
    rentalSpot._id,
    rentalSpot,
    { new: true }
  ).populate({
    path: "bikes",
    options: {
      retainNullValues: true
    }
  });

  res.send({ rentalSpot: updatedRentalSpot, user });
});

router.post("/return/:id/:index", [auth], async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  let rentalSpot = await RentalSpot.findById(req.params.id);
  if (!rentalSpot)
    return res.status(400).send("RentalSpot with given id does not exist.");

  const bike = rentalSpot.bikes[req.params.index];
  if (bike) return res.status(400).send("The holder is occupied by other bike");

  const bikeToReturn = await Bike.findById(req.body.bike);
  if(!bikeToReturn) return res.status(400).send('The Bike with given id does not exist');

  user = await User.findByIdAndUpdate(
    req.user._id,
    { bike: null },
    {
      new: true
    }
  ).select("-password");
  if (!user) return res.status(400).send("Invalid User");

  rentalSpot.bikes[req.params.index] = bikeToReturn._id;
  const updatedRentalSpot = await RentalSpot.findByIdAndUpdate(
    rentalSpot._id,
    rentalSpot,
    { new: true }
  ).populate({
    path: "bikes",
    options: {
      retainNullValues: true
    }
  });

  res.send({ rentalSpot: updatedRentalSpot, user });
});

router.delete("/", [auth], (req, res) => {});

module.exports = exports = router;
