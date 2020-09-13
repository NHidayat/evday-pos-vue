<template>
  <div class="chart-section">
    <div class="row">
      <div class="col-9">
        <h3>Revenue</h3>
      </div>
      <div class="col-3">
        <b-form-select v-model="selected" :options="options" @change="getHistoriesIncome"></b-form-select>
      </div>
    </div>
    <div class="row">
      <line-chart :data="dailyIncome" thousands="," prefix="Rp " :round="2"></line-chart>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Chart',
  data() {
    return {
      selected: 'week',
      options: [
        { value: 'week', text: 'This Week' },
        { value: 'month', text: 'This Month' }
      ]
    }
  },
  computed: {
    ...mapGetters({ dailyIncome: 'getDailyIncome' })
  },
  methods: {
    ...mapActions(['getHistoriesIncome'])
  }
}

</script>
