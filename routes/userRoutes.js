const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticate = require("../middlewares/ensureAuthenticated");

// router.post("/createTweet", userController.createTweet);

router.get("/:username/followers", ensureAuthenticate, userController.showFollowers);
// router.get("/:username/folloing", userController.followerList);
router.get("/:username/following", ensureAuthenticate, userController.showFollowing);
router.get("/:username", ensureAuthenticate, userController.showUserProfile);
router.patch("/:tweetId/like", userController.likeStore);
router.delete("/:tweetId/delete", userController.destroy);
router.patch("/:followingId/like", userController.followingStore);
// router.post("/:username/follow", userController.follow);
// router.post("/:username/unfollow", userController.unfollow);

// router.delete("/:idTweet/delete", userController.deleteTweet);
// router.patch("/:username/edit", userController.editTweet);

//------------------------------------------------------------------------

// router.get("/crear", userController.create);
// router.get("/:id", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
