const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const packageValidation = require("./package.validation");
const packageController = require("./package.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(packageValidation.createPackage),
    packageController.createPackage
  )
  .get(
    auth(),
    validate(packageValidation.getAllPackages),
    packageController.getAllPackages
  );

router
  .route("/:id")
  .get(
    auth(),
    validate(packageValidation.getPackageById),
    packageController.getPackageById
  )
  .patch(
    auth(),
    validate(packageValidation.updatePackage),
    packageController.updatePackageById
  )
  .delete(
    auth(),
    validate(packageValidation.getPackageById),
    packageController.deletePackageById
  );

router.get("/by-isp/:isp", auth(), validate(packageValidation.getPackageByIsp), packageController.getPackageByIsp)

module.exports = router;
