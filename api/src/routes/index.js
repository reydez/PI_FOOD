const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const api_key = process.env.API1;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", async (req, res) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&addRecipeInformation=true&number=100`
  );

  const recipes = response.data.results.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary,
      spoonacularScore: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      diets: recipe.diets,
      image: recipe.image,
      steps:
        recipe.analyzedInstructions.length === 0
          ? []
          : recipe.analyzedInstructions[0].steps.map((step) => {
              return step.step;
            }),
    };
  });

  const dbRecipes = await Recipe.findAll({ include: Diet });

  const fixDbRecipes = dbRecipes
    .map((recipe) => recipe.toJSON())
    .map((fixDiet) => {
      return {
        ...fixDiet,
        diets:
          fixDiet.diets.length === 0
            ? []
            : fixDiet.diets.map((diet) => diet.nombre),
      };
    });

  const all = recipes.concat(fixDbRecipes);

  if (req.query.title) {
    var { title } = req.query;
    title = title[0].toUpperCase() + title.slice(1).toLowerCase();

    const filtered = all.filter((recipe) => recipe.title.includes(title));

    if (!filtered.length) {
      return res
        .status(404)
        .json({ msg: "Error no se pudo encontrar la receta que buscaba" });
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

  const recipes = response.data.results.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary,
      spoonacularScore: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      diets: recipe.diets,
      image: recipe.image,
      dishTypes: recipe.dishTypes,
      steps:
        recipe.analyzedInstructions.length === 0
          ? []
          : recipe.analyzedInstructions[0].steps.map((step) => {
              return step.step;
            }),
    };
  });

  const dbRecipes = await Recipe.findAll({ include: Diet });

  const fixDbRecipes = dbRecipes
    .map((recipe) => recipe.toJSON())
    .map((fixDiet) => {
      return {
        ...fixDiet,
        diets:
          fixDiet.diets.length === 0
            ? []
            : fixDiet.diets.map((diet) => diet.nombre),
      };
    });

  const all = recipes.concat(fixDbRecipes);

  const found = all.find((recipe) => recipe.id === Number(idReceta));

  if (!found) {
    return res
      .status(404)
      .json({ msg: "Error no se pudo encontrar la receta" });
  }

  return res.json(found);
});

router.get("/types", async (req, res) => {
  const diets = await Diet.findAll();

  res.json(diets);
});

router.post("/recipe", async (req, res) => {
  const { title, summary, spoonacularScore, healthScore, diets, steps } =
    req.body;

  const newRecipe = await Recipe.create({
    title,
    summary,
    spoonacularScore,
    healthScore,
    steps: steps,
  });

  diets.forEach(async (diet) => {
    const foundDiet = await Diet.findAll({
      where: {
        nombre: diet,
      },
    });
    if (foundDiet) newRecipe.addDiet(foundDiet);
  });

  res.json(req.body);
});

module.exports = router;
