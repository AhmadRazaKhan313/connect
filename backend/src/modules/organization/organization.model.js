const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../models/plugins");

const OrganizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    logo: {
      type: String,
    },
    color: {
  type: String,
  default: "#1976d2",  // default blue color
},
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

OrganizationSchema.plugin(toJSON);
OrganizationSchema.plugin(paginate);

const OrganizationModel = mongoose.model("Organization", OrganizationSchema);

module.exports = OrganizationModel;
