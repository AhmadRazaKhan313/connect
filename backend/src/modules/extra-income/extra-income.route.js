const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const extraIncomeValidation = require("./extra-income.validation");
const extraIncomeController = require("./extra-income.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(extraIncomeValidation.createExtraIncome),
    extraIncomeController.createExtraIncome
  );

router.post(
  "/completed",
  auth(),
  validate(extraIncomeValidation.getAllCompletedExtraIncomes),
  extraIncomeController.getAllCompletedExtraIncomes
);

router.post(
  "/pending",
  auth(),
  validate(extraIncomeValidation.getAllCompletedExtraIncomes),
  extraIncomeController.getAllPendingExtraIncomes
);

router
  .route("/:id")
  .get(
    auth(),
    validate(extraIncomeValidation.getExtraIncomeById),
    extraIncomeController.getExtraIncomeById
  )
  .patch(
    auth(),
    validate(extraIncomeValidation.updateExtraIncome),
    extraIncomeController.updateExtraIncomeById
  )
  .delete(
    // auth(),
    validate(extraIncomeValidation.getExtraIncomeById),
    extraIncomeController.deleteExtraIncomeById
  );

module.exports = router;
