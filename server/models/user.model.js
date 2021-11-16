const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      // below is code to validate email.
      validate: {
        // uses regular expression to see if field is proper formatted email
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
  },
  { timestamps: true }
);

// create a "virtual" field of confirmPassword so we don't have to add it as a field in the model
userSchema
  .virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

// This will run before validators in model
userSchema.pre("validate", function (next) {
  // makes sure password and confirmPassword are the same.
  if (this.password !== this.confirmPassword) {
    // if not, invalidate and send client error, do not move on in mongoose process
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

// got through all validations, right before mongoose actually saves the doc in db
userSchema.pre("save", function (next) {
  console.log("inside hash");
  bcrypt
    // hash password
    .hash(this.password, 10)
    .then((hash) => {
      // set mongo doc password to the hash so it is saved in db as hash
      this.password = hash;
      console.log("HASHING");
      // go to the "next" thing - the controller!
      next();
    })
    .catch((err) => {
      console.log("INSIDE ERROR BLOCK");
      console.log(err);
    });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
