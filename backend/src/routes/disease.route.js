import { Router } from "express";
import {
    addDisease,
    diseaseAnalytics,
    getRecentDiseases,
    predictDisease,
    getAllDiseases
} from '../controllers/disease.controller.js'
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addDisease").post(verifyJWT, addDisease);
router.route("/diseaseAnalytics").get(verifyJWT, verifyAdmin, diseaseAnalytics);
router.route("/getRecent").get(verifyJWT, verifyAdmin, getRecentDiseases);
router.route("/predict").post(verifyJWT, predictDisease);
router.route("/getAll").get(verifyJWT, verifyAdmin, getAllDiseases);

export default router;