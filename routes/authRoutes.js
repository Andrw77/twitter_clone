const passport = require("passport");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */

router.get("/login", authController.showLogin);
router.get("/register", authController.showRegister);
router.post("/login", authController.login);
//router.post("/register", authController.create);

// router.post("/logout", authController.logout);

module.exports = router;
