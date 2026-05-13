import express from  "express";
import { delatePembicaraById, getPembicara, savePembicara, showPembicaraById, updatePembicaraById } from "../controlers/pembicaraControler";
const router = express.Router();

router.get("/", getPembicara);
router.post("/", savePembicara);
router.post("/:id", showPembicaraById);
router.put("/:id", updatePembicaraById);
router.delete("/:id", delatePembicaraById)

export default router;