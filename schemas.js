const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);
// the Joi gets the data from the post request and the deleteObjects array is only an array and not neccsaarily in the ojbect so
// I could just check one by one which is what I am looking to do

module.exports.productSchema = Joi.object({
  product: Joi.object({
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  colors: Joi.object(),
  deleteImages: Joi.array(),
});

module.exports.shippingSchema = Joi.object({
  firstName: Joi.string().required().escapeHTML(),
  lastName: Joi.string().required().escapeHTML(),
  number: Joi.string().required().escapeHTML(),
  instagram: Joi.string().required().escapeHTML(),
  address: Joi.string().required().escapeHTML(),
  subdistrict: Joi.string().required().escapeHTML(),
  district: Joi.string().required().escapeHTML(),
  province: Joi.string().required().escapeHTML(),
  country: Joi.string().required().escapeHTML(),
  zipCode: Joi.string().required().escapeHTML(),
});
