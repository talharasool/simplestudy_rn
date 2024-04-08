const TOGGLE_WEBVIEW_SCREEN = 'TOGGLE_WEBVIEW_SCREEN';

const initialState = {
  isActive: false,
};

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

export const toggleWebViewScreen = () => ({
  type: TOGGLE_WEBVIEW_SCREEN,
});

export default webViewReducer;
