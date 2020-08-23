<template>
  <!-- Add Item Modal -->
  <div>
    <b-button v-b-modal.modal-1>Launch demo modal</b-button>
    <b-modal id="modal-1" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'Modal_add_product',
  data() {
    return {
      alert: true,
      isMsg: 'Tes',
      form: {
        product_name: '',
        product_price: '',
        product_image: '',
        category_id: '',
        product_status: ''
      }
    }
  }
}

</script>
