const { faker } = require("@faker-js/faker");
const Tweet = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  const { faker } = require("@faker-js/faker");
  const Tweet = require("../models/Tweet");

  faker.locale = "es";

  module.exports = async () => {
    const tweets = [];

    for (let i = 0; i < 20; i++) {
      tweets.push({
        body: faker.lorem.paragraph(),
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: faker.defaultRefDate(),
        likes: [],
      });
    }
    await User.insertMany(tweets);
    console.log("[Database] Se corrió el seeder de Tweets.");
  };
};
