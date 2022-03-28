import React from "react";
import classes from "./PaginaInicial.module.css";
import { Link } from "react-router-dom";
import img from "./recipes.jpg";

const PaginaInicial = () => {
  return (
    <div className={classes.container}>
      <div className={classes.opciones}>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/rodrigo-reyes-hernandez/">
              About
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rodrigo-reyes-hernandez/">
              Contacto
            </a>
          </li>
        </ul>
      </div>
      <img src={img} alt="Una imagen" />
      <div className={classes.nombre}>
        <span>Recipes</span>
      </div>
      <div className={classes.iniciar}>
        <Link to="/recipes">
          <button>EMPEZAR AHORA!</button>
        </Link>
      </div>
    </div>
  );
};

export default PaginaInicial;
