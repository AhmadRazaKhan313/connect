const httpStatus = require("http-status");
const StaffModel = require("./staff.model");
const ApiError = require("../../utils/ApiError");
const { STAFF_TYPES } = require("../../utils/Constants");
const { password } = require("../../validations/custom.validation");
let staffService = {};

/**
 * Ceate Staff
 * @param {Object} StaffBody
 * @returns {Promise<StaffModel>}
 */
staffService.createStaff = async (StaffBody) => {
  const isStaff = await StaffModel.findOne({ email: StaffBody.email });
  if (isStaff && isStaff.mobile === StaffBody.mobile) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Staff already exists with email/mobile"
    );
  } else {
    return await StaffModel.create(StaffBody);
  }
};

/**
 * Get Staff buy email
 * @param {string} email
 * @returns {Promise<StaffModel>}
 */
staffService.getStaffByEmail = async (email) => {
  return await StaffModel.findOne({ email: email });
};

/**
 * Get All Staffs
 * @param {ObjectId} organizationId
 * @returns {Promise<StaffModel>}
 */
staffService.getAllStaffs = async (organizationId) => {
  const filter = { type: { $ne: STAFF_TYPES.platformSuperAdmin } };
  if (organizationId) filter.organizationId = organizationId;
  return await StaffModel.find(filter);
};

/**
 * Get All Staffs
 * @param {String} type
 * @param {ObjectId} organizationId
 * @returns {Promise<StaffModel>}
 */
staffService.getStaffsByType = async (type, organizationId) => {
  const filter = { type };
  if (organizationId) filter.organizationId = organizationId;
  return await StaffModel.find(filter);
};

/**
 * Get Staff By Id
 * @param {ObjectId} id
 * @returns {Promise<StaffModel>}
 */
staffService.getStaffById = async (id) => {
  return await StaffModel.findById(id);
};

/**
 * Get All Partners
 * @param {ObjectId} organizationId
 * @returns {Promise<StaffModel>}
 */
staffService.getAllPartners = async (organizationId) => {
  const filter = { type: { $in: [STAFF_TYPES.orgAdmin, STAFF_TYPES.orgStaff] } };
  if (organizationId) filter.organizationId = organizationId;
  return await StaffModel.find(filter);
};

/**
 * Update Password
 * @param {ObjectId} id,
 * @param {string} password,
 * @returns {Promise<string>}
 */
staffService.updatePassword = async (id, password) => {
  await StaffModel.updateOne({ _id: id }, { password });
  return "Password Updated";
};

/**
 * Update Password
 * @returns {Promise<string>}
 */
staffService.updateProfile = async (id, updateBody) => {
  return await StaffModel.updateOne({ _id: id }, updateBody);
};

module.exports = staffService;