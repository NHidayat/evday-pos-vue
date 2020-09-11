import Vue from 'vue'
export default {
  state: {
    cart: [],
    cartSubtotal: 0,
    checkoutTotal: 0,
    tax: 0,
    cartCount: 0
  },
  mutations: {
    clearCart(state) {
      Vue.$confirm({
        title: 'Are you sure?',
        message: 'Are you sure you want to cancel this order?',
        button: {
          yes: 'Yes',
          no: 'Cancel'
        },
        callback: confirm => {
          if (confirm) {
            state.cart = []
          }
        }
      })
    },
    generateCheckoutData(state) {
      if (state.cart.length > 0) {
        state.cartSubtotal = state.cart.map(item => item.subtotal).reduce((a, b) => a + b)
      } else {
        state.cartSubtotal = 0
      }
      state.tax = state.cartSubtotal * (10 / 100)
      state.checkoutTotal = state.tax + state.cartSubtotal
    }
  },
  actions: {},
  getters: {
    cart(state) {
      return state.cart
    },
    cartSubtotal(state) {
      return state.cartSubtotal
    },
    checkoutTotal(state) {
      return state.checkoutTotal
    },
    tax(state) {
      return state.tax
    },
    cartCount(state) {
      const cart = state.cart
      if (cart.length > 0) {
        const result = cart.map(item => item.qty).reduce((a, b) => a + b)
        return result
      } else {
        return 0
      }
    }
  }
}
