import { Router } from "express";
import { body } from "express-validator";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getAllUpdates, getOneUpdate, updateUpdate } from "./handlers/update";
import { handleInpupErrors } from "./modules/middleware";

const router = Router();

// Product

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post("/product", body("name").isString(), handleInpupErrors, createProduct);

router.put("/product/:id",body("name").isString(),handleInpupErrors,updateProduct);

router.delete("/product/:id", deleteProduct);

// Updates

router.get("/update",getAllUpdates);
router.get("/update/:id", getOneUpdate);
router.post(
  "/update",
  body("title").exists(),
  body("body").exists().isString(),
  body("status").optional(),
  body('productId').exists().isString(),
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

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
