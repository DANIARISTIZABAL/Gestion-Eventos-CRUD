import { NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const authenticateToken = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token no válido", message: err });
  }
};
