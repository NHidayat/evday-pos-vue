<template>
  <div>
    <b-container>
      <div class="cform-wrap">
        <b-form @submit.prevent="onSubmit">
          <div class="cform-title">
            <span>Evday-POS</span>
          </div>
          <div class="cform-group">
            <input type="email" v-model="form.user_email" class="cform-control" placeholder="Email" required />
            <input type="password" v-model="form.user_password" class="cform-control" placeholder="Password" required />
          </div>
          <b-alert variant="warning" :show="isAlert">{{ alertMsg }}</b-alert>
          <div class="cform-button">
            <b-button type="submit" class="my-primary">
              <b-spinner small v-show="isLoading"></b-spinner> <span>Login</span>
            </b-button>
          </div>
          <div class="cform-text">
            <span>Don't have an account? <router-link to="/register" class="cform-link">Sign Up</router-link></span>
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  title: 'Login - Evday POS',
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      isLoading: false,
      isAlert: false,
      alertMsg: ''
    }
  },
  computed: {},
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.isLoading = true
      this.login(this.form)
        .then(result => {
          this.$router.push('/')
        }).catch(error => {
          console.log(error)
          this.alertMsg = error.data.msg
          this.isAlert = true
          this.isLoading = false
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    }
  }
}

</script>
<style src="../../assets/css/auth.css" scoped></style>
