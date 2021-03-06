import axios from 'axios'
export default {
  state: {
    products: [],
    limit: 9,
    page: 1,
    selectedSorting: 'product_name ASC',
    totalData: '',
    isAlert: false,
    alertMsg: ''
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
    setIsAlert(state, payload) {
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
            context.commit('setProducts', res.data.data)
            context.commit('setTotalData', res.data.pagination.totalData)
            resolve(res)
          })
          .catch(error => {
            reject(error)
            context.commit('setIsAlert', true)
            context.commit('setAlertMsg', 'Something Wrong')
          })
      })
    },
    getAllProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_API_URL}product?page=${context.state.page}&limit=${context.state.limit}&orderBy=${context.state.selectedSorting}`)
          .then(res => {
            context.commit('setProducts', res.data.data)
            context.commit('setTotalData', res.data.pagination.totalData)
            resolve(res)
          }).catch(error => {
            context.commit('setIsAlert', true)
            context.commit('setAlertMsg', 'Something Wrong')
            reject(error)
          })
      })
    },
    postProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'product', payload)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(process.env.VUE_APP_API_URL + `product/${payload.product_id}`, payload.form)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(process.env.VUE_APP_API_URL + `product/${payload.product_id}`)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    searchProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `product/search/q?product_name=${payload.product_name}`)
          .then(res => {
            context.commit('setIsAlert', false)
            context.commit('setProducts', res.data.data)
          }).catch(error => {
            context.commit('setProducts', [])
            context.commit('setIsAlert', true)
            context.commit('setAlertMsg', error.response.data.msg)
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
    },
    isAlert(state) {
      return state.isAlert
    },
    alertMsg(state) {
      return state.alertMsg
    }
  }
}
