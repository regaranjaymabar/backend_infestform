import express  from "express";
import { deleteCategoryById, getCategory, saveCategory, showCategoryById, updateCategoryById } from "../controlers/categoriesControler";

const router = express.Router();

router.get("/", getCategory);
router.post("/", saveCategory);
router.post("/:id", showCategoryById);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById)


export default router;