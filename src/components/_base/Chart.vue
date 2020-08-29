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
      {{data}}
      <line-chart :data="chartData"></line-chart>
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
      // chartData: { '2020-08-26T17:00:00.000Z': 8790100, '2020-08-27T17:00:00.000Z': 790100 }
      chartData: [
        { name: 'This Week', data: { '2017-01-01': 125000, '2017-01-02': 302676, '2017-01-03': 250012 } },
        { name: 'Last Week', data: { '2017-01-01': 312000, '2017-01-02': 125069, '2017-01-03': 450000 } }
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
          this.data = res.data.pagination.dailyIncome
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
