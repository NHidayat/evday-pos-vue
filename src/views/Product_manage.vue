<template>
  <div class="product-manage">
    <Navbar :title="title" />
    <section class="contents">
      <b-row>
        <Sidebar @updateList="get_products" />
        <b-container>
          <div class="main-content col-md-11">
            <div class="table-section">
              <div class="row">
                <div class="col-md-12">
                  <h3>Product List</h3>
                  <SortingGroup @generateSorting="generateSorting" />
                </div>
              </div>
              <div class="mt-2">
                <b-alert variant="danger" :show="isAlert">{{ alertMsg }}</b-alert>
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
                        <td>Rp {{ formatN(item.product_price) }}</td>
                        <td>{{ item.product_status === 1 ? 'Active' : 'Not Active' }}</td>
                        <td>
                          <b-button variant="outline-primary" size="sm" @click="setProduct(item)" v-b-modal.edit-product-modal>
                            <b-icon icon="pencil"></b-icon>
                          </b-button>
                          <b-button variant="outline-danger" size="sm" @click="delete_product(item)">
                            <b-icon icon="trash"></b-icon>
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <b-pagination v-model="page" :total-rows="totalData" :per-page="limit" aria-controls="my-table" align="center" @change="paginationSetup"></b-pagination>
              </div>
            </div>
          </div>
        </b-container>
      </b-row>
    </section>
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
            <input type="file" @change="handleFile" />
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
import SortingGroup from '../components/_base/Sorting_group'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  title: 'Manage Product - Evday POS',
  name: 'Product-manage',
  components: {
    Navbar,
    Sidebar,
    SortingGroup
  },
  data() {
    return {
      title: 'Manage Product',
      categories: [],
      product_id: '',
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
    this.get_products()
    this.getCategories()
  },
  computed: {
    ...mapGetters({
      productList: 'setProducts',
      limit: 'setLimit',
      page: 'setPage',
      totalData: 'setTotalData',
      isAlert: 'isAlert',
      alertMsg: 'alertMsg'
    })
  },
  methods: {
    ...mapActions({ get_products: 'getAllProduct', updateProducts: 'updateProducts', deleteProduct: 'deleteProduct' }),
    ...mapMutations(['setPage']),
    formatN(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    paginationSetup(data) {
      this.setPage(data)
      this.get_products()
      this.$router.push(`?page=${this.page}`)
    },
    generateSorting(data) {
      this.orderBy = data
      this.get_products()
    },
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
    handleFile(e) {
      this.form.product_image = e.target.files[0]
    },
    patchProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('product_price', this.form.product_price)
      data.append('category_id', this.form.category_id)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      const setData = {
        product_id: this.product_id,
        form: data
      }
      this.updateProducts(setData)
        .then(res => {
          this.products = res.data.data
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.closeModal()
          this.get_products()
        })
        .catch(error => {
          console.log(error)
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
    },
    delete_product(data) {
      this.$confirm({
        message: `Are you sure want to delete "${data.product_name}"?`,
        button: {
          no: 'Cancel',
          yes: 'Yes'
        },
        callback: confirm => {
          if (confirm) {
            this.deleteProduct(data)
              .then(res => {
                this.products = res.data.data
                this.isMsg = res.data.msg
                this.makeToast(this.isMsg, 'primary')
                this.get_products()
              })
              .catch(error => {
                console.log(error)
                this.isMsg = error.response.data.msg
                this.makeToast(this.isMsg, 'danger')
              })
          }
        }
      })
    }
  }
}

</script>
