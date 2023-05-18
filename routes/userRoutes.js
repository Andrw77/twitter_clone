const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// router.post("/createTweet", userController.createTweet);

router.get("/followers", userController.showFollowers); //"/:username/followers"
// router.get("/:username/folloing", userController.followerList);
router.get("/following", userController.showFollowing);

// router.post("/:username/follow", userController.follow);
// router.post("/:username/unfollow", userController.unfollow);

// router.delete("/:idTweet/delete", userController.deleteTweet);
// router.patch("/:username/edit", userController.editTweet);

//------------------------------------------------------------------------

// router.get("/", userController.index);
// router.get("/crear", userController.create);
// router.get("/:id", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
