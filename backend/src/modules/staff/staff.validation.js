const Joi = require("joi");
const { STAFF_TYPES } = require("../../utils/Constants");
const {
  objectId,
  cnic,
  mobile,
} = require("../../validations/custom.validation");
let staffValidation = {};

staffValidation.createStaff = {
  body: Joi.object().keys({
    fullname: Joi.string().required("Full Name is required"),
    email: Joi.string().required("Email is requried").email(),
    password: Joi.string().required("Password is requried"),
    cnic: Joi.string().required("Mobile is required").custom(cnic),
    mobile: Joi.string().required("Mobile is required").custom(mobile),
    address: Joi.string().required("Password is required"),
    type: Joi.string().required("Type is required"),
    share: Joi.number().when("type", {
      is: STAFF_TYPES.partner || STAFF_TYPES.admin,
      then: Joi.number().required().messages({
        "any.required": "Share is required when type is partner",
      }),
      otherwise: Joi.number(),
    }),
    sendWelcomeMessage: Joi.boolean().required(),
  }),
};

staffValidation.getStaffById = {
  params: Joi.object().keys({
    id: Joi.string().required("Staff Id is required").custom(objectId),
  }),
};

staffValidation.getAllStaff = {
  query: Joi.object().keys({}),
};

staffValidation.updateStaff = {
  params: Joi.object().keys({
    id: Joi.string().required("Staff Id is required").custom(objectId),
  }),
  body: Joi.object().keys({
    fullname: Joi.string().required("Full Name is required"),
    email: Joi.string().required("Email is requried").email(),
    password: Joi.string().required("Password is requried"),
    cnic: Joi.string().required("Mobile is required").custom(cnic),
    mobile: Joi.string().required("Mobile is required").custom(mobile),
    address: Joi.string().required("Password is required"),
    type: Joi.string().required("Type is required"),
    share: Joi.number().when("type", {
      is: STAFF_TYPES.partner || STAFF_TYPES.admin,
      then: Joi.number().required().messages({
        "any.required": "Share is required when type is partner",
      }),
      otherwise: Joi.number(),
    }),
  }),
};

staffValidation.updateProfile = {
  body: Joi.object().keys({
    fullname: Joi.string().required("Full Name is required"),
    cnic: Joi.string().required("Mobile is required").custom(cnic),
    mobile: Joi.string().required("Mobile is required").custom(mobile),
    address: Joi.string().required("Password is required"),
    profileImage: Joi.object(),
  }),
};

module.exports = staffValidation;
