<template>
  <div>
    <b-container>
      <div class="cform-wrap">
        <b-form @submit.prevent="onSubmit">
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
    ...mapActions(['register']),
    onSubmit() {
      this.isLoading = true
      this.register(this.form)
        .then(result => {
          this.alertVariant = 'primary'
          this.alertMsg = result.data.msg
          this.isAlert = true
          this.isLoading = false
          this.onReset()
        }).catch(error => {
          this.alertMsg = error.data.msg
          this.isAlert = true
          this.alertVariant = 'danger'
          this.isLoading = false
        })
    },
    onReset() {
      this.form = {
        user_name: '',
        user_email: '',
        user_password: ''
      }
    }
  }
}

</script>
<style src="../../assets/css/auth.css" scoped></style>
