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
      <!-- {{dataIndex}} {{dataValue}} -->
      <line-chart :data="data" thousands="," prefix="Rp " :round="2"></line-chart>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Chart',
  data() {
    return {
      data: [],
      chartData: [
        { name: 'This Week', data: [] },
        { name: 'Last Week', data: [['2020-08-26T17:00:00.000Z', 90100], ['2020-08-27T17:00:00.000Z', 790100], ['2020-08-28T17:00:00.000Z', 990100]] }
      ]
    }
  },
  created() {
    this.getHistories()
  },
  methods: {
    getHistories() {
      axios.get('http://127.0.0.1:3000/history')
        .then(res => {
          res.data.pagination.dailyIncome.map(v => this.chartData[0].data.push([v.date, v.total]))
          res.data.pagination.dailyIncome.map(v => this.data.push([v.date, v.total]))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
