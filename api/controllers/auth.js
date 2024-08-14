import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { password, username, email } = req.body;

  // HASH PASSWORD
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //   res.send(hashedPassword);

    // create new user

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).send("user created successfully");
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { password, username, email } = req.body;
  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(401).json({ message: "user not found" });
    }

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "password is not correct" });
    }

    //GENEREATE JWT
    const token=jwt.sign({
      id: user.id,
    },process.env.JWT_SECRET_KEY,{expiresIn:1000*60*60*24*7})
    res
      .cookie("token", token , {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({ message: "login successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "failed to login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie('token').res(201).json({message:"user logged out"})
};
