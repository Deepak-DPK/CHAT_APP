import express from "express";
import { login, logout, signup } from "../controlers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login",login);
Router.post("/logout", logout);
Router.put("/update-profile", protectRoute, updateProfile)
export default Router;
