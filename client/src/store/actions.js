import axios from "axios";

export const getRecipes = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/recipes");
    return dispatch({ type: "GET_RECIPES", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByTitle = (title) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/recipes?title=" + title
    );
    return dispatch({ type: "GET_RECIPES_BY_TITLE", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDiets = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/types");
    return dispatch({ type: "GET_DIETS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    /* console.log(response.data); */
    return dispatch({ type: "GET_RECIPE_DETAIL", payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addRecipe = (body) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/recipe", body);
    return dispatch({ type: "ADD_RECIPE", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const sortByDiet = (diet) => {
  return {
    type: "SORT_BY_DIET",
    payload: diet,
  };
};

export const sortByAlphabet = (str) => {
  return {
    type: "SORT_BY_ALPHABET",
    payload: str,
  };
};

export const sortByPuntos = (str) => {
  return {
    type: "SORT_BY_PUNTOS",
    payload: str,
  };
};
