<template>
  <div class="category-manage">
    <Navbar :title="title" />
    <Sidebar />
    <b-container>
      <div class="main-content md-12">
        <div class="table-section">
          <div class="row">
            <div class="col-6">
              <h3>Category List</h3>
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
                    <th scope="col">Category Name</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in categoryList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.category_name }}</td>
                    <td>{{ item.category_created_at }}</td>
                    <td>{{ item.category_updated_at }}</td>
                    <td>{{ item.category_status === 1 ? 'Active' : 'Not Active' }}</td>
                    <td>
                      <b-button variant="outline-primary" size="sm" @click="setcategory(item)">
                        <b-icon icon="pencil" v-b-modal.edit-category-modal></b-icon>
                      </b-button>
                      <b-button variant="outline-danger" size="sm" @click="deletecategory(item)">
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
    <b-modal id="edit-category-modal" ref="edit-category-modal" hide-footer title="Edit category">
      <form @submit.prevent="patchcategory">
        <div class=" form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="form.category_name" required />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Status</label>
          <div class="col-sm-6">
            <select class="form-control" v-model="form.category_status" required>
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
  name: 'category-manage',
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      title: 'Manage Category',
      categoryList: [],
      form: {
        category_name: '',
        category_status: ''
      }
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    closeModal() {
      this.$refs['edit-category-modal'].hide()
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
          this.categoryList = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    setcategory(data) {
      this.form = {
        category_name: data.category_name,
        category_status: data.category_status
      }
      this.category_id = data.category_id
    },
    patchcategory() {
      axios.patch(`http://127.0.0.1:3000/category/${this.category_id}`, this.form)
        .then(res => {
          this.categorys = res.data.data
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.closeModal()
          this.getCategories()
        })
        .catch(error => {
          console.log(error)
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
    },
    deletecategory(data) {
      console.log(data.category_id)
      this.category_id = data.category_id
      this.form = {
        category_name: data.category_name,
        category_status: '0'
      }
      if (confirm(`For now the status of "${data.category_name}" will only be changed to inactive`)) {
        this.patchcategory()
      }
    }
  }
}

</script>
