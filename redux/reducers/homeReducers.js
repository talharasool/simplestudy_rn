const TOGGLE_HOME_SCREEN = 'TOGGLE_HOME_SCREEN';

const initialState = {
  isActive: false,
};

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

export const toggleHomeScreen = () => ({
  type: TOGGLE_HOME_SCREEN,
});

export default homeReducer;
