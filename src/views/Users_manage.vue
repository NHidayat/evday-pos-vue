<template>
  <div class="manage-users">
    <Navbar :title="title" />
    <section class="contents">
      <b-row>
        <Sidebar />
        <b-container>
          <div class="main-content col-md-11">
            <div class="table-section">
              <div class="row">
                <div class="col-md-12">
                  <h3>Users List</h3>
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
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(key, index) in getUsersList" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ key.user_name }}</td>
                        <td>{{ key.user_email }}</td>
                        <td>{{ key.user_role === 1 ? 'Admin' : 'Cashier' }}</td>
                        <td>{{ key.user_status === 1 ? 'Active' : 'Not Active' }}</td>
                        <td>
                          <b-button variant="outline-primary" size="sm" @click="setUser(key)" v-b-modal.edit-user-modal>
                            <b-icon icon="pencil"></b-icon>
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <!-- <b-pagination v-model="page" :total-rows="totalData" :per-page="limit" aria-controls="my-table" align="center" @change="paginationSetup"></b-pagination> -->
              </div>
            </div>
          </div>
        </b-container>
      </b-row>
    </section>
    <b-modal id="edit-user-modal" centered ref="edit-user-modal" hide-footer title="Edit User">
      <form @submit.prevent="patch_user">
        <div class=" form-group row">
          <label class="col-sm-2 col-form-label">User Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="form.user_name" required />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Status</label>
          <div class="col-sm-6">
            <select class="form-control" v-model="form.user_status" required>
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
import Navbar from '../components/_base/Navbar_full'
import Sidebar from '../components/_base/Sidebar'

import { mapGetters, mapActions } from 'vuex'
export default {
  title: 'Manage Users - Evday POS',
  name: 'Manage-user',
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      title: 'Manage Users',
      form: {
        user_name: '',
        user_status: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isAlert', 'alertMsg', 'getUsersList'])
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    ...mapActions(['getAllUsers', 'patchUser']),
    closeModal() {
      this.$refs['edit-user-modal'].hide()
    },
    setUser(data) {
      this.form = {
        user_name: data.user_name,
        user_status: data.user_status
      }
      this.user_id = data.user_id
    },
    patch_user() {
      const setData = {
        user_id: this.user_id,
        form: this.form
      }

      this.patchUser(setData)
        .then(res => {
          this.makeToast(res.data.msg, 'primary')
          this.closeModal()
          this.getAllUsers()
        }).catch(error => {
          this.makeToast(error.response.data.msg, 'danger')
        })
    },
    makeToast(msg, variant = null, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Hei',
        autoHideDelay: 10000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    }
  }
}

</script>
