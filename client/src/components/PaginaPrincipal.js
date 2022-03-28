import React from "react";
import classes from "./PaginaPrincipal.module.css";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

const PaginaPrincipal = () => {
  return (
    <div className={classes.container}>
      <header>
        <div>
          <ul>
            <li className={classes.title}>
              <Link to="/">Henry recetas</Link>
            </li>
          </ul>
        </div>

        <nav>
          <ul>
            <li>
              Busqueda por nombre: <input type="text" />
            </li>
            <li>
              Filtrar por tipo de dieta: <select name="" id=""></select>
            </li>
            <li>
              Orden alfabetico:{" "}
              <select name="" id="">
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </li>
          </ul>
        </nav>

        <div>
          <ul>
            <li>
              <Link to="/recipe">Registrar Receta</Link>
            </li>
          </ul>
        </div>
      </header>

      <div className={classes.pageNumbers}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>10</button>
      </div>
      <section>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </section>
    </div>
  );
};

export default PaginaPrincipal;
