const httpStatus = require("http-status");
const UserModel = require("./user.model");
const ApiError = require("../../utils/ApiError");
let userService = {};

/**
 * Ceate User
 * @param {Object} UserBody
 * @returns {Promise<UserModel>}
 */
userService.createUser = async (UserBody) => {
  const isUser = await UserModel.findOne({ userId: UserBody.userId });
  if (isUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User id already exists");
  } else {
    return UserModel.create(UserBody);
  }
};

/**
 * Get User by user by Id
 * @param {ObjectId} id
 * @returns {Promise<UserModel>}
 */
userService.getUserById = async (id) => {
  return UserModel.findById(id);
};

/**
 * Get User by user by userId
 * @param {String} userId
 * @returns {Promise<UserModel>}
 */
userService.getUserByUserId = async (userId) => {
  return UserModel.findOne({ userId });
};

/**
 * Get All Users
 * @returns {Promise<UserModel>}
 */
userService.getAllUsers = async () => {
  return UserModel.find({}).sort({ userId: "asc" });
};

/**
 * Update User By Id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<UserModel>}
 */
userService.updateUserById = async (id, updateBody) => {
  await UserModel.updateOne({ _id: id }, updateBody);
  return "User Updated";
};

/**
 * Delete User By Id
 * @param {ObjectId} id
 */
userService.deleteUserById = async (id) => {
  await UserModel.deleteOne({ _id: id });
  return "User Deleted";
};

/**
 * @param {String} userId
 */
userService.getAutoCompletedUsers = async (userId) => {
  const users = await UserModel.find(
    { userId: { $regex: new RegExp(userId, "i") } } // Case-insensitive regex search for userId
  );

  const suggestions = users.map((user) => user.userId);
  return suggestions;
};

module.exports = userService;
