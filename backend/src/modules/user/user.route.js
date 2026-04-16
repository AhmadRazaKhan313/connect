const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("./user.validation");
const userController = require("./user.controller");

const router = express.Router();

router
  .route("/")
  .post(auth(), validate(userValidation.createUser), userController.createUser)
  .get(
    auth(),
    validate(userValidation.getAllUsers),
    userController.getAllUsers
  );

router
  .route("/:id")
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .patch(
    auth(),
    validate(userValidation.updateUser),
    userController.updateUserById
  )
  .delete(
    auth(),
    validate(userValidation.getUser),
    userController.deleteUserById
  );

router.post(
  "/send-custom-message",
  auth(),
  validate(userValidation.sendCustomMessage),
  userController.sendCustomMessage
);

router.post(
  "/autocomplete",
  auth(),
  validate(userValidation.getAutoCompleteUsers),
  userController.getAutoCompleteUsers
);

module.exports = router;
