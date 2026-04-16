const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const staffValidation = require("./staff.validation");
const staffController = require("./staff.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(staffValidation.createStaff),
    staffController.createStaff
  )
  .get(
    auth(),
    validate(staffValidation.getAllStaff),
    staffController.getAllStaffs
  );

router.get(
  "/getAllPartners",
  auth(),
  validate(staffValidation.getAllStaff),
  staffController.getAllPartners
);

router
  .route("/:id")
  .get(
    auth(),
    validate(staffValidation.getStaffById),
    staffController.getStaff
  );

router.post(
  "/update-profile",
  upload.single("profileImage"),
  auth(),
  validate(staffValidation.updateProfile),
  staffController.updateProfile
);

module.exports = router;
