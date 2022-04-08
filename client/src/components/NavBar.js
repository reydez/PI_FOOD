import React, { useEffect, useRef, useState } from "react";
import { getDiets, getRecipesByTitle } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const NavBar = ({ sort, sortByDiet, sortByPoints }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const ordenAlfRef = useRef("");
  const ordenPuntosRef = useRef("");
  const dietsSelect = useSelector((state) => state.diets);

  useEffect(() => {
    const loadDiets = () => {
      dispatch(getDiets());
    };

    loadDiets();
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value.replace(/[^a-zA-Z\s]/gi, ""));
  };

  const handleSearchByTitle = () => {
    dispatch(getRecipesByTitle(title));
    setTitle("");
    ordenAlfRef.current.value = "";
    ordenPuntosRef.current.value = "";
  };

  const handleSortByDiet = (e) => {
    sortByDiet(e);
    ordenAlfRef.current.value = "";
    ordenPuntosRef.current.value = "";
  };

  return (
    <nav>
      <ul>
        <li>
          Por Title:{" "}
          <input
            type="text"
            value={title}
            placeholder="Buscar Receta..."
            onChange={(e) => handleChange(e)}
          />
          <button type="button" onClick={handleSearchByTitle}>
            Buscar
          </button>
        </li>
        <li>
          Por dieta:{" "}
          <select name="" id="" onChange={(e) => handleSortByDiet(e)}>
            <option value="All">All</option>
            {dietsSelect.map((diet) => (
              <option value={diet.nombre} key={diet.id}>
                {diet.nombre}
              </option>
            ))}
          </select>
        </li>
        <li>
          Orden alfabetico:{" "}
          <select ref={ordenAlfRef} onChange={(e) => sort(e)}>
            <option value="">Seleccione orden</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </li>
        <li>
          Por puntuación:{" "}
          <select ref={ordenPuntosRef} onChange={(e) => sortByPoints(e)}>
            <option value="">Seleccione orden</option>
            <option value="BIGFIRST">Mas primero</option>
            <option value="LOWFIRST">Menos primero</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
