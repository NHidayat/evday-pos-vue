<template>
  <div class="main-content list-menu col-md-7 col-12">
    <div class="container">
      <div class="row">
        <b-card class="collection-item" v-for="(item, index) in products" :key="index">
          <img :src="require(`../../${item.product_image}`)" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="product-name">{{ item.product_name }}</h5>
            <h5 class="price">Rp {{item.product_price}}</h5>
            <b-button class="my-primary col-12" @click="addToCart(item)">Add</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Cards',
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 9,
      sort: '',
      products: [],
      base_url: process.env.VUE_APP_BASE_URL,
      form: {
        product_name: '',
        product_price: '',
        product_image: '',
        category_id: '',
        product_status: ''
      },
      alert: false,
      isMsg: 'Tes',
      isUpdate: false,
      product_id: ''
    }
  },
  created() {
    this.get_product()
    console.log(this.cart)
  },
  methods: {
    increment() {
      console.log('click')
      this.$emit('increment', 1)
    },
    addToCart(data) {
      const cekIndex = this.cart.findIndex(obj => obj.product_id === data.product_id)
      // console.log(cekIndex)
      if (cekIndex >= 0) {
        this.cart[cekIndex].qty += 1
      } else {
        const setCart = {
          product_id: data.product_id,
          qty: 1
        }
        this.cart.push(setCart)
      }
      this.increment()
      console.log(this.cart)
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
