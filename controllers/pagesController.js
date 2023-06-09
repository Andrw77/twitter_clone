/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */
const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function showHome(req, res) {
  try {
    if (req.user) {
      const userId = await User.findById(req.user.id).populate("following");
      const followingUsers = userId.following;

      const tweetsFollowing = await Tweet.find({ author: { $in: followingUsers.concat(userId) } })
        .populate("author")
        .sort({ createdAt: -1 });

      res.render("pages/home", { tweetsFollowing });
    } else {
      const allTweets = await Tweet.find().populate("author").sort({ createdAt: -1 });
      res.render("pages/home", { allTweets });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar la página de inicio" });
  }
}

async function showContact(req, res) {
  res.render("pages/contact");
}

async function showAboutUs(req, res) {
  res.render("pages/aboutUs");
}

async function show404(req, res) {
  res.status(404).render("pages/404");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
};
