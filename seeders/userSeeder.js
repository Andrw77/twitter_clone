/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const { faker } = require("@faker-js/faker");
  const User = require("../models/User");

  faker.locale = "es";

  const users = [];
  const passwordHashed = await bcrypt.hash("1234", 8);
  for (let i = 0; i < 20; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: passwordHashed,
      username: faker.name.firstName().toLowerCase(),
      email: faker.internet.email(),
      description: faker.lorem.sentence(),
      profileImg: faker.image.avatar(),
      createdAt: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2030-01-01T00:00:00.000Z",
      }),
    });
    users.push(user);
  }

  for (const user of users) {
    pepito;
    for (let i = 0; i < faker.datatype.number({ min: 0, max: 20 }); i++) {
      if (!user.following.includes(users[i]._id) && users[i] != user) {
        user.following.push(users[i]);
        if (!users[i].followers.includes(user._id)) {
          users[i].followers.push(user);
        }
      }
    }
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
