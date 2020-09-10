import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Product from './modules/product'
import Cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Product,
    Cart
  },
  state: {
    name: 'Dayat'
  },
  mutations: {},
  actions: {},
  getters: {}
})
