const UserModel = require("../Models/user");

exports.register = async (req, res) => {
  try {
    const { name, email, photoUrl } = req.body;

    // Check if user already exists
    let userExist = await UserModel.findOne({ email: email });

    // If user does not exist, create a new user
    if (!userExist) {
      userExist = await UserModel.create({
        name: name,
        email: email,
        photoUrl: photoUrl,
        role: "user",
      });
    }

    return res.status(200).json({
      message: "Welcome Back",
      user: userExist,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};
