import axios from 'axios'
export default {
  state: {
    categories: []
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    }
  },
  actions: {
    getCategories(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://127.0.0.1:3000/category')
          .then(res => {
            context.commit('setCategories', res.data.data)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    postCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:3000/category', payload)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    patchCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`http://127.0.0.1:3000/category/${payload.category_id}`, payload.form)
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
    categories(state) {
      return state.categories
    }
  }
}
