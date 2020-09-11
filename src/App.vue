<template>
  <div id="app">
    <router-view />
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    // console.log('hello')
    this.interceptorRequest()
    this.interceptorResponse()
  }
}

</script>
