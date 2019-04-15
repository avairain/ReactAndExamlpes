import { commonArticles } from '../../redux/commonHighReducer'

const initialState = {
  articles: [],
  loading: true,
  error: false,
};

// ACTIONS

export function loadArticles() {
  return {
    url: '/api/articles.json',
    params: {
      id: 1
    },
    types: ['LOAD_ARTICLES', 'LOAD_ARTICLES_SUCCESS', 'LOAD_ARTICLES_ERROR']
  };
}

export function changeQuery(e) {
  return {
    type: 'CHANGE_QUERY',
    payload: {
      query: e.target.value.trim()
    }
  };
}

export function search() { // redux-thunk 中间件
  return (dispatch, getState) => {
    const { query } = getState().articles.table;
    console.log(getState())
    return dispatch(loadArticles(query));
  }
}

export function deleteArticle(data) { // redux-thunk 中间件
  const params = {
    id: data.id,
  }
  return {
    url: '/api/articles.json1',
    method: 'post',
    name: 'http',
    status: ['DELETE_ARTICLES', 'DELETE_ARTICLES_SUCCESS', 'DELETE_ARTICLES_ERROR'],
    payload: JSON.stringify(params)
  }
  // return (dispatch, getState) => {
  //   const { query } = getState().articles.table;
  //   console.log(getState())
  //   return dispatch(loadArticles(query));
  // }
}

// reducer

export default articles

function articles(state = initialState, action) {  
  if (/^DELETE/i.test(action.type)) {
    return commonArticles('DELETE', state)(state, action)
  }
  if (/^LOAD/i.test(action.type)) {
    return commonArticles('LOAD', state)(state, action)
  }
  switch (action.type) {
    case 'CHANGE_QUERY': {
      return {
        ...state,
        query: action.payload.query
      };
    }

    // case 'LOAD_ARTICLES': {
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false
    //   };
    // }

    // case 'LOAD_ARTICLES_SUCCESS': {
    //   return {
    //     ...state,
    //     articles: action.payload,
    //     loading: false,
    //     error: false
    //   };
    // }

    // case 'LOAD_ARTICLES_ERROR': {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: true
    //   };
    // }

    // case 'DELETE_ARTICLES': {
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false
    //   };
    // }

    // case 'DELETE_ARTICLES_SUCCESS': {
    //   return {
    //     ...state,
    //     articles: action.payload,
    //     loading: false,
    //     error: false
    //   };
    // }

    // case 'DELETE_ARTICLES_ERROR': {
    //   console.log(state)
    //   return {
    //     ...state,
    //     loading: false,
    //     error: true
    //   };
    // }

    default:
      return state;
  }
}

