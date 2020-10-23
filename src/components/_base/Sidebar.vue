<template>
  <b-col cols="1" md="1">
    <div class="sidebar">
      <ul>
        <li>
          <router-link to="/"><img src="../../assets/fork.png"></router-link>
        </li>
        <li>
          <router-link to="/history"><img src="../../assets/clipboard.png"></router-link>
        </li>
        <li v-if="user.user_role === 1">
          <router-link to="/manage-product"><img src="../../assets/manage-product.png"></router-link>
        </li>
        <li v-if="user.user_role === 1">
          <router-link to="/manage-category"><img src="../../assets/manage-category.png"></router-link>
        </li>
        <li v-if="user.user_role === 1">
          <router-link to="/manage-users"><img src="../../assets/users-icon.png"></router-link>
        </li>
        <li v-if="user.user_role === 1">
          <a href="#add-item" v-b-modal.add-product-modal><img src="../../assets/add.png"></a>
        </li>
      </ul>
    </div>
    <div>
      <b-modal id="add-product-modal" ref="add-product-modal" hide-footer title="Add Product">
        <form @submit.prevent="addProduct">
          <div class=" form-group row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="form.product_name" required />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Image</label>
            <div class="col-sm-10">
              <input type="file" @change="handleUpload" required /> <small>Max. 1MB</small>
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
                <option value="" selected>Category</option>
                <option v-for="(item, index) in categories" :key="index" :value="item.category_id">{{ item.category_name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Status</label>
            <div class="col-sm-6">
              <select class="form-control" v-model="form.product_status" required>
                <option value="" selected>Status</option>
                <option value="0">Not active</option>
                <option value="1">Active</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn my-danger col-md-3" @click="closeModal('add-product-modal')">Cancel</button>
            <button type="submit" class="btn my-primary col-md-3">
              <div v-if="!isLoading">
              <span>Add</span>
            </div>
            <div v-else>
              <b-spinner small variant="light" type="grow" label="Loading..."></b-spinner>
            </div>
            </button>
          </div>
        </form>
      </b-modal>
    </div>
  </b-col>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      alert: false,
      isMsg: 'Tes',
      categories: [],
      isLoading: false,
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
    this.get_ategories()
  },
  computed: {
    ...mapGetters({ user: 'user' })
  },
  methods: {
    ...mapActions({
      postProduct: 'postProduct',
      getProduct: 'getProduct',
      getCategories: 'getCategories'
    }),
    clearForm() {
      this.form = {
        product_name: '',
        product_price: '',
        product_image: '',
        category_id: '',
        product_status: ''
      }
    },
    handleUpload(event) {
      this.form.product_image = event.target.files[0]
    },
    async addProduct() {
      this.setLoading(true)
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('product_price', this.form.product_price)
      data.append('product_image', this.form.product_image)
      data.append('category_id', this.form.category_id)
      data.append('product_status', this.form.product_status)
      this.postProduct(data)
        .then(res => {
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.closeModal('add-product-modal')
          this.getProduct()
          this.clearForm()
        }).catch(error => {
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
      this.setLoading(false)
    },
    get_ategories() {
      this.getCategories()
        .then(res => {
          this.categories = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
<style scoped>
.logout {
  cursor: pointer;
}

</style>
