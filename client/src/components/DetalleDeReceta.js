import React, { Fragment } from "react";
import classes from "./DetalleDeReceta.module.css";
import { Link } from "react-router-dom";
import img from "./recipes.jpg";

const DetalleDeReceta = () => {
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
                <span>Nombre:</span>aporradillo
              </li>
              <li>
                <span>Tipo de plato:</span>plato fuerte
              </li>
              <li>
                <span>Tipo de dieta:</span>full
              </li>
              <li>
                <span>Resumen del plato:</span>chulada
              </li>
              <li>
                <span>Puntuación:</span>90
              </li>
              <li>
                <span>Nivel de comida saludable:</span>2
              </li>
              <li>
                <span>Paso a paso:</span>Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Commodi, iste unde reiciendis tenetur, alias
                eum quis dolore ab eveniet earum incidunt nisi tempora
                reprehenderit deserunt temporibus quidem ad quibusdam
                laboriosam! Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Doloribus alias molestiae quis corporis quas in
                consectetur, harum, blanditiis obcaecati sunt fuga minima,
                laborum voluptatem enim aspernatur animi! Soluta, praesentium
                et. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Neque asperiores ducimus doloremque hic, iure facilis, sequi
                delectus libero, deleniti corrupti eos vitae vel molestias ex
                itaque aperiam officia tempore veniam! Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Magnam porro quia iusto ipsa
                iure corporis quidem nam id adipisci inventore quos voluptates
                exercitationem fuga perferendis labore, nihil reprehenderit
                deleniti dolores! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nihil, dolorem fugiat quam saepe minus
                voluptates error quidem iure laudantium eligendi. Adipisci earum
                impedit officia atque dolore asperiores, veniam cupiditate ut!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
                sapiente, facilis laboriosam a itaque unde doloremque ratione
                nihil expedita et necessitatibus? Alias atque nihil harum,
                debitis nostrum omnis obcaecati iusto? Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Reiciendis unde possimus
                doloremque, quidem dolores rem inventore voluptate vel nostrum,
                minima, quo cum voluptatibus aliquid id totam veritatis
                recusandae alias provident? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam laborum deleniti fugiat
                quos nulla iure impedit in, quas cumque amet voluptates
                explicabo consectetur libero consequuntur molestias, quo unde
                tempore reprehenderit. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Inventore eius praesentium minus aliquid rerum
                magnam, tenetur ab impedit. Atque, distinctio explicabo. Quidem
                accusantium, facere doloremque perspiciatis ullam exercitationem
                voluptas quo? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Voluptatibus rem, neque quasi consequuntur
                quas numquam eos perferendis doloribus modi maiores ut ea libero
                dolores culpa velit, recusandae earum aperiam fugit.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetalleDeReceta;
