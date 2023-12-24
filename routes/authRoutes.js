const { Router } = require("express");
const authController = require("../controllers/authController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const router = Router();
router.get("/", authController.get_home);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/card", authController.get_card);
router.get("/settings", requireAuth, checkUser, authController.get_settings);

router.get(
  "/mycollections",
  requireAuth,
  checkUser,
  authController.mycollections
);

// router.get('/collection/:name', authController.get_collection)

module.exports = router;
