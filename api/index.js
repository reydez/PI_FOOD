//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Diet } = require("./src/db.js");
const axios = require("axios");
require("dotenv").config();

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    const diets = await Diet.findAll();

    if (diets.length === 0) {
      fillDiets();
    }

    console.log("% listening at 3001"); // eslint-disable-line no-console
  });
});

const api_key = process.env.API2;

const fillDiets = async () => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&addRecipeInformation=true&number=100`
  );

  const dietsFromRecipes = response.data.results
    .map((recipe) => {
      return recipe.diets;
    })
    .flat(1);

  const diets = dietsFromRecipes.filter(
    (diet, index) => dietsFromRecipes.indexOf(diet) === index
  );

  diets.push("ketogenic");

  diets.forEach((diet) => {
    Diet.findOrCreate({
      where: {
        nombre: diet,
      },
    });
  });
};
