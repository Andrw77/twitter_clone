const { faker } = require("@faker-js/faker");

faker.locale = "es";

module.exports = async () => {
  const { faker } = require("@faker-js/faker");
  const Tweet = require("../models/Tweet");
  const User = require("../models/User");

  faker.locale = "es";

  const users = await User.find();
  for (const user of users) {
    for (let i = 0; i < faker.datatype.number({ min: 0, max: 20 }); i++) {
      const tweet = await Tweet.create({
        body: faker.lorem.paragraph(),
        author: user,
        createdAt: faker.date.between({
          from: "2020-01-01T00:00:00.000Z",
          to: "2030-01-01T00:00:00.000Z",
        }),
        likes: [],
      });
      user.tweets.push(tweet);
    }
  }
  console.log("[Database] Se corrió el seeder de Tweets.");
};
