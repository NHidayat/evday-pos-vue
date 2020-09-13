<template>
  <b-row class="order-group" align="right">
    <b-col md="12">
      <b-form-select v-model="selected" :options="options" class="col-md-3" @change="orderProducts"></b-form-select>
    </b-col>
  </b-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Sorting-Group',
  data() {
    return {
      selected: 'product_name ASC',
      options: [
        { value: 'product_name ASC', text: 'Product Name A-Z' },
        { value: 'product_name DESC', text: 'Product Name Z-A' },
        { value: 'product_created_at DESC', text: 'Latest Product' },
        { value: 'product_price DESC', text: 'Highest Price' },
        { value: 'product_price ASC', text: 'Lowest Price' }
      ]
    }
  },
  computed: {

  },
  methods: {
    ...mapActions({ get_product: 'getProduct' }),
    ...mapMutations(['setSorting']),
    orderProducts(data) {
      this.setSorting(data)
      this.$router.push(`?orderBy=${data}`)
      this.get_product()
    }
  }
}

</script>
