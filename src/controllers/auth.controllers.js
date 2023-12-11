//Importamos el modelo de datos
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

//Funcion para registrar usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Validamos que el email no este registrado en la base de datos
    const userFound = await User.findOne({ email });
    if (userFound)
      //Si encontro un usuario que ya tenga ese email
      return res
        .status(400) //Retorna un mensaje de error.
        .json({ message: ["El email esta en uso"] });

    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    //console.log(userSaved);
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.log(error);
  }
}; //Fin de la funcion register

//Funcion para iniciar sesion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: ["Usuario no encontrado"] });
    }
    //Comparamos el password que envio el usuario con el de la base de datos
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: ["Password no coincide"] });
    }
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
  }
}; //Fin de la funcion login

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: ["User not found"] });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
}; //Fin del profile

//Funcion para validar el token de inicio de sesion
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: ["No autorizado"] });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err)
      //Si hay un error al validar el token
      return res.status(401).json({ message: ["No autorizado"] });

    const userFound = await User.findById(user.id);
    if (!userFound)
      //Si no encuentra el usuario que viene en el token
      return res.status(401).json({ message: ["No autorizado"] });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    }); //Fin del return res.json
  }); //Fin del jwt.verify
}; // Fin del verifyToken


