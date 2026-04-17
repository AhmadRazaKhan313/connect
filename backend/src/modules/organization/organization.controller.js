const catchAsync = require("../../utils/catchAsync");
const organizationService = require("./organization.service");
const httpStatus = require("http-status");

let organizationController = {};

organizationController.createOrganization = catchAsync(async (req, res) => {
  const org = await organizationService.createOrganization(req.body);
  res.status(httpStatus.CREATED).send(org);
});

organizationController.getAllOrganizations = catchAsync(async (req, res) => {
  const orgs = await organizationService.getAllOrganizations();
  res.send(orgs);
});

organizationController.getOrganizationById = catchAsync(async (req, res) => {
  const org = await organizationService.getOrganizationById(req.params.id);
  if (!org) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "Organization not found" });
  }
  res.send(org);
});

organizationController.updateOrganization = catchAsync(async (req, res) => {
  const result = await organizationService.updateOrganization(req.params.id, req.body);
  res.send(result);
});

organizationController.deleteOrganization = catchAsync(async (req, res) => {
  const result = await organizationService.deleteOrganization(req.params.id);
  res.send({ message: result });
});

organizationController.updateStatus = catchAsync(async (req, res) => {
  const result = await organizationService.updateStatus(req.params.id, req.body.status);
  res.send({ message: result });
});

module.exports = organizationController;