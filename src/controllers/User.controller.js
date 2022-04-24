import UserModel from "../models/User.model.js";

const createUser = async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const response = await user.save();
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await UserModel.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserWithId = async (req, res) => {
  try {
    const response = await UserModel.findById(req.params.userId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message:
        "Error occured while trying to retrive user with id:" +
        req.params.userId,
      error: error.message,
    });
  }
};

export default { createUser, getAllUsers, getUserWithId };
