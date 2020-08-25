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
                <b-icon-trash class="float-right" @click="deleteCartItem(item)"></b-icon-trash>
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
            <a href="#" class="btn my-primary" data-toggle="modal" v-b-modal.checkout-modal>Checkout</a>
            <a href="#" class="btn my-danger">Cancel</a>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="checkout-modal" ref="checkout-modal" hide-footer title="Checkout">
      <div class="checkout-modal modal-body">
        <div class="checkout-item row" v-for="(item, index) in items" :key="index">
          <div class="col-6 item-name">{{ item.product_name }} {{ item.qty }}x</div>
          <div class="col-6 item-price">Rp. {{ item.subtotal }}</div>
        </div>
        <div class="checkout-item row">
          <div class="col-6 item-name">Subtotal</div>
          <div class="col-6 item-price">Rp. {{ cartSubtotal }}</div>
        </div>
        <div class="checkout-item row">
          <div class="col-6 item-name">Ppn 10%</div>
          <div class="col-6 item-price">Rp. {{ tax }}</div>
        </div>
        <div class="checkout-total row">
          <div class="col-12" align="right">Total: Rp. {{ checkoutTotal }}</div>
        </div>
        <div class="checkout-item row">
          <div class="col-md-12 item-name">Payment: Cash</div>
        </div>
        <div>
          <div class="button-section row">
            <button type="button" class="btn my-danger col-12">Print</button>
            <span class="col-12" style="font-weight: 600;text-align: center;margin-top: 10px">Or</span>
            <button type="button" class="btn my-primary col-12">Send Email</button>
          </div>
        </div>
      </div>
    </b-modal>
  </aside>
</template>
<script>
export default {
  name: 'Cart',
  props: ['items', 'cartSubtotal', 'checkoutTotal', 'tax'],
  data() {
    return {}
  },
  methods: {
    getIndexPush(id, qty) {
      const getIndex = this.items.findIndex(obj => obj.product_id === id)
      this.items[getIndex].qty += qty
      if (qty > 0) {
        this.items[getIndex].subtotal += this.items[getIndex].product_price
      } else {
        this.items[getIndex].subtotal -= this.items[getIndex].product_price
      }
      this.$emit('changeItemQty', qty)
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
      this.$emit('changeItemQty', -data.qty)
    }
  }
}

</script>
