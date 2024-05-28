const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/getAllInstructor",
  authController.protect,
  authController.isAdmin,
  authController.getAllInstructor
);

router.get("/user-auth", authController.protect, (req, resp) => {
  resp.status(200).json({ ok: true });
});

router.get(
  "/admin-auth",
  authController.protect,
  authController.isAdmin,
  (req, resp) => {
    resp.status(200).json({ ok: true });
  }
);

module.exports = router;
