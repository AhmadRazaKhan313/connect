const httpStatus = require("http-status");
const OrganizationModel = require("./organization.model");
const ApiError = require("../../utils/ApiError");

let organizationService = {};

/**
 * Create Organization
 * @param {Object} orgBody
 * @returns {Promise<OrganizationModel>}
 */
organizationService.createOrganization = async (orgBody) => {
  const isOrg = await OrganizationModel.findOne({ email: orgBody.email });
  if (isOrg) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Organization already exists with this email"
    );
  }
  return await OrganizationModel.create(orgBody);
};

/**
 * Get All Organizations
 * @returns {Promise<OrganizationModel[]>}
 */
organizationService.getAllOrganizations = async () => {
  return await OrganizationModel.find();
};

/**
 * Get Organization By Id
 * @param {ObjectId} id
 * @returns {Promise<OrganizationModel>}
 */
organizationService.getOrganizationById = async (id) => {
  return await OrganizationModel.findById(id);
};

/**
 * Update Organization
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<OrganizationModel>}
 */
organizationService.updateOrganization = async (id, updateBody) => {
  const org = await OrganizationModel.findById(id);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, "Organization not found");
  }
  return await OrganizationModel.updateOne({ _id: id }, updateBody);
};

/**
 * Delete Organization
 * @param {ObjectId} id
 * @returns {Promise<string>}
 */
organizationService.deleteOrganization = async (id) => {
  const org = await OrganizationModel.findById(id);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, "Organization not found");
  }
  await OrganizationModel.deleteOne({ _id: id });
  return "Organization deleted";
};

/**
 * Update Organization Status
 * @param {ObjectId} id
 * @param {string} status
 * @returns {Promise<string>}
 */
organizationService.updateStatus = async (id, status) => {
  await OrganizationModel.updateOne({ _id: id }, { status });
  return "Status updated";
};

module.exports = organizationService;