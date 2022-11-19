import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getOneUpdate,
  updateUpdate,
} from "./handlers/update";
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getUpdatePointById,
  getUpdatePoints,
  updateUpdatePoint,
} from "./handlers/updatePoint";
import { handleInpupErrors } from "./modules/middleware";

const router = Router();

// Product

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post(
  "/product",
  body("name").isString(),
  handleInpupErrors,
  createProduct
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInpupErrors,
  updateProduct
);

router.delete("/product/:id", deleteProduct);

// Updates

router.get("/update", getAllUpdates);

router.get("/update/:id", getOneUpdate);

router.post(
  "/update",
  body("title").exists(),
  body("body").exists().isString(),
  body("status").optional(),
  body("productId").exists().isString(),
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("status").optional(),
  body("version").optional(),
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

// update updatepoint

router.get("/updatepoint", getUpdatePoints);
router.get("/updatepoint/:id", getUpdatePointById);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  createUpdatePoint
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  updateUpdatePoint
);
router.delete("/updatepoint/:id", deleteUpdatePoint);

router.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "internal error" });
  }
});
export default router;
