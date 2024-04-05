// homeReducer.js

// Action types
const TOGGLE_HOME_SCREEN = 'TOGGLE_HOME_SCREEN';

// Initial state
const initialState = {
  isActive: false,
};

// Reducer function
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HOME_SCREEN:
      return {
        ...state,
        isActive: !state.isActive,
      };
    default:
      return state;
  }
};

// Action creators
export const toggleHomeScreen = () => ({
  type: TOGGLE_HOME_SCREEN,
});

export default homeReducer;
