import express from "express";

const router = express.Router()

router.get('/', getUsers)
router.post("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);