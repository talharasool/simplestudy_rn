// webViewReducer.js

// Action types
const TOGGLE_WEBVIEW_SCREEN = 'TOGGLE_WEBVIEW_SCREEN';

// Initial state
const initialState = {
  isActive: false,
};

// Reducer function
const webViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_WEBVIEW_SCREEN:
      return {
        ...state,
        isActive: !state.isActive,
      };
    default:
      return state;
  }
};

// Action creators
export const toggleWebViewScreen = () => ({
  type: TOGGLE_WEBVIEW_SCREEN,
});

export default webViewReducer;
