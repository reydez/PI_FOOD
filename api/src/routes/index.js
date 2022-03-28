const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet, op } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const api_key = "1e074df89f284eba981b588a5615b9e9";

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", async (req, res) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&addRecipeInformation=true&number=100`
  );

  const recipes = await Recipe.findAll();

  const all = response.data.results.concat(recipes);

  if (req.query.name) {
    var { name } = req.query;
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();

    const filtered = all.filter((recipe) => recipe.title.includes(name));

    if (!filtered.length) {
      return res
        .status(404)
        .json({ msg: "Error no se pudo encontrar la receta" });
    }

    return res.json(filtered);
  }

  res.json(all);
});

router.get("/recipes/:idReceta", async (req, res) => {
  const { idReceta } = req.params;

  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&addRecipeInformation=true&number=100`
  );

  const recipes = await Recipe.findAll();

  const all = response.data.results.concat(recipes);

  const found = all.find((recipe) => recipe.id === idReceta);

  if (!found) {
    return res
      .status(404)
      .json({ msg: "Error no se pudo encontrar la receta" });
  }

  return res.json(found);
});

router.get("/types", (req, res) => {});

router.post("/recipe", async (req, res) => {
  const { title, resumen, puntuacion, nivel, pasoapaso } = req.body;

  const newRecipe = await Recipe.create({
    title,
    resumen,
    puntuacion,
    nivel,
    pasoapaso,
  });

  res.json(newRecipe);
});

module.exports = router;
