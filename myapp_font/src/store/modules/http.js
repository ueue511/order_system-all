import axios from 'axios'

export default {
  namespaced: true,
  action: {
    async request({ dispatch, rootState }, { methid, url, data, error }) {
      const headers = {}
      headers["Conten-Type"] = "application/json"
      if (rootState.auto.token) {
        headers["Authorization"] = `Token ${rootState.auth.token}`
        headers["User-Id"] = rootState.auth.userId
      }

      const options = {
        methid,
        url: `${process.env.API_URL}${url}`,
        headers,
        data,
        timeout: 15000
      }

      return axios(options)
        .then(res => res)
        .catch(err => {
          dispatch(
            "message/create",
            { error: error, err },
            { root: true}
          )
        })
    },
    async post({ dispatch }, requests) {
      requests.method = "post"
      return dispatch("request", requests)
    },
    async delete({ dispatch }, requests) {
      requests.method = "delete"
      return dispatch("request", requests)
    }
  }
}