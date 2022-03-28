import React from "react";
import { Link } from "react-router-dom";
import classes from "./RecipeCard.module.css";
import img from "./recipes.jpg";

const RecipeCard = () => {
  return (
    <div className={classes.card}>
      <Link to="/recipes/2">
        <div className={classes.imageContainer}>
          <img src={img} alt="Una imagen" />
        </div>
        <div className={classes.infoContainer}>
          <ul>
            <li>Nombre</li>
            <li>Tipo de dieta</li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
