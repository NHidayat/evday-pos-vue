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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in historyList" :key="index">
              <td>#{{ item.history_invoice }}</td>
              <td>{{ item.cashier_name }}</td>
              <td>{{ item.history_created_at }}</td>
              <td>
                <b-button variant="outline-primary" size="sm" @click="getItems(item)" v-b-modal.items-modal>See Items</b-button>
              </td>
              <td>Rp {{ item.history_total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal scrollable :title="invoice" id="items-modal" ref="items-modal" centered hide-footer>
      <div class="items-modal modal-body">
        <b-row class="checkout-item" v-for="(item, index) in itemsList" :key="index">
          <div class="col-6 item-name">{{ item.product_name }} {{ item.qty }}x</div>
          <div class="col-6 item-price">Rp. {{ item.subtotal }}</div>
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
      itemsList: '',
      invoice: ''
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
        })
        .catch(error => {
          console.log(error)
        })
    },
    getItems(data) {
      axios.get(`http://127.0.0.1:3000/history/${data.history_id}`)
        .then(res => {
          this.itemsList = res.data.data[0].items
          this.invoice = `#${res.data.data[0].history_invoice}`
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>
