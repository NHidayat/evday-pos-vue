function getTitle(vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}
export default {
  created() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
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
    formatN(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    showModal(ref) {
      this.$refs[ref].show()
    },
    closeModal(ref) {
      this.$refs[ref].hide()
    },
    closeClearModal(ref) {
      this.$refs[ref].hide()
      this.clearForm()
    },
    setLoading(e) {
      this.isLoading = e
    }
  }
}
