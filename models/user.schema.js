const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_name: {
       type: String,
       required: true,
       unique: true
    },
    first_name: {
       type: String,
       required: true,
    },
    last_name: {
       type: String,
       required: true,
    },
    user_type: {
       type: String,
       enum: ["USER", "GUEST_AUTHOR", "AUTHOR"],
       required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    }
});

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;