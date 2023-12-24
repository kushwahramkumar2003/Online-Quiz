const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    default: "default_avatar_url.jpg", // Set a default avatar image
    trim: true,
  },
});

// Delete the user before deleting the profile
profileSchema.pre("deleteOne", { document: true }, async function (next) {
  const profile = this;
  await User.deleteOne({ _id: profile.user });
  next();
});

// Log the profile details after saving
profileSchema.post("save", function (doc, next) {
  console.log("Profile saved:", doc);
  next();
});

// Get the full name of the user
profileSchema.methods.getFullName = async function () {
  const profile = this;
  const user = await User.findById(profile.user);
  return user.name;
};

// Find the profile by user id
profileSchema.statics.findByUserId = async function (user) {
  const profile = await Profile.findOne({ user });
  return profile;
};

const Profile = mongoose.model("Profile", profileSchema);
