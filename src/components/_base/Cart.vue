<template>
  <aside class="cart-section col-md-4">
    <div class="cart-contents" id="cart-section">
      <div class="empty-cart" v-if="items.length < 1">
        <img src="../../assets/food-and-restaurant.png">
        <h5>Your cart is empty</h5>
        <span>Please add some items from the menu</span>
        <div class="mobile-view">
          <button class="btn btn-outline-info" onclick="window.history.go(-1)">Back</button>
        </div>
      </div>
      <div v-else>
        <div class="a" v-for="(item, index) in items" :key="index">
          <div class="cart-item">
            <div class="item-image">
              <img :src="api_url+item.product_image">
            </div>
            <div class="item-detail">
              <div class="item-name">
                <strong>{{ item.product_name }}</strong>
                <b-icon-trash class="float-right trash" @click="deleteCartItem(item)"></b-icon-trash>
              </div>
              <div class="item-calculation">
                <div class="input-group">
                  <b-button :disabled="item.qty === 1" class="btn-qty-min" @click="decItemQty(item.product_id)"><span>&minus;</span></b-button>
                  <input type="text" name="" class="form-control qty" v-model="item.qty" min="1" max="100">
                  <b-button class="btn-qty-min" @click="incItemQty(item.product_id)"><span>&plus;</span></b-button>
                </div>
                <div class="item-price"><span>Rp {{ formatN(item.subtotal) }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <b-row>
              <b-col md="12" class="mb-2">
                <small class="float-right">Cart Total: Rp. {{ formatN(cartSubtotal) }}* + Tax 10% : Rp. {{ formatN(tax) }}*</small>
              </b-col>
              <b-col>Total</b-col>
              <b-col><span class="float-right">Rp. {{ formatN(checkoutTotal) }}*</span></b-col>
            </b-row>
          </div>
          <div class="button-section">
            <button href="#" class="btn my-primary" data-toggle="modal" @click="post_order">
              <span v-if="!isLoading">Checkout</span>
              <span v-else>
                <b-spinner small variant="light" type="grow" label="Loading..."></b-spinner>
              </span>
            </button>
            <button class="btn my-danger" @click="clearCart">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <b-modal scrollable id="checkout-modal" ref="checkout-modal" hide-footer hide-header>
      <div class="modal-header">
        <b-row>
          <b-col md="3">
            <h5>Checkout</h5>
          </b-col>
          <b-col md="9"><span class="float-right">Receipt no: #{{ invoice }}</span></b-col>
          <b-col md="12"><span>Cashier: {{ cashier_name }}</span></b-col>
        </b-row>
      </div>
      <div class="checkout-modal modal-body">
        <b-row class="checkout-item" v-for="(item, index) in resCartItems" :key="index">
          <div class="col-6 item-name">{{ item.product_name }} {{ item.qty }}x</div>
          <div class="col-6 item-price">Rp. {{ formatN(item.subtotal) }}</div>
        </b-row>
        <b-row class="checkout-item">
          <div class="col-6 item-name">Subtotal</div>
          <div class="col-6 item-price">Rp. {{ formatN(resCartSubtotal) }}</div>
        </b-row>
        <b-row class="checkout-item">
          <div class="col-6 item-name">Ppn 10%</div>
          <div class="col-6 item-price">Rp. {{ formatN(resTax) }}</div>
        </b-row>
        <b-row class="checkout-total">
          <div class="col-12" align="right">Total: Rp. {{ formatN(resTotal) }}</div>
        </b-row>
        <b-row class="checkout-item">
          <div class="col-md-12 item-name">Payment: Cash</div>
        </b-row>
        <div>
          <b-row class="modal-footer button-section">
            <button type="button" @click="download" class="btn my-danger col-12" v-if="!isLoading">Print</button>
            <button type="button" class="btn my-danger col-12" disabled v-else>
              <b-spinner small variant="light" type="grow" label="Loading..."></b-spinner>
            </button>
            <span class="col-12" style="font-weight: 600;text-align: center;margin-top: 10px;">Or</span>
            <button type="button" class="btn my-primary col-12">Send Email</button>
          </b-row>
        </div>
      </div>
    </b-modal>
  </aside>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MixinsCart from '../../mixins/mixins_cart'
export default {
  name: 'Cart',
  mixins: [MixinsCart],
  data() {
    return {
      isMsg: '',
      isLoading: false,
      invoice: '',
      cashier_name: '',
      resCartItems: [],
      resCartSubtotal: '',
      resTax: '',
      resTotal: '',
      api_url: process.env.VUE_APP_API_URL
    }
  },
  computed: {
    ...mapGetters({
      items: 'cart',
      cartSubtotal: 'cartSubtotal',
      checkoutTotal: 'checkoutTotal',
      tax: 'tax',
      user: 'user'
    })
  },
  methods: {
    ...mapMutations(['generateCheckoutData', 'clearCart']),
    ...mapActions({ postOrder: 'postHistory' }),
    getIndexPush(id, qty) {
      const getIndex = this.items.findIndex(obj => obj.product_id === id)
      this.items[getIndex].qty += qty
      if (qty > 0) {
        this.items[getIndex].subtotal += this.items[getIndex].product_price
      } else {
        this.items[getIndex].subtotal -= this.items[getIndex].product_price
      }
      this.generateCheckoutData()
    },
    incItemQty(id) {
      this.getIndexPush(id, 1)
    },
    decItemQty(id) {
      this.getIndexPush(id, -1)
    },
    deleteCartItem(data) {
      const getIndex = this.items.findIndex(obj => obj.product_id === data.product_id)
      this.items.splice(getIndex, 1)
      this.generateCheckoutData()
    },
    post_order() {
      this.setLoading(true)
      const data = {
        cashier_name: this.user.user_name,
        items: this.items
      }
      this.postOrder(data)
        .then(res => {
          this.setLoading(false)
          this.isMsg = res.data.msg
          this.invoice = res.data.data.history_invoice
          this.resCartItems = res.data.data.items
          this.cashier_name = res.data.data.cashier_name
          this.resCartSubtotal = res.data.data.items.map(item => item.subtotal).reduce((a, b) => a + b)
          this.resTax = res.data.data.history_ppn
          this.resTotal = res.data.data.history_total
          this.makeToast(this.isMsg, 'primary')
          this.showModal('checkout-modal')
          this.clearCart(true)
        })
        .catch(error => {
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
    }
  }
}

</script>
