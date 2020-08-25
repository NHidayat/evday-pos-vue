<template>
  <div class="home">
    <Navbar :count="cartCount" />
    <section class="contents">
      <b-row>
        <Sidebar @updateList="get_product" />
        <div class="main-content list-menu col-md-7 col-12">
          <div class="container">
            <div class="row">
              <b-card class="collection-item" v-for="(item, index) in products" :key="index">
                <img v-bind:src="require(`../${item.product_image}`)" class="card-img-top" alt="...">
                <div class="image-overlay" v-if="cekItemCart(item.product_id) >= 0">
                  <img src="../assets/checklist.png" class="checklist">
                </div>
                <div class="card-body">
                  <h5 class="product-name">{{ item.product_name }}</h5>
                  <span>{{ item.category_name }}</span>
                  <h5 class="price float-right">Rp {{item.product_price}}</h5>
                  <b-button v-if="cekItemCart(item.product_id) >= 0" :disabled="true" variant="outline-success" class="col-12" @click="addToCart(item)">Added <b-icon-check></b-icon-check>
                  </b-button>
                  <b-button v-else class="my-primary col-12" @click="addToCart(item)">Add <b-icon-cart></b-icon-cart>
                  </b-button>
                </div>
              </b-card>
            </div>
          </div>
        </div>
        <Cart :items="cart" :cartSubtotal="cartSubtotal" :checkoutTotal="checkoutTotal" :tax="tax" @changeItemQty="updateCartQty" />
        <ModalItem />
      </b-row>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
import Sidebar from '../components/_base/Sidebar'
import Cart from '../components/_base/Cart'
import ModalItem from '../components/_base/Modal_form'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Cart,
    ModalItem
  },
  data() {
    return {
      cartCount: 0,
      cart: [],
      cartSubtotal: '',
      page: 1,
      limit: 9,
      sort: '',
      products: [],
      base_url: process.env.VUE_APP_BASE_URL,
      alert: false,
      isMsg: 'Tes',
      isUpdate: false,
      product_id: '',
      checkoutTotal: '0',
      tax: '0'
    }
  },
  created() {
    this.get_product()
  },
  methods: {
    getCheckout() {
      this.tax = this.cartSubtotal * (10 / 100)
      this.checkoutTotal = this.tax + this.cartSubtotal
    },
    updateCartQty(data) {
      this.cartCount += data
      this.getCartSubtotal()
      this.getCheckout()
    },
    cekItemCart(id) {
      return this.cart.findIndex(obj => obj.product_id === id)
    },
    getCartSubtotal() {
      if (this.cart.length > 0) {
        this.cartSubtotal = this.cart.map(item => item.subtotal).reduce((a, b) => a + b)
      } else {
        this.cartSubtotal = 0
      }
    },
    addToCart(data) {
      const cekIndex = this.cart.findIndex(obj => obj.product_id === data.product_id)
      if (cekIndex >= 0) {
        this.cart[cekIndex].qty += 1
        this.cart[cekIndex].subtotal += this.cart[cekIndex].product_price
        this.cartCount += 1
      } else {
        const setCart = {
          product_id: data.product_id,
          product_name: data.product_name,
          product_image: data.product_image,
          product_price: data.product_price,
          qty: 1,
          subtotal: data.product_price
        }
        this.cart.push(setCart)
        this.cartCount += 1
      }
      this.getCartSubtotal()
      this.getCheckout()
    },
    get_product() {
      axios.get(`http://127.0.0.1:3000/product?page=${this.page}&limit=${this.limit}`)
        .then(res => {
          this.products = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
<style src="../assets/css/style.css">
