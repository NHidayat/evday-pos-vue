import axios from 'axios'
export default {
  state: {
    histories: []
  },
  mutations: {
    sethistories(state, payload) {
      state.histories = payload
    }
  },
  actions: {
    gethistories(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://127.0.0.1:3000/history')
          .then(res => {
            context.commit('sethistories', res.data.data)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    postHistory(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:3000/history', payload)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    histories(state) {
      return state.histories
    }
  }
}
