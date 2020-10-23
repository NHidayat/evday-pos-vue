<template>
  <div>
    <b-container>
      <div class="cform-wrap">
        <b-form @submit.prevent="onSubmit" v-if="!formKey">
          <div class="cform-header">
            <span class="cform-title">Evday-POS</span>
            <span class="cform-subtitle">Register</span>
          </div>
          <div class="cform-group">
            <input type="text" v-model="form.user_name" class="cform-control" placeholder="Username" required />
            <input type="email" v-model="form.user_email" class="cform-control" placeholder="Email" required />
            <input type="password" v-model="form.user_password" class="cform-control" placeholder="Password" required />
          </div>
          <b-alert :variant="alertVariant" :show="isAlert">{{ alertMsg }}</b-alert>
          <div class="cform-button">
            <b-button type="submit" class="my-primary">
              <b-spinner small v-show="isLoading"></b-spinner> <span>Register</span>
            </b-button>
          </div>
          <div class="cform-text">
            <span>Already have an account? <router-link to="/login" class="cform-link">Login</router-link></span>
          </div>
        </b-form>
        <b-form @submit.prevent="onKeySubmit" v-else>
          <div class="cform-header">
            <span class="cform-subtitle">Activatin Code</span>
            <span class="text" style="display: block;">
              We have sent an activation code to your email. Please check your email <b>{{ form.user_email }}</b>
            </span>
          </div>
          <div class="cform-group">
            <input type="text" v-model="user_key" class="cform-control" placeholder="Code" required />
          </div>
          <b-alert :variant="alertVariant" :show="isAlert">{{ alertMsg }}</b-alert>
          <div class="cform-button">
            <b-button type="submit" class="my-primary">
              <b-spinner small v-show="isLoading"></b-spinner> <span>Finish</span>
            </b-button>
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  title: 'Register - Evday POS',
  name: 'Login',
  data() {
    return {
      formKey: false,
      user_key: '',
      form: {
        user_user_name: '',
        user_email: '',
        user_password: ''
      },
      isLoading: false,
      isAlert: false,
      alertMsg: '',
      alertVariant: ''
    }
  },
  computed: {},
  methods: {
    ...mapActions(['register', 'activation']),
    onSubmit() {
      this.isLoading = true
      this.isAlert = false
      this.register(this.form)
        .then(result => {
          this.makeToast(result.data.msg, 'primary')
          this.formKey = true
          this.isLoading = false
        }).catch(error => {
          this.alertMsg = error.data.msg
          this.isAlert = true
          this.alertVariant = 'danger'
          this.isLoading = false
        })
    },
    onKeySubmit() {
      this.isLoading = true
      this.isAlert = false
      const setData = {
        user_key: this.user_key
      }
      this.activation(setData)
        .then(result => {
          this.makeToast(result.data.msg + '. You will be redirected to login page', 'primary')
          setTimeout(() => {
            this.$router.push('login')
          }, 5000)
        }).catch(error => {
          this.alertMsg = error.data.msg
          this.isAlert = true
          this.alertVariant = 'danger'
          this.isLoading = false
        })
    }
  }
}

</script>
<style src="../../assets/css/auth.css" scoped></style>
