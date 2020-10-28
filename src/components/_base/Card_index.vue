<template>
  <div class="tile-count mt-4">
    <div class="row">
      <div class="mt-2 col-md-12">
        <b-alert variant="danger" :show="isAlert">{{ alertMsg }}</b-alert>
      </div>
      <div class="col-md-4">
        <div class="count-card">
          <div class="card card-pink mb-3">
            <div class="card-body">
              <small class="card-title">Today’s Income</small>
              <h5 class="card-value">Rp. {{ formatN(todayIncome) }} </h5>
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
              <h5 class="card-value">Rp. {{ formatN(thisYearIncome) }} </h5>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Card-Index',
  data() {
    return {
      isAlert: false,
      alertMsg: ''
    }
  },
  created() {
    this.getHistoriesIncome()
  },
  computed: {
    ...mapGetters({ todayIncome: 'getTodayIncome', thisWeekData: 'getThisWeekIncome', thisYearIncome: 'getThisYearIncome', daily: 'getDailyIncome' })
  },
  methods: {
    ...mapActions(['getHistoriesIncome'])
  }
}

</script>
