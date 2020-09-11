import axios from 'axios'
export default {
  state: {
    products: [],
    limit: 9,
    page: 1,
    selectedSorting: 'product_name ASC',
    totalData: ''
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setTotalData(state, payload) {
      state.totalData = payload
    },
    setPage(state, payload) {
      state.page = payload
    },
    setSorting(state, payload) {
      state.selectedSorting = payload
    },
    setAlert(state, payload) {
      state.isAlert = payload
    },
    setAlertMsg(state, payload) {
      state.alertMsg = payload
    }
  },
  actions: {
    getProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_API_URL}product/active/beta?page=${context.state.page}&limit=${context.state.limit}&orderBy=${context.state.selectedSorting}`)
          .then(res => {
            console.log(res)
            context.commit('setProducts', res.data.data.result)
            context.commit('setTotalData', res.data.data.pagination.totalData)
          }).catch(error => {
            console.log(error)
            console.log(error.response)
            // this.isAlert = true
            // this.alertMsg = 'Someting Wrong'
          })
      })
    },
    getAllProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_API_URL}product?page=${context.state.page}&limit=${context.state.limit}&orderBy=${context.state.selectedSorting}`)
          .then(res => {
            context.commit('setProducts', res.data.data.result)
            context.commit('setTotalData', res.data.data.pagination.totalData)
            resolve(res)
          }).catch(error => {
            console.log(error)
            console.log(error.response)
            context.commit('setAlert', true)
            context.commit('setAlertMsg', 'Somtehing Wrong')
            reject(error.response)
            // this.isAlert = true
            // this.alertMsg = 'Someting Wrong'
          })
      })
    },
    postProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:3000/product', payload)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    updateProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`http://127.0.0.1:3000/product/${payload.product_id}`, payload.form)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    deleteProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`http://127.0.0.1:3000/product/${payload.product_id}`)
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
    setProducts(state) {
      return state.products
    },
    setTotalData(state) {
      return state.totalData
    },
    setLimit(state) {
      return state.limit
    },
    setPage(state) {
      return state.page
    }
  }
}
