import config from './Modal.config';
import { bindRedux } from 'redux-form-utils';

const { state: formState, reducer: formReducer } = bindRedux(config);

const initialState = {
  visible: false,
  ...formState,
};

function ADD_ARTICLES (params) {
  const body = JSON.stringify(params)
  return {
    url: '/api/article.json',
    method: 'POST',
    body,
    types: ['ADD_ARTICLES', 'ADD_ARTICLES_SUCCESS', 'ADD_ARTICLES_ERROR']
  }
}

export function addArticle() {
  return (dispatch, getState) => {
    const { title, desc, date } = getState().articles.modal.form;
    return dispatch(ADD_ARTICLES({ title, desc, date }));
  };
}

export function showModal() {
  return {
    type: 'SHOW_MODAL'
  };
}

export function hideModal() {
  return {
    type: 'HIDE_MODAL'
  };
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL': {
      return {
        ...state,
        visible: true,
        error: false
      };
    }

    case 'HIDE_MODAL': {
      return {
        ...state,
        visible: false,
        error: false
      };
    }

    case 'ADD_ARTICLES': {
      return {
        ...state,
        visible: true,
        error: false
      }
    }
    case 'ADD_ARTICLES_SUCCESS': {
      return {
        ...state,
        visible: false,
        error: false
      }
    }
    case 'ADD_ARTICLES_ERROR': {
      return {
        ...state,
        visible: true,
        error: true
      }
    }
    default:
      return formReducer(state, action);
  }
}
