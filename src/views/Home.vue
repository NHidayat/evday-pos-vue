<template>
  <div class="home">
    <Navbar @searchProduct="searchProduct" />
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
        <Cart :items="cart" />
      </b-row>
    </section>
  </div>
</template>
<script>
import Navbar from '../components/_base/Navbar'
import Sidebar from '../components/_base/Sidebar'
import SortingGroup from '../components/_base/Sorting_group'
import Cart from '../components/_base/Cart'
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
      api_url: process.env.VUE_APP_API_URL,
      isUpdate: false,
      product_id: ''
    }
  },
  created() {
    this.get_product()
  },
  computed: {
    ...mapGetters({
      products: 'setProducts',
      limit: 'setLimit',
      page: 'setPage',
      totalData: 'setTotalData',
      cart: 'cart',
      isAlert: 'isAlert',
      alertMsg: 'alertMsg'
    })
  },
  methods: {
    formatN(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    ...mapActions({ get_product: 'getProduct', searchProduct: 'searchProduct' }),
    ...mapMutations(['setPage', 'generateCheckoutData']),
    paginationSetup(data) {
      this.setPage(data)
      this.get_product()
      this.$router.push(`?page=${this.page}`)
    },
    cekItemCart(id) {
      return this.cart.findIndex(obj => obj.product_id === id)
    },
    addToCart(data) {
      const cekIndex = this.cart.findIndex(obj => obj.product_id === data.product_id)
      if (cekIndex >= 0) {
        this.cart[cekIndex].qty += 1
        this.cart[cekIndex].subtotal += this.cart[cekIndex].product_price
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
      }
      this.generateCheckoutData()
    }
  }
}

</script>
<style src="../assets/css/style.css"></style>
