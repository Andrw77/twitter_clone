const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticate = require("../middlewares/ensureAuthenticated");
const uniqueValidator = require("../middlewares/uniqueValidator");

router.get("/:username/followers", ensureAuthenticate, userController.showFollowers);
router.get("/:username/following", ensureAuthenticate, userController.showFollowing);
router.get("/:username", ensureAuthenticate, userController.showUserProfile);
router.patch("/:tweetId/like", userController.likeStore); //Pasar a tweets routes
router.delete("/:tweetId/delete", userController.destroy); //Pasar a tweets routes
router.patch("/:followerId/follow", userController.followingStore);

// Posteos de Tweets

router.post("/:username/post", ensureAuthenticate, userController.store);

// Retweets

router.get("/:username/retweets", ensureAuthenticate, userController.showRetweets);

router.patch("/edit", uniqueValidator, userController.update);

module.exports = router;
