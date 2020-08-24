<template>
  <div class="product-manage">
    <Navbar />
    <Sidebar />
    <div class="main-content md-12">
      <b-table striped hover :items="productList"></b-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Navbar from '../components/_base/Navbar'
import Sidebar from '../components/_base/Sidebar'
// import Cart from '../components/_base/Cart'

export default {
  name: 'Product-manage',
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      productList: []
    }
  },
  created() {
    this.get_product()
  },
  methods: {
    get_product() {
      axios.get('http://127.0.0.1:3000/product')
        .then(res => {
          this.productList = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
