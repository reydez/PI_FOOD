import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import { addRecipe, getDiets } from "../store/actions";
import classes from "./CreacionDeReceta.module.css";

const isNotEmpty = (valor) => valor.trim() !== "";

const numNotValid = (valor) =>
  valor.trim() !== "" && valor >= 0 && valor <= 100;

const CreacionDeReceta = () => {
  const dispatch = useDispatch();
  const [diet, setDiet] = useState("");
  const [diets, setDiets] = useState([]);
  const [pasos, setPasos] = useState([]);
  const dietsSelect = useSelector((state) => state.diets);

  console.log(dietsSelect);

  useEffect(() => {
    const loadDiets = () => {
      dispatch(getDiets());
    };
    loadDiets();
  }, [dispatch]);

  const {
    valor: valorNombre,
    esValido: nombreEsValido,
    tieneError: nombreTieneError,
    valorChangeHandler: nombreChangeHandler,
    inputBlurHandler: nombreBlurHandler,
    reset: resetNombre,
  } = useInput(isNotEmpty);

  const {
    valor: valorResumen,
    esValido: resumeEsValido,
    tieneError: resumenTieneError,
    valorChangeHandler: resumenChangeHandler,
    inputBlurHandler: resumenBlurHandler,
    reset: resetResumen,
  } = useInput(isNotEmpty);

  const {
    valor: valorPuntuacion,
    esValido: puntuacionEsValido,
    tieneError: puntuacionTieneError,
    valorChangeHandler: puntuacionChangeHandler,
    inputBlurHandler: puntuacionBlurHandler,
    reset: resetPuntuacion,
  } = useInput(numNotValid);

  const {
    valor: valorNivel,
    esValido: nivelEsValido,
    tieneError: nivelTieneError,
    valorChangeHandler: nivelChangeHandler,
    inputBlurHandler: nivelBlurHandler,
    reset: resetNivel,
  } = useInput(numNotValid);

  const {
    valor: valorPaso,
    esValido: pasoEsValido,
    tieneError: pasoTieneError,
    valorChangeHandler: pasoChangeHandler,
    inputBlurHandler: pasoBlurHandler,
    reset: resetPaso,
  } = useInput(isNotEmpty);

  let formEsValido = false;

  if (nombreEsValido && resumeEsValido && puntuacionEsValido && nivelEsValido) {
    formEsValido = true;
  }

  const handleChange = (e) => {
    setDiet(e.target.value);
    if (e.target.value.trim() !== "") {
      var found = diets.find((diet) => diet === e.target.value);
      if (!found) {
        setDiets((prevState) => [...prevState, e.target.value]);
      }
    }
  };

  const quitarDieta = (value) => {
    setDiets((prevDiets) => prevDiets.filter((diet) => diet !== value));
  };

  const agregarPaso = () => {
    if (pasoEsValido) {
      setPasos((prevState) => [...prevState, valorPaso.trim()]);
    }
    resetPaso();
  };

  const quitarPaso = (idx) => {
    setPasos((prevDiets) => prevDiets.filter((paso, index) => index !== idx));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formEsValido) {
      alert("Algunos campos estan vacios");
      return;
    }

    dispatch(
      addRecipe({
        title: valorNombre,
        summary: valorResumen,
        spoonacularScore: valorPuntuacion,
        healthScore: valorNivel,
        diets: diets,
        steps: pasos,
      })
    );

    resetNombre();
    resetResumen();
    resetPuntuacion();
    resetNivel();
    resetPaso();
    setPasos([]);
    setDiets([]);
  };

  const nombreClasses = nombreTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const resumenClasses = resumenTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const puntuacionClasses = puntuacionTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const nivelClasses = nivelTieneError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

  const pasoClasses = pasoTieneError
    ? `${classes.formControlStep} ${classes.invalid}`
    : `${classes.formControlStep}`;

  return (
    <Fragment>
      <div className={classes.btnRegresar}>
        <ul>
          <li>
            <Link to="/recipes">Regresar a la Pagina principal</Link>
          </li>
        </ul>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.titulo}>
          <h1>Registrar Receta</h1>
        </div>
        <div className={classes.controlGroup}>
          <div className={nombreClasses}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={valorNombre}
              onChange={nombreChangeHandler}
              onBlur={nombreBlurHandler}
            />
            {nombreTieneError && (
              <p className={classes.errorText}>Por favor ingrese el nombre</p>
            )}
          </div>

          <div className={puntuacionClasses}>
            <label htmlFor="puntuacion">Puntuación</label>
            <input
              id="puntuacion"
              type="number"
              value={valorPuntuacion}
              onChange={puntuacionChangeHandler}
              onBlur={puntuacionBlurHandler}
            />
            {puntuacionTieneError && (
              <p className={classes.errorText}>
                Por favor ingrese la Puntuación correcta
              </p>
            )}
          </div>

          <div className={resumenClasses}>
            <label htmlFor="resumen">Resumen</label>
            <textarea
              rows="3"
              id="resumen"
              type="text"
              value={valorResumen}
              onChange={resumenChangeHandler}
              onBlur={resumenBlurHandler}
            />
            {resumenTieneError && (
              <p className={classes.errorText}>Por favor ingrese el resumen</p>
            )}
          </div>

          <div className={nivelClasses}>
            <label htmlFor="nivel">Nivel de comida</label>
            <input
              id="nivel"
              type="number"
              value={valorNivel}
              onChange={nivelChangeHandler}
              onBlur={nivelBlurHandler}
            />
            {nivelTieneError && (
              <p className={classes.errorText}>
                Por favor ingrese el Nivel de comida correcto
              </p>
            )}
          </div>

          <div className={classes.diets}>
            <div className={classes.formControl}>
              <select value={diet} onChange={handleChange}>
                <option value="">Seleccione una dieta</option>
                {dietsSelect.map((diet) => (
                  <option value={diet.nombre} key={diet.id}>
                    {diet.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.dietsContainer}>
              {diets.length === 0 ? (
                <div className={classes.diet}>
                  <h6>Esta receta no tiene dieta todavia</h6>
                </div>
              ) : (
                diets.map((diet, index) => (
                  <div
                    className={classes.diet}
                    key={index}
                    onClick={() => quitarDieta(diet)}
                  >
                    <h6>{diet}</h6>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={classes.steps}>
            <div className={`${pasoClasses}`}>
              <textarea
                rows="3"
                id="step"
                type="text"
                value={valorPaso}
                onChange={pasoChangeHandler}
                onBlur={pasoBlurHandler}
              />
              {pasoTieneError && (
                <p className={classes.errorText}>
                  Por favor ingrese un paso valido
                </p>
              )}
              <div className={classes.stepsAction}>
                <button type="button" onClick={agregarPaso}>
                  Agregar Paso
                </button>
              </div>
            </div>
            <div className={classes.stepsContainer}>
              <div className={classes.step}>
                {pasos.length === 0 ? (
                  <ul>
                    <li>Esta receta no tiene pasos todavia</li>
                  </ul>
                ) : (
                  pasos.map((paso, index) => (
                    <ul key={index} onClick={() => quitarPaso(index)}>
                      <li>Paso {index + 1}</li>
                      <li>{paso}</li>
                    </ul>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className={classes.formActions}>
            <button type="submit">Registrar</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default CreacionDeReceta;
