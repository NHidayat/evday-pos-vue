<template>
  <aside class="cart-section col-md-4">
    <div class="cart-contents" id="cart-section">
      <div class="empty-cart" v-if="count.length < 1">
        <img src="../../assets/food-and-restaurant.png">
        <h5>Your cart is empty</h5>
        <span>Please add some items from the menu</span>
        <div class="mobile-view">
          <button class="btn btn-outline-info" onclick="window.history.go(-1)">Back</button>
        </div>
      </div>
      <div v-else>
        <div class="a" v-for="(item, index) in count" :key="index">
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
                  <button type="button" class="btn btn-qty-min"><span>&minus;</span></button>
                  <input type="text" name="" class="form-control qty" v-model="item.qty" min="1" max="100">
                  <button type="button" class="btn btn-qty-min"><span>&plus;</span></button>
                </div>
                <div class="item-price"><span>Rp {{ item.subtotal }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="float-right">Rp. 105.000*</span>
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
  props: ['count'],
  data() {
    return {
      cartFilled: false
    }
  },
  methods: {}
}

</script>
