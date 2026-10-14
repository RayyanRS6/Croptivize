import { Router } from "express";
import {
    addMessage,
    getAllMessages,
    getMessage
} from "../controllers/message.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addMessage").post(addMessage);
router.route("/getMessage/:id").get(verifyJWT, verifyAdmin, getMessage);
router.route("/getAllMessages").get(verifyJWT, verifyAdmin, getAllMessages);

export default router;