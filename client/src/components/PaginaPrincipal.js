import React, { useState, useEffect } from "react";
import classes from "./PaginaPrincipal.module.css";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecipes,
  sortByAlphabet,
  sortByDiet,
  sortByPuntos,
} from "../store/actions";
import NavBar from "./NavBar";

const PaginaPrincipal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const recipes = useSelector((state) => state.recipes);

  const [actualPage, setActualPage] = useState(1);
  const recetasPerPage = 9;
  const numerosDePagina = [];

  for (let i = 1; i <= Math.ceil(recipes.length / recetasPerPage); i++) {
    numerosDePagina.push(i);
  }

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      await dispatch(getRecipes());
      setIsLoading(false);
    };

    loadRecipes();
  }, [dispatch]);

  const handlePage = (num) => {
    setActualPage(num);
  };

  const handleSortByDiet = (e) => {
    e.preventDefault();
    dispatch(sortByDiet(e.target.value));
    setActualPage(1);
  };

  const handleSortByAz = (e) => {
    e.preventDefault();
    dispatch(sortByAlphabet(e.target.value));
    setActualPage(1);
  };

  const handleSortByPoints = (e) => {
    e.preventDefault();
    dispatch(sortByPuntos(e.target.value));
    setActualPage(1);
  };

  var ultimoIdx = actualPage * recetasPerPage;
  var primerIdx = ultimoIdx - recetasPerPage;
  var actualRecipes = recipes.slice(primerIdx, ultimoIdx);

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
        <NavBar
          sort={handleSortByAz}
          sortByDiet={handleSortByDiet}
          sortByPoints={handleSortByPoints}
        />
        <div>
          <ul>
            <li>
              <Link to="/recipe">Registrar Receta</Link>
            </li>
          </ul>
        </div>
      </header>

      <div className={classes.pageNumbers}>
        {numerosDePagina &&
          numerosDePagina.map((numero) => (
            <button key={numero} onClick={() => handlePage(numero)}>
              {numero}
            </button>
          ))}
      </div>

      <section>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading &&
          actualRecipes.map((recipe) => (
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
