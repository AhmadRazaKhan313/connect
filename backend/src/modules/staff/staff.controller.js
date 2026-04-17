const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { staffService } = require("../../services");
const { STAFF_TYPES } = require("../../utils/Constants");
const { sendEmailByInfo, sendSms } = require("../../services/email.service");
const { getEmailFormat } = require("../../utils/helpers");
const { s3 } = require("../../services/s3Service");
let staffController = {};

staffController.createStaff = catchAsync(async (req, res) => {
  const { organizationId } = req;
  const partners = await staffService.getAllPartners(organizationId);
  if (req?.body.type === STAFF_TYPES.orgStaff) {
    const staff = await staffService.createStaff({ ...req.body, organizationId });
    sendSmsAndEmail(staff, req?.body);
    res.status(httpStatus.CREATED).send(staff);
  } else {
    const allPartnersShare = partners.reduce(
      (acc, partner) => (acc += +partner?.share),
      0
    );
    if (allPartnersShare + req?.body?.share > 100) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        `Max share limit remaining is ${100 - allPartnersShare}`
      );
    } else {
      const staff = await staffService.createStaff({ ...req.body, organizationId });
      sendSmsAndEmail(staff, req?.body);
      res.status(httpStatus.CREATED).send(staff);
    }
  }
});

async function sendSmsAndEmail(staff, body) {
  const message = `Dear ${staff?.fullname}, You have been registered as a staff to Connect Communications Lodhran Family. Your new password is '${body?.password}'`;
  // staff?.email &&
  //   (await sendEmailByInfo(
  //     staff?.email,
  //     "Registration Successful",
  //     getEmailFormat("Registration Successful", message)
  //   ));
  if (body?.sendWelcomeMessage && body?.mobile && body?.mobile !== "") {
    await sendSms(body?.mobile, message);
  }
}

staffController.getAllStaffs = catchAsync(async (req, res) => {
  const staffs = await staffService.getAllStaffs(req.organizationId);
  if (!staffs || staffs.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Staffs");
  }
  res.send(staffs);
});

staffController.getStaff = catchAsync(async (req, res) => {
  const staff = await staffService.getStaffById(req.params.id);
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, "Staff not found");
  }
  res.send(staff);
});

staffController.getAllPartners = catchAsync(async (req, res) => {
  const partners = await staffService.getAllPartners(req.organizationId);
  if (!partners || partners.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No partners found");
  }
  res.send(partners);
});

staffController.updateProfile = catchAsync(async (req, res) => {
  let updateBody = req?.body;
  const user = req?.user;
  const file = req?.file;
  const key = `${user?.id || user?._id}`;
  const params = {
    Bucket: `${process.env.AWS_BUCKET_NAME}/staff-images`,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: "public-read",
  };
  try {
    const response = await s3.upload(params).promise();
    updateBody.profileImage = response.Location;
    const update = await staffService.updateProfile(user?.id, updateBody);
    if (update) {
      let staff = await staffService.getStaffById(user?.id);
      staff.password = null;
      res.send(staff);
    } else {
      throw new ApiError(httpStatus[404], "Something went wrong");
    }
  } catch (error) {
    console.error("error");
    console.error(error);
    throw new ApiError(500, "Failed to upload image");
  }
});

module.exports = staffController;