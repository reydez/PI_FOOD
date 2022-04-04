import axios from "axios";

export const getRecipes = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/recipes");
    dispatch({ type: "GET_RECIPES", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByTitle = (title) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/recipes?title=" + title
    );
    dispatch({ type: "GET_RECIPES_BY_NAME", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDiets = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/types");
    dispatch({ type: "GET_DIETS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    dispatch({ type: "GET_RECIPE_DETAIL", payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addRecipe = (body) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/recipe", body);
    dispatch({ type: "ADD_RECIPE", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
