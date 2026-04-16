const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const invoiceValidation = require("./invoice.validation");
const invoiceController = require("./invoice.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(invoiceValidation.createInvoice),
    invoiceController.createInvoice
  );

router.post(
  "/all-invoices",
  auth(),
  validate(invoiceValidation.getAllInvoices),
  invoiceController.getAllInvoices
);

router.post(
  "/sent-invoices",
  auth(),
  validate(invoiceValidation.getAllInvoices),
  invoiceController.getSentInvoices
);

router
  .route("/:id")
  .get(
    auth(),
    validate(invoiceValidation.getInvoiceById),
    invoiceController.getInvoiceById
  )
  .patch(
    auth(),
    validate(invoiceValidation.updateInvoice),
    invoiceController.updateInvoiceById
  )
  .delete(
    auth(),
    validate(invoiceValidation.getInvoiceById),
    invoiceController.deleteInvoice
  );

module.exports = router;
