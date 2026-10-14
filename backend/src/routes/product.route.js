import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
    addOrder,
    getOrders,
    orderAnalytics
} from "../controllers/product.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/createProduct", verifyJWT, verifyAdmin, upload.single("image"), createProduct);
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProductById);
router.put("/updateProduct/:id", verifyJWT, verifyAdmin, upload.single("image"), updateProduct);
router.delete("/deleteProduct/:id", verifyJWT, verifyAdmin, deleteProduct);
router.post("/addOrder/:prodId", verifyJWT, addOrder);
router.get("/getOrders", verifyJWT, verifyAdmin, getOrders);
router.get("/analytics", verifyJWT, verifyAdmin, orderAnalytics);

export default router;