<template>
  <div id="app">
    <router-view />
    <vue-confirm-dialog></vue-confirm-dialog>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  mounted() {
    this.$Progress.finish()
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  }
}

</script>
