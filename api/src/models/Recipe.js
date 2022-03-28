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
      resumen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puntuacion: {
        type: DataTypes.INTEGER,
      },
      nivel: {
        type: DataTypes.INTEGER,
      },
      pasoapaso: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
    },
    {
      timestamps: false,
    }
  );
};
