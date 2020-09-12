<template>
  <div class="chart-section">
    <div class="row">
      <div class="col-6">
        <h3>Revenue</h3>
      </div>
      <div class="col-6">
        <select class="float-right range-select">
          <option value="month">Month</option>
        </select>
      </div>
    </div>
    <div class="row">
      <line-chart :data="dailyIncome" thousands="," prefix="Rp " :round="2"></line-chart>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Chart',
  computed: {
    ...mapGetters({ dailyIncome: 'getDailyIncome' })
  }
}

</script>
