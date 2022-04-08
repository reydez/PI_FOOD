import React, { Fragment, useEffect, useState } from "react";
import classes from "./DetalleDeReceta.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../store/actions";

const DetalleDeReceta = () => {
  let { idReceta } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const recetaDetails = useSelector((state) => state.recipe);

  useEffect(() => {
    const loadRecipe = async () => {
      setIsLoading(true);
      await dispatch(getRecipeDetails(idReceta));
      setIsLoading(false);
    };

    loadRecipe();
  }, [idReceta, dispatch]);

  const img = recetaDetails.image
    ? recetaDetails.image
    : "https://dummyimage.com/600x400/000/fff.jpg&text=Food+Image";

  var replaced =
    recetaDetails.summary && recetaDetails.summary.replace(/(<([^>]+)>)/gi, "");
  /* var replaced = (
    <div dangerouslySetInnerHTML={{ __html: recetaDetails.summary }}></div>
  ); */

  return (
    <Fragment>
      <div className={classes.btnRegresar}>
        <ul>
          <li>
            <Link to="/recipes">Regresar a la Pagina principal</Link>
          </li>
        </ul>
      </div>
      {isLoading && (
        <div className={classes.loadingText}>
          <h3>Loading...</h3>
        </div>
      )}
      {!isLoading && (
        <div className={classes.container}>
          <div className={classes.detalles}>
            <div className={classes.imageContainer}>
              <img src={img} alt="Una imagen" />
            </div>
            <div className={classes.infoContainer}>
              <ul>
                <li>
                  <span>Nombre:</span>
                  {recetaDetails.title}
                </li>
                <li>
                  {recetaDetails.dishTypes && <span>Tipo de plato:</span>}
                  {recetaDetails.dishTypes &&
                    recetaDetails.dishTypes.map((tipo) => "(" + tipo + ") ")}
                </li>
                <li>
                  <span>Tipo de dieta:</span>
                  {recetaDetails.diets &&
                    recetaDetails.diets.map((diet) => "(" + diet + ") ")}
                </li>
                <li>
                  <span>Resumen del plato:</span>
                  {replaced}
                </li>
                <li>
                  <span>Puntuación:</span>
                  {recetaDetails.spoonacularScore}
                </li>
                <li>
                  <span>Nivel de comida saludable:</span>
                  {recetaDetails.healthScore}
                </li>
                <li>
                  <span>Paso a paso:</span>
                  {Array.isArray(recetaDetails.steps) &&
                  recetaDetails.steps.length
                    ? recetaDetails.steps.map((step, index) => (
                        <ul>
                          <li>
                            <strong>Paso {index + 1}</strong>: {step}
                          </li>
                        </ul>
                      ))
                    : "Esta receta no tiene pasos"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DetalleDeReceta;
