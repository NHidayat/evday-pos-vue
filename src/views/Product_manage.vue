<template>
  <div class="product-manage">
    <Navbar :title="title" />
    <Sidebar />
    <b-container>
      <div class="main-content md-12">
        <div class="table-section">
          <div class="row">
            <div class="col-6">
              <h3>Product List</h3>
            </div>
            <div class="col-6">
              <select class="float-right range-select">
                <option value="month">Sort</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <table class="table table-responsive-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in productList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.product_image }}</td>
                    <td>{{ item.category_name }}</td>
                    <td>Rp {{ item.product_price }}</td>
                    <td>{{ item.product_status === 1 ? 'Active' : 'Not Active' }}</td>
                    <td>
                      <b-button variant="outline-primary" size="sm" @click="setProduct(item)">
                        <b-icon icon="pencil" v-b-modal.edit-product-modal></b-icon>
                      </b-button>
                      <b-button variant="outline-danger" size="sm" @click="deleteProduct(item)">
                        <b-icon icon="trash"></b-icon>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </b-container>
    <b-modal id="edit-product-modal" ref="edit-product-modal" hide-footer title="Edit Product">
      <form @submit.prevent="patchProduct">
        <div class=" form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="form.product_name" required />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="form.product_image" required />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-8">
            <input type="number" class="form-control" v-model="form.product_price" required />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Category</label>
          <div class="col-sm-6">
            <select class="form-control" v-model="form.category_id" required>
              <option v-for="(cat, index) in categories" :key="index" :value="cat.category_id">{{ cat.category_name }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Status</label>
          <div class="col-sm-6">
            <select class="form-control" v-model="form.product_status" required>
              <option value="0">Not active</option>
              <option value="1">Active</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn my-danger col-md-3" @click="closeModal">Cancel</button>
          <button type="submit" class="btn my-primary col-md-3">Update</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
import Navbar from '../components/_base/Navbar_full'
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
      title: 'Product Manage',
      productList: [],
      categories: [],
      product_id: '',
      limit: '',
      page: '',
      orderBy: '',
      sort: '',
      form: {
        product_name: '',
        product_price: '',
        product_image: '',
        category_id: '',
        product_status: ''
      }
    }
  },
  created() {
    this.get_product()
    this.getCategories()
  },
  methods: {
    closeModal() {
      this.$refs['edit-product-modal'].hide()
    },
    makeToast(msg, variant = null, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Hei',
        autoHideDelay: 10000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    },
    get_product() {
      axios.get('http://127.0.0.1:3000/product')
        .then(res => {
          this.productList = res.data.data
          console.log(res.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCategories() {
      axios.get('http://127.0.0.1:3000/category')
        .then(res => {
          this.categories = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_image: data.product_image,
        category_id: data.category_id,
        product_status: data.product_status
      }
      this.product_id = data.product_id
    },
    patchProduct() {
      axios.patch(`http://127.0.0.1:3000/product/${this.product_id}`, this.form)
        .then(res => {
          this.products = res.data.data
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.closeModal()
          this.get_product()
        })
        .catch(error => {
          console.log(error)
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
    },
    deleteProduct(data) {
      console.log(data.product_id)
      this.product_id = data.product_id
      this.form = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_image: data.product_image,
        category_id: data.category_id,
        product_status: '0'
      }
      console.log(this.form)
      if (confirm(`Untuk saat ini status "${data.product_name}" hanya akan diganti menjadi tidak aktif`)) {
        this.patchProduct()
      }
    }
  }
}

</script>