import React, { useState, useEffect } from "react";
import classes from "./PaginaPrincipal.module.css";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../store/actions";

const PaginaPrincipal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      await dispatch(getRecipes());
      setIsLoading(false);
    };

    loadRecipes();
  }, [dispatch]);

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
              Busqueda por nombre: <input type="text" /> <button>Buscar</button>
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
        {isLoading && <h3>Loading...</h3>}
        {!isLoading &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
            />
          ))}
      </section>
    </div>
  );
};

export default PaginaPrincipal;
