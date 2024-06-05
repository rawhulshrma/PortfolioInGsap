import express from "express";
import { addLatestWorks, addProject, addSkills, getUser, login, logout, updateUser } from "../Controller/User.js";

import { isAuthenticated } from "../Middlewares/Auth.js";
export const userRouter = express.Router();

userRouter.route("/login").post(login);

userRouter.route("/logout").get(logout);

userRouter.route("/user").get(getUser);

// userRouter.route("/me").get(isAuthenticated, myProfile);

userRouter.route("/admin/update").put(isAuthenticated, updateUser);

userRouter.route("/admin/work/add").post(isAuthenticated, addLatestWorks);
userRouter.route("/admin/skills/add").post(isAuthenticated, addSkills);
userRouter.route("/admin/project/add").post(isAuthenticated, addProject);

// userRouter.route("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline);
// userRouter.route("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube);
// userRouter.route("/admin/project/:id").delete(isAuthenticated, deleteProject);

// userRouter.route("/contact").post(contact);