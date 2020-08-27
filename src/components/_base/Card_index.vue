<template>
  <div class="tile-count">
    <div class="row">
      <div class="col-md-4">
        <div class="count-card">
          <div class="card card-pink mb-3">
            <div class="card-body">
              <small class="card-title">Today’s Income</small>
              <h5 class="card-value">Rp. {{ todayIncome }} </h5>
              <small class="card-text">+2% Yesterday</small>
              <div class="round-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="count-card">
          <div class="card card-blue mb-3">
            <div class="card-body">
              <small class="card-title">Order's</small>
              <h5 class="card-value">{{ thisWeekData }} </h5>
              <small class="card-text">+5% Last Week</small>
              <div class="round-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="count-card">
          <div class="card card-purple mb-3">
            <div class="card-body">
              <small class="card-title">This Year’s Income</small>
              <h5 class="card-value">Rp. {{ thisYearIncome }} </h5>
              <small class="card-text">+10% Last Year</small>
              <div class="round-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Card-Index',
  data() {
    return {
      thisWeekData: '',
      todayIncome: '',
      thisYearIncome: ''
    }
  },
  created() {
    this.getHistories()
  },
  methods: {
    getHistories() {
      axios.get('http://127.0.0.1:3000/history')
        .then(res => {
          this.historyList = res.data.data
          this.thisWeekData = res.data.pagination.dataThisWeek
          this.todayIncome = res.data.pagination.todayIncome
          this.thisYearIncome = res.data.pagination.thisYearIncome
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
