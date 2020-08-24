<template>
  <b-col cols="2" md="2" class="sidebar">
    <ul>
      <li><a><img src="../../assets/fork.png"></a></li>
      <li><a><img src="../../assets/clipboard.png"></a></li>
      <li><a href="#add-item" v-b-modal.add-product-modal><img src="../../assets/add.png"></a></li>
    </ul>
    <div>
      <b-modal id="add-product-modal" ref="add-product-modal" hide-footer title="Add Product">
        <form @submit.prevent="addProduct">
          <div class=" form-group row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="form.product_name">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Image</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="form.product_image">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" v-model="form.product_price">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-6">
              <select class="form-control" v-model="form.category_id" required>
                <option value="" selected>Category</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Status</label>
            <div class="col-sm-6">
              <select class="form-control" v-model="form.product_status" required>
                <option value="" selected>Category</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn my-danger col-md-3" @click="closeModal">Cancel</button>
            <button type="submit" class="btn my-primary col-md-3">Add</button>
            <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button> -->
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
      form: {
        product_name: '',
        product_price: '',
        product_image: '',
        category_id: '',
        product_status: ''
      }
    }
  },
  methods: {
    makeToast(msg, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Hei',
        autoHideDelay: 10000,
        appendToast: append
      })
    },
    closeModal() {
      this.$refs['add-product-modal'].hide()
    },
    addProduct() {
      // console.log(this.form)
      axios.post('http://127.0.0.1:3000/product', this.form)
        .then(res => {
          this.products = res.data.data
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg)
          this.closeModal()
        })
        .catch(error => {
          console.log(error)
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg)
        })
    }
  }
}

</script>
