/**
 * Este archivo se creó para centralizar el código referente a Passport.
 *
 * Su nombre es arbitrario, aunque tenía sentido llamarle `passport.js`.
 *
 * Se lo colocó en la raíz del proyecto, aunque otra opción válida podría haber
 * sido colocarlo en una carpeta que contenga archivos de configuración, por
 * ejemplo, llamada `/config`.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "usernameOrEmail",
        passwordField: "password",
      },
      async function (usernameOrEmail, password, done) {
        // Este código sólo se llama si username y password están definidos.
        console.log("[LocalStrategy] Username:", usernameOrEmail); // To-Do: Borrar este `console.log` luego de hacer pruebas.
        console.log("[LocalStrategy] Password:", password); // To-Do: Borrar este `console.log` luego de hacer pruebas.
        // Completar código...
        try {
          const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
          });
          if (!user) {
            console.log("Usuario no existe.");
            return done(null, false, { message: "Credenciales incorrectas." });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            console.log("La contraseña es inválida.");
            return done(null, false, { message: "Credenciales incorrectas." });
          }
          console.log("Credenciales verificadas correctamente");
          return done(null, user);
        } catch (error) {
          console.log(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    console.log("[Passport] Serialize User"); // To-Do: Borrar este `console.log` luego de hacer pruebas.
    // Completar código...
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("[Passport] Deserialize User"); // To-Do: Borrar este `console.log` luego de hacer pruebas.
    // Completar código...
    try {
      const user = await User.findById(id).populate("tweets");
      done(null, user); // Usuario queda disponible en req.user.
    } catch (err) {
      done(err);
    }
  });
};
