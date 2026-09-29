const {param, body, validationResult} = require("express-validator");

const createBookValidation = [
  body('bookName')
      .notEmpty().withMessage((value, { req }) => req.t("requireBookName"))
      .isLength({ min: 5, max: 50 }).withMessage((value, { req }) => req.t("bookNameLengthValidation")),

  body('price')
      .notEmpty().withMessage((value, { req }) => req.t("requirePrice"))
      .isFloat({min: 1, max: 200}).withMessage((value, { req }) => req.t("priceScopeValidation")),

  body("countInStock")
      .notEmpty().withMessage((value, { req }) => req.t("requireCountInStock"))
      .isInt({min: 1, max: 255}).withMessage((value, { req }) => req.t("countInStockValidation")),

  body("image")
      .notEmpty().withMessage((value, { req }) => req.t("requireURL"))
      .isURL().withMessage((value, { req }) => req.t("validationURL"))
];

const updateBookValidation = [

  body('bookName')
      .optional()
      .isLength({ min: 5, max: 50 }).withMessage((value, { req }) => req.t("bookNameLengthValidation")),
  body('price')
      .optional()
      .isFloat({min: 1, max: 200}).withMessage((value, { req }) => req.t("priceScopeValidation")),
  body("countInStock")
      .optional()
      .isInt({min: 1, max: 255}).withMessage((value, { req }) => req.t("countInStockValidation")),
  body("image")
      .optional()
      .isURL().withMessage((value, { req }) => req.t("validationURL"))
];

const idValidation = [param("bookId").isMongoId().withMessage((value, { req }) => req.t("validationID"))]

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  next()
}

module.exports = {
  createBookValidation,
  updateBookValidation,
  handleValidationErrors,
  idValidation,
}

