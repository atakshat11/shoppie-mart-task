import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import Cart from '../../models/Cart'
initDB();

export default async (req, res) => {
  console.log("API Called!");
  const {
    firstName,
    lastName,
    gender,
    birthDate,
    email,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;
  console.log("Data fetched!");
  try {
    if (!req.body) {
      return res.status(422).json({ error: "Please Add All Fields!" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: "User Already Exists With This Email!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmPassword: confirmPassword,
    }).save();
    console.log("Register User Data", newUser);
     await new Cart({user:newUser._id}).save()
    res.status(201).json({ message: "signup success" });
  } catch (err) {
    console.log(err);
  }
};
