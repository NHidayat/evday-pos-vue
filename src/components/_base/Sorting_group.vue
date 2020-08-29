<template>
  <b-row class="order-group" align="right">
    <b-col md="12">
      <b-form-select v-model="selected" :options="options" size="sm" class="col-md-3 my-select form-control" @change="orderProducts"></b-form-select>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'Sorting-Group',
  // props: ['orderSelected'],
  data() {
    return {
      selected: 'product_name ASC',
      options: [
        { value: 'product_name ASC', text: 'Product Name (asc)' },
        { value: 'product_name DESC', text: 'Product Name (desc)' },
        { value: 'product_created_at DESC', text: 'Latest Product' },
        { value: 'product_price DESC', text: 'Highest Price' },
        { value: 'product_price ASC', text: 'Lowest Price' }
      ]
    }
  },
  methods: {
    orderProducts(data) {
      this.$emit('generateSorting', data)
    }
  }
}

</script>
