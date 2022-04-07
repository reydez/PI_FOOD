import React from "react";
import { Link } from "react-router-dom";
import classes from "./RecipeCard.module.css";

const RecipeCard = ({ title, image, diets, id }) => {
  const img = image
    ? image
    : "https://dummyimage.com/600x400/000/fff.jpg&text=Food+Image";

  return (
    <div className={classes.card}>
      <Link to={`/recipes/${id}`}>
        <div className={classes.imageContainer}>
          <img src={img} alt="Una imagen" />
        </div>
        <div className={classes.infoContainer}>
          <ul>
            <li>{title}</li>
          </ul>
        </div>
        <div className={classes.diets}>
          {diets.length === 0 ? (
            <h6>Esta comida no tiene dietas.</h6>
          ) : (
            diets.map((diet) =>
              typeof diet === "object" ? (
                <h6>{diet.nombre}</h6>
              ) : (
                <h6>{diet}</h6>
              )
            )
          )}
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
