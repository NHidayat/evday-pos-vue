<template>
  <div class="table-section">
    <div class="row">
      <div class="col-6">
        <h3>Recent Order</h3>
      </div>
      <div class="col-6">
        <select class="float-right range-select">
          <option value="month">Today</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">INVOICE</th>
              <th scope="col">CASHIER</th>
              <th scope="col">DATE</th>
              <th scope="col">ORDERS</th>
              <th scope="col">AMOUNT</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in historyList" :key="index">
              <td>#{{ item.history_invoice }}</td>
              <td>{{ item.cashier_name }}</td>
              <td>{{ item.history_created_at }}</td>
              <td>
                {{item.items.map(v => v.product_name).join(', ') }}
              </td>
              <td>Rp {{ item.history_total }}</td>
              <td><b-button variant="outline-primary" class="float-right" size="sm" @click="getDetail(item)" v-b-modal.items-modal>Detail</b-button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <b-pagination v-model="page" :total-rows="totalData" :per-page="limit" aria-controls="my-table" align="center" @change="paginationSetup"></b-pagination>
    </div>
    <b-modal scrollable :title="invoice" id="items-modal" ref="items-modal" centered hide-footer>
      <div class="items-modal my-modal-body">
        <b-row class="checkout-item" v-for="(item, index) in itemsDetail" :key="index">
          <div class="col-6 item-name">{{ item.product_name }} {{ item.qty }}x</div>
          <div class="col-6 text-right">Rp. {{ item.subtotal }}</div>
        </b-row>
        <b-row>
          <b-col>Tax</b-col>
          <b-col class="text-right">Rp {{ tax}}</b-col>
        </b-row>
        <b-row>
          <b-col>Total</b-col>
          <b-col class="text-right">Rp {{ totalBuy }}</b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'HistoryTable',
  data() {
    return {
      historyList: '',
      itemsDetail: '',
      itemList: '',
      tax: '',
      totalBuy: '',
      invoice: '',
      page: 1,
      limit: 9,
      totalData: ''
    }
  },
  created() {
    this.getHistories()
  },
  methods: {
    paginationSetup(data) {
      this.page = data
      this.getHistories()
      this.$router.push(`?page=${this.page}`)
    },
    getHistories() {
      axios.get(`http://127.0.0.1:3000/history?page=${this.page}&limit=${this.limit}`)
        .then(res => {
          this.historyList = res.data.data
          this.totalData = res.data.pagination.totalData
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDetail(data) {
      axios.get(`http://127.0.0.1:3000/history/${data.history_id}`)
        .then(res => {
          this.tax = res.data.data[0].history_ppn
          this.totalBuy = res.data.data[0].history_total
          this.itemsDetail = res.data.data[0].items
          this.invoice = `#${res.data.data[0].history_invoice}`
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}

</script>
