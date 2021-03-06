<template>
  <div class="category-manage">
    <Navbar :title="title" />
    <section class="contents">
      <b-row>
        <Sidebar />
        <b-container>
          <div class="main-content col-md-11">
            <div class="table-section">
              <div class="row">
                <div class="col-6">
                  <h3>Category List</h3>
                </div>
                <div class="col-6" align="right">
                  <b-button variant="outline-success" v-b-modal.category-modal @click="setAdd">
                    <b-icon-plus></b-icon-plus>
                    Add Catgory
                  </b-button>
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
                          <b-button variant="outline-primary" v-b-modal.category-modal size="sm" @click="setcategory(item)">
                            <b-icon icon="pencil"></b-icon>
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
      </b-row>
    </section>
    <b-modal id="category-modal" ref="category-modal" centered hide-footer :title="modalTitle">
      <form @submit.prevent="onSubmit">
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
          <button type="button" class="btn my-danger col-md-3" @click="closeClearModal('category-modal')">Cancel</button>
          <button type="button" class="btn my-primary col-md-3" @click="patch_category" v-show="isUpdate">
            <div v-if="!isLoading">Update</div>
            <div v-else>
              <b-spinner small variant="light" type="grow" label="Loading..."></b-spinner>
            </div>
          </button>
          <button type="submit" class="btn my-primary col-md-3" v-show="!isUpdate">
            <div v-if="!isLoading">Add</div>
            <div v-else>
              <b-spinner small variant="light" type="grow" label="Loading..."></b-spinner>
            </div>
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import Navbar from '../components/_base/Navbar_full'
import Sidebar from '../components/_base/Sidebar'
import { mapActions, mapGetters } from 'vuex'
export default {
  title: 'Manage Category - Evday POS',
  name: 'category-manage',
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      title: 'Manage Category',
      modalTitle: '',
      isUpdate: false,
      isAlert: false,
      isLoading: false,
      alertMsg: '',
      form: {
        category_name: '',
        category_status: ''
      }
    }
  },
  created() {
    this.getCategories()
  },
  computed: {
    ...mapGetters({ categoryList: 'categories' })
  },
  methods: {
    ...mapActions({
      getCategories: 'getCategories',
      postCategory: 'postCategory',
      patchCategory: 'patchCategory'
    }),
    onSubmit() {
      this.setLoading(true)
      if (this.isUpdate) {
        this.patch_category()
      } else {
        this.post_category()
      }
    },
    clearForm() {
      this.form = {
        category_name: '',
        category_status: ''
      }
    },
    setAdd() {
      this.modalTitle = 'Add Category'
      this.isUpdate = false
    },
    async post_category() {
      await this.postCategory(this.form)
        .then(res => {
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.getCategories()
          this.closeClearModal('category-modal')
          this.clearForm()
        })
        .catch(error => {
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
      this.setLoading(false)
    },
    setcategory(data) {
      this.modalTitle = 'Edit Category'
      this.isUpdate = true
      this.form = {
        category_name: data.category_name,
        category_status: data.category_status
      }
      this.category_id = data.category_id
    },
    async patch_category() {
      const setData = {
        category_id: this.category_id,
        form: this.form
      }
      this.patchCategory(setData)
        .then(res => {
          this.categorys = res.data.data
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.getCategories()
          this.closeClearModal('category-modal')
        })
        .catch(error => {
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
      this.setLoading(false)
    },
    deletecategory(data) {
      this.category_id = data.category_id
      this.form = {
        category_name: data.category_name,
        category_status: '0'
      }
      this.$confirm({
        title: 'Confirmation',
        message: `For now the status of "${data.category_name}" will be change to inactive`,
        button: {
          no: 'Cancel',
          yes: 'OK'
        },
        callback: confirm => {
          if (confirm) {
            this.patch_category()
          }
        }
      })
    }
  }
}

</script>
