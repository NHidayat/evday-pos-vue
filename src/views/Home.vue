<template>
  <div class="home">
    <Navbar :count="cartCount" @searchProduct="searchProduct" />
    <section class="contents">
      <b-row>
        <Sidebar @updateList="get_product" />
        <div class="main-content list-menu col-md-7 col-12">
          <b-container>
            <SortingGroup class="mt-3" />
            <b-alert variant="danger" :show="isAlert" class="mt-3">{{ alertMsg }}</b-alert>
            <div class="row mt-3 my-wrapper">
              <b-card :img-src="api_url+item.product_image" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="collection-item" v-for="(item, index) in products" :key="index">
                <div class="image-overlay" v-if="cekItemCart(item.product_id) >= 0">
                  <img src="../assets/checklist.png" class="checklist">
                </div>
                <b-card-text>
                  <h5 class="product-name">{{ item.product_name }}</h5>
                  <span>{{ item. category_name }}</span>
                  <h5 class="price float-right">Rp {{ formatN(item.product_price) }}</h5>
                </b-card-text>
                <b-button v-if="cekItemCart(item.product_id) >= 0" :disabled="true" variant="outline-success" class="col-12" @click="addToCart(item)">Added <b-icon-check></b-icon-check>
                </b-button>
                <b-button v-else class="my-primary col-12" @click="addToCart(item)">Add <b-icon-cart></b-icon-cart>
                </b-button>
              </b-card>
            </div>
            <div class="mt-3 mb-5">
              <b-pagination v-model="page" :total-rows="totalData" :per-page="limit" aria-controls="my-table" @change="paginationSetup" align="center"></b-pagination>
            </div>
          </b-container>
        </div>
        <Cart :items="cart" :cartSubtotal="cartSubtotal" :checkoutTotal="checkoutTotal" :tax="tax" @changeItemQty="updateCartQty" @clearCart="clearCart" />
      </b-row>
    </section>
  </div>
</template>
<script>
import Navbar from '../components/_base/Navbar'
import Sidebar from '../components/_base/Sidebar'
import SortingGroup from '../components/_base/Sorting_group'
import Cart from '../components/_base/Cart'
import axios from 'axios'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  title: 'Home - Evday POS',
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    SortingGroup,
    Cart
  },
  data() {
    return {
      cartCount: 0,
      cart: [],
      cartSubtotal: '',
      api_url: process.env.VUE_APP_API_URL,
      isAlert: false,
      alertMsg: '',
      isUpdate: false,
      product_id: '',
      checkoutTotal: '0',
      tax: '0'
    }
  },
  created() {
    this.get_product()
  },
  updated() {
    this.getCartSubtotal()
    this.generateCheckoutData()
  },
  computed: {
    ...mapGetters({ products: 'setProducts', limit: 'setLimit', page: 'setPage', totalData: 'setTotalData' })
  },
  methods: {
    ...mapActions({ get_product: 'getProduct' }),
    formatN(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    ...mapMutations(['setPage', 'setSorting']),
    paginationSetup(data) {
      this.setPage(data)
      this.get_product()
      this.$router.push(`?page=${this.page}`)
    },
    generateCheckoutData() {
      this.tax = this.cartSubtotal * (10 / 100)
      this.checkoutTotal = this.tax + this.cartSubtotal
    },
    updateCartQty(data) {
      this.cartCount += data
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
    },
    searchProduct(data) {
      axios.get(`http://127.0.0.1:3000/product/search/q?product_name=${data.product_name}`)
        .then(res => {
          this.isAlert = false
          this.products = res.data.data
          this.$router.push(`?product_name=${data.product_name}`)
        })
        .catch(error => {
          console.log(error)
          this.isAlert = true
          this.alertMsg = error.response.data.msg
        })
    },
    clearCart(data) {
      if (data === true) {
        this.cart = []
        this.cartCount = 0
      } else {
        if (confirm('Are you sure canceled this order?')) {
          this.cart = []
          this.cartCount = 0
        }
      }
    }
  }
}

</script>
<style src="../assets/css/style.css"></style>
