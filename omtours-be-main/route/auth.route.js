import express from "express";
import { authCheck,logout,login,createEvent } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/authCheck", protectRoute, authCheck);
router.post("/create-event",protectRoute,createEvent);


export default router;
