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
              <img :src="require(`../../${ item.product_image }`)">
            </div>
            <div class="item-detail">
              <div class="item-name">
                <strong>{{ item.product_name }}</strong>
              </div>
              <div class="item-calculation">
                <div class="input-group">
                  <b-button :disabled="item.qty === 1" class="btn-qty-min" @click="decItemQty(item.product_id)"><span>&minus;</span></b-button>
                  <input type="text" name="" class="form-control qty" v-model="item.qty" min="1" max="100">
                  <b-button class="btn-qty-min" @click="incItemQty(item.product_id)"><span>&plus;</span></b-button>
                </div>
                <div class="item-price"><span>Rp {{ item.subtotal }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="float-right">Rp. {{ cartSubtotal }}*</span>
          </div>
          <span>*Belum termasuk ppn</span>
          <div class="button-section">
            <a href="#" class="btn my-primary" data-toggle="modal" data-target="#checkoutmodal">Checkout</a>
            <a href="#" class="btn my-danger">Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'Cart',
  props: ['items'],
  data() {
    return {
      cartSubtotal: ''
    }
  },
  created() {
    this.getCartSubtotal()
  },
  methods: {
    getCartSubtotal() {
      if (this.items.length > 0) {
        this.cartSubtotal = this.items.map(item => item.subtotal).reduce((a, b) => a + b)
      } else {
        this.cartSubtotal = 0
      }
    },
    getIndexPush(id, qty) {
      const getIndex = this.items.findIndex(obj => obj.product_id === id)
      this.items[getIndex].qty += qty
      if (qty > 0) {
        this.items[getIndex].subtotal += this.items[getIndex].product_price
      } else {
        this.items[getIndex].subtotal -= this.items[getIndex].product_price
      }
      this.$emit('changeItemQty', qty)
      this.getCartSubtotal()
    },
    incItemQty(id) {
      this.getIndexPush(id, 1)
    },
    decItemQty(id) {
      this.getIndexPush(id, -1)
    }
  }
}

</script>
