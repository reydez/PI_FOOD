import React, { Fragment, useEffect } from "react";
import classes from "./DetalleDeReceta.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../store/actions";

const DetalleDeReceta = () => {
  let { idReceta } = useParams();
  const dispatch = useDispatch();
  const recetaDetails = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRecipeDetails(idReceta));
  }, [idReceta, dispatch]);

  const img = recetaDetails.image
    ? recetaDetails.image
    : "https://dummyimage.com/600x400/000/fff.jpg&text=Food+Image";

  return (
    <Fragment>
      <div className={classes.btnRegresar}>
        <ul>
          <li>
            <Link to="/recipes">Regresar a la Pagina principal</Link>
          </li>
        </ul>
      </div>
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
                <span>Tipo de plato:</span>
                {recetaDetails.dishTypes.map((dt) => "(" + dt + ")")}
              </li>
              <li>
                <span>Tipo de dieta:</span>
                {recetaDetails.diets.map((diet) =>
                  typeof diet === "object"
                    ? "(" + diet.nombre + ")"
                    : "(" + diet + ")"
                )}
              </li>
              <li>
                <span>Resumen del plato:</span>
                {recetaDetails.summary.replace(/(<([^>]+)>)/gi, "")}
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
                <span>Paso a paso:</span>{" "}
                <ul>
                  {recetaDetails.steps.length === 0
                    ? "Esta receta no tiene pasos"
                    : recetaDetails.steps.map((step, index) => (
                        <li>
                          <strong>Paso {index + 1}</strong>: {step}
                        </li>
                      ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetalleDeReceta;
