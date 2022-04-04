const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spoonacularScore: {
        type: DataTypes.INTEGER,
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
    },
    {
      timestamps: false,
    }
  );
};
