import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import classes from "./CreacionDeReceta.module.css";

const isNotEmpty = (valor) => valor.trim() !== "";

const numNotValid = (valor) =>
  valor.trim() !== "" && valor >= 0 && valor <= 100;

const CreacionDeReceta = () => {
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

  if (
    nombreEsValido &&
    resumeEsValido &&
    puntuacionEsValido &&
    nivelEsValido &&
    pasoEsValido
  ) {
    formEsValido = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formEsValido) {
      return;
    }

    alert(
      valorNombre +
        " " +
        valorResumen +
        " " +
        valorPuntuacion +
        " " +
        valorNivel +
        " " +
        valorPaso
    );

    resetNombre();
    resetResumen();
    resetPuntuacion();
    resetNivel();
    resetPaso();
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
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`;

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
          <div className={resumenClasses}>
            <label htmlFor="resumen">Resumen</label>
            <input
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

          <div className={pasoClasses}>
            <label htmlFor="step">Paso a paso</label>
            <textarea
              rows="8"
              cols="43"
              id="step"
              type="text"
              value={valorPaso}
              onChange={pasoChangeHandler}
              onBlur={pasoBlurHandler}
            />
            {pasoTieneError && (
              <p className={classes.errorText}>
                Por favor ingrese el Nivel de comida correcto
              </p>
            )}
          </div>

          <div className={classes.formActions}>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default CreacionDeReceta;
