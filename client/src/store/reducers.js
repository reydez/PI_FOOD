const initialState = {
  recipes: [],
  filteredRecipes: [],
  diets: [],
  recipe: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return {
        ...state,
        recipe: action.payload,
      };
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipe: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
