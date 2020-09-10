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
    }
  },
  actions: {
    getProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_API_URL}product/active/beta?page=${context.state.page}&limit=${context.state.limit}&orderBy=${context.state.selectedSorting}`)
          .then(res => {
            context.commit('setProducts', res.data.data)
            context.commit('setTotalData', res.data.pagination.totalData)
          }).catch(error => {
            console.log(error.response)
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
    setSelectedSorting(state) {
      return state.selectedSorting
    }
  }
}
