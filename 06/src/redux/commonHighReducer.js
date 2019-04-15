
export function commonArticles (prev, state) {
  const initialState = { ...state }
  const [ LOAD, SUCCESS, ERROR ] = ['ARTICLES', 'ARTICLES_SUCCESS', 'ARTICLES_ERROR'].map(v => `${prev.toUpperCase()}_${v}`)
  return (state = initialState, action) => {
    switch (action.type) {
      case LOAD:
        return {
          ...state,
          loading: true,
          error: false
        };
      case SUCCESS:
        return {
          ...state,
          articles: action.payload,
          loading: false,
          error: false
        };
      case ERROR:
        return {
          ...state,
          loading: false,
          error: true
        };
    }
  }
}
