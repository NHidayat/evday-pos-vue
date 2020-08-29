<template>
  <b-col cols="1" md="1">
    <div class="sidebar">
      <ul>
      <li><router-link to="/"><img src="../../assets/fork.png"></router-link></li>
      <li>
        <router-link to="/history"><img src="../../assets/clipboard.png"></router-link>
      </li>
      <li>
        <router-link to="/manage-product"><img src="../../assets/manage-product.png"></router-link>
      </li>
      <li>
        <router-link to="/manage-category"><img src="../../assets/manage-category.png"></router-link>
      </li>
      <li><a href="#add-item" v-b-modal.add-product-modal><img src="../../assets/add.png"></a></li>
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
            <button type="button" class="btn my-danger col-md-3" @click="closeModal">Cancel</button>
            <button type="submit" class="btn my-primary col-md-3">Add</button>
          </div>
        </form>
      </b-modal>
    </div>
  </b-col>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      alert: false,
      isMsg: 'Tes',
      categories: [],
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
    this.getCategories()
  },
  methods: {
    makeToast(msg, variant = null, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Hei',
        autoHideDelay: 10000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    },
    closeModal() {
      this.$refs['add-product-modal'].hide()
    },
    addProduct() {
      // console.log(this.form)
      axios.post('http://127.0.0.1:3000/product', this.form)
        .then(res => {
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.closeModal()
          this.$emit('updateList', res.data.data)
        })
        .catch(error => {
          console.log(error)
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
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
    }
  }
}

</script>
