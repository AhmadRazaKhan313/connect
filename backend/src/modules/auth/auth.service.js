const staffService = require("../staff/staff.service");
const ApiError = require("../../utils/ApiError");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
let authService = {};

/**
 * Login with staffname and password
 * @param {string} email
 * @param {string} password
 */
authService.loginStaffWithEmailAndPassword = async (email, password) => {
  const staff = await staffService.getStaffByEmail(email);
  if (!staff) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect Email");
  } else {
    const isPasswordMatch = await bcrypt.compare(password, staff.password);
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    } else {
      return staff;
    }
  }
};

module.exports = authService;
