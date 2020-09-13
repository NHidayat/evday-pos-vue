import axios from 'axios'
export default {
  state: {
    histories: [],
    dailyIncome: [],
    todayIncome: 0,
    thisWeekIncome: 0,
    thisYearIncome: 0,
    page: 1,
    limit: 10,
    totalData: 0
  },
  mutations: {
    setTotalData(state, payload) {
      state.totalData = payload
    },
    setPage(state, payload) {
      state.page = payload
    },
    setHistories(state, payload) {
      state.histories = payload
    },
    setDailyIncome(state, payload) {
      state.dailyIncome = payload
    },
    setTodayIncome(state, payload) {
      state.todayIncome = payload
    },
    setThisWeekIncome(state, payload) {
      state.thisWeekIncome = payload
    },
    setThisYearIncome(state, payload) {
      state.thisYearIncome = payload
    }
  },
  actions: {
    getHistories(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `history?page=${context.state.page}&limit=${context.state.limit}`)
          .then(res => {
            context.commit('setHistories', res.data.data)
            context.commit('setTotalData', res.data.pagination.totalData)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getHistoriesIncome(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `history/histories-income/alpha?period=${payload}`)
          .then(res => {
            const dailyData = []
            res.data.data.dailyIncome.map(v => dailyData.push([v.date, v.total]))
            context.commit('setDailyIncome', dailyData)
            context.commit('setTodayIncome', res.data.data.todayIncome)
            context.commit('setThisWeekIncome', res.data.data.thisWeekIncome)
            context.commit('setThisYearIncome', res.data.data.thisYearIncome)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getHistoryDetail(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `history/${payload.history_id}`)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    postHistory(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'history', payload)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    histories(state) {
      return state.histories
    },
    getDailyIncome(state) {
      return state.dailyIncome
    },
    getTodayIncome(state) {
      return state.todayIncome
    },
    getThisWeekIncome(state) {
      return state.thisWeekIncome
    },
    getThisYearIncome(state) {
      return state.thisYearIncome
    },
    getTotalData(state) {
      return state.totalData
    },
    getLimit(state) {
      return state.limit
    },
    getPage(state) {
      return state.page
    }
  }
}
