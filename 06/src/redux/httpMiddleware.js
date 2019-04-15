import axios from 'axios'

export default function ({dispatch}) {
  return next => action => {
    if (typeof action.url === 'string' && action.name === 'http') {
      console.log(action)
      const [ loading, success, fail ] = action.status
      next({
        ...action,
        type: loading,
        loading: true,
      })
      return axios[action.method](action.url, action.payload || {}, action.header || {})
        .then(res => {
          return Promise.resolve(next({
            type: success,
            loading: false,
            payload: res
          }))
        })
        .catch(err => Promise.reject(next({
          type: fail,
          loading: false,
          error: true
        })))
    } else {
      next(action)
    }
  }
}
