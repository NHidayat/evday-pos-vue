import axios from 'axios'
export default {
  state: {
    usersList: []
  },
  mutations: {
    setUsers(state, payload) {
      state.usersList = payload
    }
  },
  actions: {
    getAllUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + 'users')
          .then(res => {
            context.commit('setUsers', res.data.data)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    patchUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(process.env.VUE_APP_API_URL + `users/edit/${payload.user_id}`, payload.form)
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
    getUsersList(state) {
      return state.usersList
    }
  }
}
