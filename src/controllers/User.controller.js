import UserModel from "../models/User.model.js";
import StatusCode from "../../config/StatusCode.js";

const createUser = async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const response = await user.save();
    res.status(StatusCode.CREATED).send(response);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await UserModel.find();
    res.status(StatusCode.OK).send(response);
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const getUserWithId = async (req, res) => {
  try {
    const response = await UserModel.findById(req.params.userId);
    res.status(StatusCode.OK).send(response);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to retrive user with id:" +
        req.params.userId,
      error: error.message,
    });
  }
};

const getUserWithUsernameQuery = async (req, res) => {
  try {
    const response = await UserModel.find({ username: req.query.username });
    response.length > 0
      ? res.status(StatusCode.OK).send(response)
      : res.status(StatusCode.NOT_FOUND).send({
          message: "Could not find a user with username: " + req.query.username,
        });
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to retrive user with username:" +
        req.query.username,
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: "Content can not be empty!" });
    }
    const response = await UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username,
        password: req.body.password,
      },
      { new: true }
    );
    res.status(StatusCode.OK).send(response);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to update user with id:" +
        req.params.userId,
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await UserModel.findByIdAndDelete(req.params.userId);
    res.status(StatusCode.OK).send({
      message: `User with username: ${response.username} deleted successfully!`,
    });
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to delete user with id:" +
        req.params.userId,
      error: err.message,
    });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserWithId,
  getUserWithUsernameQuery,
  updateUser,
  deleteUser,
};
